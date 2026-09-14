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
    title: "AI / Full-Stack Engineer",
    kind: "Freelance",
    org: "Baseline Health AI Platform",
    link: { label: "baseline.website", href: "https://baseline.website" },
    place: "Kuala Lumpur, Malaysia",
    dates: "Jun 2025 — May 2026",
    note: "Healthcare AI start-up: patient analytics and reporting",
    points: [
      "Built a women's health platform end to end — Next.js patient and clinic portals on a FastAPI service and Supabase Postgres, deployed on Vercel.",
      "Used GPT-4o vision to extract structured biomarker data from scanned lab reports, cutting report turnaround by around 80%.",
      "Generated clinical narratives with GPT-5 against a strict JSON schema, with every statistic computed in code so the model narrates figures rather than producing them.",
      "Built a two-store RAG layer on pgvector giving each report patient-scoped retrieval, kept fail-soft so embedding errors degrade output rather than block it.",
      "Built the access-control layer for a multi-tenant clinical platform: server-side token identity, clinic-scoped staff access, and medical files served only through short-lived signed URLs, designed around Malaysia's PDPA.",
    ],
    tech: "Python · FastAPI · Next.js · GPT-4o/GPT-5 · pgvector · Supabase · PostgreSQL · Vercel",
  },
  {
    index: "02",
    title: "DevOps / Platform Engineer",
    kind: "Freelance",
    org: "GoAcara Event Management Platform",
    link: { label: "goacara.com", href: "https://goacara.com" },
    place: "Kuching, Malaysia",
    dates: "Aug 2025 — Jan 2026",
    note: "Microservices-based event management SaaS",
    points: [
      "Provisioned a four-node EKS cluster on AWS with auto-scaling and ALB ingress, running a microservices platform in production.",
      "Wrote the infrastructure in Terraform with remote state in S3, so the environment rebuilds from code rather than by hand.",
      "Built GitOps delivery with ArgoCD and GitHub Actions, so deployments came from committed manifests rather than manual kubectl.",
      "Containerised services with Podman and Docker so local and production builds stay identical, removing environment drift as a class of bug.",
      "Ran the platform end to end as sole engineer: cluster, pipelines, database and application code.",
    ],
    tech: "Vue · Nuxt · Node · Go · PostgreSQL · Docker · Podman · Kubernetes · AWS EKS · Terraform · ArgoCD · GitHub Actions",
  },
  {
    index: "03",
    title: "Software Engineering Intern",
    kind: "Internship",
    org: "Sarawak Research Development Council",
    link: { label: "rpmon.sarawakrdc.org.my", href: "https://rpmon.sarawakrdc.org.my", note: "login required" },
    place: "Kuching, Malaysia",
    dates: "Jan — Dec 2024",
    note: "Malaysian state government research agency",
    points: [
      "Built a grant application management system with a five-person team — React and TypeScript front end, Node and Express behind it.",
      "Built the system's initial backend in Laravel (PHP) before the project moved to Node and Express.",
      "Enabled real-time tracking of researcher profiles, publications and performance metrics across departments.",
      "Deployed on DigitalOcean with shell scripting and cron jobs for automated processing and backup.",
    ],
    tech: "React · TypeScript · Node · Express · Laravel · PHP · EJS · SQL · DigitalOcean · Linux",
  },
  {
    index: "04",
    title: "IT Project Intern",
    kind: "Internship",
    org: "Malaysian Dutch Business Council",
    place: "Kuala Lumpur, Malaysia",
    dates: "Sep — Dec 2021",
    note: "Bilateral trade association for Dutch and Malaysian businesses",
    points: [
      "Built an invoicing feature inside the organisation's Bitrix24 CRM, working within an existing CRM/ERP system rather than a greenfield codebase.",
      "Worked with CRM data structures, records and workflow configuration to fit the tool to how the team actually processed members and billing.",
    ],
    tech: "Bitrix24 CRM · PHP · SQL · HTML/CSS",
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
                  <span className="xp-row__kind">{role.kind}</span>
                </h3>
                <p className="xp-row__org">
                  {role.org} — <span>{role.note}</span>
                </p>

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
                    {role.link.note && (
                      <span className="xp-row__note">{role.link.note}</span>
                    )}
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
