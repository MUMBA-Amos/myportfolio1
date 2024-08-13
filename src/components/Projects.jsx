import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Tabs, Tab, Card, Container } from "react-bootstrap";
import "./Projects.css"; // Assuming you have custom styles here

const projects = [
  {
    title: "Project 1",
    description: "A brief description of Project 1.",
    image: "https://picsum.photos/200/200?random=1",
  },
  {
    title: "Project 2",
    description: "A brief description of Project 2.",
    image: "https://picsum.photos/200/200?random=2",
  },
  {
    title: "Project 3",
    description: "A brief description of Project 3.",
    image: "https://picsum.photos/200/200?random=3",
  },
  {
    title: "Project 4",
    description: "A brief description of Project 4.",
    image: "https://picsum.photos/200/200?random=4",
  },
  {
    title: "Project 5",
    description: "A brief description of Project 5.",
    image: "https://picsum.photos/200/200?random=5",
  },
];

const achievements = [
  {
    title: "Achievement 1",
    description: "A brief description of Achievement 1.",
    image: "https://picsum.photos/200/200?random=4",
  },
  {
    title: "Achievement 2",
    description: "A brief description of Achievement 2.",
    image: "https://picsum.photos/200/200?random=5",
  },
  {
    title: "Achievement 3",
    description: "A brief description of Achievement 3.",
    image: "https://picsum.photos/200/200?random=6",
  },
];

const personal = [
  {
    title: "Personal 1",
    description: "A brief description of Personal 1.",
    image: "https://picsum.photos/200/200?random=7",
  },
  {
    title: "Personal 2",
    description: "A brief description of Personal 2.",
    image: "https://picsum.photos/200/200?random=8",
  },
  {
    title: "Personal 3",
    description: "A brief description of Personal 3.",
    image: "https://picsum.photos/200/200?random=9",
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Projects = () => {
  return (
    <section className="projects-section">
      <Container>
        <Tabs
          defaultActiveKey="projects"
          id="projects-achievements-tabs"
          className="justify-content-center custom-tabs"
        >
          <Tab eventKey="projects" title="My Projects">
            <Carousel
              responsive={responsive}
              infinite={true}
              showDots={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              containerClass="carousel-container"
              itemClass="carousel-item-padding-40-px"
            >
              {projects.map((project, index) => (
                <Card className="text-white m-2 custom-card" key={index}>
                  <Card.Img
                    variant="top"
                    src={project.image}
                    alt={project.title}
                  />
                  <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                    <Card.Text>{project.description}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Carousel>
          </Tab>
          <Tab eventKey="achievements" title="Achievements">
            <Carousel
              responsive={responsive}
              infinite={true}
              showDots={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              containerClass="carousel-container"
              itemClass="carousel-item-padding-40-px"
            >
              {achievements.map((achievement, index) => (
                <Card className="text-white m-2 custom-card" key={index}>
                  <Card.Img
                    variant="top"
                    src={achievement.image}
                    alt={achievement.title}
                  />
                  <Card.Body>
                    <Card.Title>{achievement.title}</Card.Title>
                    <Card.Text>{achievement.description}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Carousel>
          </Tab>
          <Tab eventKey="personal" title="Personal">
            <Carousel
              responsive={responsive}
              infinite={true}
              showDots={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              containerClass="carousel-container"
              itemClass="carousel-item-padding-40-px"
            >
              {personal.map((item, index) => (
                <Card className="text-white m-2 custom-card" key={index}>
                  <Card.Img variant="top" src={item.image} alt={item.title} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Carousel>
          </Tab>
        </Tabs>
      </Container>
    </section>
  );
};

export default Projects;
