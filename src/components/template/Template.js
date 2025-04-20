import React from 'react'
import './Template.css'
import TemplateSearchSlider from './TemplateSearchSlider'
import TemplateCarousel from './CatCarousel'
import graphic from '../../assets/grapic.jpeg'
import website from '../../assets/website.jpeg'
import appImg from '../../assets/app.jpeg'
import figma from '../../assets/figma.jpeg'
import bubble from '../../assets/bubble.jpeg'
import flutter from '../../assets/flutter.jpeg'

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
            <TemplateCarousel categories={categoryData} />
        </div>
        
    </div>
  )
}

export default Template
