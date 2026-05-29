import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  // FETCH BLOGS
  const fetchBlogs = async () => {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // GET ALL TAGS
  const allTags = [
    "all",
    ...new Set(blogs.flatMap((b) => b.tags || [])),
  ];

  // FILTER BLOGS
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase());

    const matchesTag =
      selectedTag === "all"
        ? true
        : (blog.tags || []).includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const [currentPage, setCurrentPage] = useState(1);

const blogsPerPage = 5;

const indexOfLastBlog = currentPage * blogsPerPage;
const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

const currentBlogs = filteredBlogs.slice(
  indexOfFirstBlog,
  indexOfLastBlog
);

const totalPages = Math.ceil(
  filteredBlogs.length / blogsPerPage
);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 md:px-16 py-12 mt-24">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">
          GraceTechie Blog
        </h1>
        <p className="text-gray-400 mt-3">
          Read the latest tech trends, innovation stories, how-tos, industry watch, insights and information on the top tech blog in Nigeria.
        </p>
      </div>

      {/* SEARCH */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* TAG FILTER */}
     {/* TAG FILTER */}
        <div className="mb-10 overflow-x-auto scrollbar-hide no-scrollbar">

        <div className="flex gap-3 min-w-max px-1">

        {allTags.map((tag, i) => (
            <button
            key={i}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                selectedTag === tag
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
            >
            {tag}
            </button>
        ))}

        </div>
        </div>

      {/* FEATURED BLOG */}
      {/* {filteredBlogs[0] && (
        <Link to={`/blogs/${filteredBlogs[0].slug}`}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 group h-[500px]"
        >
      
          {/* BACKGROUND IMAGE *
          {filteredBlogs[0].featured_image && (
            <img
              src={filteredBlogs[0].featured_image}
              alt={filteredBlogs[0].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          )}
      
          {/* DARK OVERLAY
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      
          {/* GLOW *
          <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />
      
          {/* CONTENT *
          <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12">
      
            {/* BADGE *
            <div className="mb-4">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs">
                Featured Post
              </span>
            </div>
      
            {/* TITLE *
            <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
              {filteredBlogs[0].title}
            </h2>
      
            {/* EXCERPT *
            <p className="text-gray-300 mt-4 max-w-2xl text-base md:text-lg line-clamp-3">
              {filteredBlogs[0].excerpt}
            </p>
      
            {/* META *
            <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
      
              <span>
                {new Date(
                  filteredBlogs[0].created_at
                ).toDateString()}
              </span>
      
              <span>•</span>
      
              <span>
                {filteredBlogs[0].reading_time || 5} min read
              </span>
      
            </div>
      
          </div>
      
        </motion.div>
      </Link>
      )} */}

     {/* BLOG LAYOUT */}
<div className="grid lg:grid-cols-12 gap-10 mt-16">

{/* LEFT BLOG LIST */}
<div className="lg:col-span-8 space-y-8">

  {currentBlogs.map((blog) => (

    <motion.div
      key={blog.id}
      whileHover={{ y: -3 }}
      className="
        group
        border border-white/10
        bg-white/[0.03]
        rounded-3xl
        overflow-hidden
        hover:border-purple-500/30
        transition-all
        duration-300
      "
    >

      <div className="grid md:grid-cols-3 gap-0">

        {/* IMAGE */}
        <div className="p-5 pb-0">

<img
  src={filteredBlogs.featured_image}
  alt={filteredBlogs.title}
  className="
    w-full
    h-52
    object-cover
    rounded-2xl
  "
/>

</div>

        {/* CONTENT */}
        <div className="md:col-span-2 p-8 flex flex-col justify-between">

          <div>

            {/* META */}
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-5">

              <span>
                {new Date(blog.created_at).toDateString()}
              </span>

              <span>•</span>

              <span>
                {blog.reading_time || 5} min read
              </span>

            </div>

            {/* TITLE */}
            <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-purple-300 transition">

              {blog.title}

            </h2>

            {/* EXCERPT */}
            <p className="text-gray-400 mt-5 leading-8 text-[15px] line-clamp-3">

              {blog.excerpt}

            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-6">

              {(blog.tags || []).slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="
                    px-3 py-1
                    rounded-full
                    bg-white/5
                    border border-white/10
                    text-xs text-gray-300
                  "
                >
                  {tag}
                </span>
              ))}

            </div>

          </div>

          {/* READ MORE */}
          <div className="mt-8">

            <Link
              to={`/blog/${blog.slug}`}
              className="
                inline-flex
                items-center
                gap-3
                text-purple-400
                hover:text-purple-300
                transition
                font-medium
              "
            >

              Read More

              <span className="group-hover:translate-x-1 transition">
                →
              </span>

            </Link>

          </div>

        </div>

      </div>

    </motion.div>

  ))}

  {/* PAGINATION */}
  <div className="flex justify-center items-center gap-4 pt-10">

    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
      className="
        px-5 py-2 rounded-full
        bg-white/5
        border border-white/10
        disabled:opacity-40
      "
    >
      Prev
    </button>

    <div className="text-sm text-gray-400">
      Page {currentPage} of {totalPages}
    </div>

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => p + 1)}
      className="
        px-5 py-2 rounded-full
        bg-purple-600
        text-white
        disabled:opacity-40
      "
    >
      Next
    </button>

  </div>

</div>

{/* RIGHT STICKY CARD */}
<div className="lg:col-span-4">

  <div className="sticky top-10">

    <div
      className="
        rounded-3xl
        border border-white/10
        bg-gradient-to-br
        from-purple-900/30
        to-black
        overflow-hidden
      "
    >

      {/* IMAGE */}
      {filteredBlogs[0]?.featured_image && (
        <img
          src={filteredBlogs[0].featured_image}
          alt={filteredBlogs[0].title}
          className="w-full h-64 object-cover"
        />
      )}

      <div className="p-8">

        <p className="text-purple-400 text-sm mb-4">
          Featured Article
        </p>

        <h2 className="text-3xl font-bold leading-tight">
          {filteredBlogs[0]?.title}
        </h2>

        <p className="text-gray-400 mt-5 leading-8">

          {filteredBlogs[0]?.excerpt}

        </p>

        <Link
          to={`/blog/${filteredBlogs[0]?.slug}`}
          className="
            inline-flex
            items-center
            gap-3
            mt-8
            text-purple-400
            hover:text-purple-300
          "
        >
          Read Featured

          <span>→</span>
        </Link>

      </div>

    </div>

  </div>

</div>

</div>
    </div>
  );
};

export default BlogList;