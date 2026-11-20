export default function AppWindow({ label, active, children }) {
  return (
    <div className="appWindow" data-testid="app-window" aria-label={label}>
      <div className="winEdgeTop" />
      <div className="titleBar">
        <img src="/crown-small.png" alt="Crowned" className="titleMark" data-testid="window-mark" />
        <span className="screenName sectionLabel">{label}</span>
      </div>
      <div className="dots" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`dot ${i === active ? "on" : ""}`} />
        ))}
      </div>
      <div className="screenArea">{children}</div>
      <div className="winEdgeBottom" />
    </div>
  );
}
