import React from "react";
import DrawnLines from "./DrawnLines";
import "./Experience.css";

/**
 * Education, certifications and languages. Same clippings as Experience,
 * so it reuses that section's styles — including the #xpTorn filter, which
 * Experience defines earlier on the page.
 */
const entries = [
  {
    index: "01",
    title: "BSc Computer Science in Artificial Intelligence",
    kind: "Degree",
    org: "Swinburne University of Technology, Sarawak Campus",
    note: "Australian Bachelor's degree (AQF Level 7), awarded by Swinburne Melbourne",
    place: "Kuching, Malaysia",
    dates: "2022 — 2025",
    points: [
      "Coursework: Machine Learning, Deep Learning, Data Structures and Algorithms, Software Engineering, Cloud Computing, Database Systems.",
      "Vice President, Africa Unites Society (2023 — 2024).",
    ],
  },
  {
    index: "02",
    title: "Diploma in Business Information Technology",
    kind: "Diploma",
    org: "Asia Pacific University (APU)",
    note: "MQA-accredited private university in Malaysia",
    place: "Kuala Lumpur, Malaysia",
    dates: "2019 — 2021",
    points: [],
  },
  {
    index: "03",
    title: "Certifications & languages",
    kind: "Other",
    org: "Continuing learning",
    note: "courses and languages",
    points: [
      "Machine Learning Specialization, DeepLearning.AI (June 2025).",
      "Kubernetes Hands-On: Deploy Microservices to AWS Cloud, Udemy (2025).",
      "English: Native · German: A1 (in progress) · Dutch: Beginner.",
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
              <p className="xp-row__org">
                {entry.org} — <span>{entry.note}</span>
              </p>

              {entry.points.length > 0 && (
                <ul className="xp-row__points">
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
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
