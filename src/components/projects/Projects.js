import React from 'react'
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import ProjectCard from './ProjectCard'
import bgImage from '../../assets/star2.jpg';
import projImg from '../../assets/dev3.png';
import './Project.css'
import imgUrl2 from '../../assets/Frame 1 (1).png';


const Projects = () => {

  const projects = [
    {
     title: "Business Startup",
     description: "Design & Development",
     imgUrl: projImg,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg,
     },
     {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg,
     },
     
  ]

  return (
    <section className="project mt-5" id='project'>
      <Container>
        <Row>
          <Col>
            <h2 style={{ textAlign: 'center' }}>Projects</h2>
            <p>Lorem ipsum tyiin ioputt o9iut jhgfyu ff5 rhjhtr wwr hukky tr56u hyt</p>
            
            <Tab.Container id='projects-tab' defaultActiveKey='first'>
            <Nav variant='pills' defaultActiveKey='/home'>
              <Nav.Item>
                <Nav.Link eventKey="first">Tab One</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Tab Two</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Tab Three</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
            <Tab.Pane eventKey='first'>
                <Row className="g-4 justify-content-center" style={{ display: 'flex', marginTop: '30px', padding: '20px', justifyContent: 'center' }}>
                {
                    projects.map((project, index) => {
                      return (
                        <ProjectCard key={index} {...project} />
                      )
                    })
                  }
                </Row>
              </Tab.Pane>
              {/*<Tab.Pane eventKey='second'>
              <p>Tab Two Content</p>
              </Tab.Pane>
              <Tab.Pane eventKey='third'>
              <p>Tab Three Content</p>
                </Tab.Pane>*/}
            </Tab.Content>
            
                </Tab.Container>
          </Col>
        </Row>
      </Container>
                {/*<img className='bg-img-right' src={bgImage} />*/}
    </section>
  )
}

export default Projects
