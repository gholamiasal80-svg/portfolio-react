import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

/* ═══════════════════════════════════════════════════════════
   Oniwash Campaign Design — Poster Series
   Graphic Design project page
═══════════════════════════════════════════════════════════ */

// Helper: safely encode public-folder filenames that may have spaces/parens
const img = (name) => import.meta.env.BASE_URL + encodeURIComponent(name)

// The two hero posters shown large at the top
const HERO_POSTERS = [
  {
    file: "00 copy.jpg",
    title: "Brand New Shoes",
    subtitle: "Shoe cleaning poster",
  },
  {
    file: "00002.jpg",
    title: "Doorstep Delivery",
    subtitle: "Convenience poster",
  },
]

const POSTERS = [
  {
    file: "001.jpg",
    title: "Curtain Washing",
    subtitle: "Problem statement poster",
  },
  {
    file: "002.jpg",
    title: "Full Service",
    subtitle: "Solution & installation poster",
  },
  {
    file: "00002 (2).jpg",
    title: "Trust Oniwash",
    subtitle: "Brand confidence poster",
  },
  {
    file: "(604)_355_1234.jpg",
    title: "One Phone Call Away",
    subtitle: "Call-to-action poster",
  },
  {
    file: "0001.jpg",
    title: "Order Right Now",
    subtitle: "Urgency / event poster",
  },
  {
    file: "01 copy.jpg",
    title: "Weekend Ready",
    subtitle: "Dry cleaning reminder poster",
  },
  {
    file: "01.jpg",
    title: "Fresh Blankets",
    subtitle: "Lifestyle comfort poster",
  },
  {
    file: "00002 (1).jpg",
    title: "Bridal Care",
    subtitle: "Delicate garments poster",
  },
]

/* ── Lightbox modal ── */
function Lightbox({ poster, onClose }) {
  // Close on Escape key
  useState(() => {
    const handler = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  })

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.88)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "lbFadeIn 0.25s ease",
      }}
    >
      {/* Stop propagation so clicking the image itself doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxHeight: "90vh",
          maxWidth: "min(520px, 90vw)",
          animation: "lbSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <img
          src={img(poster.file)}
          alt={poster.title}
          style={{
            display: "block",
            maxHeight: "85vh",
            maxWidth: "100%",
            borderRadius: "6px",
            boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
            objectFit: "contain",
          }}
        />
        {/* Caption */}
        <div style={{
          marginTop: "16px", textAlign: "center",
        }}>
          <p style={{ color: "white", fontWeight: 700, fontSize: "1rem" }}>{poster.title}</p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", marginTop: "4px", letterSpacing: "0.06em" }}>
            {poster.subtitle}
          </p>
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "-14px", right: "-14px",
            width: "36px", height: "36px", borderRadius: "50%",
            background: "#FBD541", border: "none", cursor: "pointer",
            fontSize: "18px", lineHeight: 1, fontWeight: 700,
            color: "#111111", display: "flex", alignItems: "center",
            justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          aria-label="Close"
        >×</button>
      </div>

      <style>{`
        @keyframes lbFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes lbSlideUp { from { opacity: 0; transform: translateY(24px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  )
}

/* ── Poster card with hover lift + click to open ── */
function PosterCard({ poster, large = false, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onOpen(poster)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        position: "relative",
        cursor: "zoom-in",
        transform: hovered ? "translateY(-10px) rotate(0.4deg)" : "translateY(0) rotate(0deg)",
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease",
        boxShadow: hovered
          ? "0 28px 72px rgba(0,0,0,0.28)"
          : "0 6px 24px rgba(0,0,0,0.14)",
        borderRadius: "4px",
        overflow: "hidden",
        background: "#1a3a8c",
      }}
    >
      <img
        src={img(poster.file)}
        alt={poster.title}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          aspectRatio: "9 / 16",
        }}
      />
      {/* Hover overlay hint */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.28)",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}>
        <span style={{
          color: "white", fontSize: "13px", fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase",
          border: "1.5px solid rgba(255,255,255,0.7)",
          padding: "8px 18px", borderRadius: "999px",
        }}>View</span>
      </div>
    </div>
  )
}

/* ── Section label ── */
function SectionLabel({ children }) {
  return (
    <p
      className="uppercase text-foreground/40 font-medium"
      style={{ fontSize: "var(--fs-xs)", letterSpacing: "0.2em", marginBottom: "var(--sp-4)" }}
    >
      {children}
    </p>
  )
}

export default function OniwashPage() {
  const [lightboxPoster, setLightboxPoster] = useState(null)

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      style={{ overflowX: "hidden" }}
    >
      <Header />

      <main className="flex-1">

        {/* ── Hero ── */}
        <section
          className="page-container"
          style={{ paddingTop: "var(--sp-12)", paddingBottom: "var(--sp-8)" }}
        >
          {/* Back link */}
          <Link
            to="/work"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: "rgba(17,17,17,0.45)", fontSize: "var(--fs-sm)",
              textDecoration: "none", marginBottom: "var(--sp-8)",
              fontWeight: 500, letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#111111"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(17,17,17,0.45)"}
          >
            ← Back to Work
          </Link>

          <SectionLabel>Graphic Design · Social Media Campaign</SectionLabel>

          <h1
            className="font-serif italic font-bold text-foreground animate-fade-in-up"
            style={{ maxWidth: "640px", marginBottom: "var(--sp-5)" }}
          >
            Oniwash Campaign Design
          </h1>

          <div style={{ display: "flex", gap: "var(--sp-10)", flexWrap: "wrap", alignItems: "flex-start" }}>
            <p
              className="text-foreground/60 text-pretty"
              style={{ maxWidth: "480px", lineHeight: 1.75, fontSize: "var(--fs-body)" }}
            >
              A series of ten social media campaign posters designed for Oniwash — a
              professional laundry and dry cleaning service. Each poster communicates
              a different service, from curtain washing and bridal care to doorstep
              delivery, all unified by a bold blue brand palette and clear, confident typography.
            </p>

            {/* Meta */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)", minWidth: "160px" }}>
              {[
                { label: "Category", value: "Graphic Design" },
                { label: "Deliverables", value: "10 Posters" },
                { label: "Tools", value: "Illustrator, Photoshop" },
                { label: "Type", value: "Social Media Campaign" },
                { label: "Client", value: "Oniwash" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontSize: "var(--fs-xs)", letterSpacing: "0.15em", color: "rgba(17,17,17,0.35)", textTransform: "uppercase", marginBottom: "2px" }}>
                    {label}
                  </p>
                  <p style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "#111111" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="page-container">
          <div style={{ height: "1.5px", background: "rgba(17,17,17,0.12)", marginBottom: "var(--sp-12)" }} />
        </div>

        {/* ── Poster Gallery ── */}
        <section
          className="page-container"
          style={{ paddingBottom: "var(--sp-16)" }}
        >
          <SectionLabel>Poster Series — 10 pieces</SectionLabel>

          {/* ── Two big hero posters side by side ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--sp-6)",
            marginBottom: "var(--sp-10)",
          }}>
            {HERO_POSTERS.map((poster) => (
              <div key={poster.file}>
                <PosterCard poster={poster} large onOpen={setLightboxPoster} />
                <p style={{
                  marginTop: "var(--sp-3)", fontSize: "var(--fs-h3)",
                  color: "#111111", fontWeight: 700,
                }}>
                  {poster.title}
                </p>
                <p style={{
                  fontSize: "var(--fs-sm)", color: "rgba(17,17,17,0.4)",
                  letterSpacing: "0.05em", marginTop: "4px",
                }}>
                  {poster.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* ── Remaining 8 posters in a grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "var(--sp-5)",
          }}>
            {POSTERS.map((poster) => (
              <div key={poster.file}>
                <PosterCard poster={poster} onOpen={setLightboxPoster} />
                <p style={{
                  marginTop: "var(--sp-2)", fontSize: "var(--fs-sm)",
                  color: "rgba(17,17,17,0.5)", fontWeight: 600,
                }}>
                  {poster.title}
                </p>
                <p style={{
                  fontSize: "var(--fs-xs)", color: "rgba(17,17,17,0.35)",
                  letterSpacing: "0.05em", marginTop: "2px",
                }}>
                  {poster.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="page-container">
          <div style={{ height: "1.5px", background: "rgba(17,17,17,0.12)", marginBottom: "var(--sp-12)" }} />
        </div>

        {/* ── Project Notes ── */}
        <section
          className="page-container"
          style={{ paddingBottom: "var(--sp-16)" }}
        >
          <SectionLabel>About this project</SectionLabel>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "var(--sp-8)",
          }}>
            {[
              {
                heading: "Brand Identity",
                body: "Each poster uses the Oniwash brand palette — a deep royal blue paired with white and gold — to reinforce the brand's promise of trust, cleanliness, and professionalism across every service."
              },
              {
                heading: "Storytelling",
                body: "The series is structured around a narrative arc: identifying everyday laundry challenges, presenting Oniwash's solutions, and building confidence in the service through clear, relatable scenarios."
              },
              {
                heading: "Visual Consistency",
                body: "Despite covering ten different services, the posters share a unified visual language — consistent typography hierarchy, branded logo placement, and a cohesive photographic style throughout."
              },
            ].map(({ heading, body }) => (
              <div key={heading}>
                <h3
                  className="font-serif italic font-bold text-foreground"
                  style={{ fontSize: "var(--fs-h3)", marginBottom: "var(--sp-3)" }}
                >
                  {heading}
                </h3>
                <p style={{ color: "rgba(17,17,17,0.6)", lineHeight: 1.75, fontSize: "var(--fs-body)" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Colour Palette ── */}
        <section
          className="page-container"
          style={{ paddingBottom: "var(--sp-16)" }}
        >
          <SectionLabel>Brand Colour Palette</SectionLabel>
          <div style={{ display: "flex", gap: "var(--sp-4)", flexWrap: "wrap", alignItems: "center" }}>
            {[
              { color: "#1A3A8C", name: "Royal Blue" },
              { color: "#2551C3", name: "Brand Blue" },
              { color: "#FFFFFF", name: "Clean White", border: true },
              { color: "#FBD541", name: "Accent Gold" },
              { color: "#111111", name: "Deep Black" },
            ].map(({ color, name, border }) => (
              <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "56px", height: "56px",
                  borderRadius: "var(--radius-md)",
                  background: color,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  border: border ? "1.5px solid rgba(0,0,0,0.12)" : "none",
                }} />
                <span style={{ fontSize: "10px", color: "rgba(17,17,17,0.4)", fontFamily: "'Courier New', monospace", letterSpacing: "0.5px" }}>
                  {color}
                </span>
                <span style={{ fontSize: "10px", color: "rgba(17,17,17,0.55)", fontWeight: 600, letterSpacing: "0.05em" }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Navigation ── */}
        <section
          className="page-container"
          style={{ paddingBottom: "var(--sp-16)" }}
        >
          <div style={{ height: "1.5px", background: "rgba(17,17,17,0.12)", marginBottom: "var(--sp-8)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--sp-4)" }}>
            <Link
              to="/work/heinz"
              style={{
                textDecoration: "none", color: "rgba(17,17,17,0.4)",
                fontSize: "var(--fs-sm)", fontWeight: 500, letterSpacing: "0.04em",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#111111"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(17,17,17,0.4)"}
            >
              ← Heinz Ketchup Campaign
            </Link>
            <Link
              to="/work"
              style={{
                textDecoration: "none", color: "rgba(17,17,17,0.4)",
                fontSize: "var(--fs-sm)", fontWeight: 500, letterSpacing: "0.04em",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#111111"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(17,17,17,0.4)"}
            >
              All Work →
            </Link>
          </div>
        </section>

      </main>

      <Footer />

      {/* ── Lightbox ── */}
      {lightboxPoster && (
        <Lightbox poster={lightboxPoster} onClose={() => setLightboxPoster(null)} />
      )}
    </div>
  )
}
