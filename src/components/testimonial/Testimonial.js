import { useEffect, useState } from 'react';
import './Testimonial.css';

const testimonials = [
  {
    name: "Sandra Johnson",
    star: "⭐⭐⭐⭐⭐",
    sector: "Co-Founder, NovaPlay Studios",
    quote: "The team doesn’t just build — they innovate. GraceTech suggested ideas and features we hadn’t even considered, and they made all the difference in the final product. Our audience loves the experience, and the feedback has been incredible.",
    testImg: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
  },
  {
    name: "Jason Miller",
    star: "⭐⭐⭐⭐⭐",
    sector: "Co-Founder of Urban Nest",
    quote: "We came to them with a rough idea for our website, and they brought it to life better than we imagined. The layout, functionality, and speed are top-notch. They made the entire process seamless and stress-free.",
    testImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
  },
  {
    name: "Samir Verma",
    star: "⭐⭐⭐⭐⭐",
    sector: "Founder, Indie Game Studio",
    quote: "GraceTech brought our vision to life. We couldn't have asked for a better development partner! Their communication was clear, timelines were met, and the end result exceeded all expectations.",
    testImg: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39"
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

  const [isPaused, setIsPaused] = useState(false);

useEffect(() => {
  if (isPaused) return;
  const interval = setInterval(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, 5000);
  return () => clearInterval(interval);
}, [isPaused]);


  const { name, quote, star, sector } = testimonials[activeIndex];

  return (
    <div id='testimonials' className='testimonials' onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}>
      <div className='test-h' style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent:'center' }} data-aos="fade-down">
        <div className='test-bdr'></div>
        <h2 style={{ textAlign: 'center', fontFamily: 'Dancing Script, cursive, Arial, "sans-seriff"', color: '#0059ff' }}>Testimonial</h2>
        <div className='test-bdr'></div>
      </div>
      <p className='test-title' data-aos="fade-up" data-aos-duration="500">Happy Words From Happy Customer</p>
      <div className="testimonial-section">
        <div className="image-side left">
          <img
            src={testimonials[0].testImg}
            alt={testimonials[0].name}
            className={`image-round ${activeIndex === 0 ? 'active' : ''}`}
          />
          <img
            src={testimonials[1].testImg}
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
            src={testimonials[2].testImg}
            alt={testimonials[2].name}
            className={`image-top-round ${activeIndex === 2 ? 'active' : ''}`}
          />
        </div>

  
      </div>
    </div>
  );
}
