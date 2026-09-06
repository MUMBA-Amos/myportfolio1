import React, { useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import "./DrawnLines.css";

gsap.registerPlugin(DrawSVGPlugin);

/**
 * Guide lines ruled across a paper section, over and over.
 *
 * Each line draws in from one end, holds, then draws out from the same end,
 * the way a draughtsman lays down construction lines and rubs them out. The
 * viewBox is 100x100 with preserveAspectRatio="none", so coordinates are
 * percentages of the section and the lines stretch with it; non-scaling-stroke
 * keeps them a hairline however far they stretch.
 */
const lines = [
  // Long horizontals, the ones that read first
  { x1: 0, y1: 22, x2: 100, y2: 22 },
  { x1: 0, y1: 74, x2: 100, y2: 74 },
  // Verticals, off the obvious thirds so the grid does not look mechanical
  { x1: 17, y1: 0, x2: 17, y2: 100 },
  { x1: 62, y1: 0, x2: 62, y2: 100 },
  { x1: 88, y1: 0, x2: 88, y2: 100 },
  // Short rules, drawn like measurements taken off the long ones
  { x1: 17, y1: 46, x2: 62, y2: 46 },
  { x1: 62, y1: 8, x2: 88, y2: 8 },
  { x1: 33, y1: 22, x2: 33, y2: 74 },
];

const DrawnLines = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const strokes = gsap.utils.toArray(".drawn-lines__line");
      gsap.set(strokes, { drawSVG: "0% 0%" });

      // Each line runs its own endless loop rather than sharing one timeline.
      // A single staggered timeline makes the whole set breathe together and
      // leaves dead gaps between its repeats; independent loops on lengths
      // that do not divide into each other never fall back into step, so
      // something is always being ruled somewhere.
      strokes.forEach((line, i) => {
        const draw = 1.6 + ((i * 7) % 5) * 0.3;
        const hold = 0.6 + ((i * 5) % 4) * 0.25;
        const erase = 1.2 + ((i * 3) % 3) * 0.35;

        gsap
          .timeline({ repeat: -1 })
          .to(line, {
            drawSVG: "0% 100%",
            duration: draw,
            ease: "power1.inOut",
          })
          .to({}, { duration: hold })
          .to(line, {
            drawSVG: "100% 100%",
            duration: erase,
            ease: "power1.inOut",
          })
          // Start each line part-way through its own cycle, so they are
          // already spread out on the first frame instead of easing apart
          .progress((i * 0.317) % 1);
      });
    },
    { scope: rootRef }
  );

  return (
    <svg
      className="drawn-lines"
      ref={rootRef}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {lines.map(({ x1, y1, x2, y2 }) => (
        <line
          key={`${x1}-${y1}-${x2}-${y2}`}
          className="drawn-lines__line"
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
};

export default DrawnLines;
