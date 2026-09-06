import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Darkens Skills into Technologies' ground as the two sections meet.
 *
 * This is what is left of ScrollPen once the 3D pen was removed. The two
 * were only ever in the same file because the pen dived into this cover on
 * its way out; the cover itself has nothing to do with WebGL and is worth
 * keeping — without it the paper and graphite sections meet on a hard line
 * that the reader watches scroll up the screen.
 *
 * The colour belongs to the outgoing section rather than a full-screen
 * element of its own, so the join between the two is a section boundary
 * with the same colour on both sides. Nothing has to line up with anything,
 * which is what kept producing hairlines and stray blocks at the seam.
 *
 * Renders nothing: it drives an element that already exists inside Skills.
 */
const SectionCover = () => {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const skills = document.querySelector(".skills-section");
    const tech = document.querySelector(".tech-section");
    const cover = document.querySelector(".skills-cover");
    if (!cover || !skills || !tech) return undefined;

    // Forced clear at setup, so a value left behind by an interrupted
    // scrub can never leave the page greyed out.
    gsap.set(cover, { opacity: 0 });

    const reveal = gsap.timeline({
      scrollTrigger: {
        trigger: tech,
        // Starts on the approach rather than at the end of Skills, and is
        // fully covered by the time Technologies touches the bottom edge:
        // the seam exists from the moment the new section enters the
        // viewport, so the cover has to be complete by then.
        start: "top bottom+=60%",
        end: "top bottom",
        scrub: 0.3,
        invalidateOnRefresh: true,
        // Measured last, after the pinned sections have set the page height
        refreshPriority: -1,
        // A fast scroll back up can leave the scrub mid-flight
        onLeaveBack: () => gsap.set(cover, { opacity: 0 }),
      },
    });

    reveal.fromTo(
      cover,
      { opacity: 0 },
      { opacity: 1, ease: "power2.inOut", duration: 1, immediateRender: false }
    );

    return () => {
      reveal.scrollTrigger?.kill();
      reveal.kill();
      gsap.set(cover, { opacity: 0 });
    };
  }, []);

  return null;
};

export default SectionCover;
