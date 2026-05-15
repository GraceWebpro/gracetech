import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./work.css"; // import the CSS file

const HowWeWork = ({ videoId }) => {
  const [open, setOpen] = React.useState(false);

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button className="
          mt-3
          flex items-center gap-2
          text-sm font-medium
          text-purple-400
          hover:text-purple-300
          transition
        " 
        style={{ margin: '-30px 0 20px 0' }}
        onClick={() => setOpen(true)}>
        ▶ How We Work
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="hw-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="hw-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button className="hw-close" onClick={() => setOpen(false)}>
                ✕
              </button>

              {/* Responsive YouTube iframe */}
              <div className="hw-video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                  title="How we work"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HowWeWork;
