import { Link } from "react-router-dom";
import { doc, updateDoc, increment, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../server/firebase";
import { formatNairaFromUSD } from "../../utils/currency";

const TemplateCard = ({ template, user }) => {
  const isFree = template.isFree;

 

  const handleFreeDownload = async (template, user) => {
    if (!template.downloadUrl) return alert("File not available.");

    try {
      // Increment the global downloadsCount
      await updateDoc(doc(db, "templates", template.id), {
        downloadsCount: increment(1),
      });

      // Optional: track the download in the "downloads" collection for analytics
      await setDoc(doc(db, "downloads", `${Date.now()}_${template.id}`), {
        templateId: template.id,
        templateName: template.title,
        downloadUrl: template.downloadUrl,
        downloadDate: serverTimestamp(),
        isFree: true,
        userId: user?.uid || null, // null for guests
      });

      // Trigger the download
      const link = document.createElement("a");
      link.href = template.downloadUrl;
      link.download = `${template.title}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Try again.");
    }
  };


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
        <span
          className={`
            absolute top-3 left-3
            text-[11px] font-semibold tracking-wide uppercase
            px-3 py-1 rounded-full
            shadow-md border

            ${isFree
              ? "bg-green-500 text-black border-green-400/40"
              : "bg-primary text-black border-primary/40"}
          `}
        >
          {isFree ? "Free" : "Premium"}
        </span>


        {/* Tech stack */}
        {template.category && (
          <span className="absolute top-3 right-3 text-xs bg-black/60 px-3 py-1 rounded-full">
            {template.category}
          </span>
        )}
      </div>

      {/* ================= CONTENT ================= */}
<div className="flex flex-col flex-1 px-6 py-6 text-left" style={{ padding: '20px'}}>

  {/* TEXT AREA */}
  <div className="space-y-2">
    <h3 className="text-lg font-semibold line-clamp-1 text-white">
      {template.title}
    </h3>

    <p className="text-white/60 text-sm line-clamp-2 text-left" style={{ width: '100%', marginLeft: '0px' }}>
      {template.description}
    </p>
  </div>

  {/* downloads */}
  {template.downloadsCount > 0 && (
    <p className="text-xs text-white/40 mt-3">
      🔥 {template.downloadsCount || 0} total downloads
    </p>
  )}

      
        {!isFree && (
          <div className="text-md text-white/80 mt-4 mb-2" style={{ alignItems: 'left'}}>
            {formatNairaFromUSD(template.priceUSD)}{" "}
            <span className="text-xs opacity-60">(${template.priceUSD})</span>
          </div>
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
    {isFree ? (
      <button
        onClick={(e) => {
          e.preventDefault(); // stop the parent Link from navigating
          handleFreeDownload(template, user);
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
                (${template.priceUSD})
              </span> Buy Now</span>
      </Link>
      
      )}
  </div>
  
      </div>




    </Link>
  );
};

export default TemplateCard;
