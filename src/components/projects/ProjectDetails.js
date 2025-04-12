import { useParams } from 'react-router-dom';
import React,{ useState, useEffect } from "react";
import { db } from "../../server/firebase"; // Ensure correct Firestore import
import { getDoc, doc } from "firebase/firestore";
import './ProjectsDetails.css'

const ProjectDetails = () => {
    const { id } = useParams(); // Get the projectId from the URL
    const [project, setProject] = useState(null); // State to store project data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling state
  
    useEffect(() => {
        const fetchProject = async () => {
          try {
            const docRef = doc(db, "projects", id); // Correct reference for Firebase 9+
            const docSnapshot = await getDoc(docRef); // Use getDoc for single document fetch
    
            if (docSnapshot.exists()) {
              setProject(docSnapshot.data()); // Set the project data in the state
            } else {
              setError('Project not found');
            }
          } catch (error) {
            setError('Error fetching project data');
          } finally {
            setLoading(false); // End loading state
          }
        };
    
        fetchProject();
      }, [id]); // Re-run effect when projectId changess
  
    if (loading) {
      return <p>Loading...</p>; // Show loading indicator
    }
  
    if (error) {
      return <p>{error}</p>; // Show error message if data fetch fails
    }
  
    if (!project) {
      return <p>Project not found.</p>; // Handle when no project is found
    }
  return (
    <div className="project-details">
      <h2>{project.title}</h2>
      <img src={project.imageUrl} alt={project.title} className="project-main-image" />
      
      <h4>Project Description</h4>
      <p>{project.description}</p>

      {/*<h4>Key Features</h4>
      <ul>
        {project.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
        </ul>*/}

      {/* Project Image Gallery */}
      <h4>Image Gallery</h4>
      <div className="gallery">
        {project.gallery?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${project.title}-gallery-${index}`}
            className="gallery-thumbnail"
          />
        ))}
      </div>

      {/* Links to demo or GitHub */}
      <div className="project-links">
        <a href={project.demoLink} target="_blank" rel="noopener noreferrer">See it in Action</a>
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">View on GitHub</a>
      </div>
    </div>
  );
};


export default ProjectDetails;