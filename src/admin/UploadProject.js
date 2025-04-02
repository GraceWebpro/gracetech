import { useState } from "react";
import { storage, db } from "../server/firebase"; // Ensure Firebase is properly set up
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import './Admin.css'

function UploadProject() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
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
          imageUrl: url,
          category,
          timestamp: new Date(),
        });
        alert("Project uploaded successfully!");
        setIsUploading(false);
        setProgress(0); // Reset progress
        setTitle("");
        setCategory("");
        setDescription("");
        setFile(null);
      }
    );
  };

  return (
    <div>
      <h2>Upload New Project</h2>
      <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Project Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <textarea placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      {isUploading && (
        <div>
          <progress value={progress} max="100"></progress>
          <p>{progress}% uploaded</p>
        </div>
      )}

      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default UploadProject;
