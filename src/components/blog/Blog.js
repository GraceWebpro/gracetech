import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../server/firebase";
import { Link } from "react-router-dom";
import './Blog.css';

const blogPosts = [
  {
    id: 1,
    title: 'Mastering Minimalist Web Design',
    date: 'April 10, 2025',
    excerpt: 'Uncover the elegance of less-is-more in UI/UX design with these principles...',
    image: 'https://source.unsplash.com/800x600/?minimal,design',
  },
  {
    id: 2,
    title: 'Boost Conversions With Better UX',
    date: 'March 30, 2025',
    excerpt: 'Simple tweaks in user flow can significantly impact your conversion rate...',
    image: 'https://source.unsplash.com/800x600/?ux,conversion',
  },
  {
    id: 3,
    title: 'Why Motion Design Matters',
    date: 'March 20, 2025',
    excerpt: 'Add life to your UI with meaningful motion. Learn the best practices...',
    image: 'https://source.unsplash.com/800x600/?motion,interface',
  },
];

const ModernBlogPage = () => {

    const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogCollection = collection(db, "blogs");
      const blogSnapshot = await getDocs(blogCollection);
      const blogList = blogSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    };

    fetchBlogs();
  }, []);
  return (
    <div className="modern-blog">
      <h1 className="modern-heading">📝 Insights & Articles</h1>
      <div className="modern-grid">
        {blogPosts.map((post) => (
          <div className="modern-card" key={post.id}>
            <div className="modern-img-wrap">
              <img src={post.image} alt={post.title} className="modern-img" />
            </div>
            <div className="modern-content">
              <p className="modern-date">{post.date}</p>
              <h2 className="modern-title">{post.title}</h2>
              <p className="modern-excerpt">{post.excerpt}</p>
              <button className="modern-btn">Read More →</button>
            </div>
          </div>
        ))}

        {blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id} className="blog-card">
            <img src={blog.image} alt={blog.title} />
            <div className="blog-card-content">
              <h2>{blog.title}</h2>
              <p>{blog.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ModernBlogPage;
