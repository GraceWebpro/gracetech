import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import TemplateList from "../components/TemplateList";
import TemplateDrawer from "../components/TemplateDrawer";
import DeleteModal from "../components/DeleteModal";
import SectionHeader from "../components/SectionHeader";
import AdminList from "../components/AdminList";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [mode, setMode] = useState("create"); // create | edit
  const [deleteTarget, setDeleteTarget] = useState(null);

  // 🔥 FETCH DATA
  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setTemplates(data);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div>

      {/* 🔝 TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <SectionHeader title="Templates Manager" />

        <button
          onClick={() => {
            setMode("create");
            setSelectedTemplate(null);
            setDrawerOpen(true);
          }}
          className="bg-white text-black px-4 py-2 rounded-lg mt-10"
        >
          + Upload Template
        </button>
      </div>

      {/* 📋 LIST */}
      <AdminList
        data={templates}
        type="templates"
        onEdit={(t) => {
          setMode("edit");
          setSelectedTemplate(t);
          setDrawerOpen(true);
        }}
        onDelete={(t) => setDeleteTarget(t)}
      />

      {/* 🧾 DRAWER */}
      <TemplateDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        template={selectedTemplate}
        mode={mode}
        refresh={fetchTemplates}
        type="templates"   // ✅ IMPORTANT
      />

      {/* ⚠️ DELETE MODAL */}
      <DeleteModal
        target={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => {
          await supabase.from("templates").delete().eq("id", deleteTarget.id);
          setDeleteTarget(null);
          fetchTemplates();
        }}
      />

    </div>
  );
};

export default Templates;