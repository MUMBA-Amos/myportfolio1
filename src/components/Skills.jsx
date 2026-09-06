import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SKILLS_FRAME_SCROLL } from "../lib/scroll";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

const groups = [
  {
    name: "Languages & Frameworks",
    blurb:
      "Full-stack work across four production codebases: Next.js patient and clinic portals sitting on a FastAPI service, a Vue and Nuxt event platform, a React and TypeScript grant management system, and two React Native apps shipped to the App Store and Google Play.",
    skills: [
      "Python",
      "TypeScript",
      "JavaScript",
      "Go",
      "SQL",
      "HTML/CSS",
      "FastAPI",
      "React.js",
      "Next.js",
      "Vue.js",
      "Nuxt.js",
      "Node.js",
      "Express",
      "React Native",
    ],
  },
  {
    name: "Cloud & DevOps",
    blurb:
      "Ran a four-node EKS cluster in production as sole engineer, with auto-scaling and ALB ingress. Infrastructure written in Terraform with remote state, so the environment rebuilds from code rather than by hand, and delivery through ArgoCD and GitHub Actions from committed manifests.",
    skills: [
      "AWS (EKS, S3, ALB)",
      "Kubernetes",
      "Docker",
      "Podman",
      "Terraform",
      "ArgoCD",
      "GitHub Actions",
      "CI/CD",
      "Linux",
    ],
  },
  {
    name: "AI & Machine Learning",
    blurb:
      "Built a two-store RAG layer on pgvector giving each generated report patient-scoped retrieval over prior analyses. Used GPT-4o vision to pull structured biomarkers out of scanned lab reports, cutting turnaround by around 80%, with retrieval kept fail-soft so embedding errors degrade output instead of blocking it.",
    skills: [
      "RAG",
      "Vector search (pgvector)",
      "Embeddings",
      "Prompt engineering",
      "LLM integration",
      "TensorFlow",
      "OpenAI GPT-4o / GPT-5 API",
      "KNIME Analytics",
    ],
  },
  {
    name: "Databases",
    blurb:
      "Postgres underneath everything: Supabase for auth and data sync across mobile and web, pgvector for embedding search inside the same database, and DigitalOcean managed instances behind the research platform.",
    skills: ["PostgreSQL", "Supabase", "DigitalOcean managed DBs"],
  },
];

const Skills = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const frames = gsap.utils.toArray(".skills-group");
      if (!frames.length) return;

      // Only where a frame fits a screenful. A phone cannot hold one of
      // these groups in the height a pin gives it, so below 768px the
      // section is not pinned and the frames stack and scroll in normal
      // flow instead (see the phone block in Skills.css). The hide below
      // has to sit inside the query with the timeline that undoes it, or
      // the frames would be set to autoAlpha 0 on a phone and nothing
      // would ever bring them back.
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
      // A slideshow: each scroll step swaps one frame for the next, rather
      // than stacking them up. The pin holds the section while you step
      // through, then releases to the next section.
      gsap.set(frames, { autoAlpha: 0, y: 26 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => "+=" + frames.length * SKILLS_FRAME_SCROLL,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          // Pins change page height; higher priority refreshes earlier, so
          // triggers further down measure against the settled layout.
          refreshPriority: 3,
        },
      });

      const hold = 2; // timeline units each frame stays up

      frames.forEach((frame, i) => {
        const at = i * hold;

        tl.to(frame, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, at);

        // Every frame but the last steps aside for the one after it
        if (i < frames.length - 1) {
          tl.to(
            frame,
            { autoAlpha: 0, y: -26, duration: 0.5, ease: "power2.in" },
            at + hold - 0.5
          );
        }
      });
      });
    },
    { scope: rootRef }
  );

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
            Full-stack and platform engineering, across AI services, cloud
            infrastructure, web and mobile.
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
                  numOctaves="3"
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
