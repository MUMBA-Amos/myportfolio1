import React from "react";
import { FaReact, FaLaravel } from "react-icons/fa";
import { SiPytorch, SiTensorflow, SiPython } from "react-icons/si";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

const technologies = [
  { name: "React.js", icon: <FaReact /> },
  { name: "Laravel", icon: <FaLaravel /> },
  { name: "Pytorch", icon: <SiPytorch /> },
  { name: "TensorFlow", icon: <SiTensorflow /> },
  { name: "NLTK", icon: <SiPython /> }, // Python icon for NLTK
];

const CircularCarousel = () => {
  const styles = {
    section: {
      backgroundColor: "#0a0a0a", // Black background for the entire section
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh", // Ensure the section takes up the full height of the viewport
    },
    container: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "500px",
      width: "500px",
      backgroundColor: "#0a0a0a", // Black background for the container
      borderRadius: "50%",
    },
    centerCircle: {
      position: "absolute",
      width: "200px",
      height: "200px",
      backgroundColor: "#0a0a0a", // Center black background
      color: "#00ff9d", // Green text color
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      borderRadius: "50%",
      zIndex: 2,
    },
    iconContainer: (x, y) => ({
      position: "absolute",
      top: `${y}px`,
      left: `${x}px`,
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    }),
  };

  return (
    <section style={styles.section}>
      <div style={styles.centerCircle}>Technologies I Know</div>
      <motion.div
        style={styles.container}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 30, // Slow spin speed (increase the duration for a slower spin)
          ease: "linear",
        }}
      >
        <Row className="position-absolute w-100 h-100">
          {technologies.map((tech, index) => {
            const angle = (index / technologies.length) * 2 * Math.PI;
            const x = 200 * Math.cos(angle) + 250; // Adjust to center
            const y = 200 * Math.sin(angle) + 250; // Adjust to center
            return (
              <Col key={index} style={styles.iconContainer(x, y)}>
                <div style={{ fontSize: "2rem", color: "inherit" }}>
                  {tech.icon}
                </div>
                <span style={{ color: "inherit" }}>{tech.name}</span>
              </Col>
            );
          })}
        </Row>
      </motion.div>
    </section>
  );
};

export default CircularCarousel;
