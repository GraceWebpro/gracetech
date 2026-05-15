import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { motion, AnimatePresence } from "framer-motion";

const UploadTemplatePanel = ({ onClose, onSuccess, template, table = "templates" }) => {
  const isEdit = !!template;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    previewUrl: "",
  });

  const [features, setFeatures] = useState("");
  const [techStacks, setTechStacks] = useState("");
  const [pages, setPages] = useState("");
  const [useCases, setUseCases] = useState("");

  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);

  const [versions, setVersions] = useState({
    free: { available: false, price: 0, file: null, features: "" },
    pro: { available: false, price: 0, file: null, features: "" },
    figma: { available: false, price: 0, file: null, features: "" },
    bundle: { available: false, price: 0, file: null, features: "" },
  });

  /* ================= PREFILL EDIT ================= */
  useEffect(() => {
    if (!template) return;

    setForm({
      title: template.title || "",
      slug: template.slug || "",
      description: template.description || "",
      category: template.category || "",
      previewUrl: template.preview_url || "",
    });

    setFeatures(
      Array.isArray(template.features)
        ? template.features.join(", ")
        : template.features || ""
    );
    
    setTechStacks(
      Array.isArray(template.tech_stacks)
        ? template.tech_stacks.join(", ")
        : template.tech_stacks || ""
    );
    
    setPages(
      Array.isArray(template.pages)
        ? template.pages.join(", ")
        : template.pages || ""
    );
    
    setUseCases(
      Array.isArray(template.use_cases)
        ? template.use_cases.join(", ")
        : template.use_cases || ""
    );

    setVersions({
      free: {
        available: template.versions?.free?.available || false,
        price: template.versions?.free?.price || 0,
        file: null,
        features: Array.isArray(template.versions?.free?.features)
          ? template.versions.free.features.join(", ")
          : "",
      },
    
      pro: {
        available: template.versions?.pro?.available || false,
        price: template.versions?.pro?.price || 0,
        file: null,
        features: Array.isArray(template.versions?.pro?.features)
          ? template.versions.pro.features.join(", ")
          : "",
      },
    
      figma: {
        available: template.versions?.figma?.available || false,
        price: template.versions?.figma?.price || 0,
        file: null,
        features: Array.isArray(template.versions?.figma?.features)
          ? template.versions.figma.features.join(", ")
          : "",
      },
    
      bundle: {
        available: template.versions?.bundle?.available || false,
        price: template.versions?.bundle?.price || 0,
        file: null,
        features: Array.isArray(template.versions?.bundle?.features)
          ? template.versions.bundle.features.join(", ")
          : "",
      },
    });
  }, [template]);

  /* ================= FILE UPLOAD ================= */
  const uploadFile = async (file, folder = "general") => {
    if (!file) return null;
  
    const fileExt = file.name.split(".").pop();
  
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
  
    const filePath = `${folder}/${fileName}`;
  
    console.log("Uploading:", file.name);
  
    const { data, error } = await supabase.storage
      .from("templates")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });
  
    if (error) {
      console.error("UPLOAD ERROR:", error);
      return null;
    }
  
    const { data: publicUrlData } = supabase.storage
      .from("templates")
      .getPublicUrl(filePath);
  
    console.log("Upload success:", file.name);
  
    return publicUrlData.publicUrl;
  };

  /* ================= MULTIPLE FILES ================= */

  const uploadMultiple = async (files, folder) => {
    const results = [];

    for (const file of files) {
      try {
        const url = await uploadFile(file, folder);

        if (url) {
          results.push(url);
        }
      } catch (err) {
        console.error(
          "FILE UPLOAD FAILED:",
          file.name,
          err.message
        );
      }
    }

    return results;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let thumbnailUrl = template?.thumbnail || null;
      if (thumbnail) {
        thumbnailUrl = await uploadFile(thumbnail, "thumbnails");
      }

      let imageUrls = template?.images || [];



      if (images.length > 0) {
        imageUrls = await uploadMultiple(images, "gallery");
      }

      const processedVersions = {};

      for (const key in versions) {
        const current = versions[key];
        if (!current.available) continue;

        const existingVersion = template?.versions?.[key];

        let fileUrl =
        existingVersion?.downloadUrl || null;

        if (current.file) {
          fileUrl = await uploadFile(
            current.file,
            `versions/${key}`
          );
        }

        processedVersions[key] = {
          available: true,
          price: Number(current.price || 0),
          downloadUrl: fileUrl,
          
          // ✅ NEW: per-version content
          features: current.features
          ? current.features.split(",").map((x) => x.trim()).filter(Boolean)
          : [],
        };

      }

     const templateData = {
        title: form.title.trim(),

        slug: form.slug.trim(),

        description: form.description.trim(),

        category: form.category.trim(),

        preview_url: form.previewUrl.trim(),

        thumbnail: thumbnailUrl,

        images: imageUrls,

        // features: features
        //   .split(",")
        //   .map((item) => item.trim())
        //   .filter(Boolean),

        tech_stacks: techStacks
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        pages: pages
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        use_cases: useCases
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        versions: processedVersions,
      };
      console.log("FULL TEMPLATE:", template);
      try {
        if (isEdit) {
          console.log("EDIT TEMPLATE ID:", template.id);
      
          const response = await supabase
            .from("templates")
            .update(templateData)
            .eq("id", template.id)
            .select();
      
          console.log("UPDATE RESPONSE:", response);
      
          if (response.error) {
            throw response.error;
          }
        } else {
          const response = await supabase
            .from("templates")
            .insert([templateData])
            .select();
      
          console.log("INSERT RESPONSE:", response);
      
          if (response.error) {
            throw response.error;
          }
        }
      
        onSuccess();
        onClose();
      
      } catch (err) {
        console.error("DATABASE ERROR:", err);
        alert(err.message);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("FULL ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
     
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 mt-6">
          <h2 className="text-xl font-semibold">
            {isEdit ? "Edit Template" : "Upload Template"}
          </h2>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">

        {/* BASIC */}
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full p-3 rounded-lg bg-white/5"
          />

        <input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) =>
            setForm({ ...form, slug: e.target.value })
          }
          className="w-full p-3 rounded-lg bg-white/5"
          />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full h-24 p-3 rounded-lg bg-white/5"
          />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="w-full p-3 rounded-lg bg-white/5"
          />

      <select
        name="category"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }        
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

        {/* ARRAYS */}
        <input
          placeholder="Features (comma separated)"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/5"
          />

        <input
          placeholder="Pages (comma separated)"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/5"
        />

        <input
          placeholder="Tech stacks"
          value={techStacks}
          onChange={(e) => setTechStacks(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/5"
          />

        <input
          placeholder="Preview Url"
          value={form.previewUrl}
          onChange={(e) =>
            setForm({ ...form, previewUrl: e.target.value })
          }
          className="w-full p-3 rounded-lg bg-white/5"
          />

        {/* FILES */}
        <div className="mt-4">
          <label>Thumbnail</label> <br />
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label>Gallery Images</label><br />
          <input
            type="file"
            multiple
            onChange={(e) => setImages([...e.target.files])}
            className="mt-2"

          />
        </div>

        {/* VERSIONS */}
        <div className="mt-6 space-y-4">
          {Object.keys(versions).map((key) => (
            <div key={key} className="border p-3 rounded">
              <label>
                <input
                  type="checkbox"
                  checked={versions[key].available || false}
                  onChange={(e) =>
                    setVersions({
                      ...versions,
                      [key]: {
                        ...versions[key],
                        available: e.target.checked,
                      },
                    })
                  }
                />
                {" "}
                {key.toUpperCase()}
              </label>

              <input
                placeholder="Price"
                type="number"
                value={versions[key].price || 0}
                onChange={(e) =>
                  setVersions({
                    ...versions,
                    [key]: {
                      ...versions[key],
                      price: e.target.value,
                    },
                  })
                }
                className="w-full p-3 rounded-lg bg-white/5 mt-4"
                />

                <input
                  placeholder="Features (comma separated)"
                  value={versions[key].features || ""}
                  onChange={(e) =>
                    setVersions({
                      ...versions,
                      [key]: {
                        ...versions[key],
                        features: e.target.value,
                      },
                    })
                  }
                  className="w-full p-3 rounded-lg bg-white/5 mt-5"
                />

              <input
                type="file"
                onChange={(e) =>
                  setVersions({
                    ...versions,
                    [key]: {
                      ...versions[key],
                      file: e.target.files[0],
                    },
                  })
                }
                className="mt-5"

              />
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <button
          className="mt-6 w-full bg-white text-black py-3 rounded-xl"
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Template"
            : "Upload Template"}
        </button>
        </form>
    </AnimatePresence>
  );
};

export default UploadTemplatePanel;