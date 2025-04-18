import { useState, useEffect } from "react";
import { db } from "../../server/firebase";
import { collection, getDocs } from "firebase/firestore";

const Template = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const querySnapshot = await getDocs(collection(db, "templates"));
      const templatesList = querySnapshot.docs.map((doc) => doc.data());
      setTemplates(templatesList);
    };
    fetchTemplates();
  }, []);

  const calculateDiscountedPrice = (price, discount) => {
    if (discount && price) {
      return price - (price * discount) / 100;
    }
    return price;
  };

  return (
    <div className="templates-container">
      <h1>Our Templates</h1>
      <div className="templates-grid">
      {templates.map((template) => {
          const discountedPrice = calculateDiscountedPrice(template.price, template.discount);

          return (
            <div className="template-card" key={template.title}>
              <div className="template-thumbnail">
                <img src={template.thumbnail} alt={template.title} />
              </div>
              <div className="template-info">
                <p className="category">{template.category}</p>
                <p className="sub-category">{template.subCategory}</p>
                <p className="description">{template.description}</p>
                <p className="usage">{template.usage}</p>
                <div className="tags">
                  {template.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="price-info">
                  <span className="price">${discountedPrice.toFixed(2)}</span>
                  {template.discount > 0 && (
                    <span className="original-price">${template.price.toFixed(2)}</span>
                  )}
                </div>

                <div className="pricing">
                  <span className="price">${discountedPrice.toFixed(2)}</span>
                  {template.discount > 0 && (
                    <span className="discount">-{template.discount}%</span>
                  )}
                </div>

                <a href={template.previewUrl} className="preview-btn" target="_blank" rel="noopener noreferrer">
                  Preview Template
                </a>

                <div className="button-group">
                  <a href={template.previewUrl} className="preview-btn" target="_blank" rel="noopener noreferrer">Preview</a>
                  <a href={template.fileUrl} className="download-btn" target="_blank" rel="noopener noreferrer">Download</a>
                </div>
              </div>

              <div className="preview-gallery">
                {template.previewGallery.map((image, index) => (
                  <img key={index} src={image} alt={`Preview ${index + 1}`} className="gallery-image" />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style>
        {`
          .templates-container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 0 20px;
            font-family: 'Arial', sans-serif;
            color: #333;
          }

          h1 {
            text-align: center;
            margin-bottom: 40px;
            font-size: 2.5rem;
            color: #4a90e2;
          }

          .templates-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            justify-items: center;
          }

          .template-card {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease-in-out;
            width: 100%;
            max-width: 350px;
            text-align: center;
          }

          .template-card:hover {
            transform: translateY(-5px);
          }

          .template-thumbnail img {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .template-info {
            padding: 20px;
          }

          .template-info h3 {
            font-size: 1.6rem;
            color: #333;
            margin-bottom: 10px;
          }

          .category {
            font-size: 0.9rem;
            color: #888;
            margin-bottom: 15px;
          }

          .price-info {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
          }

          .price {
            font-size: 1.5rem;
            font-weight: bold;
            color: #4a90e2;
          }

          .original-price {
            text-decoration: line-through;
            color: #aaa;
            font-size: 1.2rem;
          }

          .preview-btn {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            background-color: #4a90e2;
            color: white;
            text-decoration: none;
            font-size: 1rem;
            border-radius: 30px;
            transition: background-color 0.3s ease;
          }

          .preview-btn:hover {
            background-color: #357abd;
          }
        `}
      </style>
    </div>
  );
};

export default Template;
