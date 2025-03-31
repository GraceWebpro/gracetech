import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Skills.css";
import dev1 from '../../assets/dev2.png';
import dev2 from '../../assets/dev2.png';
import dev3 from '../../assets/dev2.png';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const sliderImageUrl = [
  //First image url
  {
    url: dev1,
    title: "Web Development"
  },
  {
    url: dev2,
    title: "UI/UX Design"
  },
  //Second image url
  {
    url: dev3,
    title: "Logo Design"
  },
  //Third image url
  {
    url: dev1,
    title: "Web Development"
  },

  //Fourth image url

  {
    url: dev2,
    title: "Social Media"
  }
];
const Slider = () => {

  
  return (
    <div className="cont" data-aos="zoom-in">
      <h2>Skills</h2>
      <p style={{ marginTop: '10px', fontSize: '15px' }}>this is the skills section of this portfolio</p>

      <div className="parent">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          partialVisible={false}
          dotListClass="custom-dot-list-style"
        >
          {sliderImageUrl.map((imageUrl, index) => {
            return (
              <div className="slider" key={index}>
                <img src={imageUrl.url} alt="movie" />
                <p>{imageUrl.title}</p>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};
export default Slider;
