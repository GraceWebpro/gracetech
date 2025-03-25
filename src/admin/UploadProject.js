import { useState } from "react";
import { storage, db } from "../server/firebase"; // Ensure Firebase is properly set up
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import './Admin.css'

function UploadProject() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    if (!file || !title) return alert("Please select an image and enter a title.");

    const storageRef = ref(storage, `projects/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function (optional)
      },
      (error) => {
        console.error(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "projects"), {
          title,
          description,
          imageUrl: url,
          timestamp: new Date(),
        });
        alert("Project uploaded successfully!");
      }
    );
  };

  return (
    <div>
      <h2>Upload New Project</h2>
      <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadProject;
