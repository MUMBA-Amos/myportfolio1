import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DrawnLines from "./DrawnLines";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Selected work. Two tiers: the apps that are live, then the university
 * builds. Experience covers the jobs, so this section is the apps rather
 * than a second telling of them.
 */
const shipped = [
  {
    index: "01",
    name: "MYBaseline Cycle Intelligence",
    kind: "Cycle tracking app built for a healthcare client",
    platform: "iOS and Android",
    role: "Client app",
    dates: "2026",
    points: [
      "Period, symptom and mood logging, cycle predictions and written insight reports.",
      "Subscriptions through RevenueCat.",
    ],
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/my/app/mybaseline-cycle-intelligence/id6810966307",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.baselinemycycle.app",
      },
    ],
  },
  {
    index: "02",
    name: "Trainio",
    kind: "Connects clients with personal trainers",
    platform: "iOS and Android",
    dates: "2025 to 2026",
    points: [
      "Clients swipe through trainers, chat with them live and book sessions.",
      "Google Maps shows the trainers nearby.",
    ],
    links: [
      { label: "App Store", href: "https://apps.apple.com/app/id6759800744" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.mumba.trainio",
      },
    ],
  },
  {
    index: "03",
    name: "PupMood",
    kind: "Dog mood tracker",
    platform: "iOS",
    dates: "2026",
    points: ["Log your dog's mood, keep a streak going, and get AI summaries and reminders."],
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/pupmood-dog-mood-tracker/id6776720786",
      },
    ],
  },
  {
    index: "04",
    name: "FlightPulse",
    kind: "Live flight tracking",
    platform: "Web",
    dates: "2026",
    points: [
      "Shows about 12,000 planes live on a 3D globe, with the weather at each airport.",
      "A Databricks and PySpark pipeline refreshes the data every 30 minutes.",
      "A FastAPI service on AWS serves it to an Angular front end.",
    ],
    tech: "Databricks · PySpark · Python · FastAPI · AWS · Angular",
    links: [
      { label: "Live site", href: "https://flightpulse-frontend.vercel.app" },
      { label: "Pipeline code", href: "https://github.com/MUMBA-Amos/flightpulse-pipeline" },
      { label: "API code", href: "https://github.com/MUMBA-Amos/flightpulse-api" },
      { label: "Front end code", href: "https://github.com/MUMBA-Amos/flightpulse-frontend" },
    ],
  },
];

const builds = [
  {
    index: "05",
    name: "Fall detection",
    note: "A CNN that spots when someone falls",
  },
  {
    index: "06",
    name: "Fake face detection",
    note: "A computer vision model that tells real faces from fake ones",
  },
  {
    index: "07",
    name: "Football fan sentiment",
    note: "An LSTM model that reads how fans feel",
  },
];

const Projects = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      // Same shape as Experience: each card off its own trigger, so the
      // ones further down arrive as they are reached rather than finishing
      // off-screen. `once` leaves them put afterwards, and opacity rather
      // than autoAlpha keeps them in find-in-page and the accessibility
      // tree the whole time.
      gsap.utils.toArray(".work-card, .work-row").forEach((card) => {
        gsap.from(card, {
          y: 28,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="projects" ref={rootRef} className="work">
      <DrawnLines />
      <div className="container">
        <header className="work__head">
          <span className="work__kicker">Selected work</span>
          <h2 className="work__title">Things I&rsquo;ve built</h2>
        </header>

        <p className="work__lede">
          Three apps are live on the App Store and Google Play, and one is live
          on the web. Below them are my university AI projects, built with Keras,
          TensorFlow and scikit-learn.
        </p>

        <div className="work__group">
          <h3 className="work__label">Shipped</h3>

          {shipped.map((app) => (
            <article className="work-card" key={app.name}>
              <div className="work-card__meta">
                <span className="work-card__index">{app.index}</span>
                <span className="work-card__platform">{app.platform}</span>
                {app.role && (
                  <span className="work-card__role">{app.role}</span>
                )}
                <span className="work-card__role">{app.dates}</span>
              </div>

              <div className="work-card__body">
                <h4 className="work-card__name">{app.name}</h4>
                <p className="work-card__kind">{app.kind}</p>

                <ul className="work-card__points">
                  {app.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                {app.tech && <p className="work-card__tech">{app.tech}</p>}

                <p className="work-card__links">
                  {app.links.map(({ label, href }) => (
                    <a
                      key={label}
                      className="work-card__link"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {label}
                    </a>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="work__group">
          <h3 className="work__label">
            University AI projects, 2023 to 2024
          </h3>

          {builds.map((build) => (
            <article className="work-row" key={build.name}>
              <span className="work-row__index">{build.index}</span>
              <h4 className="work-row__name">{build.name}</h4>
              <p className="work-row__note">{build.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
