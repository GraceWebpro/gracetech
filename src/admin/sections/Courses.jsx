import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import TemplateList from "../components/TemplateList";
import TemplateDrawer from "../components/TemplateDrawer";
import DeleteModal from "../components/DeleteModal";
import SectionHeader from "../components/SectionHeader";
import AdminList from "../components/AdminList";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mode, setMode] = useState("create");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // 🔥 FETCH DATA
  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setCourses(data || []);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>

      {/* 🔝 TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <SectionHeader title="Courses Manager" />

        <button
          onClick={() => {
            setMode("create");
            setSelectedCourse(null);
            setDrawerOpen(true);
          }}
          className="bg-white text-black px-4 py-2 rounded-lg mt-10"
        >
          + Add Course
        </button>
      </div>

      {/* 📋 LIST */}
      <AdminList
        data={courses}
        type="courses"
        onEdit={(c) => {
          setMode("edit");
          setSelectedCourse(c);
          setDrawerOpen(true);
        }}
        onDelete={(c) => setDeleteTarget(c)}
      />

      {/* 🧾 DRAWER */}
      <TemplateDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        template={selectedCourse}
        mode={mode}
        refresh={fetchCourses}
        type="courses"   // ✅ DIFFERENT
      />

      {/* ⚠️ DELETE MODAL */}
      <DeleteModal
        target={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => {
          await supabase.from("courses").delete().eq("id", deleteTarget.id);
          setDeleteTarget(null);
          fetchCourses();
        }}
      />

    </div>
  );
};

export default Courses;