import React, { useEffect, useState } from 'react';
import { db, storage } from '../server/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

const UploadBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [status, setStatus] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState('');
  const [imageFile, setImageFile] = useState(null); // for uploaded file
  const [tags, setTags] = useState(''); // comma-separated tags input


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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setSuccess('');

  //   try {
  //     if (!isEditMode) {
  //       await addDoc(collection(db, 'blogs'), {
  //         title,
  //         description,
  //         category,
  //         imageUrl,
  //         status,
  //         date,
  //         createdAt: serverTimestamp(),
  //       });
  //       setSuccess('Blog post uploaded successfully!');
  //     } else {
  //       // Editing an existing blog
  //       const blogRef = doc(db, 'blogs', selectedBlogId);
  //       await setDoc(blogRef, {
  //         title,
  //         description,
  //         category,
  //         status,
  //         imageUrl,
  //         date,
  //         updatedAt: serverTimestamp(),
  //       }, { merge: true }); // merge to keep other existing fields
  //       setSuccess('Blog post updated successfully!');
  //     }
  
  

  //     setTitle('');
  //     setDescription('');
  //     setCategory('');
  //     setImageUrl('');
  //     setStatus('');
  //     setDate('');
  //     setSelectedBlogId('');
  //   } catch (error) {
  //     console.error('Error uploading blog:', error);
  //   }

  //   setLoading(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
  
    try {
      let uploadedImageUrl = imageUrl; // default to URL if no file uploaded
  
      // Upload image if a file is selected
      if (imageFile) {
        const imageRef = ref(storage, `blogImages/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        uploadedImageUrl = await getDownloadURL(imageRef);
      }
  
      const blogData = {
        title,
        description, // React Quill content is already HTML
        category,
        status,
        imageUrl: uploadedImageUrl,
        date,
        tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
        ...(isEditMode ? { updatedAt: serverTimestamp() } : { createdAt: serverTimestamp() }),
      };
  
      if (!isEditMode) {
        await addDoc(collection(db, 'blogs'), blogData);
        setSuccess('Blog post uploaded successfully!');
      } else {
        const blogRef = doc(db, 'blogs', selectedBlogId);
        await setDoc(blogRef, blogData, { merge: true });
        setSuccess('Blog post updated successfully!');
      }
  
      // Reset form fields
      setTitle('');
      setDescription('');
      setCategory('');
      setImageFile(null);
      setImageUrl('');
      setStatus('');
      setDate('');
      setTags('');
      setSelectedBlogId('');
    } catch (error) {
      console.error('Error uploading blog:', error);
    }
  
    setLoading(false);
  };

  return (
    <div className="upload-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className='submit-btnh' >{isEditMode ? 'Edit Blog Post' : 'Upload a Blog Post'}</h2>
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
            background: '#5f39ff',
            border: '1px solid #fff',
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
{/* 
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="UI Design">UI Design</option>
          <option value="UX Design">UX Design</option>
          <option value="SEO Optimization">SEO Optimization</option>
          <option value="AI Video Creation">AI Video Creation</option>
          <option value="Courses & Templates">Courses & Templates</option>
        </select>

        <textarea
          placeholder="Blog Description"
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <ReactQuill
          theme="snow"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Blog Content"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

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

        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="draft">Draft</option>
          <option value="published">Publish</option>
        </select>


        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : isEditMode ? 'Update Blog' : 'Upload Blog'}
        </button>

        {success && <p className="success-msg">{success}</p>}
      </form> */}

      <form onSubmit={handleSubmit} className="upload-form">

          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Blog Content"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="UI Design">UI Design</option>
            <option value="UX Design">UX Design</option>
            <option value="SEO Optimization">SEO Optimization</option>
            <option value="AI Video Creation">AI Video Creation</option>
            <option value="Courses & Templates">Courses & Templates</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="draft">Draft</option>
            <option value="published">Publish</option>
          </select>

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
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
