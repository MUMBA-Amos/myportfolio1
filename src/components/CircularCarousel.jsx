import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaReact } from "react-icons/fa";
import {
  SiExpo,
  SiNextdotjs,
  SiTypescript,
  SiVuedotjs,
  SiNodedotjs,
  SiFastapi,
  SiPostgresql,
  SiKubernetes,
  SiOpenai,
} from "react-icons/si";
import "./CircularCarousel.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Technologies, read as a specification strip: one ruled row of cells that
 * travels sideways while the section is pinned. Same furniture as the stats
 * grid and Experience — hairline rules, ruler ticks, monospace labels — drawn
 * in paper over graphite rather than ink over paper.
 */
const technologies = [
  {
    name: "React.js",
    icon: <FaReact />,
    field: "Frontend",
    description: "Component architecture, hooks and Redux state.",
  },
  {
    name: "React Native",
    icon: <SiExpo />,
    field: "Mobile",
    description: "Two apps shipped solo to the App Store and Google Play.",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    field: "Frontend",
    description: "Production patient and clinic portals.",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    field: "Language",
    description: "Across web and mobile work since 2024.",
  },
  {
    name: "Vue.js",
    icon: <SiVuedotjs />,
    field: "Frontend",
    description: "Nuxt event browsing, booking and organiser tooling.",
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs />,
    field: "Backend",
    description: "Express services behind React front ends.",
  },
  {
    name: "FastAPI",
    icon: <SiFastapi />,
    field: "Backend",
    description: "Python services for a healthcare platform.",
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql />,
    field: "Data",
    description: "Supabase Postgres, and pgvector for retrieval.",
  },
  {
    name: "Kubernetes",
    icon: <SiKubernetes />,
    field: "Infrastructure",
    description: "A four-node EKS cluster on AWS, built in Terraform.",
  },
  {
    name: "OpenAI GPT",
    icon: <SiOpenai />,
    field: "AI",
    description: "Vision extraction, structured outputs and RAG.",
  },
];


const TechnologiesSection = () => {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const track = trackRef.current;
      if (!track) return;

      // How far the strip has to travel for its last cell to reach the right
      // edge. Measured in a function so it is re-read on every refresh: the
      // pins above this one change the page height, and the cell width is
      // viewport-relative.
      // Arrival: head first, then each cell, as the section rises. This runs
      // over the first part of the wipe only — spread across the whole of it
      // the last cells did not land until the section had finished rising,
      // so the list read as trickling in rather than being there.
      gsap.from([".tech-head", ".tech-cell"], {
        y: 70,
        autoAlpha: 0,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "top 55%",
          scrub: 0.3,
          invalidateOnRefresh: true,
          refreshPriority: 2,
        },
      });

      const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);

      // The section is held by CSS sticky now, not by a GSAP pin, so this
      // only moves the strip. The dwell element below the section is the
      // scroll range it is held for, so mapping the travel onto that element
      // keeps the strip in step with how long the panel is actually visible
      // — including on a phone, where the dwell is shorter and the strip
      // therefore travels faster per pixel of scroll.
      const dwell = document.querySelector(".stack__dwell");
      if (!dwell) return;

      gsap.to(track, {
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: dwell,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          refreshPriority: 2,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="technologies" ref={rootRef} className="tech-section">
      <div className="tech-inner">
        <header className="tech-head">
          <h2 className="tech-head__title">Technologies</h2>
          <span className="tech-head__meta">
            {String(technologies.length).padStart(2, "0")} in regular use
          </span>
        </header>

        <div className="tech-viewport">
          <div className="tech-track" ref={trackRef}>
            {technologies.map(({ name, icon, field, description }, i) => (
              <article className="tech-cell" key={name}>
                <span className="tech-cell__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="tech-cell__icon" aria-hidden="true">
                  {icon}
                </span>
                <h3 className="tech-cell__name">{name}</h3>
                <p className="tech-cell__desc">{description}</p>
                <span className="tech-cell__field">{field}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
