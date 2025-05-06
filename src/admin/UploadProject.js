import { useState } from "react";
import { storage, db } from "../server/firebase"; // Ensure Firebase is properly set up
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import './Admin.css'

function UploadProject() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
    const [demoLink, setDemoLink] = useState("");

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [progress, setProgress] = useState(0); // Track upload progress
  const [isUploading, setIsUploading] = useState(false); // Track upload state

  const handleUpload = async () => {
    if (!file || !title || !category) return alert("Please select an image and enter a title and a category.");

    const storageRef = ref(storage, `projects/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setIsUploading(true); // Set uploading state

    uploadTask.on(
      "state_changed",
      (snapshot) => {
       // Calculate progress percentage
        const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent.toFixed(0)); // Update progress state
      },
      (error) => {
        console.error(error);
        setIsUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "projects"), {
          title,
          description,
          demoLink,
          imageUrl: url,
          category,
          timestamp: new Date(),
        });
        alert("Project uploaded successfully!");
        setIsUploading(false);
        setProgress(0); // Reset progress
        setTitle("");
        setDemoLink("");
        setCategory("");
        setDescription("");
        setFile(null);
      }
    );
  };

  return (
    <div className="upload-container">
    <h2>Upload New Project</h2>

    <div className="input-group">
      <input 
        type="text" 
        placeholder="Project Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="input-field"
      />
    </div>

    <div className="input-group">
      <input 
        type="text" 
        placeholder="Project Category" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        className="input-field"
      />
    </div>

    <div className="input-group">
      <input 
        type="text" 
        placeholder="Project Category" 
        value={demoLink} 
        onChange={(e) => setDemoLink(e.target.value)} 
        className="input-field"
      />
    </div>

    <div className="input-group">
      <textarea 
        placeholder="Project Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        className="textarea-field"
      />
    </div>

    <div className="input-group">
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])} 
        className="file-input"
      />
    </div>

    {isUploading && (
      <div className="progress-container">
        <progress value={progress} max="100" className="progress-bar"></progress>
        <p className="progress-text">{progress}% uploaded</p>
      </div>
    )}

    <button 
      onClick={handleUpload} 
      disabled={isUploading} 
      className="submit-btn"
    >
      {isUploading ? "Uploading..." : "Upload"}
    </button>
  </div>
  );
}

export default UploadProject;
