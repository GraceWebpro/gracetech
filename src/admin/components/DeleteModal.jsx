const DeleteModal = ({ target, onClose, onConfirm }) => {
    if (!target) return null;
  
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
  
        <div className="bg-[#111] p-6 rounded-xl">
          <p>Are you sure you want to delete "{target.title}"?</p>
  
          <div className="flex gap-3 mt-4">
            <button onClick={onClose}>Cancel</button>
  
            <button
              onClick={onConfirm}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
  
      </div>
    );
  };
  
  export default DeleteModal;