import { Link } from "react-router-dom"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      className="bg-secondary text-secondary-foreground"
      style={{ padding: "var(--sp-12) 0 var(--sp-8)" }}
    >
      <div className="page-container">
        <div
          className="flex flex-col md:flex-row items-start justify-between"
          style={{ gap: "var(--sp-10)" }}
        >
          <div>
            <Link
              to="/"
              className="font-serif italic text-secondary-foreground"
              style={{
                fontSize: "var(--fs-h1)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                textDecoration: "none",
              }}
              aria-label="SAL - Home"
            >
              SAL
            </Link>
            <p
              className="text-secondary-foreground/40"
              style={{
                marginTop: "var(--sp-3)",
                fontSize: "var(--fs-sm)",
                maxWidth: "280px",
                lineHeight: 1.6,
              }}
            >
              Designer and artist working between digital design and fine art.
            </p>
          </div>

          <div className="flex" style={{ gap: "var(--sp-10)" }}>
            <div className="flex flex-col" style={{ gap: "var(--sp-3)" }}>
              <p
                className="text-secondary-foreground/30 uppercase font-medium"
                style={{
                  fontSize: "var(--fs-xs)",
                  letterSpacing: "0.12em",
                  marginBottom: "var(--sp-1)",
                }}
              >
                Pages
              </p>
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/work", label: "Work" },
                { to: "/fine-art", label: "Fine Art" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="link-underline text-secondary-foreground/60 hover:text-secondary-foreground"
                  style={{
                    fontSize: "var(--fs-sm)",
                    transition: "color var(--dur-base) var(--ease)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col" style={{ gap: "var(--sp-3)" }}>
              <p
                className="text-secondary-foreground/30 uppercase font-medium"
                style={{
                  fontSize: "var(--fs-xs)",
                  letterSpacing: "0.12em",
                  marginBottom: "var(--sp-1)",
                }}
              >
                Social
              </p>
              {[
                { label: "Instagram", href: "https://www.instagram.com/" },
                { label: "LinkedIn",  href: "https://www.linkedin.com/in/" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-secondary-foreground/60 hover:text-secondary-foreground"
                  style={{
                    fontSize: "var(--fs-sm)",
                    transition: "color var(--dur-base) var(--ease)",
                    textDecoration: "none",
                  }}
                  aria-label={`Visit SAL on ${social.label} (opens in new tab)`}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            margin: "var(--sp-10) 0 var(--sp-6)",
          }}
          aria-hidden="true"
        />

        <div className="flex items-center justify-between footer-bottom-row">
          <div
            className="flex flex-col footer-contact-info"
            style={{ gap: "var(--sp-2)", fontSize: "var(--fs-xs)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center" style={{ gap: "var(--sp-2)" }}>
              <span className="text-secondary-foreground/30">
                {"Gholamiasal80@gmail.com"}
              </span>
              <span className="hidden sm:block text-secondary-foreground/20">
                {"  /  "}
              </span>
              <span className="text-secondary-foreground/30">
                {"(604) 345-7809"}
              </span>
            </div>
            <span className="text-secondary-foreground/20">
              {"© 2025 Asal Gholami. All rights reserved."}
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="btn-scroll-top"
            aria-label="Scroll to top"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
