import { motion } from "framer-motion";
import { BadgeCheck, CreditCard, SlidersHorizontal, UserRound, Star } from "lucide-react";
import * as C from "../content";

const ICONS = [BadgeCheck, CreditCard, SlidersHorizontal, UserRound, Star];

export default function AppWindow({ label, active, dark, sheenX, children }) {
  return (
    <div className={`appWindow ${dark ? "dark" : ""}`} data-testid="app-window" aria-label={label}>
      <div className="winEdgeTop" />
      <div className="titleBar">
        <div className="winLights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <img src="/crown-small.png" alt="Crowned" className="titleMark" data-testid="window-mark" />
        <div className="winTitleCenter">
          <span className="winUrl" data-testid="window-url">
            crowned.com / {label.toLowerCase()}
          </span>
        </div>
        <span className="winState">{C.windowChrome.state}</span>
      </div>

      <div className="winBody">
        <aside className="winNav" aria-hidden="true">
          <div className="navLabel">{C.windowChrome.tour}</div>
          {C.screens.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <span key={s.id} className={`navItem ${i === active ? "on" : ""}`} data-testid={`nav-item-${s.id}`}>
                <span className="navTick" />
                <Icon size={16} />
                {s.label}
              </span>
            );
          })}
          <div className="navFoot">
            <span className="avatarSm">
              <img src={C.reviews.avatar} alt="" />
            </span>
            <span>
              <span className="navFootName">{C.reviews.name}</span>
              <br />
              <span className="navFootSub">{C.reviews.pill}</span>
            </span>
          </div>
        </aside>
        <div className="screenArea">
          <div className="winWatermark" aria-hidden="true">
            <img src="/crown.png" alt="" />
          </div>
          {children}
        </div>
      </div>
      {sheenX && <motion.div className="winSheen" style={{ x: sheenX }} aria-hidden="true" />}
      <div className="winEdgeBottom" />
    </div>
  );
}
