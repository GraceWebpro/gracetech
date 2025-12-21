import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdPlay } from "react-icons/io";
import { FaArrowTrendDown } from "react-icons/fa6";
import { motion } from 'framer-motion'


Modal.setAppElement("#root"); // Required for accessibility

const WorkProcess = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      delay: 1.4,
      duration: 0.5,
      type: "spring",
      stiffness: 100,
      damping: 15,
    }}
    className="work-pro flex items-center gap-4" data-aos="fade-up" data-aos-duration="1500">
      {/* Animated Arrow */}
      <div className="arrow-icon">
        <FaArrowTrendDown />
      </div>

      {/* Play Button with Pulsing Animation */}
      <div className="relative flex items-center justify-center" onClick={openModal}>
        {/* Pulsating Border */}
        <div className="pulse"></div>
        <div className="pulse"></div>
        
        {/* Static White Border */}
        <div className="work-play-button">
          <IoMdPlay className="text-white text-2xl cursor-pointer" />
        </div>
      </div>

      {/* Work Process Text */}
      <span className="work-text text-white text-xl font-semibold">
        Work <br /> Process
      </span>

      {/* Video Modal */}
      <Modal 
        isOpen={isOpen} 
        onRequestClose={closeModal} 
        className="video-modal"
        overlayClassName="video-overlay"
      >
        <button className="close-button" onClick={closeModal}>X</button>
        <div className="video-container">
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/js4QJqYyyFs?si=92nRy3ixNwwgMZDg&autoplay=1&mute=1" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
        </div>
      </Modal>
    </motion.div>
  );
};

export default WorkProcess;
