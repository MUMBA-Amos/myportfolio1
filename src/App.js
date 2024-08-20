import React from 'react';
import Header from './components/Header';
import Projects from './components/Projects';
import Contact from './components/ContactMe';
import Footer from './components/Footer';
import Skills from "./components/Skills";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ContactMe from './components/ContactMe';
import CircularCarousel from "./components/CircularCarousel";
import GoToTop from "./components/GoToTop";




function App() {
  return (
    <div>
      <Header />
      <main>
        <section className="skills-section">
          <Skills />
        </section>

        <CircularCarousel />

        <section className="projects-section">
          <Projects />
        </section>
        <section className="contact-section">
          <ContactMe />
        </section>
      </main>
      <Footer />

      <GoToTop />
    </div>
  );
}

export default App;
