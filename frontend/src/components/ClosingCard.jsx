import * as C from "../content";

export default function ClosingCard() {
  return (
    <section className="section sectionWhite" data-testid="closing">
      <div className="container">
        <div className="closingCard">
          <h2>{C.closing.title}</h2>
          <a className="btnPrimary" href={C.links.signup} data-testid="closing-cta">
            {C.closing.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
