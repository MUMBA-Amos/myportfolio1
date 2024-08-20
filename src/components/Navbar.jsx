import React from "react";
import { Link } from "react-scroll"; // Import Link from react-scroll
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand" href="#home" style={{ cursor: "pointer" }}>
        Mumba.
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style={{ cursor: "pointer" }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              to="home" // ID of the home section
              smooth={true}
              duration={500}
              style={{ cursor: "pointer" }}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="contactSection" // ID of the contact section
              smooth={true}
              duration={500}
              style={{ cursor: "pointer" }}
            >
              Contact
            </Link>
          </li>
        </ul>
        <Link
          to="contactSection"
          className="btn btn-outline-success ml-lg-3"
          smooth={true}
          duration={500}
          style={{ cursor: "pointer" }}
        >
          Hire me
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
