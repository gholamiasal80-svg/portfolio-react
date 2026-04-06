import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PsychSlideshow from '../../components/PsychSlideshow'

/* ═══════════════════════════════════════════════════════════
   Section divider — eyebrow + description
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
   Photo block — real image with black header bar + wiggly
   animated border. Same styling as Heinz case study.
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
        {/* Black header bar */}
        <div style={{ background: "#111111", padding: "9px 16px 8px", lineHeight: 1 }}>
          <span style={{
            color: "white", fontSize: "9px", fontFamily: "'Courier New', monospace",
            letterSpacing: "2.5px", fontWeight: 700, textTransform: "uppercase",
          }}>
            {label}
          </span>
        </div>

        {/* Image */}
        <img
          src={import.meta.env.BASE_URL + src}
          alt={alt}
          style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(1)" }}
        />

        {/* Warm overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(248,247,243,0.18)", pointerEvents: "none" }} />

        {/* Wiggly border */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
          <defs>
            <filter id={filterId} x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.016 0.022" numOctaves="2" seed="9" result="noise">
                <animate attributeName="baseFrequency" values="0.016 0.022;0.020 0.018;0.013 0.026;0.018 0.020;0.016 0.022" dur="9s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#111111" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.82" filter={`url(#${filterId})`} />
        </svg>

        {/* View hint */}
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
   Page
═══════════════════════════════════════════════════════════ */
export default function PsychProjectPage() {
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
              <span style={{ fontSize: "var(--fs-xs)", fontWeight: 600, letterSpacing: "0.16em", color: "rgba(17,17,17,0.35)" }}>03 / 03</span>
            </div>

            <div className="cs-hero-tags">
              <span className="cs-hero-tag">UI/UX Design</span>
              <span className="cs-hero-tag">Mental Health</span>
              <span className="cs-hero-tag">Mobile App</span>
              <span className="cs-hero-tag">2024</span>
            </div>

            <h1 className="cs-hero-title">
              Psych<br /><em>Mental Health App</em>
            </h1>

            <div className="cs-hero-bottom">
              <p className="cs-hero-subtitle">
                Designing a supportive digital space for mental wellbeing — a calm, accessible app
                that helps users track their mood, find resources, and feel less alone.
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
                    href="https://www.figma.com/design/XcBl5LlfQn1vRIKJJ7Q9Mo/Psych-Mental-Health-App?t=S1FgHmqmogKF5i8i-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:        "inline-flex",
                      alignItems:     "center",
                      gap:            "7px",
                      fontSize:       "13px",
                      fontWeight:     700,
                      color:          "#111111",
                      textDecoration: "none",
                      background:     "#ffffff",
                      border:         "1.5px solid #111111",
                      borderRadius:   "100px",
                      padding:        "7px 16px",
                      boxShadow:      "3px 3px 0px #111111",
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

        {/* ══ App Screen Slideshow ══════════════════════════ */}
        <div style={{ marginTop: "-80px" }}>
          <PsychSlideshow />
        </div>

        {/* ══ Case Study Body ═══════════════════════════════ */}
        <div className="page-container" style={{ overflow: "visible" }}>

          {/* ── 01 Research & Insights ── */}
          <SectionHeader
            first
            eyebrow="01 — Research & Insights"
            description=""
          />

          {/* ── User Assumptions ── */}
          <div style={{
            display: "flex", flexDirection: "row", alignItems: "flex-start",
            gap: "36px", position: "relative", overflow: "visible", marginBottom: "88px",
          }}>
            {/* LEFT — inline visual */}
            <div style={{
              width: "52%", maxWidth: "480px", minWidth: "280px",
              flexShrink: 0, position: "relative", zIndex: 1,
            }}>
              <a
                href={import.meta.env.BASE_URL + "user-assumptions.html"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", position: "relative", boxShadow: "4px 8px 28px rgba(0,0,0,0.11)", overflow: "visible", cursor: "zoom-in", textDecoration: "none" }}
              >
                {/* Black header bar */}
                <div style={{ background: "#111111", padding: "9px 16px 8px", lineHeight: 1 }}>
                  <span style={{ color: "white", fontSize: "9px", fontFamily: "'Courier New', monospace", letterSpacing: "2.5px", fontWeight: 700, textTransform: "uppercase" }}>
                    User Assumptions
                  </span>
                </div>

                {/* Assumptions cards visual — grayscale like other sections */}
                <div style={{ background: "#F4F2EF", padding: "26px 22px 22px", fontFamily: "Inter, system-ui, sans-serif", filter: "grayscale(1)" }}>

                  {/* Mini label */}
                  <div style={{ fontSize: "8.5px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#9C8FA0", marginBottom: "8px" }}>
                    User Assumptions
                  </div>
                  {/* Mini title */}
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#2A2756", lineHeight: 1.2, marginBottom: "10px" }}>
                    Understanding potential<br />user needs
                  </div>
                  {/* Mini description */}
                  <div style={{ fontSize: "10.5px", color: "#6E6A7C", lineHeight: 1.65, marginBottom: "14px", maxWidth: "360px" }}>
                    Since this project didn't include formal research, these assumptions are based on a general understanding of mental health app users and their needs.
                  </div>
                  {/* Divider */}
                  <div style={{ width: "28px", height: "2.5px", background: "#C4A882", borderRadius: "2px", marginBottom: "16px" }} />

                  {/* Cards grid — 3 columns × 2 rows */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "9px" }}>
                    {[
                      { accent: "#B8D4C8", bg: "#EAF4F0", icon: "😟", title: "Feeling Overwhelmed",   text: "Users feel anxious when first reaching out for support." },
                      { accent: "#C4A882", bg: "#F5EDE0", icon: "🔍", title: "Quick Discovery",       text: "Users want to find a psychologist without a long process." },
                      { accent: "#B0C4D8", bg: "#E6EEF5", icon: "👤", title: "Need to Trust First",  text: "Users need a bio and specialty before deciding to book." },
                      { accent: "#D4B8C8", bg: "#F5EAF0", icon: "📱", title: "Comfort Over Camera",  text: "Users prefer choosing between video and phone calls." },
                      { accent: "#C8C4A0", bg: "#F2F0E2", icon: "✅", title: "Reassurance Matters",  text: "Users need clear confirmation that their session is booked." },
                      { accent: "#B8C8D4", bg: "#E6EEF5", icon: "⚡", title: "Low Friction Moments", text: "Users need simple steps when reaching out during stress." },
                    ].map((card, i) => (
                      <div key={i} style={{
                        background: "#fff", borderRadius: "10px", padding: "12px 10px 11px",
                        boxShadow: "0 1px 6px rgba(42,39,86,0.06)", borderTop: `3px solid ${card.accent}`,
                      }}>
                        <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", marginBottom: "9px" }}>
                          {card.icon}
                        </div>
                        <div style={{ fontSize: "10px", fontWeight: 700, color: "#2A2756", marginBottom: "5px", lineHeight: 1.3 }}>{card.title}</div>
                        <div style={{ fontSize: "9.5px", color: "#7B7890", lineHeight: 1.55 }}>{card.text}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warm overlay */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(248,247,243,0.18)", pointerEvents: "none" }} />

                {/* VIEW FULL badge — same as other sections */}
                <div style={{
                  position: "absolute", bottom: "10px", right: "12px",
                  background: "rgba(17,17,17,0.52)", color: "white",
                  fontSize: "8px", fontWeight: 600, letterSpacing: "0.14em",
                  fontFamily: "system-ui, sans-serif", padding: "4px 9px",
                  borderRadius: "3px", pointerEvents: "none",
                }}>
                  VIEW FULL ↗
                </div>

                {/* Wiggly border */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
                  <defs>
                    <filter id="psych-edge-ua" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
                      <feTurbulence type="fractalNoise" baseFrequency="0.016 0.022" numOctaves="2" seed="12" result="noise">
                        <animate attributeName="baseFrequency" values="0.016 0.022;0.020 0.018;0.013 0.026;0.018 0.020;0.016 0.022" dur="9s" repeatCount="indefinite" />
                      </feTurbulence>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#111111" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.82" filter="url(#psych-edge-ua)" />
                </svg>
              </a>
            </div>

            {/* Spacer */}
            <div style={{ flex: 1, minWidth: 0 }} />

            {/* RIGHT — text */}
            <div style={{ display: "flex", alignItems: "flex-start", paddingTop: "48px", width: "340px", flexShrink: 0 }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(17,17,17,0.38)", marginBottom: "14px", fontFamily: "system-ui, sans-serif" }}>
                  User Assumptions
                </p>
                <h3 style={{ fontSize: "clamp(18px, 2vw, 24px)", fontStyle: "italic", fontWeight: 700, lineHeight: 1.25, color: "#111111", marginBottom: "18px", fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  Understanding potential user needs
                </h3>
                <p style={{ color: "rgba(17,17,17,0.6)", fontSize: "var(--fs-sm)", lineHeight: 1.8, fontFamily: "system-ui, sans-serif" }}>
                  This project didn't include formal user research or interviews. These assumptions are based on a general understanding of people who might use a mental health app — their emotions, needs, and hesitations. They helped guide early design decisions and kept the focus on the user throughout the process.
                </p>
              </div>
            </div>
          </div>

          {/* ── 02 User Flow ── */}
          <SectionHeader
            eyebrow="02 — User Flow"
            description=""
          />

          {/* User Flow — custom block with flowchart iframe */}
          <div style={{
            display: "flex", flexDirection: "row", alignItems: "flex-start",
            gap: "36px", position: "relative", overflow: "visible", marginBottom: "88px",
          }}>
            {/* LEFT — flowchart visual */}
            <div style={{ width: "52%", maxWidth: "480px", minWidth: "280px", flexShrink: 0, position: "relative", zIndex: 1 }}>
              <a
                href={import.meta.env.BASE_URL + "user-flow.html"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", position: "relative", boxShadow: "4px 8px 28px rgba(0,0,0,0.11)", overflow: "visible", cursor: "zoom-in", textDecoration: "none" }}
              >
                {/* Black header bar */}
                <div style={{ background: "#111111", padding: "9px 16px 8px", lineHeight: 1 }}>
                  <span style={{ color: "white", fontSize: "9px", fontFamily: "'Courier New', monospace", letterSpacing: "2.5px", fontWeight: 700, textTransform: "uppercase" }}>
                    User Flow
                  </span>
                </div>

                {/* Clipping wrapper — shows top portion of the tall flowchart */}
                <div style={{ width: "100%", height: "500px", overflow: "hidden", position: "relative", background: "#D0D0D0" }}>
                  <iframe
                    src={import.meta.env.BASE_URL + "user-flow.html"}
                    title="User Flow"
                    scrolling="no"
                    style={{
                      border: "none",
                      width: "880px",
                      height: "1600px",
                      transform: "scale(0.545)",
                      transformOrigin: "top left",
                      pointerEvents: "none",
                      filter: "grayscale(1)",
                    }}
                  />
                </div>

                {/* Warm overlay */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(248,247,243,0.18)", pointerEvents: "none" }} />

                {/* VIEW FULL badge */}
                <div style={{
                  position: "absolute", bottom: "10px", right: "12px",
                  background: "rgba(17,17,17,0.52)", color: "white",
                  fontSize: "8px", fontWeight: 600, letterSpacing: "0.14em",
                  fontFamily: "system-ui, sans-serif", padding: "4px 9px",
                  borderRadius: "3px", pointerEvents: "none",
                }}>
                  VIEW FULL ↗
                </div>

                {/* Wiggly border */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
                  <defs>
                    <filter id="psych-edge-3" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
                      <feTurbulence type="fractalNoise" baseFrequency="0.016 0.022" numOctaves="2" seed="7" result="noise">
                        <animate attributeName="baseFrequency" values="0.016 0.022;0.020 0.018;0.013 0.026;0.018 0.020;0.016 0.022" dur="9s" repeatCount="indefinite" />
                      </feTurbulence>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#111111" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.82" filter="url(#psych-edge-3)" />
                </svg>
              </a>
            </div>

            {/* Spacer */}
            <div style={{ flex: 1, minWidth: 0 }} />

            {/* RIGHT — text */}
            <div style={{ display: "flex", alignItems: "flex-start", paddingTop: "48px", width: "340px", flexShrink: 0 }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(17,17,17,0.38)", marginBottom: "14px", fontFamily: "system-ui, sans-serif" }}>
                  User Flow
                </p>
                <h3 style={{ fontSize: "clamp(18px, 2vw, 24px)", fontStyle: "italic", fontWeight: 700, lineHeight: 1.25, color: "#111111", marginBottom: "18px", fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  From opening the app to booking a psychologist
                </h3>
                <p style={{ color: "rgba(17,17,17,0.6)", fontSize: "var(--fs-sm)", lineHeight: 1.8, fontFamily: "system-ui, sans-serif" }}>
                  The user flow maps the full journey — from landing on the home page to selecting a specialty, exploring a psychologist's profile, choosing a session type, and confirming the booking. Every decision point was designed to feel simple and low-pressure.
                </p>
              </div>
            </div>
          </div>

          {/* ── 04 Design Evolution ── */}
          <div style={{ borderTop: "1px solid rgba(17,17,17,0.1)", paddingTop: "var(--sp-10)", paddingBottom: "var(--sp-10)" }}>
            <div className="cs-section-eyebrow">04 — Design Evolution</div>
          </div>

          {/* Part 1: Before & After */}
          <div style={{
            display: "flex", flexDirection: "row", alignItems: "center",
            gap: "clamp(32px, 5vw, 72px)", marginBottom: "clamp(64px, 10vw, 112px)",
          }}>
            <div style={{ flex: "0 0 54%", maxWidth: "54%" }}>
              <a
                href={import.meta.env.BASE_URL + "before-agter.png"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", position: "relative", overflow: "visible", boxShadow: "4px 8px 28px rgba(0,0,0,0.11)", cursor: "zoom-in", textDecoration: "none" }}
              >
                <div style={{ background: "#111111", padding: "9px 16px 8px", lineHeight: 1 }}>
                  <span style={{ color: "white", fontSize: "9px", fontFamily: "'Courier New', monospace", letterSpacing: "2.5px", fontWeight: 700, textTransform: "uppercase" }}>
                    Before &amp; After
                  </span>
                </div>
                <img src={import.meta.env.BASE_URL + "before-agter.png"} alt="Before and after design comparison" style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(1)" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(248,247,243,0.18)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "10px", right: "12px", background: "rgba(17,17,17,0.52)", color: "white", fontSize: "8px", fontWeight: 600, letterSpacing: "0.14em", fontFamily: "system-ui, sans-serif", padding: "4px 9px", borderRadius: "3px", pointerEvents: "none" }}>
                  VIEW FULL ↗
                </div>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
                  <defs>
                    <filter id="psych-edge-iter" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
                      <feTurbulence type="fractalNoise" baseFrequency="0.016 0.022" numOctaves="2" seed="18" result="noise">
                        <animate attributeName="baseFrequency" values="0.016 0.022;0.020 0.018;0.013 0.026;0.018 0.020;0.016 0.022" dur="9s" repeatCount="indefinite" />
                      </feTurbulence>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#111111" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.82" filter="url(#psych-edge-iter)" />
                </svg>
              </a>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(17,17,17,0.35)", marginBottom: "var(--sp-4)" }}>
                Iterations
              </p>
              <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(22px, 2.4vw, 32px)", fontStyle: "italic", fontWeight: 700, lineHeight: 1.25, color: "#111111", marginBottom: "var(--sp-4)" }}>
                From clinical to compassionate
              </h3>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "var(--fs-sm)", lineHeight: 1.85, color: "rgba(17,17,17,0.58)" }}>
                Early iterations leaned too heavily on medical conventions — sterile layouts, form-heavy
                interactions, and clinical language that felt distancing. Through user testing and
                iterative refinement, the experience shifted toward warmth and ease. Rounded forms,
                gentler language, and progressive disclosure made the app feel more like a companion
                than a tool.
              </p>
            </div>
          </div>

          {/* Figma link — Before & After */}
          <div style={{ marginTop: "-56px", marginBottom: "clamp(48px, 8vw, 88px)", display: "flex", alignItems: "center" }}>
            <a
              href="https://www.figma.com/design/XcBl5LlfQn1vRIKJJ7Q9Mo/Psych-Mental-Health-App-beforeafter?node-id=0-1&t=S1FgHmqmogKF5i8i-1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#ffffff", border: "1.5px solid rgba(17,17,17,0.13)",
                borderRadius: "999px", padding: "10px 18px 10px 12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "13px", fontWeight: 600,
                color: "#111111", textDecoration: "none", letterSpacing: "0.01em",
                transition: "box-shadow 0.2s, transform 0.2s",
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

          {/* Part 2: Visual Identity */}
          <div style={{
            display: "flex", flexDirection: "row", alignItems: "center",
            gap: "clamp(32px, 5vw, 72px)", marginBottom: "clamp(64px, 10vw, 112px)",
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(17,17,17,0.35)", marginBottom: "var(--sp-4)" }}>
                Visual Identity
              </p>
              <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(22px, 2.4vw, 32px)", fontStyle: "italic", fontWeight: 700, lineHeight: 1.25, color: "#111111", marginBottom: "var(--sp-4)" }}>
                A palette that feels like a deep breath
              </h3>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "var(--fs-sm)", lineHeight: 1.85, color: "rgba(17,17,17,0.58)" }}>
                The colour system was chosen to evoke calm and safety — soft muted tones inspired by
                nature and rest. Typography was selected for warmth and readability, avoiding anything
                that felt sterile or corporate. Consistent spacing and gentle transitions reinforce
                a sense of stillness throughout the app.
              </p>
            </div>
            <div style={{ flex: "0 0 54%", maxWidth: "54%" }}>
              <a
                href={import.meta.env.BASE_URL + "Brand guide.png"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", position: "relative", overflow: "visible", boxShadow: "4px 8px 28px rgba(0,0,0,0.11)", cursor: "zoom-in", textDecoration: "none" }}
              >
                <div style={{ background: "#111111", padding: "9px 16px 8px", lineHeight: 1 }}>
                  <span style={{ color: "white", fontSize: "9px", fontFamily: "'Courier New', monospace", letterSpacing: "2.5px", fontWeight: 700, textTransform: "uppercase" }}>
                    Visual Identity
                  </span>
                </div>
                <img src={import.meta.env.BASE_URL + "Brand guide.png"} alt="Psych brand guide" style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(1)" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(248,247,243,0.18)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "10px", right: "12px", background: "rgba(17,17,17,0.52)", color: "white", fontSize: "8px", fontWeight: 600, letterSpacing: "0.14em", fontFamily: "system-ui, sans-serif", padding: "4px 9px", borderRadius: "3px", pointerEvents: "none" }}>
                  VIEW FULL ↗
                </div>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
                  <defs>
                    <filter id="psych-edge-brand" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
                      <feTurbulence type="fractalNoise" baseFrequency="0.016 0.022" numOctaves="2" seed="21" result="noise">
                        <animate attributeName="baseFrequency" values="0.016 0.022;0.020 0.018;0.013 0.026;0.018 0.020;0.016 0.022" dur="9s" repeatCount="indefinite" />
                      </feTurbulence>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#111111" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.82" filter="url(#psych-edge-brand)" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* ══ Next Project ══════════════════════════════════ */}
        <section className="cs-next-section">
          <div className="page-container cs-next-inner">
            <div>
              <div className="cs-next-eyebrow">Back to the beginning</div>
              <h2 className="cs-next-title">Art Gallery <em>Experience</em></h2>
            </div>
            <Link to="/work/heinz" className="cs-next-cta">View Case Study →</Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
