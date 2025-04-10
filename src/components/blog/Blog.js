import React, { useState } from 'react'
import './Blog.css'
import { IoMailOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
import { Link } from 'react-router-dom';
import blog from '../../assets/dummyImg.jpg';
import { IoEyeOutline } from "react-icons/io5";



const Blog = () => {
    
    
  return (
    <section className='blog' id='blog'>
        
        <div className='blog-left'>
            <div className='meet-h' style={{ display: 'flex', gap: '20px', alignItems: 'center',}} data-aos="fade-down">
              <div className='cont-bdr'></div>
              <h2 style={{ textAlign: 'center', fontFamily: 'Dancing Script, "sans-seriff"', color: '#fff' }}>Blog</h2>

            </div>
            <div className='meet-pa'>
                <h4 data-aos="fade-up" className='meet-title'>Recent Posts</h4>
            </div>

            <Link to='/blog' className="click-more-btn blog-btn" style={{ marginTop: '20px' }}>
                <span>Click More</span>
                <BsArrowRight />
            </Link>
            
        </div>
        <div className='blog-right'>
            <div className='blog-line'></div>
       
            <div className='blog-div div-first' data-aos="zoom-in-up" data-aos-duration="500">
                    
                <div className='blog-cont-left' style={{ flexDirection: 'column' }}>
                    <p><strong>October 19, 2023</strong> </p>
                    <h6>Brand Design That Helps The Company Glow</h6>
                </div>

                <div className='blog-cont-right'>
                    <img src={blog} alt='blog' className='blog-img'/>
                    <div className='blog-icon-div'>
                        <IoEyeOutline className='blog-icon'/>
                    </div>
                </div>
            </div>

            <div className='blog-div' data-aos="zoom-in-up" data-aos-duration="500">
                    
                <div className='blog-cont-left' style={{ flexDirection: 'column' }}>
                    <p><strong>October 19, 2023</strong> </p>
                    <h6>Fresh Design Ideas & Inspiration For 2023</h6>
                </div>

                <div className='blog-cont-right'>
                    <img src={blog} alt='blog' className='blog-img'/>
                    <div className='blog-icon-div'>
                        <IoEyeOutline className='blog-icon'/>
                    </div>
                </div>
            </div>

            <div className='blog-div' data-aos="zoom-in-up" data-aos-duration="500">
                    
                <div className='blog-cont-left' style={{ flexDirection: 'column' }}>
                    <p><strong>October 19, 2023</strong> </p>
                    <h6>Brand Design That Helps The Company Glow</h6>
                </div>

                <div className='blog-cont-right'>
                    <img src={blog} alt='blog' className='blog-img'/>
                    <div className='blog-icon-div'>
                        <IoEyeOutline className='blog-icon'/>
                    </div>
                </div>
            </div>
                
            
        </div>
    </section>
  )
}

export default Blog
