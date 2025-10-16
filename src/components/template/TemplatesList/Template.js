import React, { useState, useEffect } from 'react'
import './Template.css'
import TemplateSearchSlider from './TemplateSearchSlider'
import TemplateCarousel from '../CatCarousel'
import graphic from '../../../assets/grapic.jpeg'
import website from '../../../assets/website.jpeg'
import appImg from '../../../assets/app.jpeg'
import figma from '../../../assets/figma.jpeg'
import bubble from '../../../assets/bubble.jpeg'
import flutter from '../../../assets/flutter.jpeg'
import TemplateFetcher from './TemplateFetcher'
//import AllCategories from './GraphicSection'
import { db } from '../../../server/firebase'  // adjust path
import { collection, getDocs } from "firebase/firestore"
import { Helmet } from "react-helmet-async";


const Template = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [totalTemplates, setTotalTemplates] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch templates
        const templatesSnap = await getDocs(collection(db, "templates"));
        const templates = templatesSnap.docs.map((doc) => doc.data());

        // Count templates per category
        const counts = {};
        templates.forEach((t) => {
          const cat = (t.category || "Uncategorized").trim();
          counts[cat] = (counts[cat] || 0) + 1;
        });

        // Fetch category images from "categories" collection
        const catSnap = await getDocs(collection(db, "categories"));
        const categoryDocs = catSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Merge category images with counts
        const mergedData = categoryDocs.map((cat) => ({
          name: `${cat.name} Templatesddc`,
          count: counts[cat.name] || 0,
          image: cat.image,
        }));

        setCategoryData(mergedData);
        setTotalTemplates(templates.length);
      } catch (err) {
        console.error("Error fetching template data:", err);
      }
    };

    fetchData();
  }, []);




  return (
    <div className='template'>
      <Helmet>
        <title>Web Templates — GraceTech</title>
        <meta
          name="description"
          content="Download or customize React web templates by GraceTech. Fast, clean, and ready to deploy."
        />
        <link rel="canonical" href="https://gracetech.vercel.app/templates" />
      </Helmet>

        <div className='temp-bann'>
            <h1><span>Template</span> Assets & Templates</h1>
            <p style={{ color: "#ccc" }}>With unlimited downloads of template assets and templates, we've got all the creative ammo you need to create something epic.</p>
            <TemplateSearchSlider />
        </div>

        <div className='temp-cat'>
            <h4>Browse by category</h4>
            <p>{totalTemplates} assets</p>

            <TemplateCarousel categories={categoryData} />
        </div>

        <div>
          {/*<AllCategories />*/}
          <TemplateFetcher />
        </div>
        
    </div>
  )
}

export default Template
