import { Link } from "react-router-dom";
import { supabase } from "../../config/supabase";

const TemplateCard = ({ template, user }) => {
  const versions = template.versions || {};

  const hasFree = versions.free?.available;
  const hasPro = versions.pro?.available;
  const hasFigma = versions.figma?.available;
  const hasBundle = versions.bundle?.available;

  const proPrice = versions.pro?.price ?? null;
  const figmaPrice = versions.figma?.price ?? null;
  const bundlePrice = versions.bundle?.price ?? null;

  // ================= PRICE LOGIC =================
  const prices = [
    hasPro ? proPrice : undefined,
    hasFigma ? figmaPrice : undefined,
    hasBundle ? bundlePrice : undefined,
  ].filter((p) => p !== undefined && p !== null);

  const startingPrice =
    prices.length > 0 ? Math.min(...prices) : null;

  // ================= DOWNLOAD HANDLER =================
  const handleFreeDownload = async (type) => {
    const version = versions[type];

    if (!version?.downloadUrl)
      return alert("File not available.");

    try {
      // 1️⃣ Increment downloads count (manual for Supabase)
      const newCount = (template.downloadsCount || 0) + 1;

      const { error: updateError } = await supabase
        .from("templates")
        .update({ downloads_count: newCount }) // ⚠️ match your column name
        .eq("id", template.id);

      if (updateError) throw updateError;

      // 2️⃣ Save download record
      const { error: insertError } = await supabase
        .from("downloads")
        .insert([
          {
            template_id: template.id,
            template_name: template.title,
            download_url: version.downloadUrl,
            version: type,
            download_date: new Date().toISOString(),
            user_id: user?.id || null, // ⚠️ Supabase uses user.id not uid
          },
        ]);

      if (insertError) throw insertError;

      // 3️⃣ Trigger download
      const link = document.createElement("a");
      link.href = version.downloadUrl;

      const ext = type === "figma" ? ".fig" : ".zip";
      link.download = `${template.title}_${type}${ext}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error("Download failed:", err.message);
      alert("Download failed.");
    }
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 hover:border-primary/40 hover:bg-white/10 transition overflow-hidden">

      <Link to={`/templates/${template.slug}`}>

        {/* IMAGE */}
        <div className="relative aspect-[16/10] overflow-hidden">

          <img
            src={template.thumbnail}
            alt={template.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />

          <div className="absolute top-3 left-3 flex gap-2">
            {hasFree && (
              <span className="bg-green-500 text-black text-[11px] font-semibold px-3 py-1 rounded-full shadow-md">
                Free
              </span>
            )}

            {hasPro && (
              <span className="bg-primary text-black text-[11px] font-semibold px-3 py-1 rounded-full shadow-md">
                Premium
              </span>
            )}

            {hasBundle && (
              <span className="bg-purple-500 text-black text-[11px] font-semibold px-3 py-1 rounded-full shadow-md">
                Complete
              </span>
            )}
          </div>

          {template.category && (
            <span className="absolute top-3 right-3 text-xs bg-black/60 px-3 py-1 rounded-full">
              {template.category}
            </span>
          )}

          {template.downloadsCount > 50 && (
            <span className="absolute bottom-3 left-3 bg-yellow-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
              ⭐ Best Seller
            </span>
          )}

        </div>
      </Link>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 px-6 py-6">

        <h3 className="text-lg font-semibold text-white line-clamp-1">
          {template.title}
        </h3>

        <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
          ⭐⭐⭐⭐⭐
          <span className="text-white/60 text-xs ml-1">(4.9)</span>
        </div>

        <p className="text-white/60 text-sm line-clamp-2 mt-2">
          {template.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-3 text-xs text-white/60">
          <span>⚡ Fast Setup</span>
          <span>📱 Responsive</span>
          <span>🎨 Modern UI</span>
        </div>

        <div className="mt-4">
          {startingPrice !== null ? (
            <span className="text-lg font-bold text-white">
              From ${startingPrice}
            </span>
          ) : hasFree ? (
            <span className="text-lg font-bold text-green-400">
              Free
            </span>
          ) : null}
        </div>

        {template.downloadsCount > 0 && (
          <p className="text-xs text-white/60 mt-2">
            🔥 {template.downloadsCount} downloads
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-3 text-xs">
          {hasFigma && (
            <span className="bg-white/10 px-2 py-1 rounded-full">
              Figma — ${figmaPrice}
            </span>
          )}
          {hasPro && (
            <span className="bg-white/10 px-2 py-1 rounded-full">
              Pro — ${proPrice}
            </span>
          )}
          {hasBundle && (
            <span className="bg-purple-500/20 px-2 py-1 rounded-full font-semibold">
              Complete — ${bundlePrice}
            </span>
          )}
        </div>

        <div className="flex-1" />

        <div
          className="flex gap-3 w-full mt-6"
          onClick={(e) => e.stopPropagation()}
        >
          {hasFree ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleFreeDownload("free");
              }}
              className="flex-1 py-2 rounded-lg font-medium bg-green-500 hover:bg-green-600 text-black transition"
            >
              Download
            </button>
          ) : (
            <Link
              to={`/templates/${template.slug}`}
              className="flex-1 py-2 rounded-lg font-medium bg-primary text-black hover:opacity-90 transition text-center"
            >
              Buy Now
            </Link>
          )}

          <a
            href={template.preview_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 text-center rounded-lg font-medium bg-white/10 hover:bg-white/20 transition"
          >
            Live Demo
          </a>
        </div>

      </div>
    </div>
  );
};

export default TemplateCard;