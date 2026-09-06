import React, { useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaPhone,
  FaLinkedin,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa";
import "./Header.css";
import { scrollToSection } from "../lib/scroll";
import IpodPlayer from "./IpodPlayer";
import DrawnLines from "./DrawnLines";

gsap.registerPlugin(TextPlugin, SplitText, Physics2DPlugin, ScrollTrigger);

const stats = [
  { figure: "3", label: "Years Experience" },
  { figure: "8", label: "Projects Completed" },
  { figure: "30+", label: "Technologies Used" },
];

// Scroll the wipe spends taking the hero off the section underneath it
const WIPE = 640;

// The section the hero is pulled off to uncover: whatever comes first below
// it, which is Experience
const NEXT = ".xp";

const roles = [
  "Developer",
  "Web Developer",
  "AI Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
];

const sections = [
  { to: "skills", label: "Skills" },
  { to: "projects", label: "Projects" },
  { to: "contactSection", label: "Contact" },
];

const Header = () => {
  const roleRef = useRef(null);
  const nameRef = useRef(null);
  const actionsRef = useRef(null);

  const { contextSafe } = useGSAP(() => {
    // Timers that put the hero back on screen if an animation fails to.
    // Collected so a remount cancels them rather than leaving them to fire
    // against elements that no longer exist.
    const revealGuards = [];

    // mask:"chars" wraps each character so it can rise out of its own clip
    const split = new SplitText(nameRef.current, {
      type: "chars",
      mask: "chars",
    });

    // Only the o's keep spinning once the entrance lands
    const spinners = split.chars.filter(
      (char) => char.textContent.toLowerCase() === "o"
    );

    // One entrance: the name rises character by character
    gsap
      .timeline()
      .from(split.chars, {
        yPercent: 120,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.03,
      })
      .add(() => {
        // mask:"chars" clips each glyph, which would crop it mid-spin
        split.chars.forEach((char) => {
          if (char.parentNode) char.parentNode.style.overflow = "visible";
        });

        gsap.to(spinners, {
          rotation: 360,
          duration: 7,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
          stagger: 0.4,
        });
      });

    // Scrapbook entrance: the pieces are laid onto the desk one after
    // another, each dropping a little way in from its own angle so they
    // read as placed by hand rather than faded in together. `from` tweens
    // land on whatever each sheet already sits at, so the note and the iPod
    // keep the resting tilts their CSS gives them.
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // A `from` tween records whatever state it finds as the one to land
      // on. StrictMode mounts twice in development, so the second pass can
      // find these sheets still at the first pass's start state and animate
      // them from hidden to hidden: they stay at opacity 0 for good, taking
      // View CV and the social row with them, since a sheet the browser
      // cannot see is a sheet it will not hand a click to. Clearing first
      // makes the landing state the CSS one on every mount.
      gsap.set([".newspaper", ".note", ".ipod"], { clearProps: "all" });

      gsap
        .timeline({ delay: 0.35, defaults: { ease: "power3.out" } })
        .from(".newspaper", {
          y: 48,
          rotation: -5,
          scale: 0.96,
          autoAlpha: 0,
          duration: 0.9,
        })
        .from(
          ".note",
          { y: 36, rotation: 8, scale: 0.94, autoAlpha: 0, duration: 0.75 },
          "-=0.55"
        )
        .from(
          ".ipod",
          { y: 30, rotation: -7, scale: 0.95, autoAlpha: 0, duration: 0.7 },
          "-=0.45"
        );

      // A backstop for the sheets, and only for the sheets.
      //
      // Every `from` above starts by hiding its target, so from the moment
      // this runs the hero's whole contents are invisible and stay that way
      // until the timeline lands. Anything that stops it in between — a
      // plugin that failed to register, an error thrown in a callback, a
      // tween killed by a context revert — leaves a visitor looking at an
      // empty first screen and concluding the site is broken. The text, the
      // CV link and the contact row are all inside those sheets.
      //
      // Deliberately not applied below the fold: content that waits until
      // it is scrolled to is correct there, and forcing it visible would
      // break the sequences it belongs to. The hero is the one place where
      // hidden and broken look identical to someone who has just arrived.
      const landed = window.setTimeout(() => {
        gsap.set([".newspaper", ".note", ".ipod"], { autoAlpha: 1 });
      }, 2600);

      revealGuards.push(landed);
    }

    // Leaving the hero is one held movement rather than a scroll: the hero
    // stops at its bottom edge, the sheets fold, and then the hero itself is
    // cut away from the top edge down, uncovering the section beneath it.
    //
    // What makes the uncovering work is that the hold takes no pin spacing.
    // The page keeps flowing behind the held hero, so the section below
    // travels up under it while it is stopped — one screen of travel, which
    // is exactly what it takes to go from the bottom edge of the screen to
    // the top. It then holds still there for the length of the wipe, so what
    // the cut uncovers is a settled page, not one still moving.
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const next = document.querySelector(NEXT);
        const hero = document.querySelector(".header");

        // Anywhere at or past the start of the hold, the hero is under the
        // cut; above it, it is a whole sheet. Read off the scroll rather
        // than the trigger's progress, which is not settled yet at the
        // point a refresh asks.
        const markCut = (self) =>
          hero.classList.toggle("header--cut", self.scroll() >= self.start);

        // Holds from the hero's bottom edge, not its top: the hero is taller
        // than the viewport, so pinning at the top would hold the half of it
        // nobody has read yet.
        ScrollTrigger.create({
          trigger: ".header",
          start: "bottom bottom",
          end: () => "+=" + (window.innerHeight + WIPE),
          pin: true,
          // Measured on every refresh, since it is a screen height
          invalidateOnRefresh: true,
          // No spacer: this is what lets the next section come up behind the
          // hero instead of waiting below the hold.
          pinSpacing: false,
          // Topmost pin on the page, so it is measured first and the ones
          // below it are laid out against a settled page
          refreshPriority: 5,
          // Marks the hero from the moment the hold starts and leaves it
          // marked afterwards. With no pin spacing the hero is left lying
          // over the section below it once the hold is done, so the cut has
          // to stay on it — uncut it would paint straight over that
          // section. Only scrolling back above the hold makes it a whole
          // sheet again, and off the class nothing reads --wipe, so a value
          // left behind by a scrub cannot crop it up there.
          //
          // Both callbacks run the same check, on the same trigger: the
          // toggle covers arriving and leaving, the refresh covers landing
          // partway down the page, where no toggle ever fires.
          onToggle: markCut,
          onRefresh: markCut,
        });

        if (!next) return;

        // The uncovered section stands still while the hero comes off it.
        ScrollTrigger.create({
          trigger: next,
          start: "top top",
          end: "+=" + WIPE,
          pin: true,
          invalidateOnRefresh: true,
          // Below the hero's pin, above the ones further down the page
          refreshPriority: 4,
        });

        // The cut: the hero's top edge travels down over it and the hero
        // dims as it goes, so the sheet reads as being taken off the page
        // rather than fading. The section under it comes in a shade hot, as
        // if it had been lit through the sheet that was covering it.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: next,
              start: "top top",
              end: "+=" + WIPE,
              scrub: 0.4,
              invalidateOnRefresh: true,
              refreshPriority: 4,
            },
          })
          .fromTo(
            ".header",
            // How far the wipe has travelled down the screen. Only this is
            // animated; where it lands on the hero is worked out in CSS,
            // measured off the screen rather than off the hero, which is
            // taller than the screen and mostly above the top of it.
            //
            // The dimming rides an overlay's opacity rather than
            // filter: brightness() on the hero. A filter rasterises the
            // whole subtree into a buffer first, and this subtree holds two
            // sheets carrying their own feTurbulence — so the old version
            // re-ran both SVG filters and re-rasterised a full screen on
            // every frame of the wipe. That was the lag on this transition.
            { "--wipe": "0px", "--dim": 0 },
            {
              "--wipe": () => window.innerHeight + "px",
              // What brightness(0.78) came to: a 22% darkening
              "--dim": 0.22,
              ease: "none",
              // Nothing is written until the reader is in the range
              immediateRender: false,
            },
            0
          )
          .fromTo(
            next,
            // Likewise: brightness(1.12) was a 12% lift, carried here by a
            // white overlay that fades out as the sheet comes off.
            { "--lift": 0.11 },
            { "--lift": 0, ease: "none", immediateRender: false },
            0
          );
      }
    );

    // Role tagline picks up once the entrance has landed
    const rolesTl = gsap.timeline({ repeat: -1, delay: 1.6 });

    roles.forEach((role) => {
      rolesTl
        .to(roleRef.current, {
          duration: 1,
          text: { value: role },
          ease: "none",
        })
        .to({}, { duration: 1.5 });
    });

    // SplitText rewrites the DOM, and matchMedia owns the pin: undo both.
    // The reveal guards go too, or a remount leaves timers pointed at
    // sheets that are no longer on the page.
    return () => {
      revealGuards.forEach(window.clearTimeout);
      mm.revert();
      split.revert();
    };
  });

  // Confetti burst from the click point, thrown by Physics2DPlugin
  const burst = contextSafe((event) => {
    const host = actionsRef.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rect = host.getBoundingClientRect();
    const originX = event.clientX - rect.left;
    const originY = event.clientY - rect.top;

    const pieces = Array.from({ length: 26 }, () => {
      const piece = document.createElement("span");
      piece.className = "hero-spark";
      host.appendChild(piece);
      return piece;
    });

    gsap.set(pieces, {
      x: originX,
      y: originY,
      scale: () => gsap.utils.random(0.5, 1.3),
      backgroundColor: () => gsap.utils.random(["#1b1e0c", "#3f4a15", "#f6f7e6"]),
    });

    gsap.to(pieces, {
      duration: 1.5,
      // angle 270 is straight up; gravity pulls the pieces back down
      physics2D: {
        velocity: () => gsap.utils.random(260, 560),
        angle: () => gsap.utils.random(235, 305),
        gravity: 900,
      },
      rotation: () => gsap.utils.random(-300, 300),
      opacity: 0,
      ease: "none",
      onComplete: () => pieces.forEach((piece) => piece.remove()),
    });
  });

  return (
    <header id="home" className="header d-flex">
      <DrawnLines />
      <div className="container">
        <div className="hero-content row align-items-center mt-5">
          <div className="hero-text col-12">
            <h1>
              <span className="hero-greeting">Hello I&rsquo;m</span>
              <span className="hero-name">
                <span className="hero-name__text" ref={nameRef}>
                  Mumba Amos Ntambo
                </span>
              </span>
            </h1>
            <div className="hero-sheets">
            <div className="newspaper">
              {/* Roughens the paper silhouette; text stays unfiltered above it */}
              <svg className="newspaper__defs" aria-hidden="true" focusable="false">
                <defs>
                  <filter id="tornEdge">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.018 0.055"
                      numOctaves="2"
                      seed="7"
                      result="noise"
                    />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="noise"
                      scale="11"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                  </filter>
                </defs>
              </svg>

              <p className="newspaper__banner">Breaking News</p>

              <div className="newspaper__dateline">
                <span className="newspaper__role" ref={roleRef}>
                  Developer
                </span>
                <span className="newspaper__folio">Vol. 01 — No. 01</span>
              </div>

              <h2 className="newspaper__headline">
                On building, learning &amp; bringing ideas to life
              </h2>

              <p className="newspaper__lede">
                Hello Everyone! I love creating and building, and I’m always
                eager to learn and grow my skills. Explore my work to see the
                projects I’ve completed and the skills I’ve developed along the
                way. I’m excited about new challenges and ready to bring fresh
                ideas to life.
              </p>

              <blockquote className="newspaper__quote">
                “I love creating and building.”
              </blockquote>

              <div
                ref={actionsRef}
                className="hero-actions d-flex align-items-center flex-wrap"
              >
                {/* No `download` attribute: the button says View, so it
                    opens the PDF in the browser's own viewer rather than
                    dropping a file in the visitor's downloads. Saving it is
                    one click from there for anyone who wants to. */}
                <a
                  href={`${process.env.PUBLIC_URL}/cv.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn hero-cv"
                  onClick={burst}
                >
                  View CV
                </a>
                <div className="social-icons ml-4">
                  <a href="tel:+60176307134" className="icon">
                    <FaPhone />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mumba-amos-ntambo-54a665214/"
                    className="icon"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://wa.me/+60176307134?text=Hello%20Mumba!"
                    className="icon"
                  >
                    <FaWhatsapp />
                  </a>
                  <a href="https://github.com" className="icon">
                    <FaGithub />
                  </a>
                </div>
              </div>

            </div>

            <div className="hero-side">
            <aside className="note">
              {/* Finer, more frequent nicks than the newspaper's long tears */}
              <svg className="note__defs" aria-hidden="true" focusable="false">
                <defs>
                  <filter id="chippedEdge">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.05 0.045"
                      numOctaves="2"
                      seed="3"
                      result="noise"
                    />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="noise"
                      scale="7"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                  </filter>
                </defs>
              </svg>

              <span className="note__tape" aria-hidden="true" />
              <h2 className="note__title">Inside this issue</h2>
              <ul className="note__list">
                {sections.map(({ to, label }) => (
                  <li key={to} className="note__row">
                    <a
                      className="note__link"
                      href={`#${to}`}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection(to);
                      }}
                    >
                      <span className="note__box" aria-hidden="true" />
                      <span className="note__label">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>

            </aside>

            <IpodPlayer />
            </div>
            </div>
          </div>
        </div>
        <div className="figures">
          {stats.map(({ figure, label }) => (
            <div className="figures__cell" key={label}>
              <span className="figures__figure">{figure}</span>
              <span className="figures__label">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </header>
  );
};


export default Header;
