import React, { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import BlogEditor from "../components/BlogEditor";
import { compressImage } from "../../components/utils/compressImage";

const UploadBlogPanel = ({ blog, mode, onSuccess }) => {
  const isEdit = !!blog;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [featuredImageFile, setFeaturedImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  /* ================= LOAD EDIT DATA ================= */
  useEffect(() => {
    if (blog) {
      setForm({
        title: blog.title || "",
        slug: blog.slug || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        tags: Array.isArray(blog.tags)
          ? blog.tags.join(", ")
          : "",
        metaTitle: blog.meta_title || "",
        metaDescription: blog.meta_description || "",
      });

      setExistingImage(blog.featured_image || "");
    }
  }, [blog]);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const compressed = await compressImage(file);
    setFeaturedImageFile(compressed);
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

  /* ================= QUILL TOOLBAR ================= */
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
     
    ],
  };

  /* ================= UPLOAD IMAGE ================= */
  const uploadFile = async (file, path) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(`${path}/${fileName}`, file);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from("blog-images")
      .getPublicUrl(`${path}/${fileName}`);

    return publicUrl.publicUrl;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      let imageUrl = existingImage;

      // upload featured image
      if (featuredImageFile) {
        imageUrl = await uploadFile(featuredImageFile, "featured");
      }

      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        featured_image: imageUrl,

        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),

        meta_title: form.metaTitle,
        meta_description: form.metaDescription,
      };

      let response;

      if (isEdit) {
        response = await supabase
          .from("blogs")
          .update(payload)
          .eq("id", blog.id);
      } else {
        response = await supabase
          .from("blogs")
          .insert([
            {
              ...payload,
              created_at: new Date().toISOString(),
            },
          ]);
      }

      if (response.error) {
        throw response.error;
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-white">

      <h2 className="text-xl font-semibold mt-8">
        {isEdit ? "Edit Blog" : "Upload Blog"}
      </h2>

      {/* TITLE */}
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Blog Title"
        className="w-full p-3 rounded-lg bg-white/5"
      />

      {/* SLUG */}
      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug"
        className="w-full p-3 rounded-lg bg-white/5"
      />

      {/* EXCERPT */}
      <textarea
        name="excerpt"
        value={form.excerpt}
        onChange={handleChange}
        placeholder="Short description / excerpt"
        className="w-full p-3 h-24 rounded-lg bg-white/5"
      />

      {/* FEATURED IMAGE */}
      <div>
        <p className="text-sm mb-1">Featured Image</p>

        {existingImage && (
          <img
            src={existingImage}
            alt=""
            className="w-40 mb-2 rounded"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {/* CONTENT (QUILL) */}
      <div className="bg-white text-black rounded-lg overflow-hidden">
        <BlogEditor
            value={form.content}
            onChange={(value) =>
                setForm({ ...form, content: value })
            }
        />
      </div>

      {/* TAGS */}
      <input
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="react, ui design, seo"
        className="w-full p-3 rounded-lg bg-white/5"
      />

      {/* SEO FIELDS */}
      <input
        name="metaTitle"
        value={form.metaTitle}
        onChange={handleChange}
        placeholder="Meta Title"
        className="w-full p-3 rounded-lg bg-white/5"
      />

      <textarea
        name="metaDescription"
        value={form.metaDescription}
        onChange={handleChange}
        placeholder="Meta Description"
        className="w-full p-3 h-24 rounded-lg bg-white/5"
      />

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-white text-black px-4 py-2 rounded-lg w-full"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Blog"
          : "Publish Blog"}
      </button>

    </div>
  );
};

export default UploadBlogPanel;

