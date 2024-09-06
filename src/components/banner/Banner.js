import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import bannerImg from '../../assets/bann2.jpg';
import './Banner.css'

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
                        <span className='tagline'>Welcome to my Portfolio</span>
                        <h1 style={{ fontSize: '40px'}}>Hi I<span style={{ color: '#0000ff' }}>'</span>m GraceTech<span style={{ color: '#0000ff', fontSize: '60px' }}>.</span></h1> 
                        <h1>A <span className='wrap'>{text}</span></h1>
                        <p>Expertly Crafting Digital Solutions</p>
                        <button className='bann-btn' onClick=''>Let's Connect<ArrowRightCircle size={25}/></button>
                    </div>
                    <Col xs={12} md={6} xl={5}>
                        <img src={bannerImg} alt='Heder img' width='300px' height='300px' />
                    </Col>
                </div>
            </div>
        </section>
    )
};

export default Banner;