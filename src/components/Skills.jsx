import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  { name: "PHP", level: 90 },
  { name: "BOOTRAP", level: 75 },
  { name: "HTML5", level: 85 },
  { name: "SQL", level: 80 },
  { name: "PHYTHON", level: 60 },
  { name: "C#", level: 30 },
  { name: "C+", level: 30 },
  { name: "C", level: 30 },
];

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      className="skills-section py-5 text-white"
      ref={ref}
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="container">
        <h2 className="text-center text-success mb-3">
          Skills & Technologiies
        </h2>
        <p className="text-center mb-5">
          With a strong background in web development and design, I have honed a
          diverse set of skills that allow me to craft visually appealing and
          functional websites. Below are some of the key skills that I have
          developed over the years, ranging from front-end technologies to
          content management systems.
        </p>
        <div className="row">
          {skills.map((skill, index) => (
            <div key={index} className="col-lg-6 col-md-6 mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: inView ? `${skill.level}%` : "0%" }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <h5 className="d-flex justify-content-between">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </h5>
                <div
                  className="progress"
                  style={{ height: "10px", backgroundColor: "#333" }}
                >
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${skill.level}%` }}
                    aria-valuenow={skill.level}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
