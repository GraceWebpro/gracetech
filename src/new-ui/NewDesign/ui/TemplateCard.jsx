import { Link } from "react-router-dom";
import { doc, updateDoc, increment, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../server/firebase";
import { formatNairaFromUSD } from "../../utils/currency";

const TemplateCard = ({ template, user }) => {
  const versions = template.versions || {};

  const hasFree = versions.free?.available;
  const hasPro = versions.pro?.available;
  const hasFigma = versions.figma?.available;
  const hasBundle = versions.bundle?.available;
 
  const proPrice = versions.pro?.priceUSD || 0;
  const figmaPrice = versions.figma?.priceUSD || 0;
  const bundlePrice = versions.bundle?.priceUSD || 0;

  const handleFreeDownload = async (type) => {
    const version = versions[type];
    if (!version?.downloadUrl) return alert("File not available.");
  
    try {
      await updateDoc(doc(db, "templates", template.id), {
        downloadsCount: increment(1),
      });
  
      await setDoc(doc(db, "downloads", `${Date.now()}_${template.id}`), {
        templateId: template.id,
        templateName: template.title,
        downloadUrl: version.downloadUrl,
        version: type,
        downloadDate: serverTimestamp(),
        userId: user?.uid || null,
      });
  
      const link = document.createElement("a");
      link.href = version.downloadUrl;
      const ext = type === "figma" ? ".fig" : ".zip";
      link.download = `${template.title}_${type}${ext}`;      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Try again.");
    }
  };

  const prices = [
    hasPro ? proPrice : null,
    hasFigma ? figmaPrice : null,
    hasBundle ? bundlePrice : null,
  ].filter(Boolean);
  
  const startingPrice = prices.length ? Math.min(...prices) : null;


  return (
    <Link
      to={`/templates/${template.slug}`}
      className="
        group
        bg-white/5
        border border-white/10
        rounded-2xl
        overflow-hidden
        hover:border-primary/40
        hover:bg-white/10
        transition
        flex flex-col
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={template.thumbnail}
          alt={template.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Price / Free badge */}
        {/* <span
          className={`
            absolute top-3 left-3
            text-[11px] font-semibold tracking-wide uppercase
            px-3 py-1 rounded-full
            shadow-md border

            ${hasFree
              ? "bg-green-500 text-black border-green-400/40"
              : "bg-primary text-black border-primary/40"}
          `}
        >
        {hasFree ? "Free" : "Premium" }
        </span> */}
        {/* ================= VERSION BADGES ================= */}
        <div className="absolute top-0 left-3 flex gap-2">
          {hasFree && (
            <span className="bg-green-500 text-black text-[11px] font-semibold tracking-wide uppercase
                    px-3 py-1 rounded-full
                    shadow-md border border-green-400/40">
              Free
            </span>
          )}

          {hasPro && (
            <span className="bg-primary text-black text-[11px] font-semibold tracking-wide uppercase
                    px-3 py-1 rounded-full
                    shadow-md border border-primary/40">
              Premium
            </span>
          )}

          {hasBundle && (
            <span className="bg-purple-500 text-black text-[11px] font-semibold px-2 py-1 rounded-full shadow-md border border-purple-400/40">
              Complete
            </span>
          )}
        </div>
        
        
        


        {/* Tech stack */}
        {template.category && (
          <span className="absolute top-3 right-3 text-xs bg-black/60 px-3 py-1 rounded-full">
            {template.category}
          </span>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-col flex-1 px-6 py-6 text-left align-left" style={{ padding: '20px'}}>

        {/* TEXT AREA */}
        <div className="space-y-2">

          {/* Title */}
          <h3 className="text-lg font-semibold line-clamp-1 text-white">
            {template.title}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-sm line-clamp-2 text-left" style={{ width: '100%', marginLeft: '0px' }}>
            {template.description}
          </p>
        </div>

        {startingPrice && (
          <span className="text-xs opacity-60">
            From ${startingPrice}
          </span>
        )}

        {/* downloads count */}
        {template.downloadsCount > 0 && (
          <p className="text-xs text-white/60 mt-3 text-left">
            🔥 {template.downloadsCount || 0} total downloads
          </p>
        )}

         {/* Versions  */}
          <div className="flex flex-wrap gap-2 mt-3">
            {hasFigma && (
              <span className="chip">Figma — ${figmaPrice}</span>
            )}
            {hasPro && (
              <span className="chip">Pro — ${proPrice}</span>
            )}
            {hasBundle && (
              <span className="chip font-semibold">Complete — ${bundlePrice}</span>
            )}
          </div>

          {hasFree && hasPro && (
            <span className="text-xs text-white/60">
              Free and premium version available
            </span>
          )}

        {/* spacer pushes buttons to bottom */}
        <div className="flex-1" />

        {/* ================= ACTIONS ================= */}
        <div className="flex gap-3 w-full" style={{ padding: '20px 0'}}           onClick={(e) => e.stopPropagation()}>
          <a
            href={template.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 text-center rounded-lg font-medium bg-white/10 hover:bg-white/20 transition"

          >
            Preview
          </a>

          {/* Download or Buy */}
          {hasFree ? (
            <button
              onClick={(e) => {
                e.preventDefault(); // stop the parent Link from navigating
                handleFreeDownload("free");
              }}
              className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded-xl"
            >
              Download
            </button>
            ) : (
              <Link
              to={`/templates/${template.slug}`}
              className="flex-1 py-2 rounded-lg font-medium bg-primary text-black hover:opacity-90 transition flex flex-col items-center justify-center"
            >
            
              {/* OPTIONAL USD MICRO TEXT */}
              
              <span className="font-semibold"><span className="text-[13px] opacity-60">
                      (${proPrice})
                    </span> Buy Now</span>
            </Link>
            
            )}

            {/* <div className="flex gap-3 w-full mt-4">
              {hasFree && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleFreeDownload("free");
                  }}
                  className="bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded-xl flex-1"
                >
                  Download Free
                </button>
              )}

              {hasPro && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleFreeDownload("pro");
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-xl flex-1"
                >
                  Download Pro (${proPrice})
                </button>
              )}

              {hasFigma && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleFreeDownload("figma");
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-black py-2 px-4 rounded-xl flex-1"
                >
                  Download Figma (${figmaPrice})
                </button>
              )}

              {hasBundle && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // loop all bundle versions
                    Object.keys(versions).forEach(v => {
                      if (versions[v]?.available && v !== "free") handleFreeDownload(v);
                    });
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-black py-2 px-4 rounded-xl flex-1"
                >
                  Download Complete (${bundlePrice})
                </button>
              )}
            </div> */}
        </div>
        
            </div>




    </Link>
  );
};

export default TemplateCard;
