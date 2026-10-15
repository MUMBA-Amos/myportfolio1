import React, { useRef } from "react";
import "./Skills.css";

const groups = [
  {
    name: "Languages & Frameworks",
    blurb:
      "Backends in FastAPI and Node.js, web front ends in React, Vue and Angular, and mobile apps in React Native. Three of my apps are live on the App Store and Google Play.",
    skills: [
      "Python",
      "TypeScript",
      "JavaScript",
      "Go",
      "SQL",
      "PHP",
      "FastAPI",
      "Node.js",
      "Express",
      "Laravel",
      "React",
      "Next.js",
      "Vue",
      "Nuxt",
      "Angular",
      "React Native",
      "Expo",
    ],
  },
  {
    name: "Cloud & DevOps",
    blurb:
      "I put my own work live. At GoAcara I set up the AWS cloud with Terraform, ran a 4-node Kubernetes cluster on EKS, and used ArgoCD and GitHub Actions so every update went live automatically.",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Terraform",
      "ArgoCD",
      "GitHub Actions",
      "Linux",
      "nginx",
    ],
  },
  {
    name: "AI & Machine Learning",
    blurb:
      "At Baseline I used GPT-4o to read scanned lab reports, which made reports about 80% faster, and built an AI search over each patient's past results with pgvector. At university I trained CNN and LSTM models.",
    skills: [
      "OpenAI API",
      "RAG",
      "pgvector",
      "LangChain",
      "Keras",
      "TensorFlow",
      "scikit-learn",
    ],
  },
  {
    name: "Data",
    blurb:
      "PostgreSQL and Supabase for app data, and Databricks with PySpark for the FlightPulse pipeline that runs every 30 minutes.",
    skills: ["PostgreSQL", "Supabase", "Databricks", "PySpark"],
  },
];

/**
 * All four groups, on the page, at once.
 *
 * This used to be a slideshow: the section pinned, the four groups stacked
 * on top of each other, and each one swapped for the next as you scrolled
 * through. It read well and it cost too much. Three groups were hidden at
 * any moment with `autoAlpha: 0` — which is `visibility: hidden`, so they
 * were absent from the accessibility tree and from find-in-page. Someone
 * searching the page for "Kubernetes" or "React Native" found nothing, and
 * a screen reader was told about a quarter of the section.
 *
 * The list is also what a reader most wants to skim. Stepping them through
 * it one frame at a time, holding the page pinned while they did, put an
 * animation between an evaluator and the thing they came to check.
 *
 * So: no pin, no timeline, no hidden state. The groups render as a list and
 * the section is as tall as its content. Nothing here needs GSAP now.
 */
const Skills = () => {
  const rootRef = useRef(null);

  return (
    <section id="skills" ref={rootRef} className="skills-section">
      {/* Darkens this section to Technologies' ground as the pen dives, so
          the two sections meet grey on grey. Bounded by the section itself,
          so there is no edge to line up and nothing to leave behind. */}
      <div className="skills-cover" aria-hidden="true" />
      <div className="container skills-layout">
        <header className="section-head">
          <span className="section-head__kicker">Capabilities</span>
          <h2 className="section-head__title">Skills</h2>
          <p className="section-head__standfirst">
            Web apps, mobile apps and AI features, and the cloud setup to put
            them live.
          </p>
        </header>

        <div className="skills-sheet">
          {/* Its own tear pattern, so it doesn't match the hero sheet exactly */}
          <svg className="skills-sheet__defs" aria-hidden="true" focusable="false">
            <defs>
              <filter id="skillsTorn">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.03 0.05"
                  numOctaves="2"
                  seed="11"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="8"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          <div className="skills-panel">
            <div className="skills-groups">
              {groups.map((group, index) => (
                <div className="skills-group" key={group.name}>
                  <span className="skills-group__count">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(groups.length).padStart(2, "0")}
                  </span>
                  <h3 className="skills-group__name">{group.name}</h3>
                  <p className="skills-group__blurb">{group.blurb}</p>
                  <span className="skills-group__label">Tools</span>
                  <ul className="skills-group__list">
                    {group.skills.map((skill) => (
                      <li className="skill-item" key={skill}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
