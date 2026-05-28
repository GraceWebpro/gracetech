import { useEffect, useState, useMemo } from "react";
import { supabase } from "../../../config/supabase";

import FadeIn from "../../animations/FadeIn";
import TemplateCard from "../../ui/TemplateCard";
import TemplatePreviewModal from "../../ui/TemplatePreviewModal";
import { Package } from "lucide-react";
import SEO from "../../seo/SEO";
import { orgSchema } from "../../seo/schema/schema";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [pricing, setPricing] = useState("all");
  const [preview, setPreview] = useState(null);

  /* ================= FETCH FROM SUPABASE ================= */
  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching templates:", error);
        setLoading(false);
        return;
      }

      // ✅ Normalize for your UI (VERY IMPORTANT)
      const formatted = data.map((t) => ({
        id: t.id,

        title: t.title,
        slug: t.slug,
        description: t.description,
        category: t.category,

        thumbnail: t.thumbnail,
        images: Array.isArray(t.images) ? t.images : [],

        // 👇 important for your filters
        versions: t.versions || {},

        // optional fields (safe fallback)
        tags: Array.isArray(t.tags) ? t.tags : [],
        technologies: Array.isArray(t.tech_stacks)
          ? t.tech_stacks
          : t.tech_stacks?.split(",") || [],

        createdAt: t.created_at,
      }));

      setTemplates(formatted);
      setLoading(false);
    };

    fetchTemplates();
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchesSearch = t.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" ||
        t.category?.toLowerCase() === category;

      const matchesPricing =
        pricing === "all" ||
        (pricing === "free" && t.versions?.free?.available) ||
        (pricing === "premium" &&
          (t.versions?.pro?.available ||
           t.versions?.figma?.available));

      return matchesSearch && matchesCategory && matchesPricing;
    });
  }, [templates, search, category, pricing]);

  return (
    <>
     <SEO
        title="Website Templates | GraceTechie"
        description="Browse premium website templates for businesses and creators."
        keywords="templates, react templates, website design"
        url="https://www.gracetechie.com.ng/templates"
        image="https://www.gracetechie.com.ng/og-image.png"
      />
    <div className="min-h-screen bg-[#0b0b0f] text-white px-6 py-20 mt-10">

      {/* ================= HEADER ================= */}
      <FadeIn delay={100}>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
            <Package className='w-4 h-4 text-primary' />
            <span className="text-sm text-primary font-medium">Templates</span>
          </div>
          <p className="text-white/60 text-base mx-auto sm:text-lg max-w-xl text-center">
            Ready-made Figma, bubble.io and code templates to help you launch projects faster.
          </p>
        </div>
      </FadeIn>

      {/* ================= SEARCH ================= */}
      <FadeIn delay={150}>
        <div className="max-w-xl mx-auto mb-6 relative">
          <input
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/40 focus:bg-white/10 transition"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-sm transition"
              style={{ marginTop: '-5px'}}
            >
              ✕
            </button>
          )}
        </div>
      </FadeIn>

      {/* ================= FILTERS ================= */}
      <FadeIn delay={200}>
        <div className="flex flex-wrap justify-between gap-4 mb-8">
          <div>
            {["all", "react", "bubble", "figma", "html"].map(tab => (
              <button
                key={tab}
                onClick={() => setCategory(tab)}
                style={{ marginRight: '20px'}}
                className={`px-4 py-2 rounded-lg mb-2 capitalize ${
                  category === tab
                    ? "bg-primary text-black"
                    : "bg-white/5 text-white/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">Access:</span>

            <select
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/40 hover:bg-white/10 transition"
            >
              <option value="all">All</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>
      </FadeIn>

      {/* ================= GRID ================= */}
      <FadeIn delay={300}>
        {loading ? (
          <p className="text-center text-white/40">Loading templates...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-white/40">No templates found</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filtered.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                onPreview={() => setPreview(t)}
              />
            ))}
          </div>
        )}
      </FadeIn>

      {preview && (
        <TemplatePreviewModal
          template={preview}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
    </>
  );
};

export default Templates;