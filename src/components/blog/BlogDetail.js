import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../../server/firebase";
import './Blog.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [similarBlogs, setSimilarBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const blogData = docSnap.data();
        setBlog(blogData);
        fetchSimilarBlogs(blogData.category, docSnap.id);
      }
    };

    const fetchSimilarBlogs = async (category, currentId) => {
      if (!category) return;

      const q = query(
        collection(db, "blogs"),
        where("category", "==", category),
        limit(4)
      );

      const querySnapshot = await getDocs(q);
      const blogs = [];

      querySnapshot.forEach((doc) => {
        if (doc.id !== currentId) {
          blogs.push({ id: doc.id, ...doc.data() });
        }
      });

      setSimilarBlogs(blogs);
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-detail">
      <div className="back-link">
        <Link to="/blog">← Back to Blog</Link>
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
              <br /><br />
            </span>
          ))}
        </p>
      </div>

      {similarBlogs.length > 0 && (
        <div className="similar-blogs">
          <h2>More in {blog.category}</h2>
          <div className="similar-blog-list">
            {similarBlogs.map((sim) => (
              <div key={sim.id} className="similar-blog-card">
                <Link to={`/blog/${sim.id}`}>
                  <img src={sim.imageUrl} alt={sim.title} />
                  <h3 className="modern-title">{sim.title}</h3>
                  <p className="modern-excerpt">{sim.description}</p>
                  <p>{sim.date}</p>
                  <Link to={`/blog/${sim.id}`} className="read-more-button">
                    Read More →
                  </Link>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
