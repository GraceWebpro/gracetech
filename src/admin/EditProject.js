import { useState, useEffect } from "react";
import { db } from "../server/firebase";
import { doc, updateDoc } from "firebase/firestore";

function EditProject({ projects }) {
  const [selectedProject, setSelectedProject] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false); // Progress state

  useEffect(() => {
    if (selectedProject) {
      const project = projects.find((p) => p.id === selectedProject);
      if (project) {
        setNewTitle(project.title);
        setNewCategory(project.category);
        setNewDescription(project.description);
      }
    }
  }, [selectedProject, projects]);

  const handleUpdate = async () => {
    if (!selectedProject) return alert("Please select a project to edit.");
    if (!newTitle || !newCategory || !newDescription) {
      return alert("All fields are required.");
    }

    setLoading(true); // Start loading

    try {
      const projectRef = doc(db, "projects", selectedProject);
      await updateDoc(projectRef, { title: newTitle, description: newDescription, category: newCategory });
     
      alert("Project updated successfully!");
      setSelectedProject("");
      setNewTitle("");
      setNewCategory("");
      setNewDescription("");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h3>Edit Project</h3>
      <select onChange={(e) => setSelectedProject(e.target.value)} value={selectedProject}>
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="New Project Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        disabled={loading}
      />
      <input
        type="text"
        placeholder="New Project Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        disabled={loading}
      />
      <textarea
        placeholder="New Project Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        disabled={loading}
      />

      {loading && <div className="progress-bar"><div className="progress"></div></div>}

      <button 
        onClick={handleUpdate} 
        disabled={loading || !newTitle || !newCategory || !newDescription || !selectedProject}
      >
        {loading ? "Updating..." : "Update Project"}
      </button>


      <style>
        {`
          .progress-bar {
            width: 100%;
            height: 5px;
            background: #ddd;
            margin-top: 10px;
            margin-bottom: 15px;
            border-radius: 5px;
            overflow: hidden;
          }
          .progress {
            width: 100%;
            height: 100%;
            background: #4CAF50;
            animation: progressAnimation 1.5s infinite linear;
          }
          @keyframes progressAnimation {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
}

export default EditProject;
