import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import KMPSlideshow from '../../components/KMPSlideshow'

/* ═══════════════════════════════════════════════════════════
   Section divider — eyebrow + optional description
═══════════════════════════════════════════════════════════ */
function SectionHeader({
  eyebrow,
  description,
  first = false,
}) {
  return (
    <div style={{
      borderTop:     first ? "none" : "1px solid rgba(17,17,17,0.1)",
      paddingTop:    first ? "var(--sp-12)" : "var(--sp-10)",
      paddingBottom: "var(--sp-6)",
    }}>
      <div className="cs-section-eyebrow">{eyebrow}</div>
      {description && (
        <p style={{
          color:      "rgba(17,17,17,0.5)",
          fontSize:   "var(--fs-sm)",
          maxWidth:   "440px",
          marginTop:  "var(--sp-2)",
          lineHeight: 1.7,
        }}>
          {description}
        </p>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Photo block — image with black header bar + wiggly border
═══════════════════════════════════════════════════════════ */
function PhotoBlock({
  align,
  label,
  title,
  src,
  alt,
  description,
  filterId,
}) {
  const imageCol = (
    <div style={{
      width:      "52%",
      maxWidth:   "480px",
      minWidth:   "280px",
      flexShrink: 0,
      position:   "relative",
      overflow:   "visible",
      zIndex:     1,
    }}>
      <a
        href={import.meta.env.BASE_URL + src}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display:        "block",
          position:       "relative",
          overflow:       "visible",
          boxShadow:      "4px 8px 28px rgba(0,0,0,0.11)",
          cursor:         "zoom-in",
          textDecoration: "none",
        }}
      >
        <div style={{ background: "#111111", padding: "9px 16px 8px", lineHeight: 1 }}>
          <span style={{
            color: "white", fontSize: "9px", fontFamily: "'Courier New', monospace",
            letterSpacing: "2.5px", fontWeight: 700, textTransform: "uppercase",
          }}>
            {label}
          </span>
        </div>
        <img
          src={import.meta.env.BASE_URL + src}
          alt={alt}
          style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(1)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(248,247,243,0.18)", pointerEvents: "none" }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
          <defs>
            <filter id={filterId} x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.016 0.022" numOctaves="2" seed="5" result="noise">
                <animate attributeName="baseFrequency" values="0.016 0.022;0.020 0.018;0.013 0.026;0.018 0.020;0.016 0.022" dur="9s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#111111" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.82" filter={`url(#${filterId})`} />
        </svg>
        <div style={{
          position: "absolute", bottom: "10px", right: "12px",
          background: "rgba(17,17,17,0.52)", color: "white",
          fontSize: "8px", fontWeight: 600, letterSpacing: "0.14em",
          fontFamily: "system-ui, sans-serif", padding: "4px 9px",
          borderRadius: "3px", pointerEvents: "none",
        }}>
          VIEW FULL ↗
        </div>
      </a>
    </div>
  )

  const textCol = (title || description) ? (
    <div style={{ width: "340px", flexShrink: 0 }}>
      <p style={{
        fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em",
        textTransform: "uppercase", color: "rgba(17,17,17,0.38)",
        marginBottom: "14px", fontFamily: "system-ui, sans-serif",
      }}>
        {label}
      </p>
      {title && (
        <h3 style={{
          fontSize: "clamp(18px, 2vw, 24px)", fontStyle: "italic",
          fontWeight: 700, lineHeight: 1.25, color: "#111111",
          marginBottom: "18px", fontFamily: "Georgia, 'Times New Roman', serif",
        }}>
          {title}
        </h3>
      )}
      {description && (
        <p style={{ color: "rgba(17,17,17,0.6)", fontSize: "var(--fs-sm)", lineHeight: 1.8, fontFamily: "system-ui, sans-serif" }}>
          {description}
        </p>
      )}
    </div>
  ) : null

  const spacer = <div style={{ flex: 1, minWidth: 0 }} />

  return (
    <div style={{
      display: "flex", flexDirection: "row", alignItems: "stretch",
      gap: "36px", position: "relative", overflow: "visible", marginBottom: "88px",
    }}>
      {align === "left"  && <>{imageCol}{spacer}<div style={{ display: "flex", alignItems: "flex-start", paddingTop: "48px", width: "340px", flexShrink: 0 }}>{textCol}</div></>}
      {align === "right" && <><div style={{ display: "flex", alignItems: "flex-start", paddingTop: "48px", width: "340px", flexShrink: 0 }}>{textCol}</div>{spacer}{imageCol}</>}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Text-only block — label + italic title + body paragraph
═══════════════════════════════════════════════════════════ */
function TextBlock({
  label,
  title,
  children,
}) {
  return (
    <div style={{ marginBottom: "clamp(64px, 10vw, 96px)", maxWidth: "720px" }}>
      <p style={{
        fontFamily: "system-ui, sans-serif", fontSize: "10px", fontWeight: 700,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "rgba(17,17,17,0.35)", marginBottom: "var(--sp-4)",
      }}>
        {label}
      </p>
      <h3 style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "clamp(22px, 2.4vw, 32px)", fontStyle: "italic",
        fontWeight: 700, lineHeight: 1.25, color: "#111111",
        marginBottom: "var(--sp-4)",
      }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Page
═══════════════════════════════════════════════════════════ */
export default function KMPProjectPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">

        {/* ══ Hero ══════════════════════════════════════════ */}
        <section className="cs-hero-section">
          <div className="page-container">

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--sp-8)" }}>
              <Link
                to="/work"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  fontSize: "var(--fs-sm)", color: "rgba(17,17,17,0.4)",
                  fontWeight: 500, transition: "color 0.2s",
                }}
                className="hover:text-foreground"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                </svg>
                Back to Work
              </Link>
              <span style={{ fontSize: "var(--fs-xs)", fontWeight: 600, letterSpacing: "0.16em", color: "rgba(17,17,17,0.35)" }}>02 / 03</span>
            </div>

            <div className="cs-hero-tags">
              <span className="cs-hero-tag">UI/UX Design</span>
              <span className="cs-hero-tag">Mobile App</span>
              <span className="cs-hero-tag">Redesign</span>
              <span className="cs-hero-tag">2024</span>
            </div>

            <h1 className="cs-hero-title">
              KMP<br /><em>Music App Redesign</em>
            </h1>

            <div className="cs-hero-bottom">
              <p className="cs-hero-subtitle">
                Redesigning the KMP Music App to improve usability, navigation, and overall user
                experience — creating a cleaner, more intuitive interface while preserving core functionality.
              </p>
              <div className="cs-hero-meta">
                <div className="cs-meta-row">
                  <span className="cs-meta-label">Role</span>
                  <span className="cs-meta-value">UX Design &amp; Research</span>
                </div>
                <div className="cs-meta-row">
                  <span className="cs-meta-label">Tools</span>
                  <span className="cs-meta-value">Figma · Miro</span>
                </div>
                <div className="cs-meta-row">
                  <span className="cs-meta-label">Timeline</span>
                  <span className="cs-meta-value">4 Weeks</span>
                </div>
                <div className="cs-meta-row">
                  <span className="cs-meta-label">Type</span>
                  <span className="cs-meta-value">UX Case Study</span>
                </div>
                <div className="cs-meta-row" style={{ paddingTop: "var(--sp-3)", borderTop: "1px solid rgba(17,17,17,0.08)", marginTop: "var(--sp-2)" }}>
                  <span className="cs-meta-label">Figma</span>
                  <a
                    href="https://www.figma.com/design/HhDLQkLJECHTmMtHIw5dUj/Untitled?node-id=0-1&t=u92btKEKgOv6D67d-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "7px",
                      fontSize: "13px", fontWeight: 700, color: "#111111",
                      textDecoration: "none", background: "#ffffff",
                      border: "1.5px solid #111111", borderRadius: "100px",
                      padding: "7px 16px", boxShadow: "3px 3px 0px #111111",
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M12 2H8.5a3.5 3.5 0 1 0 0 7H12V2z" fill="#F24E1E"/>
                      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" fill="#FF7262"/>
                      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="#1ABCFE"/>
                      <path d="M5 12.5a3.5 3.5 0 0 1 3.5-3.5H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" fill="#0ACF83"/>
                      <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z" fill="#A259FF"/>
                    </svg>
                    View project file ↗
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ══ Redesigned App Screens Slideshow ═════════════ */}
        <div style={{ marginTop: "-80px" }}>
          <KMPSlideshow />
        </div>

        {/* Figma link — below slideshow */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "-32px", marginBottom: "64px" }}>
          <a
            href="https://www.figma.com/design/HhDLQkLJECHTmMtHIw5dUj/Untitled?node-id=0-1&t=u92btKEKgOv6D67d-1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#ffffff", border: "1.5px solid rgba(17,17,17,0.13)",
              borderRadius: "999px", padding: "10px 18px 10px 12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "13px", fontWeight: 600,
              color: "#111111", textDecoration: "none", letterSpacing: "0.01em",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5Z" fill="#1ABCFE"/>
              <path d="M9.5 47.5A9.5 9.5 0 0 1 9.5 28.5H19V47.5A9.5 9.5 0 0 1 9.5 47.5Z" fill="#0ACF83"/>
              <path d="M9.5 19A9.5 9.5 0 0 1 19 9.5H19V28.5H9.5A9.5 9.5 0 0 1 9.5 9.5Z" fill="#FF7262"/>
              <path d="M19 9.5H28.5A9.5 9.5 0 1 1 19 19V9.5Z" fill="#F24E1E"/>
              <path d="M28.5 28.5A9.5 9.5 0 1 1 19 19H28.5V28.5Z" fill="#A259FF"/>
            </svg>
            View project file ↗
          </a>
        </div>

        {/* ══ Case Study Body ═══════════════════════════════ */}
        <div className="page-container" style={{ overflow: "visible" }}>

          {/* ── 01 Overview ── */}
          <SectionHeader first eyebrow="01 — Overview" description="" />

          <TextBlock label="Overview" title="KMP Music App Redesign">
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "var(--fs-sm)", lineHeight: 1.85, color: "rgba(17,17,17,0.58)" }}>
              This project focuses on redesigning the KMP Music App to improve usability, navigation,
              and overall user experience. The goal was to create a cleaner and more intuitive interface
              while maintaining the core functionality of the original app. The redesign explores how
              small structural and visual changes can significantly improve user interaction.
            </p>
          </TextBlock>

          {/* ── 02 The Problem ── */}
          <SectionHeader eyebrow="02 — The Problem" description="" />

          <TextBlock label="The Problem" title="Identifying usability issues">
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "var(--fs-sm)", lineHeight: 1.85, color: "rgba(17,17,17,0.58)" }}>
              The original version of the app had several usability issues that made navigation confusing
              and less engaging. Key features were not clearly structured, and the overall layout lacked
              visual hierarchy. This made it difficult for users to quickly access important functions such
              as browsing music, managing playlists, or controlling playback. The interface also felt
              visually cluttered, which impacted the overall user experience.
            </p>
          </TextBlock>

          {/* ── 03 Low-Fidelity Wireframes ── */}
          <SectionHeader
            eyebrow="03 — Low-Fidelity Wireframes"
            description="Exploring structure and layout before committing to visual design."
          />

          <PhotoBlock
            align="left"
            label="Wireframes"
            title="Exploring structure and layout"
            src="lowfie.png"
            alt="Low-fidelity wireframes for KMP Music App redesign"
            filterId="kmp-edge-wf"
            description="The low-fidelity wireframes were used to explore layout structure and user flow before focusing on visual design. At this stage, the goal was to simplify navigation and organize content in a more intuitive way. These wireframes helped establish the foundation for the redesign by focusing on functionality and user interaction rather than visual details."
          />

          {/* Figma link — Wireframes */}
          <div style={{ marginTop: "-56px", marginBottom: "clamp(48px, 8vw, 88px)", display: "flex", alignItems: "center" }}>
            <a
              href="https://www.figma.com/design/HhDLQkLJECHTmMtHIw5dUj/Untitled?node-id=0-1&t=u92btKEKgOv6D67d-1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#ffffff", border: "1.5px solid rgba(17,17,17,0.13)",
                borderRadius: "999px", padding: "10px 18px 10px 12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "13px", fontWeight: 600,
                color: "#111111", textDecoration: "none", letterSpacing: "0.01em",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5Z" fill="#1ABCFE"/>
                <path d="M9.5 47.5A9.5 9.5 0 0 1 9.5 28.5H19V47.5A9.5 9.5 0 0 1 9.5 47.5Z" fill="#0ACF83"/>
                <path d="M9.5 19A9.5 9.5 0 0 1 19 9.5H19V28.5H9.5A9.5 9.5 0 0 1 9.5 9.5Z" fill="#FF7262"/>
                <path d="M19 9.5H28.5A9.5 9.5 0 1 1 19 19V9.5Z" fill="#F24E1E"/>
                <path d="M28.5 28.5A9.5 9.5 0 1 1 19 19H28.5V28.5Z" fill="#A259FF"/>
              </svg>
              View project file ↗
            </a>
          </div>

          {/* ── 04 Design Goals ── */}
          <SectionHeader eyebrow="04 — Design Goals" description="" />

          <div style={{ marginBottom: "clamp(64px, 10vw, 96px)", maxWidth: "720px" }}>
            <p style={{
              fontFamily: "system-ui, sans-serif", fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(17,17,17,0.35)", marginBottom: "var(--sp-4)",
            }}>
              Design Goals
            </p>
            <h3 style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(22px, 2.4vw, 32px)", fontStyle: "italic",
              fontWeight: 700, lineHeight: 1.25, color: "#111111",
              marginBottom: "var(--sp-4)",
            }}>
              Improving the user experience
            </h3>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "var(--fs-sm)", lineHeight: 1.85, color: "rgba(17,17,17,0.58)", marginBottom: "var(--sp-5)" }}>
              The redesign was guided by a set of clear goals focused on improving usability and overall experience:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                "Simplify navigation and reduce confusion",
                "Improve visual hierarchy and layout clarity",
                "Make key features more accessible",
                "Create a cleaner and more modern interface",
                "Enhance the overall user experience",
              ].map((goal, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%",
                    background: "#111111", color: "white", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "9px", fontWeight: 700, fontFamily: "'Courier New', monospace",
                    letterSpacing: "0.05em", marginTop: "1px",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p style={{
                    fontFamily: "system-ui, sans-serif", fontSize: "var(--fs-sm)",
                    lineHeight: 1.7, color: "rgba(17,17,17,0.65)", margin: 0,
                  }}>
                    {goal}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── 05 Before & After ── */}
          <div style={{ borderTop: "1px solid rgba(17,17,17,0.1)", paddingTop: "var(--sp-10)", paddingBottom: "var(--sp-10)" }}>
            <div className="cs-section-eyebrow">05 — Before &amp; After</div>
          </div>

          <div style={{
            display: "flex", flexDirection: "row", alignItems: "center",
            gap: "clamp(32px, 5vw, 72px)", marginBottom: "clamp(64px, 10vw, 112px)",
          }}>
            <div style={{ flex: "0 0 54%", maxWidth: "54%" }}>
              <a
                href={import.meta.env.BASE_URL + "before-after.png"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", position: "relative", overflow: "visible", boxShadow: "4px 8px 28px rgba(0,0,0,0.11)", cursor: "zoom-in", textDecoration: "none" }}
              >
                <div style={{ background: "#111111", padding: "9px 16px 8px", lineHeight: 1 }}>
                  <span style={{ color: "white", fontSize: "9px", fontFamily: "'Courier New', monospace", letterSpacing: "2.5px", fontWeight: 700, textTransform: "uppercase" }}>
                    Before &amp; After
                  </span>
                </div>
                <img src={import.meta.env.BASE_URL + "before-after.png"} alt="Before and after design comparison" style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(1)" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(248,247,243,0.18)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "10px", right: "12px", background: "rgba(17,17,17,0.52)", color: "white", fontSize: "8px", fontWeight: 600, letterSpacing: "0.14em", fontFamily: "system-ui, sans-serif", padding: "4px 9px", borderRadius: "3px", pointerEvents: "none" }}>
                  VIEW FULL ↗
                </div>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
                  <defs>
                    <filter id="kmp-edge-iter" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
                      <feTurbulence type="fractalNoise" baseFrequency="0.016 0.022" numOctaves="2" seed="18" result="noise">
                        <animate attributeName="baseFrequency" values="0.016 0.022;0.020 0.018;0.013 0.026;0.018 0.020;0.016 0.022" dur="9s" repeatCount="indefinite" />
                      </feTurbulence>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#111111" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.82" filter="url(#kmp-edge-iter)" />
                </svg>
              </a>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(17,17,17,0.35)", marginBottom: "var(--sp-4)" }}>
                Iterations
              </p>
              <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(22px, 2.4vw, 32px)", fontStyle: "italic", fontWeight: 700, lineHeight: 1.25, color: "#111111", marginBottom: "var(--sp-4)" }}>
                From existing design to refined experience
              </h3>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "var(--fs-sm)", lineHeight: 1.85, color: "rgba(17,17,17,0.58)" }}>
                The redesign focuses on improving both structure and visual clarity. The updated version
                introduces a more organized layout, clearer navigation, and a stronger visual hierarchy.
                Key features are easier to access, and the interface feels more balanced and user-friendly.
                Comparing the before and after versions highlights how thoughtful design changes can
                significantly improve usability.
              </p>
            </div>
          </div>

          {/* Figma link — Before & After */}
          <div style={{ marginTop: "-56px", marginBottom: "clamp(48px, 8vw, 88px)", display: "flex", alignItems: "center" }}>
            <a
              href="https://www.figma.com/design/HhDLQkLJECHTmMtHIw5dUj/Untitled?node-id=0-1&t=u92btKEKgOv6D67d-1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#ffffff", border: "1.5px solid rgba(17,17,17,0.13)",
                borderRadius: "999px", padding: "10px 18px 10px 12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "13px", fontWeight: 600,
                color: "#111111", textDecoration: "none", letterSpacing: "0.01em",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5Z" fill="#1ABCFE"/>
                <path d="M9.5 47.5A9.5 9.5 0 0 1 9.5 28.5H19V47.5A9.5 9.5 0 0 1 9.5 47.5Z" fill="#0ACF83"/>
                <path d="M9.5 19A9.5 9.5 0 0 1 19 9.5H19V28.5H9.5A9.5 9.5 0 0 1 9.5 9.5Z" fill="#FF7262"/>
                <path d="M19 9.5H28.5A9.5 9.5 0 1 1 19 19V9.5Z" fill="#F24E1E"/>
                <path d="M28.5 28.5A9.5 9.5 0 1 1 19 19H28.5V28.5Z" fill="#A259FF"/>
              </svg>
              View project file ↗
            </a>
          </div>

          {/* ── 06 Brand Identity ── */}
          <div style={{
            display: "flex", flexDirection: "row", alignItems: "center",
            gap: "clamp(32px, 5vw, 72px)", marginBottom: "clamp(64px, 10vw, 112px)",
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(17,17,17,0.35)", marginBottom: "var(--sp-4)" }}>
                Brand Identity
              </p>
              <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(22px, 2.4vw, 32px)", fontStyle: "italic", fontWeight: 700, lineHeight: 1.25, color: "#111111", marginBottom: "var(--sp-4)" }}>
                Creating a cohesive visual system
              </h3>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "var(--fs-sm)", lineHeight: 1.85, color: "rgba(17,17,17,0.58)" }}>
                The visual identity of the redesigned app focuses on creating a modern and cohesive
                experience. A consistent color palette, clean typography, and simplified UI components
                were used to improve readability and usability. The design supports the functionality
                of the app while maintaining a visually appealing interface.
              </p>
            </div>
            <div style={{ flex: "0 0 54%", maxWidth: "54%", position: "relative", overflow: "visible" }}>
              <a
                href={import.meta.env.BASE_URL + "kmp-visual-system.html"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", position: "relative", boxShadow: "4px 8px 28px rgba(0,0,0,0.11)", overflow: "visible", textDecoration: "none", cursor: "zoom-in" }}
              >
                {/* Black header bar */}
                <div style={{ background: "#111111", padding: "9px 16px 8px", lineHeight: 1 }}>
                  <span style={{ color: "white", fontSize: "9px", fontFamily: "'Courier New', monospace", letterSpacing: "2.5px", fontWeight: 700, textTransform: "uppercase" }}>
                    Visual System
                  </span>
                </div>

                {/* Visual system card */}
                <div style={{ background: "#1A0A38", padding: "24px 20px", position: "relative", overflow: "hidden", filter: "grayscale(1)" }}>
                  {/* bg glow */}
                  <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(107,53,200,0.4) 0%, transparent 70%)", pointerEvents: "none" }} />

                  {/* Colour Palette */}
                  <p style={{ fontFamily: "'Courier New', monospace", fontSize: "7px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "10px", fontWeight: 700 }}>Colour Palette</p>
                  <div style={{ display: "flex", gap: "7px", marginBottom: "18px" }}>
                    {["#6B35C8","#A076E8","#2D1560","#1A0A38","#FFFFFF","#F5A623"].map(c => (
                      <div key={c} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                        <div style={{ width: "30px", height: "30px", borderRadius: "7px", background: c, border: c === "#FFFFFF" ? "1px solid rgba(255,255,255,0.2)" : "none" }} />
                        <p style={{ fontFamily: "'Courier New', monospace", fontSize: "6px", color: "rgba(255,255,255,0.5)", margin: 0 }}>{c}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "16px" }} />

                  {/* Typography */}
                  <p style={{ fontFamily: "'Courier New', monospace", fontSize: "7px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "10px", fontWeight: 700 }}>Typography</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px" }}>
                    {[
                      { size: "18px", weight: 700, sample: "R&B Playlist", label: "Heading" },
                      { size: "13px", weight: 600, sample: "Chill your mind", label: "Title" },
                      { size: "11px", weight: 400, sample: "Doja Cat · 3:58", label: "Body" },
                      { size: "8px",  weight: 700, sample: "WATCHED · NEW", label: "Label" },
                    ].map(t => (
                      <div key={t.label} style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: t.size, fontWeight: t.weight, color: "#fff", margin: 0, minWidth: "120px" }}>{t.sample}</p>
                        <p style={{ fontFamily: "'Courier New', monospace", fontSize: "7px", color: "rgba(255,255,255,0.28)", margin: 0 }}>{t.size} · {t.label}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "16px" }} />

                  {/* Buttons */}
                  <p style={{ fontFamily: "'Courier New', monospace", fontSize: "7px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "10px", fontWeight: 700 }}>Buttons</p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", marginBottom: "18px" }}>
                    <div style={{ background: "#6B35C8", color: "#fff", fontFamily: "system-ui, sans-serif", fontSize: "10px", fontWeight: 600, padding: "7px 16px", borderRadius: "100px" }}>Purchase</div>
                    <div style={{ background: "transparent", color: "#fff", fontFamily: "system-ui, sans-serif", fontSize: "10px", fontWeight: 600, padding: "6px 16px", borderRadius: "100px", border: "1.5px solid rgba(255,255,255,0.3)" }}>Add to Wallet</div>
                    <div style={{ background: "#6B35C8", color: "#fff", fontFamily: "system-ui, sans-serif", fontSize: "10px", fontWeight: 600, padding: "6px 14px", borderRadius: "100px" }}>Recent</div>
                    <div style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "system-ui, sans-serif", fontSize: "10px", fontWeight: 500, padding: "6px 14px", borderRadius: "100px" }}>Favourite</div>
                  </div>

                  <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "16px" }} />

                  {/* Navigation */}
                  <p style={{ fontFamily: "'Courier New', monospace", fontSize: "7px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "10px", fontWeight: 700 }}>Icons &amp; Navigation</p>
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {[
                      { icon: "⌂", label: "Home",   active: true },
                      { icon: "▶", label: "Video",  active: false },
                      { icon: "♪", label: "Music",  active: false },
                      { icon: "☻", label: "My",     active: false },
                      { icon: "$", label: "KMPlex", active: false },
                    ].map(n => (
                      <div key={n.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                        <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: n.active ? "#6B35C8" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: n.active ? "#fff" : "rgba(255,255,255,0.35)" }}>{n.icon}</div>
                        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "8px", color: n.active ? "#fff" : "rgba(255,255,255,0.3)", margin: 0, fontWeight: n.active ? 600 : 400 }}>{n.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wiggly border */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
                  <defs>
                    <filter id="kmp-edge-brand" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
                      <feTurbulence type="fractalNoise" baseFrequency="0.016 0.022" numOctaves="2" seed="12" result="noise">
                        <animate attributeName="baseFrequency" values="0.016 0.022;0.020 0.018;0.013 0.026;0.018 0.020;0.016 0.022" dur="9s" repeatCount="indefinite" />
                      </feTurbulence>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#111111" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.82" filter="url(#kmp-edge-brand)" />
                </svg>
                {/* View hint */}
                <div style={{ position: "absolute", bottom: "10px", right: "12px", background: "rgba(17,17,17,0.52)", color: "white", fontSize: "8px", fontWeight: 600, letterSpacing: "0.14em", fontFamily: "system-ui, sans-serif", padding: "4px 9px", borderRadius: "3px", pointerEvents: "none" }}>
                  VIEW FULL ↗
                </div>
              </a>
            </div>
          </div>

          {/* ── 07 Final Thoughts ── */}
          <SectionHeader eyebrow="07 — Final Thoughts" description="" />

          <TextBlock label="Reflection" title="Key takeaways from the redesign">
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "var(--fs-sm)", lineHeight: 1.85, color: "rgba(17,17,17,0.58)" }}>
              This redesign demonstrates how improving structure, clarity, and visual hierarchy can
              significantly enhance user experience. The process highlighted the importance of simplifying
              interactions and designing with user needs in mind.
            </p>
          </TextBlock>

        </div>

        {/* ══ Next Project ══════════════════════════════════ */}
        <section className="cs-next-section">
          <div className="page-container cs-next-inner">
            <div>
              <div className="cs-next-eyebrow">Next Case Study</div>
              <h2 className="cs-next-title">Psych <em>Mental Health App</em></h2>
            </div>
            <Link to="/work/psych" className="cs-next-cta">View Case Study →</Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
