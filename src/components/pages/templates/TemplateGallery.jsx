import { useState } from "react";

const TemplateGallery = ({ images = [] }) => {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  return (
    <div className="space-y-4">

      {/* Main */}
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
        <img
          src={images[active]}
          className="w-full h-[420px] object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setActive(i)}
            className={`w-20 h-16 rounded-lg cursor-pointer border ${
              active === i
                ? "border-primary"
                : "border-white/10 opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
