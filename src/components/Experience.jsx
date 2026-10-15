import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DrawnLines from "./DrawnLines";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  {
    index: "01",
    title: "AI and Full Stack Engineer",
    org: "Baseline Health AI Platform",
    link: { label: "baseline.website", href: "https://baseline.website" },
    place: "Kuala Lumpur, Malaysia",
    dates: "June 2025 to now",
    points: [
      "Built the FastAPI and PostgreSQL backend behind a patient app and a clinic app, with secure logins so each person only sees their own records.",
      "Used GPT-4o to read scanned lab reports and fill in the results automatically. Reports now come out about 80% faster.",
      "Built an AI search over each patient's past results using pgvector.",
    ],
    tech: "Python · FastAPI · PostgreSQL · GPT-4o · pgvector",
  },
  {
    index: "02",
    title: "DevOps and Platform Engineer",
    org: "GoAcara",
    link: { label: "goacara.com", href: "https://goacara.com" },
    place: "Kuching, Malaysia",
    dates: "August 2025 to January 2026",
    points: [
      "Set up the AWS cloud with Terraform, including a 4-node Kubernetes cluster on EKS.",
      "Used Docker, ArgoCD and GitHub Actions so every update went live automatically.",
      "Worked with one other engineer and a designer.",
    ],
    tech: "AWS · Terraform · Kubernetes (EKS) · Docker · ArgoCD · GitHub Actions",
  },
  {
    index: "03",
    title: "Software Engineering Intern",
    kind: "Internship",
    org: "Sarawak Research Development Council",
    place: "Kuching, Malaysia",
    dates: "January to December 2024",
    points: [
      "Built a research grant management system with a team of 5. The agency still uses it.",
    ],
    tech: "React · TypeScript · Node.js",
  },
  {
    index: "04",
    title: "Freelance Web Developer",
    kind: "Freelance",
    org: "TianTianlao Hotpot Restaurant",
    place: "Kuching, Malaysia",
    dates: "April to September 2024",
    points: ["Built the restaurant's WordPress site, with its menu and bookings."],
    tech: "WordPress",
  },
  {
    index: "05",
    title: "IT Project Intern",
    kind: "Internship",
    org: "Malaysian Dutch Business Council",
    place: "Kuala Lumpur, Malaysia",
    dates: "September to December 2021",
    points: ["Built an invoicing feature in their Bitrix24 CRM."],
    tech: "Bitrix24 CRM",
  },
];

const Experience = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      // Each card triggers off itself, not off the section.
      //
      // One trigger on the section fired all three at once — staggered, but
      // all while the section's top was still near the fold. The lower two
      // finished animating well below the screen, so by the time they were
      // scrolled to they had already arrived and nothing appeared to
      // happen. Per-card, each one fades in as it comes up.
      //
      // once: the card stays put after it has arrived. Scrolling back up
      // cannot take it away again, and there is no state left that could
      // strand it hidden.
      //
      // opacity rather than autoAlpha, which would also set
      // visibility: hidden and keep the card out of find-in-page and the
      // accessibility tree until it had been reached.
      gsap.utils.toArray(".xp-row").forEach((row) => {
        gsap.from(row, {
          y: 26,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            // Well inside the viewport, so the card is already on screen
            // when it starts rather than arriving late
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="experience" ref={rootRef} className="xp">
      <DrawnLines />
      <div className="container">
        {/* Roughens the card silhouettes; one filter serves them all */}
        <svg className="xp__defs" aria-hidden="true" focusable="false">
          <defs>
            <filter id="xpTorn">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.02 0.05"
                numOctaves="2"
                seed="11"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="9"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        <header className="xp__head">
          <span className="xp__kicker">Experience</span>
          <h2 className="xp__title">Where I&rsquo;ve worked</h2>
        </header>

        <div className="xp__rows">
          {roles.map((role) => (
            <article className="xp-row" key={role.index}>
              <div className="xp-row__meta">
                <span className="xp-row__index">{role.index}</span>
                <span className="xp-row__dates">{role.dates}</span>
                <span className="xp-row__place">{role.place}</span>
              </div>

              <div className="xp-row__body">
                <h3 className="xp-row__title">
                  {role.title}
                  {role.kind && (
                    <span className="xp-row__kind">{role.kind}</span>
                  )}
                </h3>
                <p className="xp-row__org">{role.org}</p>

                <ul className="xp-row__points">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <p className="xp-row__tech">{role.tech}</p>

                {role.link && (
                  <p className="xp-row__links">
                    <a
                      className="xp-row__link"
                      href={role.link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {role.link.label}
                    </a>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
