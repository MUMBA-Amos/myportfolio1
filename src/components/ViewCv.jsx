import React from "react";

const ViewCV = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My CV</h2>
      <iframe
        src="/cv.pdf"
        style={styles.iframe}
        title="Mumba Amos Ntambo CV"
      ></iframe>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0a0a0a",
    color: "white",
    padding: "50px",
    textAlign: "center",
  },
  heading: {
    color: "#00ff9d",
    marginBottom: "20px",
  },
  iframe: {
    width: "100%",
    height: "800px", // Adjust height as needed
    border: "none",
  },
};

export default ViewCV;
