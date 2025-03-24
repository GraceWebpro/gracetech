import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import projImg from '../../assets/dev3.png';


const Cardd = () => {
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
    <Container fluid className="mt-5">
        <Row className="justify-content-center">
        {
                    projects.map((project, index) => {
                      return (
                        <Col key={index} xs={12} md={6} lg={4}>
                        <Card className='proj-imgbx'>
                            <Card.Img
                                variant="top"
                                src={project.imgUrl}
                                alt="GeeksforGeeks Logo"
                            />
                            <Card.Body className='proj-txtx'>
                                <Card.Title>{project.title}</Card.Title>
                                <Card.Text>
                                    {project.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                        
                      )
                    })
                  }
            
        </Row>
    </Container>
    )
    };

export default Cardd;
