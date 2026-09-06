import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DrawnLines from "./DrawnLines";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Selected work. Two tiers: the apps that are live in the stores, then the
 * builds behind them. Experience already covers the client platforms, so
 * this section is the independent work rather than a second telling of it.
 */
const shipped = [
  {
    index: "01",
    name: "Trainioapp",
    kind: "Personal trainer and client marketplace",
    platform: "iOS and Android",
    role: "Sole developer",
    points: [
      "Two-sided marketplace with swipe-based discovery, real-time chat and session booking, with separate flows for trainers and clients.",
      "Profile management, certifications, earnings tracking, client leads, and a workout and diet plan builder, with Google Maps for location-based discovery.",
      "Subscription billing with gated features, published as signed builds to both stores.",
    ],
    tech: "React Native · Expo · TypeScript · Supabase · RevenueCat · Google Maps API",
    links: [
      { label: "App Store", href: "https://apps.apple.com/app/trainioapp" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.trainioapp",
      },
    ],
  },
  {
    index: "02",
    name: "PupMood",
    kind: "Dog mood tracking",
    platform: "iOS",
    role: "Sole developer",
    points: [
      "Logs and analyses a dog's mood over time, with multi-dog support, streak tracking and time-of-day mood bucketing.",
      "Animated component set with haptic and audio feedback, tuned to render smoothly across a range of devices.",
      "Authentication, route-guarded onboarding, data sync, subscription entitlement gating and push notifications, taken through App Store review.",
    ],
    tech: "React Native · Expo · TypeScript · Supabase · RevenueCat · EAS Build",
    links: [{ label: "App Store", href: "https://apps.apple.com/app/pupmood" }],
  },
];

const builds = [
  {
    index: "03",
    name: "Bird species classification",
    note: "Deep learning on the CUB-200 dataset",
    tech: "Python · TensorFlow",
  },
  {
    index: "04",
    name: "E-commerce categorisation",
    note: "NLP classifier for product taxonomies",
    tech: "Python · NLP",
  },
  {
    index: "05",
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

      // opacity rather than autoAlpha, which also sets visibility: hidden
      // and would keep every project out of find-in-page and out of the
      // accessibility tree until it had been scrolled to.
      gsap.from(".work-card, .work-row", {
        y: 28,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
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
          Two apps are live in the stores; the rest are the builds behind them.
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
