import * as C from "../content";

const slug = (s) => s.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "");

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container footerIn">
        <div className="footerBrand">{C.footer.brand}</div>
        <nav className="footerLinks" aria-label="Footer">
          {C.footer.links.map(([label, href]) => (
            <a key={label} href={href} data-testid={`footer-link-${slug(label)}`}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
