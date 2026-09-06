import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // You can use any icon
import { scrollToTop } from "../lib/scroll";
import "./GoToTop.css";

const GoToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {showButton && (
        <button
          type="button"
          className="to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <FaArrowUp aria-hidden="true" />
        </button>
      )}
    </>
  );
};

export default GoToTop;
