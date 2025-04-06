import { useEffect, useState } from 'react';
import './Testimonial.css';

const testimonials = [
  {
    name: "Jane Doe",
    quote: "This service is amazing!",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
  },
  {
    name: "John Smith",
    quote: "Really loved the quality and support!",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
  },
  {
    name: "Emily Rose",
    quote: "Truly exceptional experience!",
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

  const { name, quote } = testimonials[activeIndex];

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
      <div className="testimonial-content-container">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`testimonial-content ${
              activeIndex === index
                ? 'active'
                : activeIndex > index
                ? 'left'
                : 'right'
            }`}
          >
            <p>"{quote}"</p>
            <h4>- {name}</h4>
          </div>
        ))}
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
