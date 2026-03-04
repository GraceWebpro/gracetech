import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  setDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "../../../../server/firebase";
import PayPalPayment from "../../../../payment/PaypalPayment";
import { useAuth } from "../../../../server/AuthProvider";
import TemplateCard from "../../ui/TemplateCard";
import { formatNairaFromUSD } from "../../../utils/currency";

const TemplateDetails = () => {
  const { slug } = useParams();

  const [template, setTemplate] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [showLicense, setShowLicense] = useState(false);
  const [preview, setPreview] = useState(null);
  const { currentUser: user, loading } = useAuth();

  /* ================= FETCH TEMPLATE ================= */
  useEffect(() => {
    if (!slug) return;

    const fetchTemplate = async () => {
      const q = query(
        collection(db, "templates"),
        where("slug", "==", slug)
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        const docSnap = snap.docs[0];
        const data = { id: docSnap.id, ...docSnap.data() };        
        console.log("Fetched template:", data);
        // Ensure versions object exists
        data.versions = data.versions || {}; 
        setTemplate(data);
      }
    };

    fetchTemplate();
  }, [slug]);

  /* ================= SIMILAR ================= */
  useEffect(() => {
    if (!template?.category) return;

    const fetchSimilar = async () => {
      const q = query(
        collection(db, "templates"),
        where("category", "==", template.category)
      );

      const snap = await getDocs(q);

      const list = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(t => t.id !== template.id)
        .slice(0, 3);

      setSimilar(list);
    };

    fetchSimilar();
  }, [template]);

  /* ================= DOWNLOAD COUNT ================= */
  const increaseDownloadCount = async () => {
    if (!template?.id) return;
    await updateDoc(doc(db, "templates", template.id), {
      downloadsCount: increment(1),
    });

    setTemplate((prev) => ({
      ...prev,
      downloadsCount: (prev.downloadsCount || 0) + 1,
    }));
  };

  /* ================= PAYMENT SUCCESS ================= */
  const handlePaymentSuccess = async (details, versionKey, paymentDetails) => {
    const version = template.versions[versionKey];
    if (!version?.downloadUrl || !user) return;
  
    // 1️⃣ Increment global downloads count
    await updateDoc(doc(db, "templates", template.id), {
      downloadsCount: increment(1),
    });
  
    setTemplate(prev => ({
      ...prev,
      downloadsCount: (prev.downloadsCount || 0) + 1,
    }));
  
    // 2️⃣ Save in downloads collection for this user
    await setDoc(doc(db, "downloads", `${user.uid}_${template.id}_${versionKey}`), {
      userId: user.uid,
      templateId: template.id,
      templateName: template.title,
      downloadUrl: version.downloadUrl,
      downloadDate: serverTimestamp(),
      isFree: false,
      version: versionKey,
      paymentDetails
    });
  
    // 3️⃣ Trigger download
    const link = document.createElement("a");
    link.href = version.downloadUrl;
    link.download = `${template.title}-${versionKey}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    alert(`Payment successful! Your ${versionKey} download should start now.`);
  };
  

  const handlePaidDownload = async (versionKey, paymentDetails) => {
    const version = template.versions[versionKey];
    if (!version?.downloadUrl || !user) return;
  
    await updateDoc(doc(db, "templates", template.id), {
      downloadsCount: increment(1)
    });
  
    await setDoc(doc(db, "downloads", `${user.uid}_${template.id}_${versionKey}`), {
      userId: user.uid,
      templateId: template.id,
      templateName: template.title,
      downloadUrl: version.downloadUrl,
      downloadDate: serverTimestamp(),
      isFree: false,
      version: versionKey,
      paymentDetails
    });
  
    const link = document.createElement("a");
    link.href = version.downloadUrl;
    link.download = `${template.title}-${versionKey}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    alert(`Payment successful! Your ${versionKey} download should start now.`);
  };


  const handleFreeDownload = async () => {
    const freeVersion = template.versions.free;
    if (!freeVersion?.downloadUrl) return alert("Free template not available.");
  
    await increaseDownloadCount();
  
    // Optional analytics
    await setDoc(doc(db, "downloads", `${Date.now()}_${template.id}_free`), {
      templateId: template.id,
      templateName: template.title,
      downloadUrl: freeVersion.downloadUrl,
      downloadDate: serverTimestamp(),
      isFree: true,
      userId: user?.uid || null,
      version: "free"
    });
  
    const link = document.createElement("a");
    link.href = freeVersion.downloadUrl;
    link.download = `${template.title}-free.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  if (!template)
    return <div className="p-20 text-center text-white">Loading...</div>;

    const galleryImages = [
      template.thumbnail,
      ...(Array.isArray(template.images) ? template.images : [])
    ].filter(Boolean);
    
    const hasFree = template.versions.free?.available;
    const hasPro = template.versions.pro?.available;
    const hasFigma = template.versions.figma?.available;
    const hasBundle = template.versions.bundle?.available;
    
    const proPrice = template.versions.pro?.priceUSD || 0;
    const figmaPrice = template.versions.figma?.priceUSD || 0;
    const bundlePrice = template.versions.bundle?.priceUSD || 0; 
  return (
    <div className="bg-[#0b0b0b] text-white min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-14">

        {/* ================= LEFT – GALLERY ================= */}
        <div className="lg:col-span-2 space-y-5">

          {/* BIG IMAGE */}
          <div className="rounded-3xl overflow-hidden shadow-2xl relative group">
            <img
              src={galleryImages[currentImg]}
              alt={template.title}
              className="w-full h-[300px]
              rounded-3xl
              shadow-2xl
              sm:h-[380px]
              md:h-[450px]
              lg:h-[520px] object-contain transition-all duration-300"
            />

            {/* ARROWS */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImg((prev) =>
                      prev === 0 ? galleryImages.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  ‹
                </button>

                <button
                  onClick={() =>
                    setCurrentImg((prev) =>
                      prev === galleryImages.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 overflow-x-auto mt-4">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setCurrentImg(i)}
                alt="preview"
                className={`w-28 h-20 rounded-xl cursor-pointer object-cover border-2 transition-all duration-200
                  ${
                    currentImg === i
                      ? "border-primary scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
              />
            ))}
          </div>


          <div className="space-y-6 mt-10">
            <h2 className="text-2xl font-semibold">About this template</h2>
            <p className="text-white/70 leading-relaxed">
              {template.description}
            </p>

            {hasFree && (
              <div className="border rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold">
                  {free.label}
                </h3>

                <p className="text-2xl font-bold">
                  Free
                </p>

                <ul className="space-y-2">
                  {free.features?.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      ✔ {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasPro && (
              <div className="border rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold">
                  {pro.label}
                </h3>

                <p className="text-2xl font-bold">
                  ${pro.price}
                </p>

                <ul className="space-y-2">
                  {pro.features?.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      ✔ {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {Object.entries(versions).map(([key, version]) => {
              if (!version.available) return null;

              return (
                <div key={key} className="border rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold">
                    {version.label}
                  </h3>

                  <p className="text-2xl font-bold">
                    {version.price === 0 ? "Free" : `$${version.price}`}
                  </p>

                  <ul className="space-y-2">
                    {version.features?.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        ✔ {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(versions).map(([key, version]) =>
                version.available && (
                  <div key={key} className="border rounded-xl p-6">
                    <h3 className="font-bold">{version.label}</h3>
                    <p className="text-xl">
                      {version.price === 0 ? "Free" : `$${version.price}`}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {version.features?.map((feature, i) => (
                        <li key={i}>✔ {feature}</li>
                      ))}
                    </ul>

                    <button className="mt-4 w-full bg-black text-white py-2 rounded-lg">
                      {version.price === 0 ? "Download Free" : "Buy Now"}
                    </button>
                  </div>
                )
              )}
            </div>
                      </div>
        </div>

        {/* ================= RIGHT – BUY CARD ================= */}
        <div className="sticky top-24 h-fit mt-12">
          <div className="bg-[#161616] p-8 rounded-3xl shadow-2xl space-y-6 border border-white/10">

            <h1 className="text-2xl font-bold">{template.title}</h1>

            {/* PRICE / FREE LABEL */}
            {hasFree ? (
              <div className="text-2xl font-bold text-green-400">
                Free Template
              </div>
            ) : (
              <div className="text-3xl font-extrabold text-primary">
                {formatNairaFromUSD(template.priceUSD)}
              </div>

              
            )}

            <div className="text-sm text-white/50">
              {template.downloadsCount || 0} total downloads
            </div>

           {/* PRICE / VERSIONS */}
          <div className="space-y-2 mt-4">
            {hasFree && <div className="text-green-400 font-bold">Free</div>}
            {hasFigma && (
              <div className="text-white/80">
                Figma: ${figmaPrice} ({formatNairaFromUSD(figmaPrice)})
              </div>
            )}
            {hasPro && (
              <div className="text-white/80">
                Pro: ${proPrice} ({formatNairaFromUSD(proPrice)})
              </div>
            )}
            {hasBundle && (
              <div className="text-white/80 font-semibold">
                Complete: ${bundlePrice} ({formatNairaFromUSD(bundlePrice)})
              </div>
            )}
          </div>


            {/* ACTION AREA */}
            {hasFree ? (
              <button
                onClick={handleFreeDownload}
                className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-black font-semibold transition"
              >
                Download Free
              </button>
            ) : (
              <PayPalPayment
                amount={template?.priceUSD}
                template={template}
                user={user}
                onSuccess={handlePaymentSuccess}
              />
            )}

            {/* LICENSE */}
            <button
              onClick={() => setShowLicense(true)}
              className="w-full text-sm underline text-white/60 hover:text-white"
            >
              View license
            </button>

            {/* TRUST BADGES */}
            <div className="text-xs text-white/40 pt-4 border-t border-white/10 space-y-2">
              <p>✔ Lifetime access</p>
              <p>✔ Instant download</p>
              <p>✔ Free updates</p>
            </div>
          </div>
      </div>

      </div>

      {/* ================= SIMILAR ================= */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-semibold mb-8">Similar Templates</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {similar.map(t => (
            <TemplateCard
            key={t.id}
            template={t}
            onPreview={() => setPreview(t)}
          />
          ))}
        </div>
      </div>

      {/* ================= LICENSE MODAL ================= */}
      {showLicense && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center">

          <div className="bg-[#161616] rounded-3xl p-10 max-w-xl shadow-2xl space-y-6 border border-white/10">

            <h3 className="text-xl font-semibold">License Terms</h3>

            <ul className="space-y-2 text-white/70 text-sm">
              <li>✔ Personal & client projects allowed</li>
              <li>✔ Modify freely</li>
              <li>❌ Do not resell</li>
              <li>❌ Do not redistribute</li>
            </ul>

            <button
              onClick={() => setShowLicense(false)}
              className="w-full bg-primary text-black py-3 rounded-xl font-semibold"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateDetails;
