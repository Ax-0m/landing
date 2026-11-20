import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as C from "../content";

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const film = document.querySelector('[data-testid="film"]');
        const fin = document.querySelector('[data-testid="closing"]');
        const inFilm = film ? film.getBoundingClientRect().bottom > window.innerHeight * 1.1 : false;
        setStuck(y > 24);
        setHidden(inFilm && y > window.innerHeight * 0.45);
        setOnDark(fin ? fin.getBoundingClientRect().top <= 160 : false);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <motion.header
      className={`header ${stuck ? "stuck" : ""} ${onDark ? "onDark" : ""}`}
      data-testid="header"
      animate={{ y: hidden ? -90 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container headerIn">
        <a href="#top" className="wordmark" data-testid="wordmark" aria-label="Crowned">
          <img src="/crown-small.png" alt="" className="wordmarkCrown" />
          <img src="/wordmark.png" alt="Crowned" />
        </a>
        <a className="btnOutline" href={C.links.signup} data-testid="header-cta">
          {C.nav.cta}
        </a>
      </div>
    </motion.header>
  );
}
