import React from 'react'
import './Skills.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container, Row, Col } from 'react-bootstrap';
import dev1 from '../../assets/dev2.png';
import dev2 from '../../assets/dev2.png';
import dev3 from '../../assets/dev2.png';

const Skills = () => {

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
         desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
         tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 5
        },
         mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 5
        }
    };

    return (
        <section className='skill' id='skills'>
            <Container>
                <Row>
                    <Col>
                        <div className='skill-bx'>
                            <h2>Skills</h2>
                            <p>this is the skills section of this portfolio</p>

                            <Carousel responsive={responsive} infinite={true} className='skills-slider'>
                                <div className='item'>
                                    <img src={dev1} alt='img-slide-1' width='30px' height='30px'/>
                                    <h5>Web Development</h5>
                                </div>

                                 <div className='item'>
                                    <img src={dev2} alt='img-slide-1' width='30px' height='30px'/>
                                    <h5>UI/UX Design</h5>
                                </div>

                                 <div className='item'>
                                    <img src={dev3} alt='img-slide-1' width='30px' height='30px' />
                                    <h5>Logo Design</h5>
                                </div>

                                 <div className='item'>
                                    <img src={dev1} alt='img-slide-1' width='30px' height='30px' />
                                    <h5>Web Development</h5>
                                </div>
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </Container>

        </section>
    )
};

export default Skills