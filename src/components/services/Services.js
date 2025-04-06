import React from 'react'
import { BsArrowUpRight } from "react-icons/bs";
import './Services.css'

const Services = () => {
  return (
    <div className='services'>
        <div className='serv-h' style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent:'center' }} data-aos="fade-down">
              <div className='serv-bdr'></div>
              <h2 style={{ textAlign: 'center', fontFamily: 'Dancing Script, "sans-seriff"', color: '#0059ff' }}>Services That i Provide</h2>
              <div className='serv-bdr'></div>
        </div>
        <p className='serv-title' data-aos="fade-up" data-aos-duration="500">My Special Service For Your Business Development</p>
        <div className='serv-div-display'>
            <div className='serv-div' data-aos="fade-up" data-aos-duration="500">
                <div className='serv-left'>
                <h6>01</h6>
                    <div  style={{ flexDirection: 'column' }}>
                        <p>Designer</p>
                        <h5>Illustration Design</h5>
                    </div>
                </div>
                <div style={{ gap: '20px', width:'50%', display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: '15px', color: '#ccc', textAlign: 'left', width: '80%'}}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. sunt in culpa qui officia deserunt mollit </p>
                    <div className='serv-icon-div'>
                        <BsArrowUpRight className='serv-det-btn' />
                    </div>
                </div>
            </div>
            <div className='serv-div' data-aos="fade-up" data-aos-duration="500">
                <div className='serv-left'>
                <h6>02</h6>
                    <div  style={{ flexDirection: 'column' }}>
                        <p>Branding</p>
                        <h5>Business Branding</h5>
                    </div>
                </div>
                <div style={{ gap: '20px', width:'50%', display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: '15px', color: '#ccc', textAlign: 'left', width: '80%'}}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. sunt in culpa qui officia deserunt mollit </p>
                    <div className='serv-icon-div'>
                        <BsArrowUpRight className='serv-det-btn' />
                    </div>
                </div>
            </div>
            <div className='serv-div' data-aos="fade-up" data-aos-duration="500">
                <div className='serv-left'>
                <h6>03</h6>
                    <div  style={{ flexDirection: 'column' }}>
                        <p>UI/UX Design</p>
                        <h5>Web UI/UX Design</h5>
                    </div>
                </div>
                <div style={{ gap: '20px', width:'50%', display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: '15px', color: '#ccc', textAlign: 'left', width: '80%'}}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. sunt in culpa qui officia deserunt mollit </p>
                    <div className='serv-icon-div'>
                        <BsArrowUpRight className='serv-det-btn' />
                    </div>
                </div>
            </div>
            <div className='serv-div' data-aos="fade-up" data-aos-duration="500">
                <div className='serv-left'>
                <h6>04</h6>
                    <div  style={{ flexDirection: 'column' }}>
                        <p>Web Design</p>
                        <h5>Application Design</h5>
                    </div>
                </div>
                <div style={{ gap: '20px', width:'50%', display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: '15px', color: '#ccc', textAlign: 'left', width: '80%'}}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. sunt in culpa qui officia deserunt mollit </p>
                    <div className='serv-icon-div'>
                        <BsArrowUpRight className='serv-det-btn' />
                    </div>
                </div>
            </div>
            <div className='serv-div' data-aos="fade-up" data-aos-duration="500">
                <div className='serv-left'>
                <h6>05</h6>
                    <div  style={{ flexDirection: 'column' }}>
                        <p>Seo Analytics</p>
                        <h5>Digital Marketing</h5>
                    </div>
                </div>
                <div style={{ gap: '20px', width:'50%', display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: '15px', color: '#ccc', textAlign: 'left', width: '80%'}}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. sunt in culpa qui officia deserunt mollit </p>
                    <div className='serv-icon-div'>
                        <BsArrowUpRight className='serv-det-btn' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Services
