import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { Clock, Ban } from "lucide-react";
import * as C from "../content";

function Seal({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M4.8 8.2l2.1 2.1 4.3-4.5"
        stroke="var(--paper)"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Head({ i }) {
  return <div className="screenTitle">{C.screens[i].label}</div>;
}

function useAmount(target, run, reduce) {
  const [v, setV] = useState(0);
  const cur = useRef(0);
  useEffect(() => {
    if (!run) {
      setV(0);
      cur.current = 0;
      return;
    }
    if (reduce) {
      cur.current = target;
      setV(target);
      return;
    }
    const c = animate(cur.current, target, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (x) => {
        cur.current = x;
        setV(x);
      },
    });
    return () => c.stop();
  }, [run, target, reduce]);
  return v;
}

export function CertificateScreen({ active }) {
  const d = C.certificate;
  return (
    <div className={`screen ${active ? "active" : ""}`} data-testid="screen-certificate">
      <div className="screenInner">
        <Head i={0} />
        <div className="certTop">
          <div className="avatarWrap" data-cursor="1">
            <img src={d.avatar} alt="" className="avatarPhoto" />
            <span className="corner tl" />
            <span className="corner tr" />
            <span className="corner bl" />
            <span className="corner br" />
            <span className="scanLine" />
          </div>
          <div className="certId">
            <div className="handle">{d.handle}</div>
            <span className="pill" data-cursor="2">
              <Seal /> {d.pill}
            </span>
            <div className="statusLine">{d.status}</div>
          </div>
        </div>
        <div className="rows">
          {d.rows.map(([k, v], i) => (
            <div className="row" key={k} data-cursor={i === 1 ? "3" : undefined}>
              <span className="rowKey">{k}</span>
              <span className="rowVal">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CheckoutScreen({ active, reduce }) {
  const d = C.checkout;
  const [sel, setSel] = useState(d.first);
  useEffect(() => {
    if (!active || reduce) return;
    const t1 = setTimeout(() => setSel(d.second), 2100);
    const t2 = setTimeout(() => setSel(d.first), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active, reduce, d.first, d.second]);
  const price = useAmount(sel, active, reduce);
  const fee = price * d.feeRate;
  const total = price * (1 + d.feeRate);
  const fmt = (n) => `$${n.toFixed(2)}`;
  return (
    <div className={`screen ${active ? "active" : ""}`} data-testid="screen-checkout">
      <div className="screenInner">
        <Head i={1} />
        <div className="giftCard">
          <div className="giftCardTitle">{d.title}</div>
          <div className="chipRow">
            {d.amounts.map((a) => (
              <span
                key={a}
                className={`chip ${a === sel ? "chipOn" : ""}`}
                data-cursor={a === d.second ? "1" : a === d.first ? "2" : undefined}
              >
                ${a}
              </span>
            ))}
          </div>
        </div>
        {d.extras.map(([k, v]) => (
          <div className="giftCard giftRow" key={k}>
            <span className="rowKey">{k}</span>
            <span className="rowVal">{v}</span>
          </div>
        ))}
        <div className="receipt">
          <div className="guestLabel">{d.guest}</div>
          <div className="row">
            <span className="rowKey">Price</span>
            <span className="rowVal tnum">{fmt(price)}</span>
          </div>
          <div className="row">
            <span className="rowKey">Fee</span>
            <span className="rowVal tnum">{fmt(fee)}</span>
          </div>
          <div className="rowTotal" data-cursor="3">
            <span>Total</span>
            <span className="tnum">{fmt(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LimitsScreen({ active, reduce }) {
  const d = C.limits;
  const item = {
    hide: { opacity: 0, y: 10, transition: { duration: 0.15 } },
    show: (dl) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: reduce ? 0 : dl } }),
  };
  const a = active ? "show" : "hide";
  return (
    <div className={`screen ${active ? "active" : ""}`} data-testid="screen-limits">
      <div className="screenInner">
        <Head i={2} />
        <div className="limRow" data-cursor="1">
          <div className="limHead">
            <span className="rowKey">{d.monthly.label}</span>
            <span className="rowVal tnum">{d.monthly.value}</span>
          </div>
          <div className="bar">
            <span className="barFill" style={{ "--w": `${d.monthly.pct}%` }} />
          </div>
        </div>
        <div className="limRow">
          <div className="limHead">
            <span className="rowKey">{d.daily.label}</span>
            <span className="rowVal tnum">{d.daily.value}</span>
          </div>
          <div className="bar">
            <span className="barFill" style={{ "--w": `${d.daily.pct}%` }} />
          </div>
        </div>
        <motion.div className="attemptRow" variants={item} custom={1.0} initial="hide" animate={a}>
          <span className="rowKey">
            <Ban size={13} /> {d.attempt.label}
          </span>
          <span className="rowVal tnum">{d.attempt.value}</span>
        </motion.div>
        <motion.div className="blocked" variants={item} custom={1.4} initial="hide" animate={a}>
          {d.blocked}
        </motion.div>
        <motion.div className="editRow" variants={item} custom={2.4} initial="hide" animate={a} data-cursor="2">
          <span className="rowKey">{d.lower.label}</span>
          <span className="rowVal editVal">
            {d.lower.value}
            <span className="noteChip">{d.lower.note}</span>
          </span>
        </motion.div>
        <motion.div variants={item} custom={3.3} initial="hide" animate={a}>
          <div className="editRow">
            <span className="rowKey">{d.raise.label}</span>
            <span className="rowVal editVal">
              {d.raise.value}
              <span className="noteChip">
                <Clock size={12} /> {d.raise.chip}
              </span>
            </span>
          </div>
          <div className="pendingLine">{d.pending}</div>
        </motion.div>
      </div>
    </div>
  );
}

export function TestScreen({ active, reduce }) {
  const d = C.gifterTest;
  const R = 66;
  const CX = 95;
  const CY = 95;
  const pt = (i) => {
    const v = d.axes[i].v * R;
    return i === 0 ? [CX, CY - v] : i === 1 ? [CX + v, CY] : i === 2 ? [CX, CY + v] : [CX - v, CY];
  };
  const poly = d.axes.map((_, i) => pt(i).join(",")).join(" ");
  const grid = (r) => `${CX},${CY - r} ${CX + r},${CY} ${CX},${CY + r} ${CX - r},${CY}`;
  const pos = [
    { left: -8, top: "50%", transform: "translateY(-50%)" },
    { right: -8, top: "50%", transform: "translateY(-50%)" },
    { left: -8, bottom: -4 },
    { left: "50%", top: -4, transform: "translateX(-50%)" },
  ];
  const lblCls = ["lblLeft", "lblRight", "lblBottom", "lblTop"];
  return (
    <div className={`screen ${active ? "active" : ""}`} data-testid="screen-gifter-test">
      <div className="screenInner wide">
        <Head i={3} />
        <div className="testTop">
          <div className="radarWrap" data-cursor="1">
            <svg viewBox="0 0 190 190" role="img" aria-label="Gifter Test results">
              {[22, 44, 66].map((r) => (
                <polygon key={r} points={grid(r)} className="gridPoly" />
              ))}
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1={CX} y1={CY} x2={pt(i)[0]} y2={pt(i)[1]} className="axisLine" />
              ))}
              <polygon points={poly} className="polyData" />
              {d.axes.map((ax, i) => (
                <circle key={ax.name} cx={pt(i)[0]} cy={pt(i)[1]} r="3.5" fill="currentColor" className="polyDot" />
              ))}
            </svg>
            {d.axes.map((ax, i) => (
              <span key={ax.name} className={`radarLabel ${lblCls[i]}`} style={pos[i]}>
                <i style={{ background: "currentColor", opacity: 0.35 + i * 0.16 }} />
                {ax.name}
              </span>
            ))}
          </div>
          <div className="testRows">
            {d.axes.map((ax, i) => (
              <AxisRow key={ax.name} ax={ax} i={i} active={active} reduce={reduce} />
            ))}
          </div>
        </div>
        <div className="prefBlock">
          <div className="miniLabel">{d.prefLabel}</div>
          <div className="chipRow">
            {d.prefs.map((pref, i) => (
              <motion.span
                key={pref}
                className="chip"
                data-cursor={i === 1 ? "2" : undefined}
                initial={false}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.35, delay: reduce ? 0 : 0.9 + i * 0.14 }}
              >
                {pref}
              </motion.span>
            ))}
          </div>
          <div className="miniLabel">{d.hardLabel}</div>
          <div className="chipRow">
            <motion.span
              className="chip"
              initial={false}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.35, delay: reduce ? 0 : 1.4 }}
            >
              {d.hard[0]}
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AxisRow({ ax, i, active, reduce }) {
  const pct = useAmount(Math.round(ax.v * 100), active, reduce);
  const shade = 0.78 - i * 0.14;
  return (
    <div className="tRow">
      <span className="tDot" style={{ background: "currentColor", opacity: shade }} />
      <span className="tName">{ax.name}</span>
      <span className="tBar">
        <span
          className="tBarFill"
          style={{
            width: active ? `${ax.v * 100}%` : "0%",
            background: "currentColor",
            opacity: shade,
            transition: reduce ? "none" : `width 0.8s cubic-bezier(0.22,1,0.36,1) ${0.4 + i * 0.12}s`,
          }}
        />
      </span>
      <span className="tVal tnum">{Math.round(pct)}%</span>
    </div>
  );
}

export function ReviewsScreen({ active, reduce }) {
  const d = C.reviews;
  const CIRC = 2 * Math.PI * 56;
  const amt = useAmount(100, active, reduce);
  return (
    <div className={`screen ${active ? "active" : ""}`} data-testid="screen-reviews">
      <div className="screenInner">
        <Head i={4} />
        <div className="revTop">
          <span className="avatarSm">
            <img src={d.avatar} alt="" />
          </span>
          <div className="revName">{d.name}</div>
          <span className="pill" data-cursor="3">
            {d.pill}
          </span>
        </div>
        <div className="ringWrap" data-cursor="1">
          <svg viewBox="0 0 132 132" role="img" aria-label="Gifted $100">
            <circle cx="66" cy="66" r="56" className="ringTrack" />
            <circle
              cx="66"
              cy="66"
              r="56"
              className="ringFill"
              transform="rotate(-90 66 66)"
              style={{
                strokeDasharray: CIRC,
                strokeDashoffset: active ? 0 : CIRC,
                transition: reduce ? "none" : "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1) 0.35s",
              }}
            />
          </svg>
          <div className="ringCenter">
            <span className="ringAmt tnum">${Math.round(amt)}</span>
            <span className="ringLbl">{d.ring.label}</span>
          </div>
        </div>
        <motion.div
          className="unlock"
          data-cursor="2"
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.35, delay: reduce ? 0 : 1.5 }}
        >
          <Seal size={15} /> {d.unlocked}
        </motion.div>
      </div>
    </div>
  );
}

export function ScreenRenderer({ active, reduce }) {
  return (
    <>
      <CertificateScreen active={active === 0} />
      <CheckoutScreen active={active === 1} reduce={reduce} />
      <LimitsScreen active={active === 2} reduce={reduce} />
      <TestScreen active={active === 3} reduce={reduce} />
      <ReviewsScreen active={active === 4} reduce={reduce} />
    </>
  );
}
