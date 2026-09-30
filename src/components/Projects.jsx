import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DrawnLines from "./DrawnLines";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Selected work. Two tiers: the projects that are live, then the builds
 * behind them. Experience already covers the client platforms, so
 * this section is the independent work rather than a second telling of it.
 */
const shipped = [
  {
    index: "01",
    name: "Trainioapp",
    kind: "Personal trainer and client marketplace",
    platform: "iOS and Android",
    role: "Sole developer",
    dates: "Aug 2025 — Mar 2026",
    points: [
      "Two-sided marketplace with swipe-based discovery, real-time chat and session booking, with separate flows for trainers and clients.",
      "Profile management, certifications, earnings tracking, client leads, and a workout and diet plan builder, with Google Maps for location-based discovery.",
      "Subscription billing with gated features, published as signed builds to both stores.",
    ],
    tech: "React Native · Expo · TypeScript · Supabase · RevenueCat · Google Maps API",
    links: [
      { label: "App Store", href: "https://apps.apple.com/app/workout-gym-coach-trainioapp/id6759800744" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.mumba.trainio",
      },
    ],
  },
  {
    index: "02",
    name: "PupMood",
    kind: "Dog mood tracking",
    platform: "iOS",
    role: "Sole developer",
    dates: "Jun 2026",
    points: [
      "Logs and analyses a dog's mood over time, with multi-dog support, streak tracking, time-of-day mood bucketing, and animated UI with haptic and audio feedback.",
      "Supabase for data sync and auth with Google and Apple Sign-In, a route-guarded onboarding flow, and RevenueCat entitlements gating multi-dog support, mood trends and AI features.",
      "AI-powered mood summaries that turn logged entries into natural-language insights, plus push notifications and reminders.",
      "Full release pipeline: EAS Build, App Store submission, and a marketing landing page with legal and support pages.",
    ],
    tech: "React Native · Expo · TypeScript · Supabase · RevenueCat · EAS Build",
    // No country segment: apps.apple.com redirects to the visitor's own
    // storefront. A /my/ link pins it to Malaysia and can show a region
    // error to someone reading this from anywhere else.
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/app/pupmood-dog-mood-tracker/id6776720786",
      },
    ],
  },
  {
    index: "03",
    name: "FlightPulse",
    kind: "Flight delay insights for Malaysian airports",
    platform: "Web",
    role: "Personal project",
    dates: "Sep 2026 — Present",
    points: [
      "Medallion pipeline (bronze to silver to gold) on Databricks and Delta Lake in PySpark and Spark SQL, with history kept incremental by Delta MERGE upserts.",
      "Two scheduled ingestion jobs: OpenSky aircraft positions every 30 minutes at roughly 12,000 aircraft per snapshot, and Aviationstack landed departures from KUL and PEN daily.",
      "Gold insight tables modelled in Spark SQL with CTEs and window functions for punctuality by airline, hour, route and day, enforcing minimum sample sizes before ranking.",
      "Gold tables served through a FastAPI service on AWS EC2 behind nginx, with connection pooling, result caching and rate limiting, deployed on every push by GitHub Actions.",
    ],
    tech: "Databricks · PySpark · Spark SQL · Delta Lake · Python · FastAPI · AWS EC2 · nginx · GitHub Actions · Angular · TypeScript",
    links: [
      { label: "Live site", href: "https://flightpulse-frontend.vercel.app" },
      { label: "Pipeline", href: "https://github.com/MUMBA-Amos/flightpulse-pipeline" },
      { label: "API", href: "https://github.com/MUMBA-Amos/flightpulse-api" },
      { label: "Frontend", href: "https://github.com/MUMBA-Amos/flightpulse-frontend" },
    ],
  },
];

const builds = [
  {
    index: "04",
    name: "Bird species classification",
    note: "Deep learning on the CUB-200 dataset",
    tech: "Python · TensorFlow",
  },
  {
    index: "05",
    name: "E-commerce categorisation",
    note: "NLP classifier for product taxonomies",
    tech: "Python · NLP",
  },
  {
    index: "06",
    name: "KPI management system",
    note: "Tracking and analysing performance metrics",
    tech: "Web · SQL",
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
          Two apps are live in the stores and one platform is live on the web;
          the rest are the builds behind them.
          Client platforms are under Experience.
        </p>

        <div className="work__group">
          <h3 className="work__label">Shipped</h3>

          {shipped.map((app) => (
            <article className="work-card" key={app.name}>
              <div className="work-card__meta">
                <span className="work-card__index">{app.index}</span>
                <span className="work-card__platform">{app.platform}</span>
                <span className="work-card__role">{app.role}</span>
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

                <p className="work-card__tech">{app.tech}</p>

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
          <h3 className="work__label">Other builds</h3>

          {builds.map((build) => (
            <article className="work-row" key={build.name}>
              <span className="work-row__index">{build.index}</span>
              <h4 className="work-row__name">{build.name}</h4>
              <p className="work-row__note">{build.note}</p>
              <span className="work-row__tech">{build.tech}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
