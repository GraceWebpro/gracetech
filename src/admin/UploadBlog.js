// src/pages/UploadBlog.jsx
import React, { useState } from 'react';
import { db } from '../server/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const UploadBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        description,
        imageUrl,
        createdAt: serverTimestamp(),
      });
      setTitle('');
      setDescription('');
      setImageUrl('');
      setSuccess('Blog post uploaded successfully!');
    } catch (error) {
      console.error('Error uploading blog:', error);
    }

    setLoading(false);
  };

  return (
    <div className="upload-container">
      <h2>Upload a Blog Post</h2>
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

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Blog'}
        </button>

        {success && <p className="success-msg">{success}</p>}
      </form>
    </div>
  );
};

export default UploadBlog;
