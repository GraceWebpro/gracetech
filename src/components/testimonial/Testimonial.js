import { useEffect, useState } from 'react';
import './Testimonial.css';

const testimonials = [
  {
    name: "Lily Johnson",
    star: "⭐⭐⭐⭐⭐",
    sector: "Business Owner",
    quote: "I’ve been using this service for several months now, and I can honestly say it’s been a game-changer for my business. The ease of use and the level of customization available is unmatched.",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
  },
  {
    name: "John Smith",
    star: "⭐⭐⭐⭐⭐",
    sector: "Marketing Specialist",
    quote: "I was initially a little hesitant about switching to this platform, but I am so glad I did. The tool has simplified my workflow and increased my efficiency by at least 30%.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
  },
  {
    name: "Emily Rose",
    star: "⭐⭐⭐⭐⭐",
    sector: "Freelance Graphic Designer",
    quote: "As a freelancer, time management is everything, and this service has helped me manage my projects better than any tool I’ve used before. The functionality is robust and versatile, and the performance is consistent.",
    img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39"
  },
];

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(activeIndex); // Store the current index before changing
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const { name, quote, star, sector } = testimonials[activeIndex];

  return (
    <div className='testimonials'>
      <div className='test-h' style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent:'center' }} data-aos="fade-down">
        <div className='test-bdr'></div>
        <h2 style={{ textAlign: 'center', fontFamily: 'Dancing Script, "sans-seriff"', color: '#0059ff' }}>Testimonial</h2>
        <div className='test-bdr'></div>
      </div>
      <p className='test-title' data-aos="fade-up" data-aos-duration="500">Happy Words From Happy Customer</p>
      <div className="testimonial-section">
        <div className="image-side left">
          <img
            src={testimonials[0].img}
            alt={testimonials[0].name}
            className={`image-round ${activeIndex === 0 ? 'active' : ''}`}
          />
          <img
            src={testimonials[1].img}
            alt={testimonials[1].name}
            className={`image-top-right-round ${activeIndex === 1 ? 'active' : ''}`}
          />
        </div>

        <div style={{ flexDirection: 'column', flex: 1, height: '700px' }}>
            <div className="testimonial-content-container">
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className={`testimonial-content ${
                    activeIndex === index ? 'active' : 'inactive'
                  }`}
                >
                  <p>{t.star}</p>
                  <p>"{t.quote}"</p>
                  <h4>{t.name}</h4>
                  <h5>{t.sector}</h5>
                </div>
              ))}
            </div>

            {/* Dots for navigation */}
            <div className="dots-container">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => {
                    setPrevIndex(activeIndex);
                    setActiveIndex(index);
                  }}
                />
              ))}
            </div>
          </div>

        <div className="image-side right">
          <img
            src={testimonials[2].img}
            alt={testimonials[2].name}
            className={`image-top-round ${activeIndex === 2 ? 'active' : ''}`}
          />
        </div>

  
      </div>
    </div>
  );
}
