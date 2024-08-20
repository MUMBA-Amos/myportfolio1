import React from "react";
import { FaReact, FaLaravel } from "react-icons/fa";
import { SiPytorch, SiTensorflow, SiPython } from "react-icons/si";
import { Container, Row, Col } from "react-bootstrap";

const technologies = [
  {
    name: "React.js",
    icon: <FaReact />,
    description: "Building interactive user interfaces using React.js",
  },
  {
    name: "Laravel",
    icon: <FaLaravel />,
    description: "Developing robust backend systems with Laravel",
  },
  {
    name: "Pytorch",
    icon: <SiPytorch />,
    description: "Implementing machine learning models with Pytorch",
  },
  {
    name: "TensorFlow",
    icon: <SiTensorflow />,
    description: "Creating deep learning applications using TensorFlow",
  },
  {
    name: "NLTK",
    icon: <SiPython />,
    description: "Natural language processing with NLTK",
  },
];

const TechnologiesSection = () => {
  return (
    <section style={{ backgroundColor: "#0a0a0a", padding: "50px 0" }}>
      <Container>
        <h2
          className="text-center"
          style={{ color: "#00ff9d", marginBottom: "40px" }} // Apply the color scheme here
        >
          Familiar Technologies
        </h2>
        <Row>
          {technologies.map((tech, index) => (
            <Col md={4} className="text-center mb-4" key={index}>
              <div style={{ color: "#00ff9d", fontSize: "3rem" }}>
                {" "}
                {tech.icon}
              </div>
              <h4 style={{ color: "#ffffff", marginTop: "15px" }}>
                {tech.name}
              </h4>
              <p style={{ color: "#cfcfcf" }}>{tech.description}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TechnologiesSection;
