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
import { backendUpsellConfig } from "../../../../config/backendUpsell";
import BackendRequestModal from "../../ui/BackendRequestModal";

const TemplateDetails = () => {
  const { slug } = useParams();

  const [template, setTemplate] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [showLicense, setShowLicense] = useState(false);
  const [preview, setPreview] = useState(null);
  const { currentUser: user, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);
  
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

    const ext = version.downloadUrl.endsWith(".fig") ? ".fig" : ".zip";
  
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

    const ext = freeVersion.downloadUrl.endsWith(".fig") ? ".fig" : ".zip";
  
    const link = document.createElement("a");
    link.href = freeVersion.downloadUrl;
    link.download = `${template.title}-free.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
 
  
  if (!template)
    return <div className="p-20 text-center text-white">Loading...</div>;

    const tech = template?.techStack; // or category if you prefer
  
  const backendInfo = backendUpsellConfig?.[tech];

  const versions = template.versions || {};

  const free = versions.free || {};
  const pro = versions.pro || {};
  const figma = versions.figma || {};
  const bundle = versions.bundle || {};

    const galleryImages = [
      template.thumbnail,
      ...(Array.isArray(template.images) ? template.images : [])
    ].filter(Boolean);
    
    const hasFree = template.versions.free?.available;
    const hasPro = template.versions.pro?.available;
    const hasFigma = template.versions.figma?.available;
    const hasBundle = template.versions.bundle?.available;
    
  
    const proPrice = Number(template?.versions?.pro?.price) || 0;
const figmaPrice = Number(template?.versions?.figma?.price) || 0;
const bundlePrice = Number(template?.bundle?.price) || 0;

    const parseFeatures = (features) => {
      if (!features) return [];
      if (Array.isArray(features)) return features;
    
      return features.split(",").map((f) => f.trim());
    };

    const displayPrice =
      selectedPrice > 0
        ? selectedPrice
        : hasBundle
        ? bundlePrice
        : hasPro
        ? proPrice
        : hasFigma
        ? figmaPrice
        : 0;

    const handleSelectVersion = (key) => {
      const version = versions[key];
    
      if (!version) return;
    
      setSelectedVersion(key);
      setSelectedPrice(Number(version.price || 0));
    };
    
    const whatsappLink = `https://wa.me/2347043421913?text=${encodeURIComponent(
      `Hi, I want to buy ${template?.title} - ${selectedVersion?.toUpperCase()} version for $${selectedPrice}`
    )}`;

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
              rounded-xl
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
            <h2 className="text-2xl text-white font-semibold">About this template</h2>
            <p className="text-white/70 leading-relaxed">
              {template.description}
            </p>

            {template.features && (
              <div>
                <h3 className="text-xl font-semibold mt-8">Key Features</h3>
                <ul className="mt-4 space-y-2 text-white/70">
                  {template.features.split(",").map((f, i) => (
                    <li key={i}>✔ {f.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

            {template.useCases && (
              <div>
                <h3 className="text-xl font-semibold mt-8">Use Cases</h3>
                <ul className="mt-4 space-y-2 text-white/70">
                  {template.useCases.split(",").map((u, i) => (
                    <li key={i}>• {u.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

            {template.technologies && (
              <div>
                <h3 className="text-xl font-semibold mt-8">Technologies Used</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {template.technologies.split(",").map((t, i) => (
                    <span key={i} className="bg-white/10 px-3 py-1 rounded-lg text-sm">
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {template.pages && (
              <div>
                <h3 className="text-xl font-semibold mt-8">Pages Included</h3>
                <ul className="mt-4 space-y-2 text-white/70">
                  {template.pages.split(",").map((p, i) => (
                    <li key={i}>✔ {p.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

<div
  key={key}
  onClick={() => handleSelectVersion(key)}
  className={`
    relative cursor-pointer rounded-2xl p-6 space-y-4 transition-all duration-300

    border
    ${
      selectedVersion === key
        ? "border-primary bg-white/[0.03] scale-[1.03] shadow-[0_0_30px_rgba(125,82,253,0.25)]"
        : "border-white/10 hover:border-white/30"
    }
  `}
>             {Object.entries(versions).map(([key, version]) => {
                if (!version?.available) return null;

                const features = Array.isArray(version.features)
                  ? version.features
                  : version.features?.split(",") || [];

                return (
                  <div
                    key={key}
                    className="border border-white/10 bg-[#161616] rounded-2xl p-6 space-y-4"
                  >
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white">
                      {version.label || key}
                    </h3>

                    {/* Price */}
                    <p className="text-2xl font-bold text-primary">
                      {version.price === 0
                        ? "Free"
                        : `$${Number(version.price || 0)}`}
                    </p>

                    {/* Badge (optional) */}
                    {key === "pro" && (
                      <span className="inline-block bg-primary text-black text-xs px-2 py-1 rounded">
                        Most Popular
                      </span>
                    )}

                    {/* Features */}
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="text-sm text-white/70">
                          ✔ {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Button */}
                    <button
                      onClick={() => {
                        if (version.price === 0) {
                          handleFreeDownload();
                        } else {
                          handleSelectVersion(key);
                        }
                      }}
                      className="mt-4 w-full bg-white text-black py-2 rounded-lg font-medium hover:opacity-90 transition"
                    >
                      {version.price === 0 ? "Download Free" : "Buy Now"}
                    </button>
                  </div>
                );
              })}
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
                {displayPrice === 0
                  ? "Free"
                  : formatNairaFromUSD(displayPrice)}
              </div>

              
            )}

            <div className="text-sm text-white/50">
              {template.downloadsCount || 0} total downloads
            </div>

         


            {/* ACTION AREA */}
           {/* ACTION AREA */}
            {hasFree ? (
              <button
                onClick={handleFreeDownload}
                className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-black font-semibold transition"
              >
                Download Free
              </button>
            ) : (
              <div className="space-y-3">

              {/* 💳 CARD BUTTON */}
              {!hasFree && !selectedVersion && (
                <p className="text-sm text-yellow-400">
                  Please select a version to continue
                </p>
              )}

              {selectedVersion && selectedPrice > 0 && (
                <div className="gap-3">
                {/* 💬 WHATSAPP BUTTON */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-xl border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition"
                >
                  Pay via WhatsApp
                </a>
                
                {!showPayment && (
                  <button
                    onClick={() => setShowPayment(true)}
                    className="w-full py-3 rounded-xl mt-5 bg-primary text-white font-semibold hover:opacity-90 transition"
                  >
                    Pay with Card
                  </button>
                )}
                

                {/* 💳 PAYMENT COMPONENT (ONLY AFTER CLICK) */}
                {showPayment && (
                  <PayPalPayment
                    amount={
                      hasBundle
                        ? bundlePrice
                        : hasPro
                        ? proPrice
                        : hasFigma
                        ? figmaPrice
                        : 0
                    }
                    template={template}
                    user={user}
                    onSuccess={handlePaymentSuccess}
                  />
                )}
                </div>
              )}

                

              </div>
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
        <h2 className="text-2xl text-white font-semibold mb-8">Similar Templates</h2>

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
