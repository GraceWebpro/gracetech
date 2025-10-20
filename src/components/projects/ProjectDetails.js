import { useParams } from 'react-router-dom';
import React,{ useState, useEffect } from "react";
import { db } from "../../server/firebase"; // Ensure correct Firestore import
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";
import './ProjectsDetails.css'

const ProjectDetails = () => {
    const { slug } = useParams(); // Get the projectId from the URL
    const [project, setProject] = useState(null); // State to store project data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling state
  
    useEffect(() => {
        const fetchProject = async () => {
          try {
            const q = query(collection(db, "projects"), where("slug", "==", slug)); // 👈 query where slug matches
            const querySnapshot = await getDocs(q); // Use getDoc for single document fetch
    
            if (!querySnapshot.empty) {
              // Take the first matched document
              const doc = querySnapshot.docs[0];
              setProject({ id: doc.id, ...doc.data() });
            } else {
              setError("Project not found");
            }
          } catch (error) {
            setError('Error fetching project data');
          } finally {
            setLoading(false); // End loading state
          }
        };
    
        fetchProject();
      }, [slug]); // Re-run effect when projectId changess
  
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
      <img src={project.imageUrl} alt={project.title} className="project-main-image" loading="lazy" />
      
      <h4>Project Description</h4>
      <p>{project.description}</p>

      {/*<h4>Key Features</h4>
      <ul>
        {project.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
        </ul>*/}

      {/* Image Gallery */}
      <div className="image-gallery">
        {project.gallery?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${project.title}-gallery-${index}`}
            className="gallery-thumbnail"
            onClick={() => setProject({ ...project, imageUrl: image })}
          />
        ))}
      </div>

      <div>
      <h3 >{project.title}</h3>
      <p>{project.description}</p>

      {/* Key Features */}
      <h4>Key Features</h4>
      <ul className="feature-list">
        <li><i className="feature-icon">✔</i> Responsive Design</li>
        <li><i className="feature-icon">✔</i> User-Friendly Interface</li>
        <li><i className="feature-icon">✔</i> Fast Performance</li>
        <li><i className="feature-icon">✔</i> Scalable Architecture</li>
      </ul>

      {/* Technology Stack */}
      <h4>Technology Stack</h4>
      <div className="tech-stack">
        <span className="tech-icon">React</span>
        <span className="tech-icon">Node.js</span>
        <span className="tech-icon">MongoDB</span>
        <span className="tech-icon">Express</span>
      </div>

      {/* User Benefits */}
      <h4>User Benefits</h4>
      <h3 style={{ fontSize: '17px', color: '#888', fontWeight: '400', lineHeight: '1.5' }}>Users can easily interact with the platform, improving overall engagement. The system allows users to access content at their fingertips and receive updates in real-time, leading to increased user satisfaction and retention.</h3>

      {/* Challenges and Solutions */}
      <h4>Challenges & Solutions</h4>
      <h3 style={{ fontSize: '17px', color: '#888', fontWeight: '400', lineHeight: '1.5' }}><strong>Challenge:</strong> Ensuring fast performance while maintaining scalability.</h3>
      <h3 style={{ fontSize: '17px', color: '#888', fontWeight: '400', lineHeight: '1.5' }}><strong>Solution:</strong> Implemented efficient caching strategies and a modular architecture, enabling the system to handle heavy traffic seamlessly.</h3>

      {/* Project Timeline */}
      <h4>Project Timeline</h4>
      <h3 style={{ fontSize: '17px', color: '#888', fontWeight: '400', lineHeight: '1.5' }}><strong>Start Date:</strong> January 2023</h3>
      <h3 style={{ fontSize: '17px', color: '#888', fontWeight: '400', lineHeight: '1.5' }}><strong>End Date:</strong> June 2023</h3>

      
      {/* Project Links */}
      <div className="project-l">
        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="l-btn">
          See it in action
        </a>
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="l-btn">
          View on GitHub
        </a>
      </div>
    </div>

    <Link to='/portfolio' className="click-more-btn">
        <span>View More Projects</span>
        <BsArrowRight />
      </Link>
    </div>
  );
};


export default ProjectDetails;