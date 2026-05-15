import React from "react";
import { Edit, Trash2 } from "lucide-react";

const AdminList = ({ data = [], type, onEdit, onDelete }) => {
  const labels = {
    templates: "template",
    projects: "project",
    courses: "course",
  };

  // EMPTY STATE
  if (!data || data.length === 0) {
    const actions = {
      templates: "Upload Template",
      projects: "Add Project",
      courses: "Add Course",
    };

    return (
      <div className="text-center py-20 border border-white/10 rounded-xl bg-white/[0.02]">
        <p className="text-white/70 text-lg mb-2">
          No {labels[type] || "item"} yet
        </p>

        <p className="text-white/40 text-sm">
          Click "{actions[type] || "Add New"}" to create your first{" "}
          {labels[type] || "item"}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="capitalize mb-4 text-xl">
        {labels[type] || "item"}s List
      </h3>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={item.id || index}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              {/* IMAGE */}
              <img
                src={
                  item.thumbnail ||
                  item.image_url ||
                  "https://via.placeholder.com/80"
                }
                alt=""
                className="w-16 h-12 object-contain rounded-lg"
              />

              {/* TEXT */}
              <div>
                <p className="font-medium">
                  {item.title || item.name}
                </p>

                <p className="text-white/50 text-sm">
                  {item.category || item.level || "template"}
                </p>
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                <Edit size={18} />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                <Trash2 size={18} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminList;