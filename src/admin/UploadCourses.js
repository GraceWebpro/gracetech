import React, { useState } from 'react';
import { db, storage } from '../server/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const UploadCourses = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('Web Design');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [format, setFormat] = useState('Video');
  const [price, setPrice] = useState(0);
  const [isFree, setIsFree] = useState(true);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [authorAvatarUrl, setAuthorAvatarUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const uploadFileToStorage = (file, path) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `${path}/${file.name}_${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || (!isFree && !videoFile) || (isFree && !youtubeUrl)) {
      alert("Please complete all required fields.");
      return;
    }

    setUploading(true);

    try {
      let videoUrl = '';
      let thumbnailUrl = '';

      if (!isFree && videoFile) {
        videoUrl = await uploadFileToStorage(videoFile, 'courses');
      }

      if (thumbnailFile) {
        thumbnailUrl = await uploadFileToStorage(thumbnailFile, 'thumbnails');
      }

      const courseData = {
        title,
        description,
        topic,
        difficulty,
        format,
        isFree,
        price: isFree ? 0 : Number(price),
        videoUrl,
        youtubeUrl: isFree ? youtubeUrl : '',
        thumbnailUrl,
        author: {
          name: authorName,
          bio: authorBio,
          avatarUrl: authorAvatarUrl
        },
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "courses"), courseData);

      alert("Video uploaded successfully!");
      // Reset form
      setTitle('');
      setDescription('');
      setTopic('Web Design');
      setDifficulty('Beginner');
      setFormat('Video');
      setPrice(0);
      setIsFree(true);
      setVideoFile(null);
      setThumbnailFile(null);
      setYoutubeUrl('');
      setAuthorName('');
      setAuthorBio('');
      setAuthorAvatarUrl('');
      setUploadProgress(0);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Upload failed.");
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }} className="upload-container">
      <h2>Upload New Tutorial</h2>
      <form onSubmit={handleSubmit}>
        <label>Title *</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} />

        <label>Topic</label>
        <select value={topic} onChange={e => setTopic(e.target.value)}>
          <option>Web Design</option>
          <option>SEO</option>
          <option>Development</option>
          <option>Marketing</option>
          <option>Graphics</option>
        </select>

        <label>Difficulty</label>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <label>Format</label>
        <select value={format} onChange={e => setFormat(e.target.value)}>
          <option>Video</option>
          <option>Text</option>
          <option>PDF</option>
        </select>

        <label>
          <input type="checkbox" checked={isFree} onChange={e => setIsFree(e.target.checked)} />
          {" "}Mark as Free
        </label>

        {!isFree && (
          <>
            <label>Price (₹)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
            <label>Upload Video *</label>
            <input type="file" accept="video/*" onChange={handleFileChange} />
          </>
        )}

        {isFree && (
          <>
            <label>YouTube URL *</label>
            <input type="url" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} />
          </>
        )}

        <label>Thumbnail Image</label>
        <input type="file" accept="image/*" onChange={handleThumbnailChange} />

        <h4>Author Info</h4>
        <label>Name</label>
        <input type="text" value={authorName} onChange={e => setAuthorName(e.target.value)} />
        <label>Bio</label>
        <textarea value={authorBio} onChange={e => setAuthorBio(e.target.value)} rows={2} />
        <label>Avatar URL</label>
        <input type="url" value={authorAvatarUrl} onChange={e => setAuthorAvatarUrl(e.target.value)} />

        {uploading && <div>Uploading: {uploadProgress.toFixed(0)}%</div>}

        <button type="submit" disabled={uploading} style={{ marginTop: '1rem' }}>
          {uploading ? "Uploading..." : "Upload Course"}
        </button>
      </form>
    </div>
  );
};

export default UploadCourses;
