import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as C from "../content";
import AppWindow from "./AppWindow";
import { ScreenRenderer } from "./Screens";

const INTRO_END = 0.24;
const CHAPTER = 0.148;
const EXIT_START = INTRO_END + CHAPTER * 5;

export default function Hero() {
  const filmRef = useRef(null);
  const stageRef = useRef(null);
  const [chapter, setChapter] = useState(-1);
  const [barShown, setBarShown] = useState(false);
  const [narrow, setNarrow] = useState(() => window.matchMedia("(max-width: 899px)").matches);
  const [reduce] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const on = () => setNarrow(mq.matches);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const { scrollYProgress } = useScroll({
    target: filmRef,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 260, damping: 42, mass: 0.35 });

  // hero cascade out
  const titleOp = useTransform(p, [0.05, 0.17], [1, 0]);
  const titleY = useTransform(p, [0.05, 0.17], [0, -70]);
  const subOp = useTransform(p, [0.035, 0.14], [1, 0]);
  const subY = useTransform(p, [0.035, 0.14], [0, -54]);
  const actOp = useTransform(p, [0.02, 0.12], [1, 0]);
  const actY = useTransform(p, [0.02, 0.12], [0, -40]);
  const heroBlurN = useTransform(p, [0.04, 0.18], [0, 9]);
  const heroBlur = useMotionTemplate`blur(${heroBlurN}px)`;
  const cueOp = useTransform(p, [0.01, 0.05], [1, 0]);

  // window: scaled card -> edge to edge -> away
  const winScale = useTransform(
    p,
    [0, INTRO_END, EXIT_START, 1],
    narrow ? [0.9, 1, 1, 0.94] : [0.78, 1, 1, 0.92]
  );
  const winR = useTransform(p, [0, INTRO_END, EXIT_START, 1], [38, 0, 0, 38]);
  const winRpx = useMotionTemplate`${winR}px`;
  const winOp = useTransform(p, [0, 0.2, EXIT_START, 0.99], [0.58, 1, 1, 0]);
  const winBlurN = useTransform(p, [0.02, 0.2], [7, 0]);
  const winBlur = useMotionTemplate`blur(${winBlurN}px)`;
  const winY = useTransform(p, [EXIT_START, 1], [0, -60]);

  const tiltFade = useTransform(p, [0.08, INTRO_END], [1, 0]);
  const rotXScroll = useTransform(p, [0, INTRO_END], [7, 0]);
  const rotYScroll = useTransform(p, [0, INTRO_END], [-7, 0]);

  const ptrX = useMotionValue(0);
  const ptrY = useMotionValue(0);
  const ptrRotY = useSpring(useTransform(ptrX, (v) => v * 7), { stiffness: 110, damping: 20 });
  const ptrRotX = useSpring(useTransform(ptrY, (v) => v * -5), { stiffness: 110, damping: 20 });
  const rotY = useTransform([rotYScroll, ptrRotY, tiltFade], ([a, b, f]) => a + b * f);
  const rotX = useTransform([rotXScroll, ptrRotX, tiltFade], ([a, b, f]) => a + b * f);

  const crownScale = useTransform(p, [0, 0.2], [1, 0.2]);
  const crownY = useTransform(p, [0, 0.2], [0, 60]);
  const crownOp = useTransform(p, [0.12, 0.19], [1, 0]);

  const railProgress = useTransform(p, [INTRO_END, EXIT_START], [0, 1]);

  useMotionValueEvent(p, "change", (v) => {
    const c = v < INTRO_END ? -1 : Math.min(4, Math.floor((v - INTRO_END) / CHAPTER));
    setChapter((prev) => (prev === c ? prev : c));
    setBarShown(v > 0.02);
  });

  const onMove = (e) => {
    if (narrow || reduce || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    ptrX.set((e.clientX - r.left) / r.width - 0.5);
    ptrY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    ptrX.set(0);
    ptrY.set(0);
  };

  if (reduce) {
    return (
      <section className="filmReduce" data-testid="film-reduce">
        <div className="container">
          <div className="heroStatic">
            <h1 className="heroTitle">{C.hero.title}</h1>
            <p className="sub">{C.hero.sub}</p>
            <div className="heroActions">
              <a className="btnPrimary" href={C.links.signup} data-testid="hero-cta">
                {C.hero.cta}
              </a>
              <a className="quietLink" href={C.links.howItWorks} data-testid="hero-how-link">
                {C.hero.quiet}
              </a>
            </div>
          </div>
          {C.screens.map((s, i) => (
            <div className="reduceBlock" key={s.id} data-testid={`reduce-block-${s.id}`}>
              <div className="windowWrap">
                <AppWindow label={s.label} active={i}>
                  <ScreenRenderer active={i} reduce />
                </AppWindow>
              </div>
              <div className="captionStatic">
                <h2>{s.head}</h2>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <BottomBar shown />
      </section>
    );
  }

  const active = chapter < 0 ? 0 : chapter;
  const shot = C.screens[active];

  return (
    <section className="film" ref={filmRef} data-testid="film">
      <div className="stage" ref={stageRef} onMouseMove={onMove} onMouseLeave={onLeave}>
        <div className="glow" aria-hidden="true" />
        <div className="hairRing ring1" aria-hidden="true" />
        <div className="hairRing ring2" aria-hidden="true" />

        <motion.div
          className="windowWrap"
          style={{ scale: winScale, y: winY, opacity: winOp, filter: winBlur }}
          data-testid="window-wrap"
        >
          <motion.div className="windowTilt" style={{ rotateX: rotX, rotateY: rotY, "--win-r": winRpx }}>
            <AppWindow label={shot.label} active={active}>
              <ScreenRenderer active={active} reduce={reduce} />
            </AppWindow>

            <AnimatePresence mode="wait">
              {chapter >= 0 && (
                <motion.div
                  className="captionGlass"
                  key={shot.id}
                  data-testid={`caption-${shot.id}`}
                  initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="capIndex">
                    {String(active + 1).padStart(2, "0")} / {String(C.screens.length).padStart(2, "0")}
                    <span className="capLine" />
                    {shot.label}
                  </div>
                  <h2>{shot.head}</h2>
                  <p>{shot.body}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="calloutCol" aria-hidden="true">
              {C.screens.map((s, i) =>
                s.callouts.map((c) => (
                  <div key={c.text} className={`callout ${chapter === i ? "on" : ""}`} style={{ top: c.top }}>
                    <span className="calloutTag">{c.text}</span>
                  </div>
                ))
              )}
            </div>

            {!narrow && <FakeCursor screenId={shot.id} shown={chapter >= 0} />}
          </motion.div>
        </motion.div>

        <motion.div
          className="crownFloat"
          style={{ scale: crownScale, y: crownY, opacity: crownOp }}
          aria-hidden="true"
        >
          <motion.img
            src="/crown.png"
            alt=""
            className="crownImg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="heroLayer">
          <div className="heroInner">
            <motion.div style={{ filter: heroBlur }}>
              <motion.div
                className="heroEyebrow"
                style={{ opacity: actOp }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                data-testid="hero-eyebrow"
              >
                <i />
                {C.hero.eyebrow}
              </motion.div>

              <motion.h1 className="heroTitle" style={{ opacity: titleOp, y: titleY }} data-testid="hero-title">
                {C.hero.title.split(". ").map((line, i, arr) => (
                  <span className="lineMask" key={line}>
                    <motion.span
                      style={{ display: "block" }}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1.1, delay: 0.18 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {i < arr.length - 1 ? `${line}.` : line}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>

              <motion.p
                className="sub"
                style={{ opacity: subOp, y: subY }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {C.hero.sub}
              </motion.p>

              <motion.div
                className="heroActions"
                style={{ opacity: actOp, y: actY }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
              >
                <a className="btnPrimary" href={C.links.signup} data-testid="hero-cta">
                  {C.hero.cta}
                  <ArrowRight size={17} />
                </a>
                <a className="quietLink" href={C.links.howItWorks} data-testid="hero-how-link">
                  {C.hero.quiet}
                </a>
              </motion.div>

              <motion.div className="scrollCue" style={{ opacity: cueOp }} aria-hidden="true">
                <span className="cueLine">
                  <span className="cueDot" />
                </span>
                Scroll
              </motion.div>
            </motion.div>
          </div>
        </div>

        <Rail chapter={chapter} />
        <motion.div className="filmProgress" style={{ scaleX: railProgress }} aria-hidden="true" />
      </div>
      <BottomBar shown={barShown} />
    </section>
  );
}

function Rail({ chapter }) {
  return (
    <div className="rail" aria-hidden="true" data-testid="chapter-rail">
      {C.screens.map((s, i) => (
        <div key={s.id} className={`railItem ${chapter === i ? "on" : ""}`} data-testid={`rail-${s.id}`}>
          <span className="railLabel">{s.label}</span>
          <span className="railDash" />
        </div>
      ))}
    </div>
  );
}

function FakeCursor({ screenId, shown }) {
  const steps = C.cursor[screenId] || [];
  const [step, setStep] = useState(0);
  const [tap, setTap] = useState(0);

  useEffect(() => {
    setStep(0);
    if (!shown || !steps.length) return;
    const timers = steps.map((s, i) =>
      setTimeout(() => {
        setStep(i);
        setTap((t) => t + 1);
      }, s.t * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [screenId, shown, steps.length]);

  if (!shown || !steps.length) return null;
  const at = steps[step];

  return (
    <motion.div
      className="fakeCursor"
      data-testid="fake-cursor"
      initial={false}
      animate={{ left: `${at.x}%`, top: `${at.y}%`, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 2.5l13.2 8.1-5.6 1-2.6 5.4L5 2.5z" fill="#0A0A0B" stroke="#fff" strokeWidth="1.2" />
      </svg>
      <motion.span
        className="cursorTap"
        key={tap}
        initial={{ scale: 0.2, opacity: 0.8 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </motion.div>
  );
}

function BottomBar({ shown }) {
  return (
    <motion.div
      className="mobileBar"
      data-testid="mobile-bar"
      initial={false}
      animate={{ y: shown ? 0 : 120, opacity: shown ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
    >
      <a className="btnPrimary barBtn" href={C.links.signup} data-testid="mobile-cta">
        {C.hero.cta}
      </a>
    </motion.div>
  );
}
