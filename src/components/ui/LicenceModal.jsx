const LicenseModal = ({ open, setOpen, license }) => {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
  
        <div className="bg-[#0f0f14] border border-white/10 rounded-2xl p-8 max-w-lg w-full">
  
          <h3 className="text-lg font-semibold mb-4">License</h3>
  
          <p className="text-white/60 text-sm whitespace-pre-line">
            {license}
          </p>
  
          <button
            onClick={() => setOpen(false)}
            className="mt-6 w-full bg-white/10 py-2 rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default LicenseModal;
  