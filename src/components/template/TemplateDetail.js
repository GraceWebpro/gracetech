import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, } from "react-router-dom";
import { doc, getDoc, query, collection, where, limit, getDocs } from "firebase/firestore";
import { db } from "../../server/firebase";
import { FaHeart, FaDownload } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useAuth } from "../../server/AuthProvider";
import PayPalPayment from "../../payment/PaypalPayment"; // Adjust if needed

function TemplateDetails() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [similarTemplates, setSimilarTemplates] = useState([]);
  const [hasPurchasedTemplate, setHasPurchasedTemplate] = useState(false);
  const { currentUser } = useAuth(); // optional if you're using authentication


  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const docRef = doc(db, "templates", id);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTemplate(data);
  
          // Fetch similar templates
          const q = query(
            collection(db, "templates"),
            where("category", "==", data.category),
            limit(5) // Adjust how many you want to show
          );
  
          const querySnapshot = await getDocs(q);
          const similar = [];
          querySnapshot.forEach((doc) => {
            if (doc.id !== id) {
              similar.push({ id: doc.id, ...doc.data() });
            }
          });
  
          setSimilarTemplates(similar);

        // ✅ Check if user has purchased this template
        if (currentUser) {
          const purchasesRef = collection(db, "purchases");
          const purchaseQuery = query(
            purchasesRef,
            where("userId", "==", currentUser.uid),
            where("templateId", "==", id)
          );
          const purchaseSnap = await getDocs(purchaseQuery);
          if (!purchaseSnap.empty) {
            setHasPurchasedTemplate(true);
          }
        }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching template:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTemplate();
  }, [id, currentUser]);
  

  const handleDownloadClick = () => {
    if (!currentUser) {
      // Redirect to login with current path
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    } else {
      // Download logic here (or redirect to download page)
      // Example:
      window.open(`/download/${id}`, "_blank"); // or any logic you have
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!template) return <div className="error">Template not found.</div>;

  return (
    <div className="template-details">
      <div className="top-section">
        {/* Left Section */}
        <div className="left-section">
          <img src={template.thumbnail} alt={template.title} className="thumbnail" />
          <div className="template-meta">
          <h1 className="template-title">{template.title}</h1>

            <p className="category">{template.category} - {template.subCategory}</p>
            <p className="creator">by {template.creatorName}</p>
            {template.isFree ? (
              <span className="free-badge">Free</span>
            ) : (
              <div className="price-tag">
                <span className="original">${parseFloat(template.price).toFixed(2)}</span>
                {template.discount > 0 && (
                  <span className="discounted">
                    ${ (template.price * (1 - template.discount / 100)).toFixed(2) }
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="template-body">
        <p className="description">{template.description}</p>

        <div className="info-grid">
          <div style={{ gap: '20px', }}>
            <h5>Usage:</h5> 
            <p>{template.usage}</p>
          </div>
          <div>
            <h5>Tech Stack:</h5>
            <p>{template.techStack}</p>
          </div>
          <div>
            <h5>Platform Support:</h5>
            <p>{template.platformSupport.join(", ")}</p>
          </div>
          <div>
            <h5>License:</h5>
            <p>{template.license}</p>
          </div>
          <div>
            <h5>Tags:</h5>
            <p>{template.tags.join(", ")}</p>
          </div>
          <div>
            <h5>Downloads:</h5><br />
            <p>{template.downloadsCount}</p>
          </div>
        </div>
<div className='imaage-d'>
        {template.previewUrl && (
          <a href={template.previewUrl} target="_blank" rel="noreferrer" className="preview-btn">
            Preview Template
          </a>
        )}

        {
          template.isFree ? (
            // If the template is free, allow download regardless of login status
            <a
              href={template.fileUrl}
              download
              className="download-btn"
            >
              Download .zip
            </a>
          ) : (
            // If the template is not free
            currentUser ? (
              // If the user is logged in, show payment option
              <PayPalPayment
                amount={template.price}
                template={template}
                user={currentUser}
                onSuccess={(details) => {
                  setHasPurchasedTemplate(true);
                  alert("Payment successful! Download is now available.");
                  // Save purchase to Firestore if needed
                }}
              />
            ) : (
              // If the user is not logged in, redirect them to login and back to template page for payment
              <button
                onClick={() => {
                  // Redirect to login page and store the current template details page URL
                  window.localStorage.setItem("redirectAfterLogin", window.location.pathname);
                  window.location.href = "/login";
                }}
                className="preview-btn"
              >
                Login to Purchase
              </button>
            )
          )
        }

      </div>
     {/*} <div className="cta-x">
          <h2>Want to support?</h2>
          <p>Help the creator by sharing or donating!</p>
          <button className="subscribe-btn">Donate</button>
        </div>

        <p className="signin-text">
          Want to comment? <a href="/login">Sign in</a>
        </p>
        */}
      </div>

        </div>

        {/* Right Section */}
        <div className="right-section">

          <div className="cta-box">
            <h2>Subscribe to Access</h2>
            <p>Get unlimited access to premium templates.</p>
            <button className="subscribe-btn">Subscribe Now</button>
          </div>

          <button className="collection-btn">Add to Collection</button>

          <p className="signin-text">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>

      

      <div className="template-section">
        <div className="section-header">
          <h2>Similar Templates</h2>
        </div>
        <div className="section-template-grid">

        {similarTemplates.slice(0, 4).map(template => (
              <Link to={`/templates/${template.id}`} key={template.id} className="template-card-link">
                <div className="section-template-card">
                  <img src={template.thumbnail} alt={template.name} className='template-image' />
                  <div className="overlay">
                    <h4 className="template-title">{template.name}</h4>
                    <div className="icon-group">
                      <FaHeart className="card-icon" />
                      <FaDownload className="card-icon" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>

  </div>

      <style>{`
        .template-details {
          max-width: 1200px;
          margin: 120px auto;
          padding: 24px;
          width: 100%;
          font-family: 'Segoe UI', sans-serif;
        }

        .top-section {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .info-grid h5 {
            font-size: 20px;
            margin-bottom: 10px;
            margin-top: 30px
        }

        .info-grid p {
          font-sie: 15px;
        }

        .left-section {
          flex: 1;
          min-width: 280px;
          text-align: left;
          width: 80%;
        }

        .thumbnail {
          width: 100%;
          max-width: 100%;
          border-radius: 12px;
          object-fit: cover;
          margin-bottom: 16px;
        }

        .image-d {
            display: dlex;
            flex-direction: row;
            gap: 30px;
          margin-right: 20px;
        }

        .template-meta {
          font-size: 15px;
        }

        

        .category {
          color: #555;
        }

        .creator {
          color: #888;
          margin-top: 6px;
        }

        .free-badge {
          display: inline-block;
          background: #4caf50;
          color: white;
          padding: 4px 12px;
          border-radius: 6px;
          font-weight: bold;
          margin-top: 10px;
        }

        .price-tag {
          margin-top: 10px;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .original {
          text-decoration: line-through;
          color: #999;
        }

        .discounted {
          color: #e91e63;
          font-weight: bold;
          font-size: 18px;
        }

        .right-section {
          
          min-width: 300px;
          display: flex;
          flex-direction: column;
          gap: 16px;
                  width: 20%;

        }

        .template-title {
          margin: 0;
          font-size: 28px;
          text-align: left;
        }

        .cta-box {
          background: transparent;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #ccc;
        }

        .cta-box h2 {
          margin: 0;
          font-size: 20px;
        }

        .cta-box p {
          margin: 10px 0;
          font-size: 14px;
          color: #666;
        }

        .subscribe-btn {
          padding: 12px 20px;
          background: #4a90e2;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
        }

        .subscribe-btn:hover {
          background: #357ABD;
        }

        .collection-btn {
          background: transparent;
          border: 1px solid #ccc;
          padding: 10px 18px;
          font-size: 15px;
          border-radius: 8px;
          cursor: pointer;
        }

        .signin-text {
          font-size: 14px;
          color: #666;
        }

        .signin-text a {
          color: #4a90e2;
          text-decoration: none;
        }

        .signin-text a:hover {
          text-decoration: underline;
        }

        .template-body {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          text-align: left;
          align-items: flex-start;
        }

        .description {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .info-grid {
            text-align: left;
          gap: 30px;
          font-size: 15px;
        }

        .preview-btn,
        .download-btn {
          display: inline-block;
          margin-top: 30px;
          padding: 12px 20px;
          background: #4a90e2;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          transition: 0.3s ease;
        }

        .preview-btn {
        margin-right: 20px;
        }

        .preview-btn:hover,
        .download-btn:hover {
          background: #357ABD;
        }

        @media (max-width: 768px) {
          .top-section {
            flex-direction: column;
          }

          .left-section {
            width: 100%;
          }

          .right-section {
            align-items: center;
            width: 100%;
          }

          .cta-box {
            width: 50%;
          }

          .collection-btn {
            width: 50%;
          }
        }

        @media (max-width: 550px) {
        


          .cta-box {
            width: 90%;
          }

          .collection-btn {
            width: 90% !important;
          }
        }

        .loading, .error {
          text-align: center;
          font-size: 18px;
          color: #666;
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
}

export default TemplateDetails;
