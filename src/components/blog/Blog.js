import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../server/firebase";
import { Link } from "react-router-dom";
import './Blog.css';
import HeroSection2 from "../home/Hero2";


const ModernBlogPage = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const blogCollection = collection(db, "blogs");
          const blogSnapshot = await getDocs(blogCollection);
          const blogList = blogSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBlogs(blogList);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      };
  
      fetchBlogs();
    }, []);

  return (
    <div className="modern-blog" id='blog'>
      <HeroSection2 />
      <h1 className="modern-heading">📝 Insights & Articles</h1>
      <div className="modern-grid">
        {blogs.map((post) => (
          <div className="modern-card" key={post.id}>
            <div className="modern-img-wrap">
              <img src={post.imageUrl} alt={post.title} className="modern-img" />
            </div>
            <div className="modern-content">
              <h2 className="modern-title">{post.title}</h2>
              <p className="modern-excerpt">{post.description}</p>
              <p className="modern-date">{post.date}</p>
              <Link to={`/blog/${post.id}`} key={post.id}>
                <button className="modern-btn">Read More →</button>
              </Link>            
            </div>
          </div>
        ))}
{/*}
        {blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id} className="blog-card">
            <img src={blog.image} alt={blog.title} />
            <div className="blog-card-content">
              <h2>{blog.title}</h2>
              <p>{blog.date}</p>
            </div>
          </Link>
        ))}*/}
      </div>
    </div>
  );
};

export default ModernBlogPage;
