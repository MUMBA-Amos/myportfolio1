import React from "react";
import "./Footer.css";

/**
 * Colophon rather than a copyright bar: the last rule on the page, with the
 * few facts a reader might still want after the contact form.
 */
const Footer = () => (
  <footer className="colophon">
    <div className="container colophon__inner">
      <span className="colophon__name">Mumba Amos Ntambo</span>
      <span className="colophon__role">
        Frontend &amp; full-stack engineer — Kuala Lumpur
      </span>
      <span className="colophon__year">
        &copy; {new Date().getFullYear()}
      </span>
    </div>
  </footer>
);

export default Footer;
