import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import './Blog.css';

const BlogDetail = () => {
    const { id } = useParams();
  const [blog, setBlog] = useState(null);

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


  return (
    <div className="blog-detail">
      <div className="back-link">
        <a href="/blog">← Back to Blog</a>
      </div>
      <div className="blog-image">
        <img src={blog.imageUrl} alt={blog.title} />
      </div>
      <div className="blog-content">
        <h1 className="blog-title">{blog.title}</h1>
        <p className="blog-date">{blog.date}</p>
        <p className="blog-text">
          {blog.description?.split('\n').map((line, index) => (
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
