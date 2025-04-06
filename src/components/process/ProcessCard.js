import React from 'react'

const ProcessCard = () => {
  return (
    <div className="process-section">
  <div className="process-card" data-aos="flip-up">
    <h3>Concept</h3>
    <p>Brainstorming and sketching ideas for layout, structure, and UX goals.</p>
    <ul className="step-list">
      <li><span className="dot"></span> Reviewing any existing branding</li>
      <li><span className="dot"></span> Target audience and competitors research</li>
      <li><span className="dot"></span> UX Planning</li>
    </ul>
    <div className="corner-shade"></div>
  </div>
  <div className="process-card" data-aos="flip-up">
    <h3>Design</h3>
    <p>Creating UI designs that are clean, modern, and user-friendly.</p>
    <ul className="step-list">
      <li><span className="dot"></span> Developing wireframes and mockup</li>
      <li><span className="dot"></span> Choosing typography, color palettes,</li>
      <li><span className="dot"></span> Refining the design</li>
    </ul>
    <div className="corner-shade"></div>
  </div>
  <div className="process-card" data-aos="flip-up">
    <h3>Webflow</h3>
    <p>Turning designs into responsive, pixel-perfect websites.</p>
    <ul className="step-list">
      <li><span className="dot"></span> Responsive Build</li>
      <li><span className="dot"></span> CMS Integration</li>
      <li><span className="dot"></span> Animation & Launch</li>
    </ul>
    <div className="corner-shade"></div>
  </div>
</div>

  )
}

export default ProcessCard
