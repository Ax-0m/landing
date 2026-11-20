import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import * as C from "../content";
import AppWindow from "./AppWindow";
import { ScreenRenderer } from "./Screens";

export default function Hero() {
  const filmRef = useRef(null);
  const stageRef = useRef(null);
  const [chapter, setChapter] = useState(-1);
  const [barShown, setBarShown] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [narrow, setNarrow] = useState(() => window.matchMedia("(max-width: 899px)").matches);
  const [reduce] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const on = () => setNarrow(mq.matches);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const { scrollYProgress } = useScroll({
    target: filmRef,
    offset: ["start start", "end end"],
  });

  const heroOp = useTransform(scrollYProgress, [0.1, 0.2], [1, 0]);
  const heroX = useTransform(scrollYProgress, [0.1, 0.2], [0, -40]);
  const cueOp = useTransform(scrollYProgress, [0.04, 0.055], [1, 0]);

  const winXDesk = useTransform(scrollYProgress, [0, 0.22], ["23vw", "0vw"]);
  const winXNarrow = useTransform(scrollYProgress, () => "0vw");
  const winScaleDesk = useTransform(scrollYProgress, [0, 0.22, 0.97, 1], [0.85, 1, 1, 0.92]);
  const winScaleNarrow = useTransform(scrollYProgress, [0, 0.97, 1], [1, 1, 0.92]);
  const winY = useTransform(scrollYProgress, [0.97, 1], [0, -40]);
  const winOp = useTransform(scrollYProgress, [0.97, 1], [1, 0]);
  const rotYScroll = useTransform(scrollYProgress, [0, 0.5, 1], [-6, 0, 4]);

  const ptrX = useMotionValue(0);
  const ptrY = useMotionValue(0);
  const rotYP = useSpring(useTransform(ptrX, (v) => v * 8), { stiffness: 120, damping: 22 });
  const rotXP = useSpring(useTransform(ptrY, (v) => v * -6), { stiffness: 120, damping: 22 });
  const rotY = useTransform([rotYScroll, rotYP], ([a, b]) => a + b);

  const crownScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.14]);
  const crownY = useTransform(scrollYProgress, [0, 0.22], [0, 44]);
  const crownOp = useTransform(scrollYProgress, [0.16, 0.215], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const c = v < 0.22 ? -1 : v < 0.37 ? 0 : v < 0.52 ? 1 : v < 0.67 ? 2 : v < 0.82 ? 3 : 4;
    setChapter((prev) => (prev === c ? prev : c));
    if (v > 0.02) setBarShown(true);
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
              <AppWindow label={s.label} active={i}>
                <ScreenRenderer active={i} reduce />
              </AppWindow>
              <div className="captionStatic">
                <h2>{s.head}</h2>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <BottomBar shown={barShown} />
      </section>
    );
  }

  const active = chapter < 0 ? 0 : chapter;

  return (
    <section className="film" ref={filmRef} data-testid="film">
      <div className="stage" ref={stageRef} onMouseMove={onMove} onMouseLeave={onLeave}>
        <div className="leftSlot">
          <div className={`heroText ${chapter >= 0 ? "gone" : ""}`}>
            <motion.div style={{ opacity: heroOp, x: heroX }}>
              <h1 className="heroTitle" data-testid="hero-title">
                {C.hero.title}
              </h1>
              <p className="sub">{C.hero.sub}</p>
              <div className="heroActions">
                <a className="btnPrimary" href={C.links.signup} data-testid="hero-cta">
                  {C.hero.cta}
                </a>
                <a className="quietLink" href={C.links.howItWorks} data-testid="hero-how-link">
                  {C.hero.quiet}
                </a>
              </div>
              <motion.div className="scrollCue" style={{ opacity: cueOp }} aria-hidden="true">
                <span className="cueLine">
                  <span className="cueDot" />
                </span>
              </motion.div>
            </motion.div>
          </div>
          {C.screens.map((s, i) => (
            <div className={`caption ${chapter === i ? "active" : ""}`} key={s.id} data-testid={`caption-${s.id}`}>
              <h2>{s.head}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>

        <motion.div
          className="windowWrap"
          style={{
            x: narrow ? winXNarrow : winXDesk,
            scale: narrow ? winScaleNarrow : winScaleDesk,
            y: winY,
            opacity: winOp,
          }}
          data-testid="window-wrap"
        >
          <div className="glow" aria-hidden="true" />
          <div className="hairRing ring1" aria-hidden="true" />
          <div className="hairRing ring2" aria-hidden="true" />
          <motion.div className="windowTilt" style={{ rotateX: rotXP, rotateY: rotY }}>
            <AppWindow label={C.screens[active].label} active={active}>
              <ScreenRenderer active={active} reduce={reduce} />
            </AppWindow>
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
              animate={reduce ? undefined : { y: [0, -9, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        <div className="calloutCol" aria-hidden="true">
          {C.screens.map((s, i) =>
            s.callouts.map((c) => (
              <div key={c.text} className={`callout ${chapter === i ? "on" : ""}`} style={{ top: c.top }}>
                <span className="calloutTag">{c.text}</span>
              </div>
            ))
          )}
        </div>
      </div>
      <BottomBar shown={barShown} />
    </section>
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
