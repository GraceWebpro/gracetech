import { useState } from "react";
import { db } from "../server/firebase";
import { doc, updateDoc } from "firebase/firestore";

function EditProject({ projects }) {
  const [selectedProject, setSelectedProject] = useState("");
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleUpdate = async () => {
    if (!selectedProject) return alert("Please select a project to edit.");

    try {
      const projectRef = doc(db, "projects", selectedProject);
      await updateDoc(projectRef, { name: newName, description: newDescription });
      alert("Project updated successfully!");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project.");
    }
  };

  return (
    <div>
      <h3>Edit Project</h3>
      <select onChange={(e) => setSelectedProject(e.target.value)} value={selectedProject}>
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="New Project Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <textarea
        placeholder="New Project Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Project</button>
    </div>
  );
}

export default EditProject;
