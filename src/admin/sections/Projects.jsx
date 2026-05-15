import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import TemplateList from "../components/TemplateList";
import TemplateDrawer from "../components/TemplateDrawer";
import DeleteModal from "../components/DeleteModal";
import SectionHeader from "../components/SectionHeader";
import AdminList from "../components/AdminList";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mode, setMode] = useState("create");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // 🔥 FETCH DATA
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProjects(data || []);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>

      {/* 🔝 TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <SectionHeader title="Projects Manager" />

        <button
          onClick={() => {
            setMode("create");
            setSelectedProject(null);
            setDrawerOpen(true);
          }}
          className="bg-white text-black px-4 py-2 rounded-lg mt-10"
        >
          + Add Project
        </button>
      </div>

      <AdminList
        data={projects}
        type="projects"
        onEdit={(p) => {
          setMode("edit");
          setSelectedProject(p);
          setDrawerOpen(true);
        }}
        onDelete={(p) => setDeleteTarget(p)}
      />

      {/* 🧾 DRAWER */}
      <TemplateDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        template={selectedProject}
        mode={mode}
        refresh={fetchProjects}
        type="projects"   // ✅ DIFFERENT
      />

      {/* ⚠️ DELETE MODAL */}
      <DeleteModal
        target={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => {
          await supabase.from("projects").delete().eq("id", deleteTarget.id);
          setDeleteTarget(null);
          fetchProjects();
        }}
      />

    </div>
  );
};

export default Projects;