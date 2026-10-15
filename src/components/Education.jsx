import React from "react";
import DrawnLines from "./DrawnLines";
import "./Experience.css";

/**
 * Education and certifications. Same clippings as Experience, so it reuses
 * that section's styles — including the #xpTorn filter, which Experience
 * defines earlier on the page.
 *
 * A point is plain text, or { text, link } when there is something to check.
 */
const entries = [
  {
    index: "01",
    title: "BSc Computer Science in Artificial Intelligence",
    kind: "Degree",
    org: "Swinburne University of Technology, Sarawak",
    place: "Kuching, Malaysia",
    dates: "2022 to 2025",
    points: [],
  },
  {
    index: "02",
    title: "Diploma in Business Information Technology",
    kind: "Diploma",
    org: "Asia Pacific University (APU)",
    place: "Kuala Lumpur, Malaysia",
    dates: "2019 to 2021",
    points: [],
  },
  {
    index: "03",
    title: "Certifications",
    kind: "Courses",
    org: "Continuing learning",
    points: [
      {
        text: "Machine Learning Specialization, DeepLearning.AI and Stanford, Coursera (June 2025).",
        link: {
          label: "Verify",
          href: "https://coursera.org/verify/specialization/B9N4T1QHVEUS",
        },
      },
      "Databricks Fundamentals, Databricks (September 2026).",
      "Ultimate RAG Bootcamp Using LangChain, LangGraph and LangSmith, Udemy (July 2026).",
      "Kubernetes Hands-On, Deploy Microservices to the AWS Cloud, Udemy (November 2025).",
      "UML and Object-Oriented Design Foundations, Udemy (August 2024).",
      "CCNA, Introduction to Networks, Cisco (June 2022).",
    ],
  },
];

const Education = () => (
  <section id="education" className="xp">
    <DrawnLines />
    <div className="container">
      <header className="xp__head">
        <span className="xp__kicker">Education</span>
        <h2 className="xp__title">Where I&rsquo;ve studied</h2>
      </header>

      <div className="xp__rows">
        {entries.map((entry) => (
          <article className="xp-row" key={entry.index}>
            <div className="xp-row__meta">
              <span className="xp-row__index">{entry.index}</span>
              {entry.dates && (
                <span className="xp-row__dates">{entry.dates}</span>
              )}
              {entry.place && (
                <span className="xp-row__place">{entry.place}</span>
              )}
            </div>

            <div className="xp-row__body">
              <h3 className="xp-row__title">
                {entry.title}
                <span className="xp-row__kind">{entry.kind}</span>
              </h3>
              <p className="xp-row__org">{entry.org}</p>

              {entry.points.length > 0 && (
                <ul className="xp-row__points">
                  {entry.points.map((point) =>
                    typeof point === "string" ? (
                      <li key={point}>{point}</li>
                    ) : (
                      <li key={point.text}>
                        {point.text}{" "}
                        <a
                          className="xp-row__link"
                          href={point.link.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {point.link.label}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
