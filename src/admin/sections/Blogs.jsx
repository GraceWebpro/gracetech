import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import AdminList from "../components/AdminList";
import TemplateDrawer from "../components/TemplateDrawer";
import DeleteModal from "../components/DeleteModal";
import SectionHeader from "../components/SectionHeader";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [mode, setMode] = useState("create");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // 🔥 FETCH BLOGS
  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setBlogs(data || []);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>

      {/* 🔝 TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <SectionHeader title="Blog Manager" />

        <button
          onClick={() => {
            setMode("create");
            setSelectedBlog(null);
            setDrawerOpen(true);
          }}
          className="bg-white text-black px-4 py-2 rounded-lg mt-10"
        >
          + Add Blog
        </button>
      </div>

      {/* 📋 BLOG LIST */}
      <AdminList
        data={blogs}
        type="blogs"
        onEdit={(b) => {
          setMode("edit");
          setSelectedBlog(b);
          setDrawerOpen(true);
        }}
        onDelete={(b) => setDeleteTarget(b)}
      />

      {/* 🧾 BLOG DRAWER (REUSING YOUR TEMPLATE DRAWER LOGIC) */}
      <TemplateDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        template={selectedBlog}
        mode={mode}
        refresh={fetchBlogs}
        type="blogs"
      />

      {/* ⚠️ DELETE MODAL */}
      <DeleteModal
        target={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => {
          await supabase
            .from("blogs")
            .delete()
            .eq("id", deleteTarget.id);

          setDeleteTarget(null);
          fetchBlogs();
        }}
      />

    </div>
  );
};

export default BlogManager;
