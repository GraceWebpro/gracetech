import { useState, useEffect } from "react";
import { db } from "../server/firebase";
import { doc, updateDoc } from "firebase/firestore";

function EditProject({ projects }) {
  const [selectedProject, setSelectedProject] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  
  // New states for additional fields
  const [technologyStacks, setTechnologyStacks] = useState(""); // comma separated string
  const [keyFeatures, setKeyFeatures] = useState("");
  const [userBenefits, setUserBenefits] = useState("");
  const [challenges, setChallenges] = useState("");
  const [solutions, setSolutions] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      const project = projects.find((p) => p.id === selectedProject);
      if (project) {
        setNewTitle(project.title || "");
        setNewCategory(project.category || "");
        setNewDescription(project.description || "");
        
        // Set new fields from project data, join arrays to comma separated strings if needed
        setTechnologyStacks(Array.isArray(project.technologyStacks) ? project.technologyStacks.join(", ") : (project.technologyStacks || ""));
        setKeyFeatures(Array.isArray(project.keyFeatures) ? project.keyFeatures.join(", ") : (project.keyFeatures || ""));
        setUserBenefits(Array.isArray(project.userBenefits) ? project.userBenefits.join(", ") : (project.userBenefits || ""));
        setChallenges(Array.isArray(project.challenges) ? project.challenges.join(", ") : (project.challenges || ""));
        setSolutions(Array.isArray(project.solutions) ? project.solutions.join(", ") : (project.solutions || ""));
        
        // Dates: assume they are stored as strings or Firestore Timestamps
        setProjectStartDate(project.projectStartDate ? (typeof project.projectStartDate === 'string' ? project.projectStartDate : project.projectStartDate.toDate().toISOString().slice(0,10)) : "");
        setProjectEndDate(project.projectEndDate ? (typeof project.projectEndDate === 'string' ? project.projectEndDate : project.projectEndDate.toDate().toISOString().slice(0,10)) : "");
      }
    }
  }, [selectedProject, projects]);

  const handleUpdate = async () => {
    if (!selectedProject) return alert("Please select a project to edit.");
    if (!newTitle || !newCategory || !newDescription) {
      return alert("Title, Category and Description are required.");
    }

    setLoading(true);

    try {
      const projectRef = doc(db, "projects", selectedProject);

      // Convert comma-separated strings into arrays
      const techStacksArray = technologyStacks.split(",").map(item => item.trim()).filter(Boolean);
      const keyFeaturesArray = keyFeatures.split(",").map(item => item.trim()).filter(Boolean);
      const userBenefitsArray = userBenefits.split(",").map(item => item.trim()).filter(Boolean);
      const challengesArray = challenges.split(",").map(item => item.trim()).filter(Boolean);
      const solutionsArray = solutions.split(",").map(item => item.trim()).filter(Boolean);

      await updateDoc(projectRef, { 
        title: newTitle, 
        description: newDescription, 
        category: newCategory,
        technologyStacks: techStacksArray,
        keyFeatures: keyFeaturesArray,
        userBenefits: userBenefitsArray,
        challenges: challengesArray,
        solutions: solutionsArray,
        projectStartDate,
        projectEndDate,
      });

      alert("Project updated successfully!");
      setSelectedProject("");
      setNewTitle("");
      setNewCategory("");
      setNewDescription("");
      setTechnologyStacks("");
      setKeyFeatures("");
      setUserBenefits("");
      setChallenges("");
      setSolutions("");
      setProjectStartDate("");
      setProjectEndDate("");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Edit Project</h2>
      <select onChange={(e) => setSelectedProject(e.target.value)} value={selectedProject}>
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        ))}
      </select>

      <div className="input-group">
        <input
          type="text"
          placeholder="New Project Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          disabled={loading}
          className="input-field"
        />
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="New Project Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          disabled={loading}
          className="input-field"
        />
      </div>

      <div className="input-group">
        <textarea
          placeholder="New Project Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          disabled={loading}
          className="textarea-field"
        />
      </div>

      {/* New fields */}
      <div className="input-group">
        <textarea
          type="text"
          placeholder="Technology Stacks (comma separated)"
          value={technologyStacks}
          onChange={(e) => setTechnologyStacks(e.target.value)}
          disabled={loading}
          className="textarea-field"
        />
      </div>

      <div className="input-group">
        <textarea
          type="text"
          placeholder="Key Features (comma separated)"
          value={keyFeatures}
          onChange={(e) => setKeyFeatures(e.target.value)}
          disabled={loading}
          className="textarea-field"
        />
      </div>

      <div className="input-group">
        <textarea
          type="text"
          placeholder="User Benefits (comma separated)"
          value={userBenefits}
          onChange={(e) => setUserBenefits(e.target.value)}
          disabled={loading}
          className="textarea-field"
        />
      </div>

      <div className="input-group">
        <textarea
          type="text"
          placeholder="Challenges (comma separated)"
          value={challenges}
          onChange={(e) => setChallenges(e.target.value)}
          disabled={loading}
          className="textarea-field"
        />
      </div>

      <div className="input-group">
        <textarea
          type="text"
          placeholder="Solutions (comma separated)"
          value={solutions}
          onChange={(e) => setSolutions(e.target.value)}
          disabled={loading}
          className="textarea-field"
        />
      </div>

      <div className="input-group">
        <label>Project Start Date:</label>
        <input
          type="date"
          value={projectStartDate}
          onChange={(e) => setProjectStartDate(e.target.value)}
          disabled={loading}
          className="input-field"
        />
      </div>

      <div className="input-group">
        <label>Project End Date:</label>
        <input
          type="date"
          value={projectEndDate}
          onChange={(e) => setProjectEndDate(e.target.value)}
          disabled={loading}
          className="input-field"
        />
      </div>

      {loading && (
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      )}

      <button
        className="submit-btn"
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
          .input-group {
            margin-bottom: 12px;
          }
          label {
            display: block;
            margin-bottom: 4px;
            font-weight: 600;
          }
        `}
      </style>
    </div>
  );
}

export default EditProject;
