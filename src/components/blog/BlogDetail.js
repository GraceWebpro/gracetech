import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import './Blog.css';

const BlogDetail = () => {
    const { id } = useParams();
  const [blogg, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog(docSnap.data());
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;


  const blog = {
    title: 'Mastering Minimalist Web Design',
    date: 'April 10, 2025',
    image: 'https://source.unsplash.com/1200x600/?minimal,design',
    content: `
      Minimalism in web design is not about having less — it's about making every element purposeful. 
      This guide walks you through modern minimalist UI/UX techniques to create clean, user-focused websites.
      
      💡 Key Takeaways:
      - Use whitespace effectively.
      - Stick to a limited color palette.
      - Prioritize content hierarchy with typography.

      A minimalist design ensures your message is clear and navigable. It builds trust and makes websites faster and easier to maintain.
    `,
  };

  return (
    <div className="blog-detail">
      <div className="back-link">
        <a href="/blog">← Back to Blog</a>
      </div>
      <div className="blog-image">
        <img src={blog.image} alt={blog.title} />
      </div>
      <div className="blog-content">
        <h1 className="blog-title">{blog.title}</h1>
        <p className="blog-date">{blog.date}</p>
        <p className="blog-text">
          {blog.content.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default BlogDetail;
