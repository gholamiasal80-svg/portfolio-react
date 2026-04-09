import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

/* ═══════════════════════════════════════════════════════════
   Translink Poster Redesign — Before & After
═══════════════════════════════════════════════════════════ */

const img = (name) => import.meta.env.BASE_URL + encodeURIComponent(name)

const BEFORE = {
  file: "WhatsApp Image 2025-03-06 at 19.58.50_4a1fba16.jpg",
  label: "Before",
  caption: "Original Translink poster — clean but passive, low visual urgency.",
}

const AFTER = {
  file: "Redesign_Gholami-Recovered.jpg",
  label: "After",
  caption: "Redesigned — bold typography, dramatic imagery, and high visual impact.",
}

/* ── Lightbox ── */
function Lightbox({ src, title, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "lbFadeIn 0.25s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(560px, 90vw)",
          animation: "lbSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <img
          src={src}
          alt={title}
          style={{
            display: "block", width: "100%",
            maxHeight: "88vh", objectFit: "contain",
            borderRadius: "6px",
            boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
          }}
        />
        {title && (
          <p style={{
            marginTop: "14px", textAlign: "center",
            color: "rgba(255,255,255,0.5)", fontSize: "0.82rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            {title}
          </p>
        )}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "-14px", right: "-14px",
            width: "36px", height: "36px", borderRadius: "50%",
            background: "#FBD541", border: "none", cursor: "pointer",
            fontSize: "18px", fontWeight: 700, color: "#111111",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          aria-label="Close"
        >×</button>
      </div>
      <style>{`
        @keyframes lbFadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes lbSlideUp { from { opacity:0; transform:translateY(20px) scale(0.96) } to { opacity:1; transform:translateY(0) scale(1) } }
      `}</style>
    </div>
  )
}

/* ── Poster card ── */
function PosterCard({ poster, onClick }) {
  const [hovered, setHovered] = useState(false)
  const isAfter = poster.label === "After"

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      {/* Badge */}
      <div style={{ marginBottom: "var(--sp-3)" }}>
        <span style={{
          display: "inline-block",
          padding: "5px 16px", borderRadius: "999px",
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase",
          background: isAfter ? "#111111" : "rgba(17,17,17,0.08)",
          color: isAfter ? "#FBD541" : "rgba(17,17,17,0.45)",
        }}>
          {poster.label}
        </span>
      </div>

      {/* Image */}
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative", cursor: "zoom-in",
          borderRadius: "6px", overflow: "hidden",
          background: "#e8eef4",
          boxShadow: hovered
            ? "0 32px 80px rgba(0,0,0,0.3)"
            : "0 8px 32px rgba(0,0,0,0.14)",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
          flex: 1,
        }}
      >
        <img
          src={img(poster.file)}
          alt={poster.label}
          style={{
            width: "100%", display: "block",
            aspectRatio: "2 / 3", objectFit: "cover",
          }}
        />
        {/* Hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.28)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
        }}>
          <span style={{
            color: "white", fontSize: "12px", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            border: "1.5px solid rgba(255,255,255,0.75)",
            padding: "8px 20px", borderRadius: "999px",
          }}>View Full Size</span>
        </div>
      </div>

      {/* Caption */}
      <p style={{
        marginTop: "var(--sp-3)",
        fontSize: "var(--fs-sm)", color: "rgba(17,17,17,0.5)",
        lineHeight: 1.6,
      }}>
        {poster.caption}
      </p>
    </div>
  )
}

/* ── Section label ── */
function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase",
      color: "rgba(17,17,17,0.4)", fontWeight: 500, marginBottom: "var(--sp-4)",
    }}>
      {children}
    </p>
  )
}

export default function PosterRedesignPage() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="min-h-screen flex flex-col bg-background" style={{ overflowX: "hidden" }}>
      <Header />

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="page-container" style={{ paddingTop: "var(--sp-12)", paddingBottom: "var(--sp-8)" }}>
          <Link
            to="/work"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: "rgba(17,17,17,0.45)", fontSize: "var(--fs-sm)",
              textDecoration: "none", marginBottom: "var(--sp-8)",
              fontWeight: 500, letterSpacing: "0.04em", transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#111111"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(17,17,17,0.45)"}
          >
            ← Back to Work
          </Link>

          <SectionLabel>Graphic Design · Poster Redesign</SectionLabel>

          <h1
            className="font-serif italic font-bold text-foreground animate-fade-in-up"
            style={{ maxWidth: "600px", marginBottom: "var(--sp-5)" }}
          >
            Translink Safety Poster Redesign
          </h1>

          <div style={{ display: "flex", gap: "var(--sp-10)", flexWrap: "wrap", alignItems: "flex-start" }}>
            <p
              className="text-foreground/60 text-pretty"
              style={{ maxWidth: "480px", lineHeight: 1.75, fontSize: "var(--fs-body)" }}
            >
              A redesign of Translink's public safety poster — transforming a passive,
              informational notice into a bold, high-impact campaign piece. The original
              communicated the message, but lacked visual urgency. The redesign uses
              dramatic photography, strong typography, and a striking colour contrast
              to stop commuters in their tracks.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)", minWidth: "160px" }}>
              {[
                { label: "Category",     value: "Graphic Design" },
                { label: "Type",         value: "Poster Redesign" },
                { label: "Client",       value: "Translink (Concept)" },
                { label: "Tools",        value: "Photoshop, Illustrator" },
                { label: "Format",       value: "Print / Transit" },
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

        {/* ── Main before / after comparison ── */}
        <section className="page-container" style={{ paddingBottom: "var(--sp-16)" }}>
          <SectionLabel>Side by Side Comparison</SectionLabel>
          <h2
            className="font-serif italic font-bold text-foreground"
            style={{ fontSize: "var(--fs-h2)", marginBottom: "var(--sp-8)", maxWidth: "500px" }}
          >
            Original vs. Redesign
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--sp-8)",
            alignItems: "start",
          }}>
            <PosterCard
              poster={BEFORE}
              onClick={() => setLightbox({ src: img(BEFORE.file), title: "Before — Original Translink Poster" })}
            />
            <PosterCard
              poster={AFTER}
              onClick={() => setLightbox({ src: img(AFTER.file), title: "After — Redesigned by Sal Gholami" })}
            />
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="page-container">
          <div style={{ height: "1.5px", background: "rgba(17,17,17,0.12)", marginBottom: "var(--sp-12)" }} />
        </div>

        {/* ── Design decisions ── */}
        <section className="page-container" style={{ paddingBottom: "var(--sp-16)" }}>
          <SectionLabel>Design Decisions</SectionLabel>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "var(--sp-8)",
          }}>
            {[
              {
                heading: "Visual Urgency",
                body: "The original poster used polite language and a calm layout. The redesign introduces a dramatic overhead photograph of a person reaching onto the tracks — instantly communicating the danger and stopping power.",
              },
              {
                heading: "Typography",
                body: "Where the original used a standard headline, the redesign leads with a bold, confrontational question — \"IS THIS YOU?\" — in a heavy display typeface that fills the space and demands attention.",
              },
              {
                heading: "Colour & Contrast",
                body: "The redesign pushes the Translink blue further, pairing it with electric yellow-green for the headline — a high-contrast combination that reads instantly even in a busy transit environment.",
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

        {/* ── Navigation ── */}
        <section className="page-container" style={{ paddingBottom: "var(--sp-16)" }}>
          <div style={{ height: "1.5px", background: "rgba(17,17,17,0.12)", marginBottom: "var(--sp-8)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--sp-4)" }}>
            <Link
              to="/work/oniwash"
              style={{
                textDecoration: "none", color: "rgba(17,17,17,0.4)",
                fontSize: "var(--fs-sm)", fontWeight: 500, letterSpacing: "0.04em",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#111111"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(17,17,17,0.4)"}
            >
              ← Oniwash Campaign
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

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}
