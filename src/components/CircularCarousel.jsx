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
      backgroundColor: "#0a0a0a",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      overflow: "hidden", // Prevent overflow
    },
    container: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "400px", // Reduced height to fit within the viewport
      width: "400px", // Reduced width to fit within the viewport
      backgroundColor: "#0a0a0a",
      borderRadius: "50%",
      overflow: "hidden", // Prevent overflow from the container
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
            const x = 150 * Math.cos(angle) + 200; // Adjust positioning values
            const y = 150 * Math.sin(angle) + 200; // Adjust positioning values
            return (
              <Col key={index} style={styles.iconContainer(x, y)}>
                <div style={{ fontSize: "1.5rem", color: "inherit" }}>
                  {" "}
                  {/* Reduced icon size */}
                  {tech.icon}
                </div>
                <span style={{ color: "inherit", fontSize: "0.8rem" }}>
                  {tech.name}
                </span>{" "}
                {/* Reduced text size */}
              </Col>
            );
          })}
        </Row>
      </motion.div>
    </section>
  );
};

export default CircularCarousel;
