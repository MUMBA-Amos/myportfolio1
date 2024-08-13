import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaLinkedin, FaFacebook, FaWhatsapp, FaGithub } from "react-icons/fa";
import Navbar from "./Navbar"; // Import the Navbar component
import "./Header.css"; // Custom styles here
import mumbaImage from "./mumba.png"; // Import the image

const Header = () => {
  return (
    <header className="header d-flex align-items-center">
      <div className="container">
        <Navbar /> {/* Use the Navbar component */}
        <div className="hero-content row align-items-center text-white mt-5">
          <div className="hero-image col-lg-4 col-md-5 col-sm-12 text-center mt-4 mt-md-0 order-1 order-md-2">
            <div style={styles.photoContainer}>
              <div style={styles.photo}>
                <img
                  src={mumbaImage}
                  alt="Mumba Amos Ntambo"
                  style={styles.profileImage}
                />
                <motion.div
                  style={styles.spinningBorder}
                  animate={{ rotate: -360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 120,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="hero-text col-lg-8 col-md-7 col-sm-12 order-2 order-md-1">
            <h1>
              Hello I'm <span className="text-success">Mumba Amos Ntambo</span>
            </h1>
            <p className="lead">Software Developer</p>
            <p>
              I excel at crafting elegant digital experiences and am proficient
              in various programming languages and technologies.
            </p>
            <div className="d-flex align-items-center mt-3 justify-content-center justify-content-md-start">
              <a href="#contact" className="btn btn-success">
                Download CV
              </a>
              <div className="social-icons ml-4">
                <a
                  href="https://www.linkedin.com/in/mumba-amos-ntambo-54a665214/"
                  className="icon"
                >
                  <FaLinkedin />
                </a>
                <a href="https://facebook.com" className="icon">
                  <FaFacebook />
                </a>
                <a href="https://wa.me/yourwhatsapplink" className="icon">
                  <FaWhatsapp />
                </a>
                <a href="https://github.com" className="icon">
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-stats d-flex justify-content-around flex-wrap mt-5">
          <div className="p-2">
            <h2 className="text-success">
              <CountUp start={0} end={5} duration={2} />
            </h2>
            <p>Years of experience</p>
          </div>
          <div className="p-2">
            <h2 className="text-success">
              <CountUp start={0} end={11} duration={2} />
            </h2>
            <p>Projects completed</p>
          </div>
          <div className="p-2">
            <h2 className="text-success">
              <CountUp start={0} end={4} duration={2} />
            </h2>
            <p>Technologies mastered</p>
          </div>
          <div className="p-2">
            <h2 className="text-success">
              <CountUp start={0} end={220} duration={2} />
            </h2>
            <p>Code commits</p>
          </div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  photoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  photo: {
    position: "relative",
    width: "400px", // Size of the image
    height: "400px",
  },
  profileImage: {
    borderRadius: "50%",
    width: "100%",
    height: "100%",
    zIndex: 2,
  },
  spinningBorder: {
    position: "absolute",
    top: "-15px", // Adjust to remove space
    left: "-25px",
    width: "430px", // Adjust to perfectly fit around the image
    height: "430px",
    borderRadius: "50%",
    border: "5px solid red", // Temporary solid red border for testing visibility
    boxSizing: "border-box",
    zIndex: 1, // Positioned behind the image
  },
};

export default Header;
