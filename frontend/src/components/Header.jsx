import * as C from "../content";

export default function Header() {
  return (
    <header className="header" data-testid="header">
      <div className="container headerIn">
        <a href="#top" className="wordmark" data-testid="wordmark" aria-label="Crowned">
          <img src="/wordmark.png" alt="Crowned" />
        </a>
        <a className="btnOutline" href={C.links.signup} data-testid="header-cta">
          {C.nav.cta}
        </a>
      </div>
    </header>
  );
}
