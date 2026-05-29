import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../config/supabase";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);

  // FETCH BLOG
  const fetchBlog = async () => {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single();

    setBlog(data);

    if (data) {
      // RELATED POSTS
      const { data: relatedBlogs } = await supabase
        .from("blogs")
        .select("*")
        .neq("id", data.id)
        .limit(3);

      setRelated(relatedBlogs || []);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  if (!blog) {
    return (
      <div className="text-white p-10">
        Loading blog...
      </div>
    );
  }

  // 🧠 AUTO TABLE OF CONTENTS
  const generateTOC = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");

    const headings = [...doc.querySelectorAll("h1, h2, h3")];

    return headings.map((h) => {
      const id = h.innerText.toLowerCase().replace(/\s+/g, "-");

      return {
        text: h.innerText,
        id,
        level: h.tagName,
      };
    });
  };

  const toc = generateTOC(blog.content || "");

  // ADD IDS TO CONTENT
  const contentWithIds = (blog.content || "").replace(
    /<h([1-3])>(.*?)<\/h\1>/g,
    (match, level, text) => {
      const id = text.toLowerCase().replace(/\s+/g, "-");
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 md:px-6 py-10 mt-24">

      {/* SEO */}
      <Helmet>
        <title>{blog.meta_title || blog.title}</title>
        <meta name="description" content={blog.meta_description || blog.excerpt} />

        {/* Open Graph */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.featured_image} />
        <meta property="og:type" content="article" />

        {/* Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.excerpt,
            image: blog.featured_image,
            datePublished: blog.created_at,
            author: {
              "@type": "Person",
              name: "GraceTechie",
            },
          })}
        </script>
      </Helmet>


        {/* MAIN CONTENT */}
        <div className="min-h-screen bg-[#0a0a0a] text-white">

{/* HERO */}
<section className="pt-20 pb-14 px-6">

  <div className="max-w-4xl mx-auto">

    {/* TITLE */}
    <h1
      className="
        text-4xl
        md:text-6xl
        font-bold
        leading-[1.1]
        tracking-tight
      "
    >
      {blog.title}
    </h1>

    {/* EXCERPT */}
    <p
      className="
        text-xl
        text-gray-400
        leading-relaxed
        mt-8
        max-w-3xl
      "
    >
      {blog.excerpt}
    </p>

    {/* AUTHOR */}
    <div className="flex items-center gap-4 mt-10">

      {/* AVATAR */}
      <div
        className="
          w-12 h-12 rounded-full
          bg-purple-500/20
          flex items-center justify-center
          text-lg font-semibold
        "
      >
        G
      </div>

      <div>

        <p className="font-medium">
          GraceTechie
        </p>

        <div className="text-sm text-gray-500 flex items-center gap-2">

          <span>
            {new Date(blog.created_at).toDateString()}
          </span>

          <span>•</span>

          <span>
            {blog.reading_time || 5} min read
          </span>

        </div>

      </div>

    </div>

  </div>

</section>

{/* FEATURED IMAGE */}
{blog.featured_image && (
  <section className="px-6 mb-20">

    <div className="max-w-4xl mx-auto">

      <img
        src={blog.featured_image}
        alt={blog.title}
        className="
          w-full
          rounded-3xl
          object-cover
          max-h-[650px]
        "
      />

    </div>

  </section>
)}

{/* ARTICLE */}
<section className="px-6 pb-32">

  <div className="max-w-3xl mx-auto">

    <article
      className="
        prose
        prose-invert
        max-w-none

        prose-headings:text-white
        prose-headings:font-bold

        prose-h1:text-5xl
        prose-h2:text-4xl
        prose-h3:text-3xl

        prose-p:text-gray-300
        prose-p:text-[20px]
        prose-p:leading-[2]
        prose-p:font-light

        prose-li:text-gray-300
        prose-li:text-[19px]
        prose-li:leading-[2]

        prose-strong:text-white

        prose-a:text-purple-400

        prose-img:rounded-2xl
        prose-img:my-14

        prose-pre:bg-[#111]
        prose-pre:border
        prose-pre:border-white/10
        prose-pre:rounded-2xl
        prose-pre:p-6

        prose-blockquote:border-purple-500
        prose-blockquote:text-gray-300
        prose-blockquote:text-2xl
        prose-blockquote:italic

        prose-headings:mt-20
        prose-headings:mb-8

        prose-p:mt-8

        prose-ul:mt-8
        prose-ol:mt-8

        prose-code:text-purple-300
      "
      dangerouslySetInnerHTML={{
        __html: contentWithIds,
      }}
    />

  </div>

</section>

</div>

    </div>
  );
};

export default BlogDetails;