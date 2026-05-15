import { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";

const TemplateForm = ({ template, onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (template) setForm(template);
  }, [template]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (template) {
      // EDIT
      await supabase
        .from("templates")
        .update(form)
        .eq("id", template.id);
    } else {
      // CREATE
      await supabase.from("templates").insert([form]);
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/5"
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/5"
      />

      <input
        placeholder="Thumbnail URL"
        value={form.thumbnail}
        onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
        className="w-full p-3 rounded-lg bg-white/5"
      />

      <button className="w-full bg-white text-black py-3 rounded-lg">
        Save Template
      </button>

    </form>
  );
};

export default TemplateForm;