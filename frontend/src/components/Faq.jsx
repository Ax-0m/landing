import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import * as C from "../content";

export default function Faq() {
  return (
    <section className="section" data-testid="faq">
      <div className="container">
        <div className="faqGrid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="sectionTitle">{C.faq.title}</h2>
          </motion.div>
          <div className="faqList">
            {C.faq.items.map((it, i) => (
              <motion.details
                className="faqItem"
                key={it.q}
                data-testid={`faq-item-${i + 1}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <summary>
                  <span>{it.q}</span>
                  <Plus size={18} className="faqIcon" />
                </summary>
                <p>{it.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
