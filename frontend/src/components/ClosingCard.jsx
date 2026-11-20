import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as C from "../content";

export default function ClosingCard() {
  return (
    <section className="section" data-testid="closing">
      <div className="container">
        <motion.div
          className="closingCard"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/crown.png" alt="" className="closingCrown" />
          <h2>{C.closing.title}</h2>
          <a className="btnPrimary" href={C.links.signup} data-testid="closing-cta">
            {C.closing.cta}
            <ArrowRight size={17} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
