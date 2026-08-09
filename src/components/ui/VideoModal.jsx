// VideoModal.jsx
import { createPortal } from "react-dom";

const VideoModal = ({ video, title, onClose }) => {
  if (!video) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl"
      >
        ✕
      </button>

      {/* VIDEO */}
      <div className="w-[90%] max-w-5xl">
        <iframe
          src={video}
          title={title}
          className="w-full aspect-video rounded-lg"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>,

    document.body // 🔥 THIS IS THE MAGIC
  );
};

export default VideoModal;