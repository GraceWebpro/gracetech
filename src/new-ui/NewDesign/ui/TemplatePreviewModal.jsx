const TemplatePreviewModal = ({ template, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
  
        <div className="bg-[#111] rounded-xl p-6 max-w-3xl w-full">
  
          <img
            src={template.image}
            className="rounded-lg mb-4"
          />
  
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-black rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default TemplatePreviewModal;
  