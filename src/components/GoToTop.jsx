import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // You can use any icon

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showButton && (
        <button onClick={scrollToTop} style={styles.button}>
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

const styles = {
  button: {
    position: "fixed",
    bottom: "40px",
    right: "40px",
    padding: "10px",
    fontSize: "20px",
    backgroundColor: "#00ff9d", // Use your preferred color
    color: "black",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
  },
};

export default GoToTop;
