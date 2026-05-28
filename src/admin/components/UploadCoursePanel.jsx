import React, { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";

const UploadCoursePanel = ({ course, mode, onSuccess }) => {
  const isEdit = !!course;
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    price: "",
    isFree: false,
    level: "",
    duration: "",
    instructor: "",
  });

  const [modules, setModules] = useState([{ title: "", lessons: "" }]);

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [existingVideo, setExistingVideo] = useState("");

  /* ================= LOAD EDIT ================= */
  useEffect(() => {
    if (course) {
      setForm({
        title: course.title || "",
        slug: course.slug || "",
        description: course.description || "",
        category: course.category || "",
        price: course.price || "",
        isFree: course.is_free || false,
        level: course.level || "",
        duration: course.duration || "",
        instructor: course.instructor || "",
      });

      setModules(course.modules || []);
      setExistingThumbnail(course.thumbnail || "");
      setExistingVideo(course.preview_video || "");
    }
  }, [course]);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
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

  /* ================= MODULES ================= */
  const addModule = () => {
    setModules([...modules, { title: "", lessons: "" }]);
  };

  const updateModule = (index, key, value) => {
    const updated = [...modules];
    updated[index][key] = value;
    setModules(updated);
  };

  const removeModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  /* ================= FILE UPLOAD ================= */
  const uploadFile = async (file, folder) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("courses")
      .upload(`${folder}/${fileName}`, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("courses")
      .getPublicUrl(`${folder}/${fileName}`);

    return data.publicUrl;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      let thumbnailUrl = existingThumbnail;
      let videoUrl = existingVideo;

      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile, "thumbnails");
      }

      if (videoFile) {
        videoUrl = await uploadFile(videoFile, "videos");
      }

      const payload = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        category: form.category,
        thumbnail: thumbnailUrl,
        preview_video: videoUrl,
        price: form.isFree ? 0 : Number(form.price),
        is_free: form.isFree,
        level: form.level,
        duration: form.duration,
        instructor: form.instructor,
        modules: modules,
        created_at: new Date().toISOString(),
      };

      if (isEdit) {
        await supabase
          .from("courses")
          .update(payload)
          .eq("id", course.id);
      } else {
        await supabase.from("courses").insert([payload]);
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-white">

      <h2 className="text-xl font-semibold mt-8">
        {isEdit ? "Edit Course" : "Upload Course"}
      </h2>

      {/* BASIC */}
      <input 
        name="title" 
        value={form.title} 
        onChange={handleChange} 
        placeholder="Course Title"           
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

      <input 
        name="category" 
        value={form.category} 
        onChange={handleChange} 
        placeholder="Category" 
        className="w-full p-3 rounded-lg bg-white/5"
      />

      {/* META */}
      <input 
        name="instructor" 
        value={form.instructor} 
        onChange={handleChange} 
        placeholder="Instructor" 
        className="w-full p-3 rounded-lg bg-white/5"
      />

      <input 
        name="level" 
        value={form.level} 
        onChange={handleChange} 
        placeholder="Beginner / Intermediate" 
        className="w-full p-3 rounded-lg bg-white/5"
      />

      <input 
        name="duration" 
        value={form.duration} 
        onChange={handleChange} 
        placeholder="e.g. 6 hours" 
        className="w-full p-3 rounded-lg bg-white/5"
      />

      {/* PRICE */}
      <div className="flex items-center gap-3">
        <input 
          type="checkbox" 
          name="isFree" 
          checked={form.isFree} onChange={handleChange} 
        />
        <span>Free Course</span>
      </div>

      {!form.isFree && (
        <input 
          name="price" 
          value={form.price} 
          onChange={handleChange} 
          placeholder="Price (USD)" 
          className="w-full p-3 rounded-lg bg-white/5"
        />
      )}

      {/* THUMBNAIL */}
      <div>
        <p>Thumbnail</p>
        {existingThumbnail && <img src={existingThumbnail} loading="lazy" className="w-32 rounded mb-2" />}
        <input 
          type="file" 
          onChange={(e) => setThumbnailFile(e.target.files[0])} 
        />
      </div>

      {/* VIDEO */}
      <div>
        <p>Preview Video</p>
        {existingVideo && <video src={existingVideo} controls className="w-40 mb-2" />}
        <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} />
      </div>

      {/* MODULES */}
      <div>
        <h3 className="text-lg">Course Modules</h3>

        {modules.map((mod, i) => (
          <div key={i} className="border p-3 rounded mb-3">
            <input
              value={mod.title}
              onChange={(e) => updateModule(i, "title", e.target.value)}
              placeholder="Module title"
              className="w-full p-3 rounded-lg bg-white/5"
            />

            <input
              value={mod.lessons}
              onChange={(e) => updateModule(i, "lessons", e.target.value)}
              placeholder="Lessons (comma separated)"
              className="w-full p-3 rounded-lg bg-white/5"
            />

            <button onClick={() => removeModule(i)} className="text-red-400 text-sm mt-2">
              Remove
            </button>
          </div>
        ))}

        <button onClick={addModule} className="text-sm underline">
          + Add Module
        </button>
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-white text-black px-4 py-2 rounded-lg w-full"
      >
        {loading ? "Saving..." : isEdit ? "Update Course" : "Upload Course"}
      </button>
    </div>
  );
};

export default UploadCoursePanel;