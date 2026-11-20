import { Plus } from "lucide-react";
import * as C from "../content";

export default function Faq() {
  return (
    <section className="section" data-testid="faq">
      <div className="container">
        <div className="faqWrap">
          <h2 className="sectionTitle">{C.faq.title}</h2>
          <div className="faqList">
            {C.faq.items.map((it, i) => (
              <details className="faqItem" key={it.q} data-testid={`faq-item-${i + 1}`}>
                <summary>
                  <span>{it.q}</span>
                  <Plus size={18} className="faqIcon" />
                </summary>
                <p>{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
