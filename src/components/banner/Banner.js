import React, { useState, useEffect } from 'react';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { GoArrowUpRight } from "react-icons/go";
import { Link } from 'react-router-dom';

import bannerImg from '../../assets/banner.png';
import './Banner.css'
import 'animate.css'
import TrackVisibility from 'react-on-screen'
import WorkProcess from './WorkProcess';
import Logo from './logo';
import DownloadCv from './DownloadCv';

const Banner = () => {

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);

    const toRotate = [ "Web Development Agency", "UI/UX Design Agency", "Creative Digital Agency", "Branding Experts", "Marketing Strategists" ];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta)

        return () => {clearInterval(ticker)};
    }, [text]);

    const tick = (e) => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(e, text.length - 1) : fullText.substring(e, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta /2)
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }

    return (
        <section className='banner' id='home'>
            <div className='container'>
                <div className='al-center'>
                    <div  className='bann-left'>
                       <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animates__animated animate__fadeIn" : ""}>
                                    <div>
                                        <p className='ban-av' data-aos="fade-up" data-aos-duration="1500">Currently Available For Freelance Worldwide <GoArrowUpRight /></p>
                                        <p className='bdr'></p>
                                    </div>
                                    <span className='tagline' data-aos="fade-up" data-aos-duration="1500">Welcome to GraceTech Agency</span>
                                    <h1 data-aos="fade-up" data-aos-duration="1500">Hi 👋 We<span style={{ color: '#0000ff' }}>'</span>re GraceTech<span style={{ color: '#0000ff', fontSize: '60px' }}>.</span></h1> 
                                    <h1 data-aos="fade-up" data-aos-duration="1500">A <span className='wrap'>{text}</span></h1>

                                 
                                    <WorkProcess />
                                    
                                    <div className='btn-display'>
                                    <Link className='bann-btn' to='/get-a-quote'>
                                        <span>Get A Quote</span>
                                        <ArrowRightCircle size={25}/>
                                    </Link>
                                    <DownloadCv />
                                    </div>
                                </div>}
                        </TrackVisibility>
                    </div>
                    <div className="banner-img-container">
                        <img src={bannerImg} alt="Header img" />

                    </div>

                </div>
            </div>
            <Logo />
    
        </section>
    )
};

export default Banner;