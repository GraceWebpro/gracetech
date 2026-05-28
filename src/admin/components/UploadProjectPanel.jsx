import React, { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";

const UploadProjectPanel = ({ project, mode, onSuccess }) => {
  const isEdit = !!project;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    metrics: "",
    tech: "",
    liveUrl: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [existingThumbnail, setExistingThumbnail] = useState("");

  /* ================= LOAD EDIT DATA ================= */
  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        slug: project.slug || "",
        description: project.description || "",
        category: project.category || "",
        metrics: project.metrics || "",
        tech: Array.isArray(project.technology_stacks)
          ? project.technology_stacks.join(", ")
          : "",
        liveUrl: project.live_url || "",
      });

      setExistingThumbnail(project.image_url || "");
    }
  }, [project]);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= AUTO SLUG ================= */
  useEffect(() => {
    if (!isEdit) {
      const slug = form.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

      setForm((prev) => ({ ...prev, slug }));
    }
  }, [form.title]);

  /* ================= UPLOAD FILE ================= */
  const uploadFile = async (file, path) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("projects")
      .upload(`${path}/${fileName}`, file);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from("projects")
      .getPublicUrl(`${path}/${fileName}`);

    return publicUrl.publicUrl;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      let thumbnailUrl = existingThumbnail;

      // upload thumbnail
      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile, "thumbnails");
      }

      const payload = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        category: form.category,
        metrics: form.metrics,
        image_url: thumbnailUrl,

        technology_stacks: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
        demo_link: form.liveUrl,
      };

      let response;

      if (isEdit) {
        console.log("EDIT PROJECT:", project);
console.log("PROJECT ID:", project?.id);
        response = await supabase
          .from("projects")
          .update(payload)
          .eq("id", project.id);
      } else {
        response = await supabase
          .from("projects")
          .insert([ 
            {
              ...payload,
              created_at: new Date().toISOString(),

            }
          ]);
      }

      if (response.error) {
        throw response.error;
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-white">

      <h2 className="text-xl font-semibold mt-8">
        {isEdit ? "Edit Project" : "Upload Project"}
      </h2>

      {/* BASIC */}
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Project Title"
        className="w-full p-3 rounded-lg bg-white/5"
        />

      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug"
        className="w-full p-3 rounded-lg bg-white/5"
        />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-3 h-24 rounded-lg bg-white/5"
        />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg bg-white/5 text-white"
      >
        <option value="" disabled>
          Choose project category
        </option>

        <option value="UI/UX">UI/UX</option>
        <option value="UI Components">UI Components</option>
        <option value="Full Stack">Full Stack</option>
      </select>

      <input
        name="metrics"
        value={form.metrics}
        onChange={handleChange}
        placeholder="Metrics"
        className="w-full p-3 rounded-lg bg-white/5"
        />

      {/* LINKS */}
      <input
        name="liveUrl"
        value={form.liveUrl}
        onChange={handleChange}
        placeholder="Live URL"
        className="w-full p-3 rounded-lg bg-white/5"
        />

      {/* TECH */}
      <input
        name="tech"
        value={form.tech}
        onChange={handleChange}
        placeholder="React, Tailwind, Firebase"
        className="w-full p-3 rounded-lg bg-white/5"
        />

      {/* THUMBNAIL */}
      <div>
        <p className="text-sm mb-1">Thumbnail</p>
        {existingThumbnail && (
          <img src={existingThumbnail} loading="lazy" alt="" className="w-32 mb-2 rounded" />
        )}
        <input
          type="file"
          accept="image/*"          
          onChange={(e) => setThumbnailFile(e.target.files[0])}
        />
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-white text-black px-4 py-2 rounded-lg w-full"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Project"
          : "Upload Project"}
      </button>
    </div>
  );
};

export default UploadProjectPanel;