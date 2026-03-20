import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from "../server/firebase"; // Ensure Firebase is properly set up
import { uploadToR2 } from "../new-ui/utils/r2Upload";



const UploadContent = () => {
  const [selectedMode, setSelectedMode] = useState('movie'); // 'movie', 'episode', or 'music'
  

  const [projectFile, setProjectFile] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [githubLink, setGithubLink] = useState("");


  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectProgress, setProjectProgress] = useState(0); // Track upload progress
  const [isProjectUploading, setIsProjectUploading] = useState(false); // Track upload state
  const [technologyStacks, setTechnologyStacks] = useState('');
  const [keyFeatures, setKeyFeatures] = useState('');
  const [userBenefits, setUserBenefits] = useState('');
  const [challenges, setChallenges] = useState('');
  const [solutions, setSolutions] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');
  
  const createSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // replace spaces/specials with hyphens
    .replace(/^-+|-+$/g, '');    // remove leading/trailing hyphens


  const handleProjectUpload = async () => {
    if (!projectFile || !projectTitle || !projectCategory) return alert("Please select an image and enter a title and a category.");

    const techStacksArray = technologyStacks.split(',').map(item => item.trim());
    const keyFeaturesArray = keyFeatures.split(',').map(item => item.trim());
    const userBenefitsArray = userBenefits.split(',').map(item => item.trim());
    const challengesArray = challenges.split(',').map(item => item.trim());
    const solutionsArray = solutions.split(',').map(item => item.trim());

    const storageRef = ref(storage, `projects/${projectFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, projectFile);

    setIsProjectUploading(true); // Set uploading state

    uploadTask.on(
      "state_changed",
      (snapshot) => {
       // Calculate progress percentage
        const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProjectProgress(progressPercent.toFixed(0)); // Update progress state
      },
      (error) => {
        console.error(error);
        setIsProjectUploading(false);
      },
      async () => {
        const slug = createSlug(title);
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "projects"), {
          projectTitle,
          projectDescription,
          slug,
          demoLink,
          githubLink,
          imageUrl: url,
          projectCategory,
          technologyStacks: techStacksArray, // store as array
          keyFeatures: keyFeaturesArray,
          userBenefits: userBenefitsArray,
          challenges: challengesArray,
          solutions: solutionsArray,
          projectStartDate, // you can convert this to Timestamp if you want
          projectEndDate,
          timestamp: new Date(),
        });
        alert("Project uploaded successfully!");
        setIsProjectUploading(false);
        setProjectProgress(0); // Reset progress
        setProjectTitle("");
        setDemoLink("");
        setGithubLink("");
        setProjectCategory("");
        setProjectDescription("");
        setProjectFile(null);

        // Reset new fields
        setTechnologyStacks('');
        setKeyFeatures('');
        setUserBenefits('');
        setChallenges('');
        setSolutions('');
        setProjectStartDate('');
        setProjectEndDate('');
      }
    );
  };

  // Templates Function
  const [form, setForm] = useState({
    title: "",
    usecaseIntro: "",
    category: "figma", // react | bubble | figma | html
    techStacks: "", // comma separated
    description: "",
    useCases: "",
    previewUrl: "",
    license: "Personal & Commercial",
    featured: false,
    creatorName: "GraceTech",
    platformSupport: "", // comma separated
    tags: "",
    isFree: false,
    pages: "",
  
    // PRICING & VERSIONS
    versions: {
      free: {
        label: "Free",
        available: false,
        price: 0,
        features: ""
      },
      pro: {
        label: "Pro",
        available: false,
        price: "",
        features: ""
      },
      figma: {
        label: "Figma",
        available: false,
        price: "",
        features: ""
      }
    },
    discount: 0, // applies only to pro or figma
    bundle: { available: false, price: "" } // optional bundle
  });

  
  

  // Separate file states
const [thumbnail, setThumbnail] = useState(null);
const [images, setImages] = useState([]);
const [freeZip, setFreeZip] = useState(null);
const [proZip, setProZip] = useState(null);
const [figmaFile, setFigmaFile] = useState(null);
const [loading, setLoading] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  
  const [progress, setProgress] = useState({
    thumbnail: 0,
    images: 0,
    free: 0,
    pro: 0,
    figma: 0
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleArrayChange = (e, field) => {
    const { value, checked } = e.target;
  
    setForm((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]        // add
        : prev[field].filter(v => v !== value) // remove
    }));
  };
  
  useEffect(() => {
    if (form.price && form.discount) {
      const price = parseFloat(form.price);
      const discount = parseFloat(form.discount);
      const calculated = price * (1 - discount / 100);
      setDiscountedPrice(parseFloat(calculated.toFixed(2)));
    }
  }, [form.price, form.discount]);

  const handleTemplateUpload = async () => {
    if (!form.title || !form.description || !thumbnail)
      return alert("Fill required fields and upload thumbnail.");
  
    setLoading(true);
  
    const slug = createSlug(form.title);
  
    // Reset progress
    setProgress({ thumbnail: 0, free: 0, pro: 0, figma: 0, images: 0 });
  
    try {
      // ------------------- Helper: Upload file to R2 with progress -------------------
      
  
      // ------------------- Upload thumbnail -------------------
      const thumbnailUrl = await uploadToR2(thumbnail, slug, (p) =>
      setProgress((prev) => ({ ...prev, thumbnail: p }))
      );  
      // ------------------- Upload additional images -------------------
      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const imgUrl = await uploadToR2(images[i], `images-${i}`);
        imageUrls.push(imgUrl);
      }
  
      // ------------------- Upload versions -------------------
      const freeUrl = freeZip
      ? await uploadToR2(freeZip, slug, (p) =>
          setProgress((prev) => ({ ...prev, free: p }))
        )
      : null;

    const proUrl = proZip
      ? await uploadToR2(proZip, slug, (p) =>
          setProgress((prev) => ({ ...prev, pro: p }))
        )
      : null;

    const figmaUrl = figmaFile
      ? await uploadToR2(figmaFile, slug, (p) =>
          setProgress((prev) => ({ ...prev, figma: p }))
        )
      : null;

      // ------------------- Build Firestore object -------------------
      const templateData = {
        title: form.title,
        usecaseIntro: form.usecaseIntro,
        description: form.description,
        useCases: form.useCases,
        category: form.category,
        techStacks: form.techStacks.split(",").map((t) => t.trim()),
        previewUrl: form.previewUrl,
        thumbnail: thumbnailUrl,
        images: imageUrls,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        platformSupport: typeof form.platformSupport === "string"
        ? form.platformSupport.split(",").map((p) => p.trim())
        : form.platformSupport,        
        license: form.license,
        featured: form.featured,
        pages: form.pages,
        creatorName: form.creatorName,
        downloadsCount: 0,
        isFree: form.isFree,
        slug,
        createdAt: serverTimestamp(),
        versions: {
          free: {
            label: form.versions.free.label,
            available: !!freeUrl,
            downloadUrl: freeUrl,
            price: 0,
            features: form.versions.free.features
              ? form.versions.free.features.split(",").map((f) => f.trim())
              : [],
          },
          pro: {
            label: form.versions.pro.label,
            available: !!proUrl,
            downloadUrl: proUrl,
            price: proUrl ? parseFloat(form.versions.pro.price) : 0,
            features: form.versions.pro.features
              ? form.versions.pro.features.split(",").map((f) => f.trim())
              : [],
          },
          figma: {
            label: form.versions.figma.label,
            available: !!figmaUrl,
            downloadUrl: figmaUrl,
            price: figmaUrl ? parseFloat(form.versions.figma.price) : 0,
            features: form.versions.figma.features
              ? form.versions.figma.features.split(",").map((f) => f.trim())
              : [],
          },
        },
        bundle: {
          available: form.bundle.available,
          price: parseFloat(form.bundle.price) || 0,
          files: ["pro", "figma"],
        },
      };
  
      await addDoc(collection(db, "templates"), templateData);
  
      alert("Template uploaded successfully!");
  
      // ------------------- Reset form -------------------
      setForm({
        title: "",
        description: "",
        usecaseIntro: "",
        useCases: "",
        category: "",
        techStacks: "",
        previewUrl: "",
        tags: "",
        platformSupport: "",
        license: "",
        featured: false,
        pages: "",
        creatorName: "",
        versions: {
          free: { label: "", features: "" },
          pro: { label: "", features: "", price: "" },
          figma: { label: "", features: "", price: "" },
        },
        bundle: { available: false, price: 0 },
      });
      setThumbnail(null);
      setImages([]);
      setFreeZip(null);
      setProZip(null);
      setFigmaFile(null);
      setProgress({});
    } catch (err) {
      console.error(err);
      alert("Upload failed: " + err);
    } finally {
      setLoading(false);
    }
  };
    
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('Web Design');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [format, setFormat] = useState('Video');
  const [category, setCategory] = useState('Video');
  const [price, setPrice] = useState(0);
  const [isFree, setIsFree] = useState(true);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [authorAvatarUrl, setAuthorAvatarUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sections, setSections] = useState([
    { title: "", lessons: [{ title: "", duration: "" }] },
  ]);


  // Add a new section
  const addSection = () => {
    setSections([...sections, { title: "", lessons: [{ title: "", duration: "" }] }]);
  };

   // Add a new lesson to a section
   const addLesson = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons.push({ title: "", duration: "" });
    setSections(updatedSections);
  };

  // Handle field changes
  const handleSectionChange = (e, index) => {
    const updated = [...sections];
    updated[index].title = e.target.value;
    setSections(updated);
  };

  const handleLessonChange = (e, sectionIndex, lessonIndex, field) => {
    const updated = [...sections];
    updated[sectionIndex].lessons[lessonIndex][field] = e.target.value;
    setSections(updated);
  };


  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const uploadFileToStorage = (file, path) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `${path}/${file.name}_${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || (!isFree && !videoFile) || (isFree && !youtubeUrl)) {
      alert("Please complete all required fields.");
      return;
    }

    setUploading(true);

    try {
      let videoUrl = '';
      let thumbnailUrl = '';

      if (!isFree && videoFile) {
        videoUrl = await uploadFileToStorage(videoFile, 'courses');
      }

      if (thumbnailFile) {
        thumbnailUrl = await uploadFileToStorage(thumbnailFile, 'thumbnails');
      }

      const slug = createSlug(title);

      const courseData = {
        title,
        slug,
        description,
        topic,
        difficulty,
        category,
        format,
        isFree,
        price: isFree ? 0 : Number(price),
        videoUrl,
        youtubeUrl: isFree ? youtubeUrl : '',
        thumbnailUrl,
        sectionTitle,
        sections,
        author: {
          name: authorName,
          bio: authorBio,
          avatarUrl: authorAvatarUrl
        },
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "courses"), courseData);

      alert("Video uploaded successfully!");
      // Reset form
      setTitle('');
      setDescription('');
      setTopic('Web Design');
      setDifficulty('Beginner');
      setCategory('')
      setFormat('Video');
      setPrice(0);
      setIsFree(true);
      setVideoFile(null);
      setThumbnailFile(null);
      setYoutubeUrl('');
      setAuthorName('');
      setAuthorBio('');
      setAuthorAvatarUrl('');
      setSectionTitle("");
      setSections([{ title: "", lessons: [{ title: "", duration: "" }] }]);
      setUploadProgress(0);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Upload failed.");
      setUploading(false);
    }
  };



 
  return (
    <div className='upload-container' style={{ color: '#000'}}>
      <div className='mode-toggle'>
        <button onClick={() => setSelectedMode('project')} className={selectedMode === 'project' ? 'active' : ''}>Project</button>
        <button onClick={() => setSelectedMode('template')} className={selectedMode === 'template' ? 'active' : ''}>Template</button>
        <button onClick={() => setSelectedMode('course')} className={selectedMode === 'course' ? 'active' : ''}>Course</button>
      </div>

      {selectedMode === 'project' && (
        <>
           <h2>Upload New Project</h2>

                <div className="input-group">
                <input 
                    type="text" 
                    placeholder="Project Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="input-field"
                />
                </div>


                <div className="input-group">
                <textarea 
                    placeholder="Project Description" 
                    value={description} 
                    onChange={(e) => setProjectDescription(e.target.value)} 
                    className="textarea-field"
                />
                </div>


                <div className="input-group">
                  <select
                    value={projectCategory}
                    onChange={(e) => setProjectCategory(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select Project Category</option>
                    <option value="UI Design">UI Design</option>
                    <option value="UX Design">UX Design</option>
                    <option value="AI Video">AI Video</option>
                  </select>
                </div>


                <div className="input-group">
                <textarea
                  type="text"
                  className='textarea-field'
                  placeholder="Technology stacks (comma separated)"
                  value={technologyStacks}
                  onChange={(e) => setTechnologyStacks(e.target.value)}
                />
                </div>


                <div className="input-group">
                <textarea
                  type="text"
                  className="textarea-field"
                  placeholder="Key features (comma separated)"
                  value={keyFeatures}
                  onChange={(e) => setKeyFeatures(e.target.value)}
                />
                </div>


                <div className="input-group">
                <textarea
                  type="text"
                  className="textarea-field"
                  placeholder="User benefits (comma separated)"
                  value={userBenefits}
                  onChange={(e) => setUserBenefits(e.target.value)}
                />
                </div>


                <div className="input-group">
                <textarea
                  type="text"
                  className="textarea-field"
                  placeholder="Challenges (comma separated)"
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                />
                </div>

                <div className="input-group">
                <textarea
                  type="text"
                  className="textarea-field"
                  placeholder="Solutions (comma separated)"
                  value={solutions}
                  onChange={(e) => setSolutions(e.target.value)}
                />
                </div>

                 <div className="input-group">
                 <input
                    type="date"
                    className="input-field"
                    value={projectStartDate}
                    onChange={(e) => setProjectStartDate(e.target.value)}
                  />
                </div>

                <div className="input-group">
                <input
                  type="date"
                  className="input-field"
                  value={projectEndDate}
                  onChange={(e) => setProjectEndDate(e.target.value)}
                />
                </div>

                <div className="input-group">
                <input 
                    type="text" 
                    placeholder="Project Demo Link" 
                    value={demoLink} 
                    onChange={(e) => setDemoLink(e.target.value)} 
                    className="input-field"
                />
                </div>

                <div className="input-group">
                <input 
                    type="text" 
                    placeholder="Project Github Link" 
                    value={demoLink} 
                    onChange={(e) => setGithubLink(e.target.value)} 
                    className="input-field"
                />
                </div>


                <div className="input-group">
                <input 
                    type="file" 
                    onChange={(e) => setProjectFile(e.target.files[0])} 
                    className="file-input"
                />
                </div>

                {isProjectUploading && (
                <div className="progress-container">
                    <progress value={projectProgress} max="100" className="progress-bar"></progress>
                    <p className="progress-text">{projectProgress}% uploaded</p>
                </div>
                )}

                <button 
                onClick={handleProjectUpload} 
                disabled={isProjectUploading} 
                className="submit-btn"
                >
                {isProjectUploading ? "Uploading..." : "Upload"}
                </button>
        </>
      )}

      {selectedMode === 'template' && (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-10">

        <h2 className="text-2xl font-bold">Upload Template</h2>
      
        {/* ========== BASIC INFO ========== */}
        <section className="space-y-4">
          <h3 className="font-semibold text-gray-700">Basic Info</h3>
      
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Template Title"
            className="input"
          />
      
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Template description"
            className="input h-48"
          />
      
        
        </section>

        {/* ========== USE CASES ========== */}
        <section className="space-y-4">
          <h3 className="font-semibold text-gray-700">Use Cases</h3>

          <input
            name="usecaseIntro"
            value={form.usecaseIntro}
            onChange={handleChange}
            placeholder="UseCases paragraph"
            className="input"
          />

          <textarea
            name="useCases"
            value={form.useCases}
            onChange={handleChange}
            placeholder="Restaurants, food delivery startups, cafes, food trucks..."
            className="input h-28"
          />
        </section>
      
      
        {/* ========== CATEGORY / TECH ========== */}
        <section className="space-y-4">
          <h3 className="font-semibold text-gray-700">Category & Technologies</h3>
      
          <div className="grid grid-cols-2 gap-4">
            <select name="category" value={form.category} onChange={handleChange} className="input">
              <option>UI</option>
              <option>UI/UX</option>
            </select>
      
            <select name="techStack" value={form.techStack} onChange={handleChange} className="input">
              <option>Figma</option>
              <option>React</option>
              <option>Bubble</option>
              <option>HTML</option>
              <option>Flutterflow</option>
            </select>
          </div>
      
          <input
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            placeholder="Sub category (Ecommerce, Portfolio...)"
            className="input"
          />
        </section>
      
      
        {/* ========== PLATFORM SUPPORT (Checkbox array) ========== */}
        <section>
          <h3 className="font-semibold text-gray-700 mb-3">Platform Support</h3>
      
          <div className="flex flex-wrap gap-4">
            {["Web","Desktop","Table","Mobile"].map(p => (
              <label key={p} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={p}
                  onChange={(e) => handleArrayChange(e, "platformSupport")}
                />
                {p}
              </label>
            ))}
          </div>
        </section>

        {/* ========== PAGES INCLUDED ========== */}
        <section className="space-y-4">
          <h3 className="font-semibold text-gray-700">Pages Included</h3>

          <textarea
            name="pages"
            value={form.pages}
            onChange={handleChange}
            placeholder="Homepage, Menu, Cart, Contact page..."
            className="input h-20"
          />
        </section>
      
      
        {/* ========== PRICING ========== */}
        <section className="space-y-4">
          <h3 className="font-semibold text-gray-700">Pricing</h3>

          {/* Free Version */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.versions.free.available}
              onChange={(e) =>
                setForm({
                  ...form,
                  versions: { ...form.versions, free: { ...form.versions.free, available: e.target.checked } }
                })
              }
            />
            <span>Free Version</span>

            {form.versions.free.available && (
              <textarea
                placeholder="Free Key Features (comma separated)"
                value={form.versions.free.features}
                onChange={(e) =>
                  setForm({
                    ...form,
                    versions: {
                      ...form.versions,
                      free: {
                        ...form.versions.free,
                        features: e.target.value
                      }
                    }
                  })
                }
                className="input h-20"
              />
            )}
          </div>

          {/* Pro Version */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.versions.pro.available}
                onChange={(e) =>
                  setForm({
                    ...form,
                    versions: { ...form.versions, pro: { ...form.versions.pro, available: e.target.checked } }
                  })
                }
              />
              <span>Pro Version</span>
            </label>

            {form.versions.pro.available && (
              <>
                <input
                  type="number"
                  placeholder="Pro Price"
                  value={form.versions.pro.price}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      versions: {
                        ...form.versions,
                        pro: {
                          ...form.versions.pro,
                          price: e.target.value
                        }
                      }
                    })
                  }
                  className="input"
                />

                <textarea
                  placeholder="Pro Features (comma separated)"
                  value={form.versions.pro.features}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      versions: {
                        ...form.versions,
                        pro: {
                          ...form.versions.pro,
                          features: e.target.value
                        }
                      }
                    })
                  }
                  className="input h-20"
                />
              </>
            )}
          </div>

          {/* Figma Version */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.versions.figma.available}
                onChange={(e) =>
                  setForm({
                    ...form,
                    versions: { ...form.versions, figma: { ...form.versions.figma, available: e.target.checked } }
                  })
                }
              />
              <span>Figma Design</span>
            </label>

            {form.versions.figma.available && (
              <input
                type="number"
                placeholder="Figma Price"
                value={form.versions.figma.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    versions: { ...form.versions, figma: { ...form.versions.figma, price: e.target.value } }
                  })
                }
                className="input"
              />
            )}
          </div>

          {/* Bundle */}
          <div className="flex flex-col gap-2 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.bundle.available}
                onChange={(e) => setForm({ ...form, bundle: { ...form.bundle, available: e.target.checked } })}
              />
              <span>Bundle (Pro + Figma)</span>
            </label>

            {form.bundle.available && (
              <input
                type="number"
                placeholder="Bundle Price"
                value={form.bundle.price}
                onChange={(e) => setForm({ ...form, bundle: { ...form.bundle, price: e.target.value } })}
                className="input"
              />
            )}
            
          </div>
        </section>
      
      
        {/* ========== TAGS (checkbox style) ========== */}
        <section>
          <h3 className="font-semibold text-gray-700 mb-3">Tags</h3>

            <textarea
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="react template, restaurant website, food ordering template, tailwind css"
              className="input w-full h-48"
            />

            <p className="text-xs text-gray-500 mt-2">
              Separate tags with commas.
            </p>
          </section>
      
      
        {/* ========== LINKS ========== */}
        <section className="space-y-4">
          <h3 className="font-semibold text-gray-700">Links</h3>
      
          <input
            name="previewUrl"
            value={form.previewUrl}
            onChange={handleChange}
            placeholder="Live Preview URL"
            className="input"
          />
        </section>
      
      
        {/* ========== FILES ========== */}

        <section>
          <h3 className="font-semibold text-gray-700">Files</h3>

          <p>Thumbnail</p>
          <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />

          <p>Preview Images</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages([...e.target.files])}
          />

          <p>Free Version (optional)</p>
          <input type="file" accept=".zip" onChange={(e) => setFreeZip(e.target.files[0])} />

          <p>Pro Version</p>
          <input type="file" accept=".zip" onChange={(e) => setProZip(e.target.files[0])} />

          <p>Figma Design (optional)</p>
          <input type="file" accept=".zip" onChange={(e) => setFigmaFile(e.target.files[0])} />
        </section>

<section>
  <label>
    <input type="checkbox" checked={form.bundle.available} onChange={(e) => setForm({...form, bundle: {...form.bundle, available: e.target.checked}})} />
    Enable Bundle (Pro + Figma)
  </label>
  {form.bundle.available && (
    <input
      type="number"
      placeholder="Bundle Price"
      value={form.bundle.price}
      onChange={(e) => setForm({...form, bundle: {...form.bundle, price: e.target.value}})}
      className="input"
    />
  )}
</section>
      
  {/* ================== UPLOAD PROGRESS ================== */}
  <div className="mt-6 space-y-4">
    <h3 className="font-semibold text-lg">Upload Progress</h3>

    {/* Thumbnail */}
    {progress.thumbnail >= 0 && (
      <div>
        <p className="text-sm">Thumbnail: {progress.thumbnail}%</p>
        <div className="w-full bg-gray-700 rounded h-2">
          <div
            className="bg-green-500 h-2 rounded"
            style={{ width: `${progress.thumbnail}%` }}
          />
        </div>
      </div>
    )}

    {/* Images */}
    {images.map((img, i) => progress[`images-${i}`] >= 0 && (
      <div key={i}>
        <p className="text-sm">Image {i + 1}: {progress[`images-${i}`]}%</p>
        <div className="w-full bg-gray-700 rounded h-2">
          <div
            className="bg-blue-500 h-2 rounded"
            style={{ width: `${progress[`images-${i}`]}%` }}
          />
        </div>
      </div>
    ))}

    {/* Free version */}
    {progress.free >= 0 && (
      <div>
        <p className="text-sm">Free Version: {progress.free}%</p>
        <div className="w-full bg-gray-700 rounded h-2">
          <div
            className="bg-yellow-500 h-2 rounded"
            style={{ width: `${progress.free}%` }}
          />
        </div>
      </div>
    )}

    {/* Pro version */}
    {progress.pro >= 0 && (
      <div>
        <p className="text-sm">Pro Version: {progress.pro}%</p>
        <div className="w-full bg-gray-700 rounded h-2">
          <div
            className="bg-red-500 h-2 rounded"
            style={{ width: `${progress.pro}%` }}
          />
        </div>
      </div>
    )}

    {/* Figma version */}
    {progress.figma >= 0 && (
      <div>
        <p className="text-sm">Figma Version: {progress.figma}%</p>
        <div className="w-full bg-gray-700 rounded h-2">
          <div
            className="bg-purple-500 h-2 rounded"
            style={{ width: `${progress.figma}%` }}
          />
        </div>
      </div>
    )}
  </div>
        <button
          onClick={handleTemplateUpload}
          className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90"
        >
          Upload Template
        </button>
      </div>
      
      )}

      {selectedMode === 'course' && (
        <div style={{ textAlign: 'left' }}>
         <h2>Upload New Tutorial</h2>
      <form onSubmit={handleSubmit}>
        <label>Title *</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} />

        <label>Category(lowercase) *</label>
        <input type="text" value={category} onChange={e => setCategory(e.target.value)} required />

        <label>Topic</label>
        <select value={topic} onChange={e => setTopic(e.target.value)}>
          <option>Web Design</option>
          <option>SEO</option>
          <option>Development</option>
          <option>Marketing</option>
          <option>Graphics</option>
        </select>

        <label>Difficulty</label>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <label>Format</label>
        <select value={format} onChange={e => setFormat(e.target.value)}>
          <option>Video</option>
          <option>Text</option>
          <option>PDF</option>
        </select>

        <div style={{ marginBottom: "15px" }}>
          <label>Course Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Figma Essentials"
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #444", background: "#222", color: "#fff" }}
          />
        </div>

        {sections.map((section, sIndex) => (
          <div key={sIndex} style={{ marginBottom: "25px", border: "1px solid #333", padding: "15px", borderRadius: "8px" }}>
            <label>Section Title:</label>
            <input
              type="text"
              value={section.title}
              onChange={(e) => handleSectionChange(e, sIndex)}
              placeholder="e.g. Getting Started with Figma"
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #444", background: "#222", color: "#fff" }}
            />

            <h4 style={{ marginTop: "10px" }}>Lessons</h4>
            {section.lessons.map((lesson, lIndex) => (
              <div key={lIndex} style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Lesson Title"
                  value={lesson.title}
                  onChange={(e) => handleLessonChange(e, sIndex, lIndex, "title")}
                  required
                  style={{ width: "60%", padding: "8px", marginRight: "10px", borderRadius: "5px", border: "1px solid #444", background: "#222", color: "#fff" }}
                />
                <input
                  type="text"
                  placeholder="Duration (e.g. 03:20)"
                  value={lesson.duration}
                  onChange={(e) => handleLessonChange(e, sIndex, lIndex, "duration")}
                  required
                  style={{ width: "30%", padding: "8px", borderRadius: "5px", border: "1px solid #444", background: "#222", color: "#fff" }}
                />
              </div>
            ))}
            <button type="button" onClick={() => addLesson(sIndex)} style={{ background: "#20d9a1", color: "#000", padding: "6px 10px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              + Add Lesson
            </button>
          </div>
        ))}

        <button type="button" onClick={addSection} style={{ background: "#a435f0", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "6px", cursor: "pointer", marginRight: "10px" }}>
          + Add Section
        </button>


        <label>
          <input type="checkbox" checked={isFree} onChange={e => setIsFree(e.target.checked)} />
          {" "}Mark as Free
        </label>

        {!isFree && (
          <>
            <label>Price (₹)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
            <label>Upload Video *</label>
            <input type="file" accept="video/*" onChange={handleFileChange} />
          </>
        )}

        {isFree && (
          <>
            <label>YouTube URL *</label>
            <input type="url" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} />
          </>
        )}

        <label>Thumbnail Image</label>
        <input type="file" accept="image/*" onChange={handleThumbnailChange} />

        <h4>Author Info</h4>
        <label>Name</label>
        <input type="text" value={authorName} onChange={e => setAuthorName(e.target.value)} />
        <label>Bio</label>
        <textarea value={authorBio} onChange={e => setAuthorBio(e.target.value)} rows={2} />
        <label>Avatar URL</label>
        <input type="url" value={authorAvatarUrl} onChange={e => setAuthorAvatarUrl(e.target.value)} />

        {uploading && <div>Uploading: {uploadProgress.toFixed(0)}%</div>}

        <button type="submit" disabled={uploading} style={{ marginTop: '1rem' }}>
          {uploading ? "Uploading..." : "Upload Course"}
        </button>
      </form>
        </div>
      )}

      

      {uploadProgress > 0 && <p>Upload Progress: {Math.round(uploadProgress)}%</p>}
    
    <style>
      {`
      .mode-toggle {
        display: flex;
        justify-content: center;
        gap: 10px;  /* Space between buttons */
        margin-bottom: 20px;
        margin-left: 10px;
      }
      
      .mode-toggle button {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s ease;
        font-weight: bold;
      }
      
      .mode-toggle button:hover {
        background-color: #ddd;
      }
      
      .mode-toggle button.active {
        background-color: #4CAF50;  /* Green color for active state */
        color: white;
        border-color: #4CAF50;
      }
      
      .mode-toggle button:focus {
        outline: none;
      }
      
      .mode-toggle button:active {
        transform: scale(0.98); /* Button shrink effect when clicked */
      }
      
      `}
    </style>
    
    </div>
  );
};

export default UploadContent;

<style>
{`
.mode-toggle {
  display: flex;
  justify-content: center;
  gap: 15px;  /* Space between buttons */
  margin-bottom: 20px;
}

.mode-toggle button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-weight: bold;
}

.mode-toggle button:hover {
  background-color: #ddd;
}

.mode-toggle button.active {
  background-color: #4CAF50;  /* Green color for active state */
  color: white;
  border-color: #4CAF50;
}

.mode-toggle button:focus {
  outline: none;
}

.mode-toggle button:active {
  transform: scale(0.98); /* Button shrink effect when clicked */
}

`}
</style>










