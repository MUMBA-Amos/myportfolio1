import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Tabs, Tab, Card, Container } from "react-bootstrap";
import "./Projects.css"; // Assuming you have custom styles here
import Project1Image from "./images/C.png";
import Project2Image from "./images/Webapp.png";
import Project3Image from "./images/ai.png";

const projects = [
  {
    title: "C custom Program",
    description:
      "This programmed was designed for serving the purpose of library management. The program is only accessible by the Admin. The admin is responsible for adding a new book to the system, viewing the books in the system, able to remove a book from the system and lastly issue a book to a student then logout. The admin login in credentials are as follows.",
    image: Project1Image,
  },
  {
    title: "LeanerZone website",
    description:
      "LeanerZone website was a mini self project for a dutch company that was established in 2012, with a sole purpose to teach, enabling people all around the world learn new skills. The courses are taught by experience lectures who will be there for you at all times to assist. We believe quaity teaching ",
    image: Project2Image,
  },
  {
    title: "Three-Bottles Problem using search algorthms",
    description:
      "The Three-Bottles Problem we're looking at is a good example of this. In this problem, we have three different bottles, each able to hold a different amount of water. Our job was to move the water around between the bottles to reach a certain goal. Rthere are many ways to solve it, and finding the best way isn't always straightforward.I used four main types: Depth-First Search (DFS), Breadth-First Search (BFS), Greedy Best-First Search (GBFS), and A* Search (A*)",
    image: Project3Image,
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
