import React, { useEffect, useState } from 'react';
import { db } from '../server/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

const UploadBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState('');

  // Fetch all blogs for the select dropdown
  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, 'blogs'));
      const blogsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogsList);
    };

    if (isEditMode) {
      fetchBlogs();
    }
  }, [isEditMode]);

  // Fetch selected blog and populate form
  useEffect(() => {
    const getBlogDetails = async () => {
      if (selectedBlogId) {
        const docRef = doc(db, 'blogs', selectedBlogId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || '');
          setDescription(data.description || '');
          setImageUrl(data.imageUrl || '');
          setDate(data.date || '');
        }
      }
    };

    getBlogDetails();
  }, [selectedBlogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      if (!isEditMode) {
        await addDoc(collection(db, 'blogs'), {
          title,
          description,
          imageUrl,
          date,
          createdAt: serverTimestamp(),
        });
        setSuccess('Blog post uploaded successfully!');
      } else {
        // Editing an existing blog
        const blogRef = doc(db, 'blogs', selectedBlogId);
        await setDoc(blogRef, {
          title,
          description,
          imageUrl,
          date,
          updatedAt: serverTimestamp(),
        }, { merge: true }); // merge to keep other existing fields
        setSuccess('Blog post updated successfully!');
      }
  
  

      setTitle('');
      setDescription('');
      setImageUrl('');
      setDate('');
      setSelectedBlogId('');
    } catch (error) {
      console.error('Error uploading blog:', error);
    }

    setLoading(false);
  };

  return (
    <div className="upload-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{isEditMode ? 'Edit Blog Post' : 'Upload a Blog Post'}</h2>
        <button
          type="button"
          onClick={() => {
            setIsEditMode((prev) => !prev);
            setSuccess('');
            setSelectedBlogId('');
            setTitle('');
            setDescription('');
            setImageUrl('');
            setDate('');
          }}
          style={{
            padding: '6px 12px',
            background: '#eee',
            border: '1px solid #ccc',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          {isEditMode ? 'Switch to Upload Blog' : 'Switch to Edit Blog'}
        </button>
      </div>

      {isEditMode && (
        <div style={{ margin: '1rem 0' }}>
          <label htmlFor="select-blog">Select Blog to Edit:</label>
          <select
            id="select-blog"
            value={selectedBlogId}
            onChange={(e) => setSelectedBlogId(e.target.value)}
          >
            <option value="">-- Select Blog --</option>
            {blogs.map((blog) => (
              <option key={blog.id} value={blog.id}>
                {blog.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Blog Description"
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : isEditMode ? 'Update Blog' : 'Upload Blog'}
        </button>

        {success && <p className="success-msg">{success}</p>}
      </form>
    </div>
  );
};

export default UploadBlog;
