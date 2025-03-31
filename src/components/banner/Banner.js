import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { GoArrowUpRight } from "react-icons/go";

import bannerImg from '../../assets/woman1.png';
import './Banner.css'
import 'animate.css'
import TrackVisibility from 'react-on-screen'
import WorkProcess from './WorkProcess';

const Banner = () => {

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);

    const toRotate = [ "Web Developer", "Web Designer", "UI/UX Designer" ];
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
                                        <p className='ban-av'>Currently Available For Freelance Worldwide <GoArrowUpRight /></p>
                                        <p className='bdr'></p>
                                    </div>
                                    <span className='tagline'>Welcome to my Portfolio</span>
                                    <h1>Hi I<span style={{ color: '#0000ff' }}>'</span>m GraceTech<span style={{ color: '#0000ff', fontSize: '60px' }}>.</span></h1> 
                                    <h1>A <span className='wrap' style={{ color: '#0000ff' }}>{text}</span></h1>
                                    <p>Expertly Crafting Digital Solutions</p>

                                    <div>
                                        <WorkProcess />
                                    </div>
                                    <button className='bann-btn' onClick=''>Let's Connect<ArrowRightCircle size={25}/></button>
                                </div>}
                        </TrackVisibility>
                    </div>
                   <div className="banner-img-container">
    <img src={bannerImg} alt="Header img" />
    </div>
                </div>
            </div>
    
        </section>
    )
};

export default Banner;