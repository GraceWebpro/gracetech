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
    <div>
      <h3>Delete Project</h3>
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
