import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaLinkedin,
  FaFacebook,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa";
import Navbar from "./Navbar";
import "./Header.css";
import mumbaImage from "./mumba.png";

const Header = ({ contactRef }) => {
  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="header d-flex align-items-center">
      <div className="container">
        <Navbar />
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
              <a
                href="/myportfolio1/cv.pdf"
                download="Mumba_Amos_Ntambo_CV.pdf"
                className="btn btn-success"
              >
                View CV
              </a>
              <div className="social-icons ml-4">
                <a href="tel:+60176307134" className="icon">
                  <FaPhone />
                </a>
                <a
                  href="https://www.linkedin.com/in/mumba-amos-ntambo-54a665214/"
                  className="icon"
                >
                  <FaLinkedin />
                </a>
                <a href="https://facebook.com" className="icon">
                  <FaFacebook />
                </a>
                <a
                  href="https://wa.me/+60176307134?text=Hello%20Mumba!"
                  className="icon"
                >
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
              <CountUp start={0} end={2.5} duration={2} />
            </h2>
            <p>Years of experience</p>
          </div>
          <div className="p-2">
            <h2 className="text-success">
              <CountUp start={0} end={8} duration={2} />
            </h2>
            <p>Projects completed</p>
          </div>
          <div className="p-2">
            <h2 className="text-success">
              <CountUp start={0} end={5} duration={2} />
            </h2>
            <p>Technologies Used</p>
          </div>
          <div className="p-2">
            <h2 className="text-success">
              <CountUp start={0} end={20} duration={2} />
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
    width: "400px",
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
    top: "-15px",
    left: "-25px",
    width: "430px",
    height: "430px",
    borderRadius: "50%",
    border: "5px solid red",
    boxSizing: "border-box",
    zIndex: 1,
  },
};

export default Header;
