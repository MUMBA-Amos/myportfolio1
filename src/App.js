import React, { useEffect } from 'react';
import Header from './components/Header';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ContactMe from './components/ContactMe';
import CircularCarousel from "./components/CircularCarousel";
import Navbar from "./components/Navbar";
import SectionCover from "./components/SectionCover";
import PageFrame from "./components/PageFrame";
import { startLenis } from "./lib/scroll";
import GoToTop from "./components/GoToTop";
import ErrorBoundary from "./components/ErrorBoundary";

/**
 * Every section is boundaried separately.
 *
 * Nothing here is server-rendered, so an uncaught error anywhere unmounts
 * the whole tree and the visitor is left with a blank white page — which is
 * exactly what happened on a machine where something the page needed was
 * not available. Section by section, a failure costs that section and the
 * rest of the site still stands.
 */
const Section = ({ name, children }) => (
  <ErrorBoundary name={name}>{children}</ErrorBoundary>
);

function App() {
  useEffect(() => {
    // Smooth scrolling is an enhancement. If it cannot start, the page
    // scrolls natively rather than failing to render at all.
    try {
      return startLenis();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("[lenis] could not start; native scrolling stands:", error);
      return undefined;
    }
  }, []);

  return (
    <div>
      <Section name="Navbar"><Navbar /></Section>
      <Section name="PageFrame"><PageFrame /></Section>
      <Section name="SectionCover"><SectionCover /></Section>
      <Section name="Header"><Header /></Section>
      <main>
        {/* Experience leads: it is the evidence, and the tooling sections
            read as one run rather than a repeat split in two. */}
        <Section name="Experience"><Experience /></Section>

        <Section name="Skills"><Skills /></Section>

        {/* Both ordinary sections now. Technologies used to stick at the top
            while Projects rode up over it, with 2400px of dwell between them
            for the strip to travel through — a quarter of the page's length
            spent showing ten items a few at a time. The strip is a grid, so
            there is nothing left to travel and nothing to hold it for. */}
        <Section name="Technologies"><CircularCarousel /></Section>

        <Section name="Projects"><Projects /></Section>

        <Section name="ContactMe"><ContactMe /></Section>
      </main>
      <Section name="Footer"><Footer /></Section>

      <Section name="GoToTop"><GoToTop /></Section>
    </div>
  );
}

export default App;
