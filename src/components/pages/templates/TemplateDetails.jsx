import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../config/supabase";
import PayPalPayment from "../../../config/payment/PaypalPayment";
import { useAuth } from "../../../config/AuthProvider";
import TemplateCard from "../../ui/TemplateCard";
import { formatNairaFromUSD } from "../../utils/currency";
// import BackendRequestModal from "../../ui/BackendRequestModal";
import HomeContact from "../../sections/HomeContact";
import BuyButton from "../../ui/BuyButton";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import SEO from "../../seo/SEO";
import { templateFAQSchema, templateSchema } from "../../seo/schema/templateSchema";

const TemplateDetails = () => {
  const { slug } = useParams();

  const [template, setTemplate] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [showLicense, setShowLicense] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  const { currentUser: user } = useAuth();


  // const nairaAmount = selectedPrice * 1600;
  const nairaAmount = Math.round(selectedPrice * 1600);

  const handleFlutterPayment = useFlutterwave({
    public_key: process.env.REACT_APP_FLW_PUBLIC_KEY,    
    tx_ref: Date.now().toString(),
    amount: nairaAmount,
    currency: "NGN",
    payment_options: "card,banktransfer,ussd",
    customer: {
      email: user?.email || "user@gmail.com",
      name: user?.user_metadata?.full_name || "Customer",
    },
    customizations: {
      title: template?.title,
      description: selectedVersion + " version purchase",
    },
  });

    /* ================= FETCH SINGLE TEMPLATE ================= */
    useEffect(() => {
      const fetchTemplate = async () => {
        setLoading(true);

        const { data, error } = await supabase
          .from("templates")
          .select("*")
          .eq("slug", slug)
          .single();
    
        if (error || !data) {
          console.error("Error fetching template:", error);
          setLoading(false);
          return;
        }
    
        const formatted = {
          id: data.id,
          title: data.title,
          slug: data.slug,
          description: data.description,
          category: data.category,
          thumbnail: data.thumbnail,
          images: Array.isArray(data.images) ? data.images : [],
          technologies: Array.isArray(data.tech_stacks)
            ? data.tech_stacks
            : data.tech_stacks?.split(",") || [],
          features: Array.isArray(data.features)
            ? data.features
            : data.features?.split(",") || [],
          useCases: data.use_cases || "",
          pages: data.pages || "",
          versions: data.versions || {},
          downloadsCount: data.downloads_count ?? 0,
          previewUrl: data.preview_url,
        };
    
        setTemplate(formatted);
        setLoading(false);
        console.log({
          amount: nairaAmount,
          selectedPrice,
          key: process.env.REACT_APP_FLW_PUBLIC_KEY, 
        });
      };
    
      fetchTemplate();
    }, [slug]);
  
    /* ================= FETCH SIMILAR ================= */
    useEffect(() => {
      if (!template?.category) return;
  
      const fetchSimilar = async () => {
        const { data } = await supabase
          .from("templates")
          .select("*")
          .eq("category", template.category)
          .limit(3);
  
        if (data) {
          setSimilar(data.filter((t) => t.id !== template.id));
        }
      };
  
      fetchSimilar();
    }, [template]);

/* ================= GUARD ================= */
if (loading || !template) {
  return (
    <div className="p-20 text-white text-center">
      Loading...
    </div>
  );
}

/* ================= SAFE VALUES ================= */
const versions = template?.versions || {};

const galleryImages = [
  template.thumbnail,
  ...(Array.isArray(template.images) ? template.images : [])
].filter(Boolean);

const hasFree = versions.free?.available;
const hasPro = versions.pro?.available;
const hasFigma = versions.figma?.available;
const hasBundle = versions.bundle?.available;

const proPrice = Number(versions.pro?.price) || 0;
const figmaPrice = Number(versions.figma?.price) || 0;
const bundlePrice = Number(versions.bundle?.price) || 0;

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

// const whatsappLink =
//   selectedVersion && template
//     ? `https://wa.me/2347043421913?text=${encodeURIComponent(
//         `Hi, I want to buy ${template.title} - ${selectedVersion.toUpperCase()} version for $${selectedPrice}`
//       )}`
//     : "#";

    const whatsappLink = `https://wa.me/2347043421913?text=${encodeURIComponent(
      `Hi, I want to buy ${template?.title} - ${selectedVersion?.toUpperCase()} version for $${selectedPrice}`
    )}`;
  
    /* ================= FREE DOWNLOAD ================= */
    const handleFreeDownload = async () => {
      const version = template.versions?.free;
      if (!version?.downloadUrl) return;
  
      const newCount = (template.downloadsCount || 0) + 1;
  
      // update count
      await supabase
        .from("templates")
        .update({ downloads_count: newCount })
        .eq("id", template.id);
  
      // save download
      await supabase.from("downloads").insert([
        {
          user_id: user?.id || null,
          template_id: template.id,
          template_name: template.title,
          download_url: version.downloadUrl,
          is_free: true,
          version: "free",
          created_at: new Date().toISOString(),
        },
      ]);
  
      setTemplate((prev) => ({
        ...prev,
        downloadsCount: newCount,
      }));
  
      // trigger download
      const link = document.createElement("a");
      link.href = version.downloadUrl;
      link.download = `${template.title}-free.zip`;
      link.click();
    };
  
    /* ================= PAYMENT SUCCESS ================= */
    const handlePaymentSuccess = async () => {
      const version = template.versions?.[selectedVersion];
      if (!version) return;
  
      const newCount = (template.downloadsCount || 0) + 1;
  
      // update downloads
      await supabase
        .from("templates")
        .update({ downloads_count: newCount })
        .eq("id", template.id);
  
      // save download
      await supabase.from("downloads").insert([
        {
          user_id: user?.id || null,
          template_id: template.id,
          template_name: template.title,
          download_url: version.downloadUrl,
          is_free: false,
          version: selectedVersion,
          created_at: new Date().toISOString(),
        },
      ]);
  
      setTemplate((prev) => ({
        ...prev,
        downloadsCount: newCount,
      }));
  
      // download file
      const link = document.createElement("a");
      link.href = version.downloadUrl;
      link.download = `${template.title}-${selectedVersion}.zip`;
      link.click();
  
      alert("Payment successful!");
    };
  
    /* ================= SELECT VERSION ================= */
    const handleSelectVersion = (key) => {
      const version = template.versions?.[key];
    
      if (!version) return;
    
      const cleanPrice = parseFloat(
        String(version.price).replace(/[^0-9.]/g, "")
      );
    
      console.log("Selected:", key);
      console.log("Raw price:", version.price);
      console.log("Clean price:", cleanPrice);
    
      setSelectedVersion(key);
      setSelectedPrice(cleanPrice);
    };


    const startPaymentFlow = async (email) => {
      setPaymentLoading(true);
    
      try {
        // STEP 1: create pending payment
        const createRes = await fetch("/api/create-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            product_name: template.title,
            amount: nairaAmount,
          }),
        });
    
        const { tx_ref } = await createRes.json();
    
        // STEP 2: open flutterwave
        handleFlutterPayment({
          tx_ref,
          amount: nairaAmount,
          customer: {
            email,
          },
    
          callback: async (response) => {
            setPaymentLoading(false);
    
            if (response.status === "successful") {
              const verifyRes = await fetch("/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  transaction_id: response.transaction_id,
                  tx_ref,
                  expected_amount: nairaAmount,
                  product_name: template.title,
                }),
              });
    
              const verifyData = await verifyRes.json();
    
              if (!verifyData.success) {
                alert("Payment verification failed!");
                return;
              }
              alert("Payment successful! Your download has started.");
              await handlePaymentSuccess();
            }
    
            closePaymentModal();
          },
    
          onClose: () => {
            setPaymentLoading(false);
          },
        });
    
      } catch (err) {
        console.error(err);
        alert("Failed to start payment");
        setPaymentLoading(false);
      }
    };

    
    

    if (loading) {
      return <div className="p-20 text-white text-center">Loading...</div>;
    }
  
    if (!template) {
      return <div className="p-20 text-white text-center">Template not found</div>;
    }   

  return (
    <>
      <SEO
        title={`${template.title} | GraceTechie Templates`}
        description={template.description}
        url={`https://www.gracetechie.com.ng/templates/${template.slug}`}
        image={template.image}
        schema={templateFAQSchema(template)}
      />
    <div className="bg-[#0b0b0b] text-white min-h-screen no-scrollbar">

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-14">

        {/* ================= LEFT – GALLERY ================= */}
        <div className="lg:col-span-2 space-y-5">

          {/* BIG IMAGE */}
          <div className="rounded-3xl overflow-hidden shadow-2xl relative group">
            <img
              src={galleryImages[currentImg]}
              alt={template.title}
              loading="lazy"
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
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                loading="lazy"
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
            <h2 className="text-2xl text-white font-semibold">{template.title}</h2>
            <p className="text-white/70 leading-relaxed">
              {template.description}
            </p>

           
            {template.technologies && (
              <div>
                <h3 className="text-xl font-semibold mt-8">Technologies Used</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                {Array.isArray(template.technologies)
                  ? template.technologies.map((t, i) => (
                      <span key={i} className="bg-white/10 px-3 py-1 rounded-lg text-sm">
                        {t}
                      </span>
                    ))
                  : null}
                </div>
              </div>
            )}

            {Array.isArray(template.pages) &&
              template.pages.filter(Boolean).length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mt-8">
                    Pages Included
                  </h3>

                  <ul className="mt-4 space-y-2 text-white/70">
                    {template.pages
                      .filter((p) => p && p.trim() !== "")
                      .map((p, i) => (
                        <li key={i} className="flex items-center gap-2">
                          ✔ {p}
                        </li>
                      ))}
                  </ul>
                </div>
            )}

            <div className="mt-10 space-y-3">

            <h3 className="text-xl font-semibold">
              What You Get
            </h3>

            <ul className="space-y-2 text-white/70">

              <li>✔ Fully responsive layout</li>
              <li>✔ Clean, modern design</li>
              <li>✔ Easy customization</li>
              <li>✔ Lifetime access</li>
              <li>✔ Free updates</li>

            </ul>

            </div>

            
            <div className="max-w-5xl mx-auto px-6 mt-20">

        <h3 className="text-xl font-semibold mb-6">
          Choose your preferred version
        </h3>

            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              {Object.entries(versions).map(([key, version]) => {                
                if (!version?.available) return null;

                const features = Array.isArray(version.features)
                  ? version.features
                  : version.features?.split(",") || [];

                return (
                  <div
                  key={key}
                  onClick={() => handleSelectVersion(key)}
                  className={`
                    relative cursor-pointer
                    rounded-2xl p-6
                    border
                    transition-all duration-300
                
                    ${
                      selectedVersion === key
                        ? "border-primary bg-white/[0.03] scale-[1.02] shadow-[0_0_25px_rgba(125,82,253,0.25)]"
                        : "border-white/10 hover:border-white/30"
                    }
                  `}
                >
                
                  {/* VERSION LABEL */}
                  <div className="flex items-center justify-between">
                
                    <h3 className="text-lg font-semibold text-white">
                      {version.label || key}
                    </h3>
                
                    {key === "pro" && (
                      <span className="text-xs bg-[#ffa500] text-white px-2 py-1 rounded">
                        Most Popular
                      </span>
                    )}
                
                  </div>
                
                  {/* PRICE */}
                  <p className="text-3xl font-bold text-primary mt-2">
                
                    {version.price === 0
                      ? "Free"
                      : formatNairaFromUSD(version.price)}
                
                  </p>
                
                  {/* FEATURES */}
                  <ul className="mt-4 space-y-2">
                
                  {template.features && (
              <div>
                <h3 className="text-xl font-semibold mt-8">Features</h3>
                <ul className="mt-4 space-y-2 text-white/70">
                {Array.isArray(template.features)
                  ? template.features.map((f, i) => (
                      <li key={i}>✔ {f}</li>
                    ))
                  : null
                }
                </ul>
              </div>
            )}

                
                  </ul>
                
                  {/* CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      version.price === 0
                        ? handleFreeDownload()
                        : handleSelectVersion(key);
                    }}
                    className="mt-6 w-full bg-white text-black py-2 rounded-lg font-medium hover:opacity-90 transition"
                  >
                
                    {version.price === 0
                      ? "Download Free"
                      : "Select Version"}
                
                  </button>
                
                </div>
                );
              })}
            </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT – BUY CARD ================= */}
        <div className="lg:sticky lg:top-24 self-start">
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


              {showEmailModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                  <div className="bg-white w-[90%] max-w-md p-6 rounded-xl">

                    <h2 className="text-lg font-semibold mb-3 text-black">
                      Enter your email to continue
                    </h2>

                    <input
  type="email"
  value={tempEmail}
  onChange={(e) => setTempEmail(e.target.value)}
  placeholder="you@example.com"
  className="w-full p-3 border rounded-lg mb-4 text-black placeholder-gray-500 bg-white"
/>

                    <button
                      onClick={() => {
                        if (!tempEmail.includes("@")) {
                          alert("Enter a valid email");
                          return;
                        }

                        setUserEmail(tempEmail); // store final email
                        setShowEmailModal(false);

                        // 👇 NOW trigger real payment flow
                        startPaymentFlow(tempEmail);
                      }}
                      className="w-full bg-primary text-white py-3 rounded-lg"
                    >
                      Continue to Payment
                    </button>

                  </div>
                </div>
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

                
                {/* {!showPayment && (
               <button
                  onClick={async () => {
                    setPaymentLoading(true);

                    try {
                      // ✅ STEP 1: Create pending payment FIRST
                      const createRes = await fetch("/api/create-payment", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          email: userEmail,
                          product_name: template.title,
                          amount: nairaAmount,
                        }),
                      });
                  
                    const { tx_ref } = await createRes.json();

                    handleFlutterPayment({

                      tx_ref: tx_ref,
                      amount: nairaAmount,
                      customer: {
                        email: userEmail,
                      },

                      callback: async (response) => {
                        console.log(response);

                        setPaymentLoading(false);

                        if (response.status === "successful") {

                          try {
                            // 🔐 CALL YOUR VERCEL API
                            const verifyRes = await fetch("/api/verify-payment", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                transaction_id: response.transaction_id,
                                tx_ref: tx_ref,
                              }),
                            });
                        
                            const verifyData = await verifyRes.json();
                        
                            if (!verifyData.success) {
                              alert("Payment verification failed!");
                              return;
                            }
                        
                            const verified = verifyData.data;
                        
                            // ✅ CHECK AMOUNT (VERY IMPORTANT)
                            if (Number(verified.amount) !== Number(nairaAmount)) {
                              alert("Payment amount mismatch!");
                              return;
                            }
                        
                            // ✅ PREVENT DUPLICATE RECORD
                            const { data: existing } = await supabase
                              .from("payments")
                              .select("id")
                              .eq("transaction_id", verified.id)
                              .single();
                        
                            if (existing) {
                              alert("Payment already processed");
                              return;
                            }
                        
                            // ✅ SAVE PAYMENT (SAFE NOW)
                            await supabase.from("payments").insert([
                              {
                                transaction_id: verified.id,
                                tx_ref: verified.tx_ref,
                                email: verified.customer.email,
                                amount: verified.amount,
                                currency: verified.currency,
                                product_name: template.title,
                                status: verified.status,
                              }
                            ]);
                        
                            // ✅ NOW GIVE DOWNLOAD
                            await handlePaymentSuccess();
                        
                          } catch (err) {
                            console.error(err);
                            alert("Error verifying payment");
                          }
                        
                        }

                        closePaymentModal();
                      },

                      onClose: () => {
                        setPaymentLoading(false);
                        console.log("Payment closed");
                      },
                    });
                  }catch (err) {
    console.error(err);
    alert("Failed to start payment");
    setPaymentLoading(false);
  }
} }
                  disabled={paymentLoading}
                  className="w-full py-3 rounded-xl mt-5 bg-primary text-white font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {paymentLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    "Pay with Card"
                  )}
                </button>
                )} */}

                {!showPayment && (
                  <button onClick={() => {
                    setShowEmailModal(true);
                  }}
                  disabled={paymentLoading}
                  className="w-full py-3 rounded-xl mt-5 bg-primary text-white font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {paymentLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    "Pay with Card"
                  )}
                  </button>
                )}
                

                
                </div>
              )}

                

              </div>
            )}

        <p className="text-xs text-center text-white/80 mt-4">
          Instant delivery after payment
        </p>

            {/* LICENSE */}
            <button
              onClick={() => setShowLicense(true)}
              className="w-full text-sm underline text-white/60 hover:text-white"
            >
              View license
            </button>

            {/* TRUST BADGES */}
            <div className="text-xs text-white/50 pt-4 border-t border-white/10 space-y-2">

              <p>✔ Secure payment</p>
              <p>✔ Instant access after purchase</p>
              <p>✔ Lifetime updates</p>
              <p>✔ No subscription fees</p>

            </div>
          </div>
      </div>

      </div>

      {/* ================= SIMILAR ================= */}
      {similar && similar.length > 0 && (
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
      )}

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

<HomeContact />
    
    </div>
    </>
  );
};

export default TemplateDetails;
