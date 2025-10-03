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

const categoryData = [
    { 
      name: 'Graphic Templates', 
      count: 12, 
      image: graphic
    },
    { 
      name: 'Website Templates', 
      count: 8, 
      image: website
    },
    { 
      name: 'App Templates', 
      count: 5, 
      image: appImg
    },
    { 
      name: 'Figma Templates', 
      count: 14, 
      image: figma
    },
    { 
      name: 'Bubble Templates', 
      count: 7, 
      image: bubble
    },
    { 
      name: 'FlutterFlow Templates', 
      count: 10, 
      image: flutter
    }
  ];
  

const Template = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [totalTemplates, setTotalTemplates] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "templates"));
        const templates = snapshot.docs.map(doc => doc.data());

        // categories you care about
        const categories = [
          { name: 'Graphic Templates', image: graphic },
          { name: 'Website Templates', image: website },
          { name: 'App Templates', image: appImg },
          { name: 'Figma Templates', image: figma },
          { name: 'Bubble Templates', image: bubble },
          { name: 'FlutterFlow Templates', image: flutter }
        ];

        // count docs per category
        const updated = categories.map(cat => {
          const count = templates.filter(t => t.category === cat.name).length;
          return { ...cat, count };
        });

        setCategoryData(updated);
      } catch (err) {
        console.error("Error fetching templates:", err);
      }
    };

    fetchCounts();
  }, []);


  return (
    <div className='template'>
        <div className='temp-bann'>
            <h1><span>Template</span> Assets & Templates</h1>
            <p>With unlimited downloads of template assets and templates, we've got all the creative ammo you need to create something epic.</p>
            <TemplateSearchSlider />
        </div>

        <div className='temp-cat'>
            <h4>Browse by category</h4>
            <p>21,999,668 assets</p>
            <p>{categoryData.reduce((sum, cat) => sum + cat.count, 0)} assets</p>
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
