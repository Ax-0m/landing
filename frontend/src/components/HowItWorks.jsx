import { motion } from "framer-motion";
import * as C from "../content";

export default function HowItWorks() {
  return (
    <section className="section sectionWhite" id="how-it-works" data-testid="how-it-works">
      <div className="container">
        <div className="sectionLabel">{C.how.label}</div>
        <h2 className="sectionTitle">{C.how.title}</h2>
        <div className="steps">
          <motion.span
            className="stepsLine"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          />
          {C.how.steps.map((s, i) => (
            <motion.div
              className="step"
              key={s}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <span className="stepNum">{i + 1}</span>
              <p className="stepText">{s}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
