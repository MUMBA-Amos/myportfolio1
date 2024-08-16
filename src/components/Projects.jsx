import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Tabs, Tab, Card, Container } from "react-bootstrap";
import "./Projects.css"; // Assuming you have custom styles here

import Project1Image from "./images/C.png";
import Project2Image from "./images/Webapp.png";
import Project3Image from "./images/ai.png";
import Project4Image from "./images/kpi.png";
import Project5Image from "./images/aii.png";
import Project6Image from "./images/nlp.png";
import Project7Image from "./images/cms.png";
import Project8Image from "./images/ccna.png";

// Achievements
import achievement1 from "./images/eden.jpeg";
import achievement2 from "./images/au.png";

// Personal
import personal1 from "./images/b.JPG";
import personal2 from "./images/t.JPG";
import personal3 from "./images/as.JPG";

const projects = [
  {
    title: "C Custom Program",
    description: "Library management program.",
    image: Project1Image,
  },
  {
    title: "LeanerZone Website",
    description: "A Dutch company teaching new skills.",
    image: Project2Image,
  },
  {
    title: "Three-Bottles Problem",
    description: "Solved using search algorithms.",
    image: Project3Image,
  },
  {
    title: "KPI Management System",
    description: "Track and analyze performance metrics.",
    image: Project4Image,
  },
  {
    title: "Bird Species Classification",
    description: "Classified bird species using CUB-200 dataset.",
    image: Project5Image,
  },
  {
    title: "E-commerce Categorization",
    description: "NLP classifier for product categorization.",
    image: Project6Image,
  },
  {
    title: "CMS Admin Panel",
    description: "Dynamic CMS admin panel using PHP.",
    image: Project7Image,
  },
  {
    title: "CCNA Certification",
    description: "Earned CCNA certification.",
    image: Project8Image,
  },
];

const achievements = [
  {
    title: "Director of Special Events",
    description: "Eden Kuching event management.",
    image: achievement1,
  },
  {
    title: "Africa Unites Vice President",
    description: "Leadership and team management.",
    image: achievement2,
  },
];

const personal = [
  {
    title: "Body Building",
    description: "Passionate about fitness and discipline.",
    image: personal1,
  },
  {
    title: "Travelling",
    description: "Love exploring new places.",
    image: personal2,
  },
  {
    title: "Reading",
    description: "Enjoy learning new things through reading.",
    image: personal3,
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
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
              infinite
              showDots
              autoPlay
              autoPlaySpeed={3000}
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
              infinite
              showDots
              autoPlay
              autoPlaySpeed={3000}
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
              infinite
              showDots
              autoPlay
              autoPlaySpeed={3000}
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
