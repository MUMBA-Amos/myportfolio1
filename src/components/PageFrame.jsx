import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PageFrame.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drawing frame around the whole page: ruled edges, ticks and corner
 * crosses. Decorative only, so it is hidden from assistive tech and never
 * intercepts a click.
 *
 * The frame is fixed while the page scrolls under it, so it has to invert
 * over the ink-flooded Technologies section: drawn in ink there, it would
 * composite to 14 against a ground of 10 and disappear.
 */
const PageFrame = () => {
  const frameRef = useRef(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const tech = document.querySelector(".tech-section");
    if (!frame || !tech) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: tech,
      start: "top bottom",
      end: "bottom top",
      // Measured after the pins above it have set the page height
      refreshPriority: -1,
      onToggle: ({ isActive }) =>
        frame.classList.toggle("frame--on-dark", isActive),
    });

    return () => {
      trigger.kill();
      frame.classList.remove("frame--on-dark");
    };
  }, []);

  return <div className="frame" ref={frameRef} aria-hidden="true" />;
};

export default PageFrame;
