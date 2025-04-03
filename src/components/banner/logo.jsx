import React from 'react'
import ReactL from '../../assets/react2-removebg-preview.png'
import Bubble from '../../assets/bubble.io2-removebg-preview.png'
import Figma from '../../assets/figma-removebg-preview.png'
import Next from '../../assets/nextjs-removebg-preview.png'
import Flutter from '../../assets/flutterflow2-removebg-preview.png'
import Canva from '../../assets/canva-removebg-preview.png'

const Logo = () => {
  return (
    <div className="logo-marquee">
  <div className="logos">
    <p>React.js <img src={ReactL} alt="React Logo" height={30} width={30}/></p>
    <p>Bubble.io <img src={Bubble} alt="Bubble.io Logo" height={30} width={30}/></p>
    <p>Figma <img src={Figma} alt="Figma Logo" height={30} width={30}/></p>
    <p>Next.js <img src={Next} alt="Next.js Logo" height={30} width={30}/></p>
    <p>Flutterflow.io <img src={Flutter} alt="Flutterflow.io Logo" height={30} width={30}/></p>
    <p>Canva <img src={Canva} alt="Canva Logo" height={30} width={30}/></p>

  </div>
</div>

  )
}

export default Logo
