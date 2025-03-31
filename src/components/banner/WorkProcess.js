import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdArrowForward, IoMdPlay } from "react-icons/io";
import { FaArrowTrendDown } from "react-icons/fa6";

Modal.setAppElement("#root"); // Required for accessibility

const WorkProcess = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="work-process flex items-center gap-4">
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
        <div className="play-button">
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
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/UA9hOg5rV1I?autoplay=1" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
      </Modal>
    </div>
  );
};

export default WorkProcess;
