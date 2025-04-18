import { useState, useEffect } from "react";
import { db, storage } from "../server/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UploadTemplate() {
  const [form, setForm] = useState({
    title: "",
    category: "UI/UX",
    techStack: "Figma",
    subCategory: "",
    description: "",
    usage: "",
    price: "",
    discount: 0,
    isFree: false,
    previewUrl: "",
    fileUrl: "",
    license: "Personal & Commercial",
    featured: false,
    creatorName: "TemplateHub",
    platformSupport: "",
    tags: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [zipFile, setZipFile] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    if (form.price && form.discount) {
      const price = parseFloat(form.price);
      const discount = parseFloat(form.discount);
      const calculated = price * (1 - discount / 100);
      setDiscountedPrice(parseFloat(calculated.toFixed(2)));
    }
  }, [form.price, form.discount]);
  
  const handleUpload = async () => {
    const requiredFields = ["title", "description", "subCategory", "usage", "price", "techStack"];
    const isEmpty = requiredFields.some((field) => !form[field]);
    if (isEmpty || !thumbnail || !zipFile) {
      return alert("Please fill all required fields and upload a thumbnail.");
    }

    setLoading(true);
    try {
      const thumbnailRef = ref(storage, `thumbnails/${Date.now()}_${thumbnail.name}`);
      await uploadBytes(thumbnailRef, thumbnail);
      const thumbnailUrl = await getDownloadURL(thumbnailRef);

      // Upload zip file
    const zipRef = ref(storage, `templateFiles/${Date.now()}_${zipFile.name}`);
    await uploadBytes(zipRef, zipFile);
    const zipUrl = await getDownloadURL(zipRef);

    // Calculate discounted price
    const discountedPrice = form.price && form.discount
    ? parseFloat(form.price) * (1 - parseFloat(form.discount) / 100)
    : parseFloat(form.price);

      const newTemplate = {
        ...form,
        price: parseFloat(form.price),
        discount: parseFloat(form.discount),
        thumbnail: thumbnailUrl,
        tags: form.tags.split(",").map((tag) => tag.trim()),
        downloadsCount: 0,
        createdAt: serverTimestamp(),
        platformSupport: form.platformSupport.split(",").map((p) => p.trim()),
      };

      await addDoc(collection(db, "templates"), newTemplate);
      alert("Template uploaded!");

      setForm({
        title: "",
        category: "UI/UX",
        techStack: "Figma",
        subCategory: "",
        description: "",
        usage: "",
        price: "",
        discount: 0,
        isFree: false,
        previewUrl: "",
        fileUrl: "",
        license: "Personal & Commercial",
        featured: false,
        creatorName: "TemplateHub",
        platformSupport: "",
        tags: "",
      });
      setThumbnail(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-form">
      <h2>Upload Template</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="UI">UI</option>
        <option value="UI/UX">UI/UX</option>
      </select>
      <select name="techStack" value={form.techStack} onChange={handleChange}>
        <option value="Figma">Figma</option>
        <option value="Bubble">Bubble</option>
        <option value="Flutterflow">Flutterflow</option>
        <option value="React">React</option>
        <option value="HTML">HTML</option>
      </select>
      <input name="subCategory" value={form.subCategory} onChange={handleChange} placeholder="Subcategory (e.g. E-commerce)" />
      <input name="usage" value={form.usage} onChange={handleChange} placeholder="Use case (e.g. landing page)" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Template description" />
      <input name="platformSupport" value={form.platformSupport} onChange={handleChange} placeholder="Platform Support (comma separated)" />
      <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price (USD)" />
      <input name="discount" type="number" value={form.discount} onChange={handleChange} placeholder="Discount (%)" />
      <input name="previewUrl" value={form.previewUrl} onChange={handleChange} placeholder="Preview Link (Figma/Bubble/etc)" />
      <input name="fileUrl" type="file" accept=".zip" value={form.fileUrl} onChange={handleChange} placeholder="Download File URL (e.g. .zip)" />
      <input name="creatorName" value={form.creatorName} onChange={handleChange} placeholder="Creator Name" />
      <select name="license" value={form.license} onChange={handleChange}>
        <option value="Personal & Commercial">Personal & Commercial</option>
        <option value="Personal Only">Personal Only</option>
        <option value="Commercial Only">Commercial Only</option>
      </select>
      <input type="file" accept=".zip" onChange={(e) => setZipFile(e.target.files[0])} />

      <label>
        <input type="checkbox" name="isFree" checked={form.isFree} onChange={handleChange} />
        Free Template
      </label>
      <label>
        <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
        Featured Template
      </label>
      <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Template"}
      </button>

      <style>
        {`
          .upload-container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            font-family: 'Segoe UI', sans-serif;
            background: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
          }
          h2 {
            text-align: center;
            color: #333;
          }
          .upload-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          .upload-form input,
          .upload-form select {
            padding: 12px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 6px;
            outline: none;
            transition: 0.3s;
          }
          .upload-form input:focus,
          .upload-form select:focus {
            border-color: #4a90e2;
            box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
          }
          .upload-form button {
            padding: 12px;
            background-color: #4a90e2;
            color: white;
            border: none;
            font-size: 16px;
            cursor: pointer;
            border-radius: 6px;
            transition: background 0.3s;
          }
          .upload-form button:hover {
            background-color: #357ABD;
          }
          .upload-form label {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
          }
        `}
      </style>
    </div>
  );
}

export default UploadTemplate;
