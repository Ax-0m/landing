import { motion } from "framer-motion";
import * as C from "../content";

export function Marquee() {
  const row = [...C.marquee, ...C.marquee];
  return (
    <div className="marquee" data-testid="marquee" aria-hidden="true">
      <motion.div
        className="marqueeTrack"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
      >
        {row.map((t, i) => (
          <span className="marqueeItem" key={`${t}-${i}`}>
            {t}
            <i />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="section sectionWhite" id="how-it-works" data-testid="how-it-works">
      <div className="container">
        <div className="sectionHead">
          <div>
            <div className="sectionLabel">{C.how.label}</div>
            <h2 className="sectionTitle">{C.how.title}</h2>
          </div>
        </div>
        <div className="steps">
          <motion.span
            className="stepsLine"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          />
          {C.how.steps.map((s, i) => (
            <motion.div
              className="step"
              key={s}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="stepNum">{String(i + 1).padStart(2, "0")}</span>
              <p className="stepText">{s}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
