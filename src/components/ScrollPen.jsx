import React, { useLayoutEffect, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import penUrl from "../models/fountain-pen.glb";
import "./ScrollPen.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fountain pen that turns as you scroll.
 *
 * The rotation is driven by a GSAP-tweened plain object rather than by
 * touching the mesh directly, so ScrollTrigger's scrub does the easing and
 * the render loop just reads the current value.
 */
const Pen = ({ spin }) => {
  const gltf = useLoader(GLTFLoader, penUrl);
  const group = useRef();

  // The model's own scale and origin are unknown, so normalise both.
  // Reset first so running twice (StrictMode) gives the same result.
  useLayoutEffect(() => {
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.scale.setScalar(1);

    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    const longest = Math.max(size.x, size.y, size.z) || 1;
    const factor = 1.9 / longest;

    // Scale first, then offset by the *scaled* centre, or the model flies
    // off camera: a node's own scale does not apply to its own position.
    gltf.scene.scale.setScalar(factor);
    gltf.scene.position.copy(centre).multiplyScalar(-factor);
  }, [gltf]);

  useFrame((state) => {
    if (!group.current) return;
    const drift = Math.sin(state.clock.elapsedTime * 0.35) * 0.06;
    group.current.rotation.y = spin.current.ry;
    group.current.rotation.z = spin.current.rz + drift;
    group.current.position.x = spin.current.x;
    group.current.position.y = spin.current.y;
    group.current.scale.setScalar(spin.current.s);
  });

  return (
    <group ref={group} rotation={[0, 0, 0.35]}>
      <primitive object={gltf.scene} />
    </group>
  );
};

const ScrollPen = () => {
  // Mutable so the render loop can read it without re-rendering React
  const spin = useRef({ ry: 0, rz: 0.35, x: 2.6, y: 1.7, s: 1 });
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const canvas = rootRef.current;
    const skills = document.querySelector(".skills-section");
    const tech = document.querySelector(".tech-section");
    const cover = document.querySelector(".skills-cover");
    if (!canvas || !skills) return undefined;

    // This component is the only owner of the cover. Force it clear at setup
    // so a stale value can never leave the page greyed out.
    if (cover) gsap.set(cover, { opacity: 0 });

    // A path down the whole page: four keyframes, eased between, so the
    // pen threads the sections together instead of darting about.
    const tween = gsap.timeline({
      scrollTrigger: {
        // No trigger element: body is height:100% so it measures one
        // viewport, not the page. 0 -> "max" is the whole scrollable range.
        start: 0,
        endTrigger: tech || skills,
        end: tech ? "top bottom" : "top top",
        scrub: 1.1,
        invalidateOnRefresh: true,
        // Measured last, after the pinned sections have set the page height
        refreshPriority: -1,
      },
    });

    // How far the path may reach sideways.
    //
    // The frame the camera sees is 2 * z * tan(fov/2) * aspect wide, so its
    // width falls with the viewport's aspect ratio while its height does
    // not. The x values below are tuned for a wide desktop frame; on a
    // phone that same reach is well outside it and the pen would spend the
    // whole page off-screen. Scaling them by how much frame there actually
    // is keeps the same weave, just narrower. Never scaled up past 1, so
    // wide screens keep the path as authored.
    //
    // Read through gsap's function-based values, and the triggers below
    // already carry invalidateOnRefresh, so a resize re-measures it.
    const REACH = 3.4; // the widest |x| the path below asks for
    const frameHalfWidth = () =>
      6 * Math.tan((42 * Math.PI) / 180 / 2) *
      (window.innerWidth / window.innerHeight);
    // 0.86 keeps the pen just inside the edge rather than clipping on it
    const fit = () => Math.min(1, (frameHalfWidth() * 0.86) / REACH);

    // Weaves down the page. The first leg is short and stays right, so it
    // clears the hero headline; after that it crosses side to side.
    tween
      .to(spin.current, {
        x: () => 3.4 * fit(),
        y: 0.8,
        ry: Math.PI * 0.7,
        rz: -0.15,
        duration: 0.7,
        ease: "sine.inOut",
      })
      .to(spin.current, {
        x: () => -2.8 * fit(),
        y: -0.2,
        ry: Math.PI * 1.6,
        rz: 0.55,
        duration: 1,
        ease: "sine.inOut",
      })
      .to(spin.current, {
        x: () => 2.7 * fit(),
        y: -1.2,
        ry: Math.PI * 2.4,
        rz: -0.4,
        duration: 1,
        ease: "sine.inOut",
      })
      .to(spin.current, {
        x: () => -2.3 * fit(),
        y: -2.2,
        ry: Math.PI * 3.2,
        rz: 0.3,
        duration: 1,
        ease: "sine.inOut",
      });

    // Runs on the approach to Technologies, not at the end of Skills. The
    // sections in between scroll normally on paper; the pen only rushes the
    // camera once Technologies is the next thing, so the flood of graphite
    // is adjacent to the section it belongs to and nothing is hidden behind
    // a cover on the way there.
    const zoom = gsap.timeline({
      scrollTrigger: {
        trigger: tech,
        // Ends where Technologies first touches the bottom of the screen,
        // not where it reaches the top. The seam between the two sections
        // exists from the moment the new one enters the viewport, so the
        // cover has to be full by then — any later and the reader
        // watches a hard paper/graphite join scroll up the screen.
        start: "top bottom+=60%",
        end: "top bottom",
        scrub: 0.4,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        // A fast scroll up can leave the scrub mid-flight; above the
        // transition the pen must be back to its faint travelling state.
        // Only the canvas: the cover belongs to the timeline below.
        onLeaveBack: () => gsap.set(canvas, { opacity: 0.3 }),
      },
    });

    zoom
      .to(
        spin.current,
        {
          x: 0,
          y: 0,
          rz: 0.9,
          ry: Math.PI * 4.4,
          // The barrel has to be wider than the screen's diagonal, not just
          // its width: lying at an angle, anything narrower leaves the two
          // opposite corners open and the previous section shows through
          // them. At 30 the model spanned about 5.7 units against a 8.9-unit
          // diagonal, which is exactly the wedge that was visible.
          s: 70,
          ease: "power3.in",
          duration: 0.72,
        },
        0
      )
      .to(canvas, { opacity: 1, ease: "power2.in", duration: 0.3 }, 0);

    // The pen drops out behind the cover, so it is not left at 70x
    zoom.to(canvas, { opacity: 0, ease: "none", duration: 0.08 }, 0.92);

    // Skills darkens to Technologies' ground while the pen dives into it.
    // There is no separate full-screen element any more: the colour belongs
    // to the outgoing section, so the join between the two sections is a
    // section boundary with the same colour on both sides. Nothing has to
    // line up with anything, which is what kept producing hairlines and
    // stray blocks at the seam.
    let reveal;
    if (cover) {
      reveal = gsap.timeline({
        scrollTrigger: {
          trigger: tech,
          start: "top bottom+=60%",
          // Fully covered by the time Technologies touches the bottom edge
          end: "top bottom",
          scrub: 0.3,
          invalidateOnRefresh: true,
          refreshPriority: -1,
          onLeaveBack: () => gsap.set(cover, { opacity: 0 }),
        },
      });

      reveal.fromTo(
        cover,
        { opacity: 0 },
        { opacity: 1, ease: "power2.inOut", duration: 1, immediateRender: false }
      );
    }

    return () => {
      reveal?.scrollTrigger?.kill();
      reveal?.kill();
      if (cover) gsap.set(cover, { opacity: 0 });
      zoom.scrollTrigger?.kill();
      zoom.kill();
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="scroll-pen" ref={rootRef} aria-hidden="true">
      {/* R3F sets pointer-events: auto inline on the canvas container, which
          beats the pointer-events: none this component's CSS puts on the
          wrapper: the result is a full-viewport canvas over the page that
          swallows every click. The style prop is merged into that container,
          so this is what actually turns it off. */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 2]}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <directionalLight position={[-4, -2, -3]} intensity={0.6} />
        <React.Suspense fallback={null}>
          <Pen spin={spin} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default ScrollPen;
