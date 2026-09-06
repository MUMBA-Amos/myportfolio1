import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import { scrollToSection, setScrollLock, useActiveSection } from "../lib/scroll";
import "./Navbar.css";

gsap.registerPlugin(MorphSVGPlugin);

// The wordmark's full stop cycles through these
const DOT_SHAPES = [
  "M92,50 A42,42 0 1 1 8,50 A42,42 0 1 1 92,50 Z", // dot
  "M14,14 L86,14 L86,86 L14,86 Z", // square
  "M50,8 L91,84 L9,84 Z", // triangle
  "M50,5 L95,50 L50,95 L5,50 Z", // diamond
];

// Held only while the wordmark is hovered
const DOT_HOVER =
  "M50,2 C62,28 72,38 98,50 C72,62 62,72 50,98 C38,72 28,62 2,50 C28,38 38,28 50,2 Z";

// One cell per section on the page, in the order they are scrolled through
const links = [
  { to: "home", label: "Home" },
  { to: "experience", label: "Experience" },
  { to: "skills", label: "Skills" },
  { to: "technologies", label: "Tech" },
  { to: "projects", label: "Projects" },
  { to: "contactSection", label: "Contact" },
];

const sectionIds = links.map((link) => link.to);

// The width the link row folds into the hamburger at. Kept in step with the
// breakpoint in Navbar.css: the menu is only ever open below this.
const MENU_QUERY = "(max-width: 1199px)";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const loopRef = useRef(null);
  const brandRef = useRef(null);

  const { contextSafe } = useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const tl = gsap.timeline({ repeat: -1 });

    // Step to each shape in turn, holding on each one before moving
    DOT_SHAPES.slice(1)
      .concat(DOT_SHAPES[0])
      .forEach((shape) => {
        tl.to(
          dotRef.current,
          { morphSVG: shape, duration: 0.55, ease: "power2.inOut" },
          "+=2.4"
        );
      });

    loopRef.current = tl;
  });

  // Hovering the wordmark takes the dot to a sparkle and holds it there
  const onBrandEnter = contextSafe(() => {
    if (!loopRef.current) return;

    loopRef.current.pause();

    // The whole mark rises as one. This used to split the word into
    // characters and stagger them, which put the five letters at five
    // different heights for most of the movement: on a tight grotesk
    // wordmark that reads as the name coming apart rather than as a
    // flourish. Lifting the anchor takes the letters and the full stop
    // together and keeps their spacing exactly as the font sets it.
    gsap.to(brandRef.current, {
      y: -4,
      duration: 0.28,
      ease: "power2.out",
    });

    gsap.to(dotRef.current, {
      morphSVG: DOT_HOVER,
      duration: 0.32,
      ease: "back.out(2)",
    });
    gsap.to(dotRef.current.ownerSVGElement, {
      scale: 1.6,
      duration: 0.32,
      ease: "back.out(2)",
      // Grown from its left edge rather than its middle. The sparkle
      // reaches the edges of a viewBox the plain dot sits well inside, so
      // scaling about the centre drives its left point into the "a"; from
      // the left edge it grows into the empty space after the word.
      transformOrigin: "0% 50%",
    });
  });

  const onBrandLeave = contextSafe(() => {
    if (!loopRef.current) return;

    gsap.to(brandRef.current, {
      y: 0,
      duration: 0.28,
      ease: "power2.out",
    });

    gsap.to(dotRef.current.ownerSVGElement, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      // Matches the origin used on the way in, or the shrink pulls the dot
      // sideways as it goes back down.
      transformOrigin: "0% 50%",
    });
    gsap.to(dotRef.current, {
      morphSVG: DOT_SHAPES[0],
      duration: 0.3,
      ease: "power2.out",
      // Pick the idle cycle back up from the plain dot
      onComplete: () => loopRef.current.restart(true),
    });
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the panel is over the page, the page underneath stays put. Without
  // this the menu scrolls away from the hamburger that opened it.
  useEffect(() => {
    setScrollLock(open);
    return () => setScrollLock(false);
  }, [open]);

  // Close the mobile menu on Escape, or on a press anywhere outside the bar
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    const onPointerDown = (e) => {
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Widening past the breakpoint puts the links back in the bar, so the open
  // state has to go with them: otherwise it stays set and the panel drops
  // back down the next time the window narrows.
  useEffect(() => {
    const query = window.matchMedia(MENU_QUERY);
    const onChange = (e) => !e.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  // These are real anchors, and the browser's own jump to them is the
  // floor: it needs no JavaScript and cannot be broken by it. preventDefault
  // used to cancel that before handing the travel to Lenis, so when the
  // Lenis scroll did nothing the reader went nowhere at all.
  //
  // Now the default stands. scrollToSection still runs and upgrades the
  // jump to a smooth travel wherever Lenis is cooperating; where it is not,
  // the browser has already done the part that matters. The landing sits
  // clear of the fixed bar via scroll-margin-top in index.css rather than
  // the offset the script used to apply.
  const go = (id) => () => {
    setScrollLock(false);
    close();
    scrollToSection(id);
  };

  return (
    <div
      ref={rootRef}
      className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}
    >
      <nav className="container site-nav__inner" aria-label="Main">
        <a
          href="#home"
          className="site-nav__brand"
          ref={brandRef}
          onClick={go("home")}
          onMouseEnter={onBrandEnter}
          onMouseLeave={onBrandLeave}
          onFocus={onBrandEnter}
          onBlur={onBrandLeave}
        >
          <span className="site-nav__word">Mumba</span>
          <svg
            className="site-nav__dot"
            viewBox="0 0 100 100"
            aria-hidden="true"
            focusable="false"
          >
            <path ref={dotRef} d={DOT_SHAPES[0]} />
          </svg>
        </a>

        <button
          type="button"
          className={`site-nav__toggle ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-controls="site-nav-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="site-nav__bar" />
          <span className="site-nav__bar" />
          <span className="site-nav__bar" />
        </button>

        {/* data-lenis-prevent: Lenis swallows wheel and touch events across
            the whole document, so without it a menu taller than the screen
            cannot be scrolled. */}
        <div
          id="site-nav-menu"
          className={`site-nav__menu ${open ? "is-open" : ""}`}
          data-lenis-prevent
        >
          <ul className="site-nav__list">
            {links.map(({ to, label }) => (
              <li key={to}>
                <a
                  href={`#${to}`}
                  className={`site-nav__link ${
                    active === to ? "is-active" : ""
                  }`}
                  aria-current={active === to ? "true" : undefined}
                  onClick={go(to)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Wrapped so the cell divider belongs to the cell, not to the
              button: the button's own background fills on hover and would
              paint over a divider drawn on it. */}
          <div className="site-nav__cell">
            <a
              href="#contactSection"
              className="site-nav__cta"
              onClick={go("contactSection")}
            >
              Hire me
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
