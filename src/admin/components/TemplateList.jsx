const TemplateList = ({ templates, onEdit, onDelete }) => {

    
    // ✅ EMPTY STATE
    if (!templates || templates.length === 0) {
        return (
        <div className="text-center py-20 border border-white/10 rounded-xl bg-white/[0.02]">

            <p className="text-white/70 text-lg mb-2">
            No templates yet
            </p>

            <p className="text-white/40 text-sm">
            Click “Upload Template” to add your first template
            </p>

        </div>
        );
    }
    
    return (

      <div className="">
        <h3>Templates List</h3>
      <div className="space-y-3">

  
        {templates.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl"
          >
            <div>
              <p className="font-medium">{t.title}</p>
              <p className="text-white/50 text-sm">{t.category}</p>
            </div>
  
            <div className="flex gap-3">
              <button
                onClick={() => onEdit(t)}
                className="text-blue-400"
              >
                Edit
              </button>
  
              <button
                onClick={() => onDelete(t)}
                className="text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
  
      </div>
      </div>
    );
  };
  
  export default TemplateList;