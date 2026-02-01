import { useEffect, useState, useMemo } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../server/firebase";

import FadeIn from "../animations/FadeIn";
import TemplateCard from "../ui/TemplateCard";
import TemplatePreviewModal from "../ui/TemplatePreviewModal";
import { Package } from "lucide-react";

const Templates = () => {
  // const [search, setSearch] = useState("");
  // const [category, setCategory] = useState("all");
  // const [pricing, setPricing] = useState("all");
  // const [preview, setPreview] = useState(null);

  // const templates = [
  //   {
  //     id: 1,
  //     title: "Startup SaaS Landing",
  //     category: "react",
  //     type: "free",
  //     image: "/templates/saas.png",
  //     price: 0
  //   },
  //   {
  //     id: 2,
  //     title: "Bubble Marketplace App",
  //     category: "bubble",
  //     type: "premium",
  //     image: "/templates/bubble.png",
  //     price: 29
  //   },
  //   {
  //     id: 3,
  //     title: "Figma Portfolio Kit",
  //     category: "figma",
  //     type: "premium",
  //     image: "/templates/figma.png",
  //     price: 15
  //   }
  // ];

  // const filtered = templates.filter(t => {
  //   return (
  //     (category === "all" || t.category === category) &&
  //     (pricing === "all" || t.type === pricing) &&
  //     t.title.toLowerCase().includes(search.toLowerCase())
  //   );
  // });

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all"); // techStack
  const [pricing, setPricing] = useState("all");   // free/premium
  const [preview, setPreview] = useState(null);

  /* ================= FETCH FROM FIRESTORE ================= */
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const q = query(
          collection(db, "templates"),
          orderBy("createdAt", "desc")
        );

        const snap = await getDocs(q);

        const list = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setTemplates(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filtered = useMemo(() => {
    return templates.filter(t => {
      const matchesSearch = t.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      // tech stack filter (React / Bubble / Figma etc)
      const matchesCategory =
      category === "all" ||
      t.category?.toLowerCase() === category;
    
      // pricing filter
      const matchesPricing =
        pricing === "all" ||
        (pricing === "free" && t.isFree) ||
        (pricing === "premium" && !t.isFree);

      return matchesSearch && matchesCategory && matchesPricing;
    });
  }, [templates, search, category, pricing]);


  return (
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
            className="
              w-full
              px-5 pr-12
              py-3
              bg-white/5
              border border-white/10
              rounded-xl
              text-white
              focus:outline-none
              focus:border-primary/40
              focus:bg-white/10
              transition
            "
          />

          {/* Clear button */}
          {search && (
            <button
              onClick={() => setSearch("")}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                w-7 h-7
                rounded-full
                bg-white/10
                hover:bg-white/20
                text-white/70
                hover:text-white
                text-sm
                items-center justify-center
                transition
              "
              style={{ marginTop: '-5px'}}
            >
              ✕
            </button>
          )}

        </div>
      </FadeIn>



      {/* ================= FILTERS ================= */}
      <FadeIn delay={200}>
        <div className="flex flex-wrap justify-center gap-4 mb-8" style={{ display: 'flex', justifyContent: 'space-between'}}>
          <div>
            {["all", "react", "bubble", "figma", "html"].map(tab => (
              <button
                key={tab}
                onClick={() => setCategory(tab)}
                style={{ marginRight: '20px'}}
                className={`px-4 py-2 gap-4 rounded-lg capitalize ${
                  category === tab
                    ? "bg-primary text-black"
                    : "bg-white/5 text-white/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ================= RIGHT — ACCESS DROPDOWN ================= */}
          <div className="flex items-center gap-3 sm:self-auto">

            <span className="text-sm text-white/50">
              Access:
            </span>

            <select
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
              className="
                bg-white/5
                border border-white/10
                rounded-lg
                px-4 py-2
                text-sm
                text-white
                focus:outline-none
                focus:border-primary/40
                hover:bg-white/10
                transition
              "
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
            {filtered.map(t => (
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
  );
};

export default Templates;
