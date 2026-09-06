import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Height of the fixed navbar, so sections don't land underneath it
const NAV_OFFSET = -72;


let lenis = null;

/**
 * How far the scroll target may run ahead of where the page actually is.
 *
 * Lenis adds every wheel delta onto its target and then eases to it over a
 * fixed duration, so a fast flick stacks up thousands of pixels and the page
 * covers all of it in the same 1.4s. Capping the backlog is what keeps a hard
 * spin from bolting; the wheel multiplier alone only makes slow scrolling
 * sluggish without fixing it.
 */
const MAX_LEAD = 800;

/**
 * Trim a wheel delta so the pending distance stays within MAX_LEAD.
 *
 * Never returns 0: Lenis treats a zero delta as a click rather than a scroll
 * and bails out before calling preventDefault, which hands the gesture back
 * to the browser and jumps the page.
 */
export function clampWheel(lead, delta, max = MAX_LEAD) {
  const next = lead + delta;
  if (Math.abs(next) <= max) return delta;

  const direction = Math.sign(next);
  const trimmed = direction * max - lead;

  // Keep at least a pixel of travel in the direction asked for
  return Math.sign(trimmed) === direction ? trimmed : direction;
}

/**
 * Start smooth scrolling. Returns a teardown function.
 * Skipped entirely when the visitor asks for reduced motion.
 */
export function startLenis() {
  if (lenis) return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  lenis = new Lenis({
    // Higher duration = heavier glide; lower multiplier = less distance
    // covered per wheel notch. Together they slow the page down.
    duration: 1.4,
    wheelMultiplier: 0.65,
    touchMultiplier: 1.2,
    smoothWheel: true,

    // Runs before Lenis reads the delta, so editing it here is what actually
    // changes the scroll. The emitted "virtual-scroll" event is a copy and
    // mutating that would do nothing.
    virtualScroll: (data) => {
      if (lenis) {
        data.deltaY = clampWheel(
          lenis.targetScroll - lenis.animatedScroll,
          data.deltaY
        );
      }
      return true;
    },
  });

  // ScrollTrigger reads scroll position itself; without this it never learns
  // that Lenis moved the page and every trigger fires at the wrong point.
  lenis.on("scroll", ScrollTrigger.update);

  // One clock for both: GSAP's ticker drives Lenis, instead of a second RAF loop
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
  };
}

/**
 * Distance from the top of the document to an element.
 *
 * offsetTop is measured from the nearest positioned ancestor, so anything
 * inside the sticky stack (Technologies, Projects) reports a number that is
 * short by the stack's own offset. Going through the rect avoids that.
 */
function documentTop(el) {
  return el.getBoundingClientRect().top + window.scrollY;
}

/**
 * Scroll to a section by id. Goes through Lenis when it is running, so the
 * two never drive scrollTop against each other; falls back to the native
 * behaviour when it is not.
 */
export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenis) {
    // force: a nav link tapped from the open mobile menu asks for this while
    // the menu still holds the scroll lock, and Lenis ignores an unforced
    // scrollTo while it is stopped.
    lenis.scrollTo(target, { offset: NAV_OFFSET, force: true });
  } else {
    window.scrollTo({
      top: documentTop(target) + NAV_OFFSET,
      behavior: "smooth",
    });
  }
}

/**
 * Freeze or release page scrolling, for as long as something is laid over the
 * page (the mobile menu). Lenis owns the wheel and touch handlers when it is
 * running, so pausing it is what actually stops the page; the body rule is
 * the fallback for the reduced-motion case where Lenis never started.
 */
export function setScrollLock(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.body.style.overflow = locked ? "hidden" : "";
}

/** Back to the top, through Lenis when it is running. */
export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/** Which of the given sections the reader is currently in. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const onScroll = () => {
      const line = window.scrollY - NAV_OFFSET + 24;
      let current = ids[0];

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && documentTop(el) <= line) current = id;
      });

      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);

  return active;
}
