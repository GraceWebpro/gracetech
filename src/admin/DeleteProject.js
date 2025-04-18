import { useState } from "react";
import { db } from "../server/firebase";
import { doc, deleteDoc } from "firebase/firestore";

function DeleteProject({ projects }) {
  const [selectedProject, setSelectedProject] = useState("");

  const handleDelete = async () => {
    if (!selectedProject) return;
    await deleteDoc(doc(db, "projects", selectedProject));
    alert("Project deleted successfully!");
  };

  return (
    <div className="upload-container">
      <h2>Delete Project</h2>
      <select onChange={(e) => setSelectedProject(e.target.value)} value={selectedProject}>
        <option value="">Select Project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>{project.title}</option>
        ))}
      </select>
      <button onClick={handleDelete} className="delete-btn">Delete</button>
    </div>
  );
}

export default DeleteProject;
