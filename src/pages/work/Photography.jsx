import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

/* ═══════════════════════════════════════════════════════════
   Photography & Photoshop — Project Page
   Replace PHOTOS array filenames once images are in /public
═══════════════════════════════════════════════════════════ */

const img = (name) => import.meta.env.BASE_URL + encodeURIComponent(name)

/* ─────────────────────────────────────────────────────────
   SWAP THESE OUT when your photos are in the public folder
   Just replace the `file` value with your actual filename.
   e.g. file: "photo-1.jpg"
───────────────────────────────────────────────────────── */
const PHOTOS = [
  { id: 1,  file: null, title: "Shot 01", tag: "Photography + Photoshop" },
  { id: 2,  file: null, title: "Shot 02", tag: "Photography + Photoshop" },
  { id: 3,  file: null, title: "Shot 03", tag: "Photography + Photoshop" },
  { id: 4,  file: null, title: "Shot 04", tag: "Photography + Photoshop" },
  { id: 5,  file: null, title: "Shot 05", tag: "Photography + Photoshop" },
  { id: 6,  file: null, title: "Shot 06", tag: "Photography + Photoshop" },
  { id: 7,  file: null, title: "Shot 07", tag: "Photography + Photoshop" },
  { id: 8,  file: null, title: "Shot 08", tag: "Photography + Photoshop" },
]

/* ── Placeholder card (shown until real image is added) ── */
function PlaceholderCard({ photo }) {
  return (
    <div style={{
      width: "100%", aspectRatio: "4 / 5",
      background: "#1a1a1a",
      borderRadius: "6px",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "12px",
      border: "1.5px dashed rgba(251,213,65,0.25)",
    }}>
      {/* Camera icon */}
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(251,213,65,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
      <span style={{
        fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase",
        color: "rgba(251,213,65,0.35)", fontWeight: 600,
      }}>
        {photo.title}
      </span>
    </div>
  )
}

/* ── Lightbox ── */
function Lightbox({ photo, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape")     onClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft")  onPrev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose, onNext, onPrev])

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.95)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        animation: "lbFadeIn 0.2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(700px, 90vw)",
          animation: "lbSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}
      >
        <img
          src={img(photo.file)}
          alt={photo.title}
          style={{
            display: "block", maxHeight: "82vh", maxWidth: "100%",
            borderRadius: "6px", objectFit: "contain",
            boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
          }}
        />

        {/* Caption */}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <p style={{ color: "white", fontWeight: 700, fontSize: "0.95rem" }}>{photo.title}</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "4px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{photo.tag}</p>
        </div>

        {/* Prev / Next */}
        {[
          { label: "‹", action: onPrev, side: "left",  offset: "-56px" },
          { label: "›", action: onNext, side: "right", offset: "-56px" },
        ].map(({ label, action, side, offset }) => (
          <button
            key={side}
            onClick={action}
            style={{
              position: "absolute", top: "40%",
              [side]: offset,
              width: "40px", height: "40px", borderRadius: "50%",
              background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)",
              color: "white", fontSize: "22px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(251,213,65,0.25)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >{label}</button>
        ))}

        {/* Close */}
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

/* ── Photo card (real image) ── */
function PhotoCard({ photo, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", cursor: "zoom-in",
        borderRadius: "6px", overflow: "hidden",
        background: "#111",
        boxShadow: hovered ? "0 28px 72px rgba(0,0,0,0.3)" : "0 6px 24px rgba(0,0,0,0.15)",
        transform: hovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
      }}
    >
      <img
        src={img(photo.file)}
        alt={photo.title}
        style={{ width: "100%", display: "block", aspectRatio: "4 / 5", objectFit: "cover" }}
      />
      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.32)",
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
        }}>View</span>
      </div>
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

export default function PhotographyPage() {
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const realPhotos = PHOTOS.filter(p => p.file)
  const lightboxPhoto = lightboxIdx !== null ? realPhotos[lightboxIdx] : null

  const openLightbox = (photo) => {
    const idx = realPhotos.findIndex(p => p.id === photo.id)
    setLightboxIdx(idx)
  }

  const goNext = () => setLightboxIdx(i => (i + 1) % realPhotos.length)
  const goPrev = () => setLightboxIdx(i => (i - 1 + realPhotos.length) % realPhotos.length)

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

          <SectionLabel>Photography · Photoshop</SectionLabel>

          <h1
            className="font-serif italic font-bold text-foreground animate-fade-in-up"
            style={{ maxWidth: "600px", marginBottom: "var(--sp-5)" }}
          >
            Photography & Photoshop
          </h1>

          <div style={{ display: "flex", gap: "var(--sp-10)", flexWrap: "wrap", alignItems: "flex-start" }}>
            <p
              className="text-foreground/60 text-pretty"
              style={{ maxWidth: "480px", lineHeight: 1.75, fontSize: "var(--fs-body)" }}
            >
              A personal series combining original photography with Photoshop compositing —
              taking raw shots and transforming them into fully realised, polished images.
              Each piece demonstrates both eye for composition behind the lens and technical
              skill in post-production.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)", minWidth: "160px" }}>
              {[
                { label: "Category",     value: "Photography" },
                { label: "Tools",        value: "Camera + Photoshop" },
                { label: "Type",         value: "Personal Project" },
                { label: "Deliverables", value: `${PHOTOS.length} Images` },
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

        {/* ── Photo Grid ── */}
        <section className="page-container" style={{ paddingBottom: "var(--sp-16)" }}>
          <SectionLabel>The Series — {PHOTOS.length} pieces</SectionLabel>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "var(--sp-5)",
          }}>
            {PHOTOS.map((photo) =>
              photo.file ? (
                <div key={photo.id}>
                  <PhotoCard photo={photo} onClick={() => openLightbox(photo)} />
                  <p style={{ marginTop: "var(--sp-2)", fontSize: "var(--fs-xs)", color: "rgba(17,17,17,0.4)", letterSpacing: "0.06em", fontWeight: 500 }}>
                    {photo.title}
                  </p>
                </div>
              ) : (
                <div key={photo.id}>
                  <PlaceholderCard photo={photo} />
                  <p style={{ marginTop: "var(--sp-2)", fontSize: "var(--fs-xs)", color: "rgba(17,17,17,0.25)", letterSpacing: "0.06em", fontStyle: "italic" }}>
                    Coming soon
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="page-container">
          <div style={{ height: "1.5px", background: "rgba(17,17,17,0.12)", marginBottom: "var(--sp-12)" }} />
        </div>

        {/* ── Process notes ── */}
        <section className="page-container" style={{ paddingBottom: "var(--sp-16)" }}>
          <SectionLabel>Process</SectionLabel>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "var(--sp-8)",
          }}>
            {[
              {
                heading: "Shooting",
                body: "Each image starts with deliberate composition in camera — thinking about light, framing, and the final vision before the shutter is pressed.",
              },
              {
                heading: "Compositing",
                body: "In Photoshop, raw shots are layered, masked, and blended — combining multiple exposures or elements into a single seamless final image.",
              },
              {
                heading: "Finishing",
                body: "Colour grading, retouching, and final sharpening bring each piece to life — ensuring the edited result feels natural, intentional, and complete.",
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
              to="/work/poster-redesign"
              style={{
                textDecoration: "none", color: "rgba(17,17,17,0.4)",
                fontSize: "var(--fs-sm)", fontWeight: 500, letterSpacing: "0.04em",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#111111"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(17,17,17,0.4)"}
            >
              ← Poster Redesign
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

      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxIdx(null)}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}
    </div>
  )
}
