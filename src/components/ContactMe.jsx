import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    // Construct the mailto link
    const mailtoLink = `mailto:mumbantambo@gmail.com?subject=Contact Form Submission from ${name}&body=Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;

    // Open the mailto link in the default email client
    window.location.href = mailtoLink;
  };

  return (
    <section id="contactSection" style={styles.contactSection}>
      <Container style={styles.container}>
        <h2 style={styles.heading} className="text-center mb-4">
          Contact Me
        </h2>
        <div style={styles.formWrapper}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label style={styles.label}>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                style={styles.input}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label style={styles.label}>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={styles.input}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label style={styles.label}>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                style={styles.input}
              />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label style={styles.label}>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                required
                style={styles.textarea}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="mt-3 btn-block">
              Send Message
            </Button>
          </Form>
        </div>
      </Container>
    </section>
  );
};

const styles = {
  contactSection: {
    backgroundColor: "#0a0a0a",
    padding: "60px 0",
    color: "white",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  heading: {
    color: "#00ff9d",
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  label: {
    color: "white",
  },
  input: {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid #555",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "15px",
  },
  textarea: {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid #555",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "15px",
  },
  formWrapper: {
    backgroundColor: "#1a1a1a",
    border: "2px solid #00ff9d",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
  },
};

export default ContactMe;
