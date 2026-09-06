import React, { useEffect } from 'react';
import Header from './components/Header';
import Projects from './components/Projects';
import Contact from './components/ContactMe';
import Footer from './components/Footer';
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ContactMe from './components/ContactMe';
import CircularCarousel from "./components/CircularCarousel";
import Navbar from "./components/Navbar";
import ScrollPen from "./components/ScrollPen";
import PageFrame from "./components/PageFrame";
import { startLenis } from "./lib/scroll";
import GoToTop from "./components/GoToTop";




function App() {
  useEffect(() => startLenis(), []);

  return (
    <div>
      <Navbar />
      <PageFrame />
      <ScrollPen />
      <Header />
      <main>
        {/* Experience leads: it is the evidence, and the tooling sections
            read as one run rather than a repeat split in two. */}
        <Experience />

        <Skills />

        {/* Technologies sticks at the top while Projects slides up over it.
            The dwell between them is the scroll the strip travels through
            before it gets covered. */}
        <div className="stack">
          <CircularCarousel />
          <div className="stack__dwell" aria-hidden="true" />
          <Projects />
        </div>

        <ContactMe />
      </main>
      <Footer />

      <GoToTop />
    </div>
  );
}

export default App;
