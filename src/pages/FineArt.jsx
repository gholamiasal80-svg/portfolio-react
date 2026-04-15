import { useState, useRef } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const ROW_W       = 1400
const CLP_W       = 80
const CLP_H       = 110
const CLP_ABOVE   = 93
const ART_OFFSET  = 0
const ART_W       = 282
const ART_H       = 360

const R1_CENTERS  = [280, 700, 1120]
const R1_ATTACH_Y = [48, 68, 48]
const R1_TILTS    = [-2.5, 1.2, -1.8]
const R1_WALL_Y   = 28

const R2_CENTERS  = [420, 980]
const R2_ATTACH_Y = [52, 52]
const R2_TILTS    = [2.0, -1.5]
const R2_WALL_Y   = 28

function buildCatenaryPath(
  wallY,
  centers,
  attachYs,
  W,
) {
  const pts = [
    [0, wallY],
    ...centers.map((cx, i) => [cx, attachYs[i]]),
    [W, wallY],
  ]

  let d = `M ${pts[0][0]},${pts[0][1]}`

  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const dx = x1 - x0
    const cp1x = (x0 + dx * 0.42).toFixed(1)
    const cp2x = (x1 - dx * 0.42).toFixed(1)
    d += ` C ${cp1x},${y0} ${cp2x},${y1} ${x1},${y1}`
  }

  return d
}

const categories = ["Line Art", "Painting", "Mixed Media"]

const artworks = {
  "Line Art": [
    { src: import.meta.env.BASE_URL + "art1.png", alt: "Expressive painting of a screaming face with blue background" },
    { src: import.meta.env.BASE_URL + "art2.png", alt: "Ink drawing of a sleeping figure with hands" },
    { src: import.meta.env.BASE_URL + "art3.png", alt: "Ink drawing of a hunched figure" },
    { src: import.meta.env.BASE_URL + "art4.png", alt: "Expressive face drawing" },
    { src: import.meta.env.BASE_URL + "art5.png", alt: "Painting of a face with hand on forehead" },
  ],
  Painting:      [],
  "Mixed Media": [],
}

function HangingRow({
  items,
  centers,
  tilts,
  attachYs,
  wallY,
  clipXOffsets = [],
  rowId,
  onArtClick,
}) {
  const seed  = rowId === "1" ? 7  : 19
  const dur   = rowId === "1" ? "20s" : "16s"
  const fStr  = `fa-string-${rowId}`
  const fEdge = `fa-edge-${rowId}`

  const artTopYs = attachYs.map(ay => ay + ART_OFFSET)
  const clipYs   = attachYs.map(ay => ay - CLP_ABOVE)

  const maxArtTop = Math.max(...artTopYs)
  const rowH      = maxArtTop + ART_H + 70

  const strPath = buildCatenaryPath(wallY, centers, attachYs, ROW_W)

  return (
    <div style={{
      width: "100vw",
      position: "relative",
      left: "50%",
      transform: "translateX(-50%)",
    }}>
      <svg
        viewBox={`0 0 ${ROW_W} ${rowH}`}
        style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
        aria-label={`Hanging artwork row ${rowId}`}
      >
        <defs>
          <filter
            id={fStr}
            filterUnits="userSpaceOnUse"
            x="-100" y="-50" width="1700" height="300"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.016 0.024"
              numOctaves="2"
              seed={seed}
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.016 0.024;0.021 0.019;0.014 0.028;0.019 0.022;0.016 0.024"
                dur={dur}
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic" in2="noise"
              scale="2.8"
              xChannelSelector="R" yChannelSelector="G"
            />
          </filter>

          <filter
            id={fEdge}
            x="-4%" y="-4%" width="108%" height="108%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.016 0.022"
              numOctaves="2"
              seed={seed + 3}
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.016 0.022;0.020 0.018;0.013 0.026;0.018 0.020;0.016 0.022"
                dur={dur}
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic" in2="noise"
              scale="3.2"
              xChannelSelector="R" yChannelSelector="G"
            />
          </filter>

          {items.map((_, i) => {
            const ax     = centers[i] - ART_W / 2
            const artTop = artTopYs[i]
            return (
              <mask
                key={i}
                id={`fa-mask-${rowId}-${i}`}
                maskUnits="userSpaceOnUse"
                x={ax - 15} y={artTop - 15}
                width={ART_W + 30} height={ART_H + 30}
              >
                <rect
                  x={ax} y={artTop}
                  width={ART_W} height={ART_H}
                  fill="white"
                  filter={`url(#${fEdge})`}
                />
              </mask>
            )
          })}
        </defs>

        <path
          d={strPath}
          fill="none"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeOpacity="0.82"
          shapeRendering="geometricPrecision"
          filter={`url(#${fStr})`}
        />

        {items.map((art, i) => {
          const cx     = centers[i]
          const ax     = cx - ART_W / 2
          const tilt   = tilts[i] ?? 0
          const artTop = artTopYs[i]
          const clipX  = cx - CLP_W / 2 + (clipXOffsets[i] ?? 0)
          const clipY  = clipYs[i]

          return (
            <g key={i}>
              <g transform={`rotate(${tilt}, ${cx}, ${artTop})`}>
                <rect x={ax} y={artTop} width={ART_W} height={ART_H} fill="#FBD541" />

                <image
                  href={art.src}
                  x={ax} y={artTop}
                  width={ART_W} height={ART_H}
                  preserveAspectRatio="xMidYMid slice"
                  mask={`url(#fa-mask-${rowId}-${i})`}
                  style={{ cursor: "zoom-in" }}
                  onClick={() => onArtClick(art)}
                />

                <rect
                  x={ax} y={artTop}
                  width={ART_W} height={ART_H}
                  fill="none"
                  stroke="#111111"
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeOpacity="0.82"
                  shapeRendering="geometricPrecision"
                  filter={`url(#${fEdge})`}
                />
              </g>

              <image
                href={import.meta.env.BASE_URL + "cliper1.png"}
                x={clipX}
                y={clipY}
                width={CLP_W}
                height={CLP_H}
                preserveAspectRatio="xMidYMid meet"
                style={{ pointerEvents: "none" }}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function FineArtPage() {
  const [activeTab, setActiveTab]     = useState("Line Art")
  const [lightbox, setLightbox]       = useState(null)
  const [armExtended, setArmExtended] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const seqTimer = useRef(null)

  const handleArmClick = () => {
    if (seqTimer.current) clearTimeout(seqTimer.current)
    if (!armExtended) {
      setArmExtended(true)
      seqTimer.current = setTimeout(() => setSidebarOpen(true), 80)
    } else {
      setSidebarOpen(false)
      setArmExtended(false)
    }
  }

  const handleCategorySelect = (cat) => {
    setActiveTab(cat)
    if (seqTimer.current) clearTimeout(seqTimer.current)
    setSidebarOpen(false)
    setArmExtended(false)
  }

  const current = artworks[activeTab]
  const row1    = current.slice(0, 3)
  const row2    = current.slice(3, 5)

  return (
    <div className="min-h-screen flex flex-col bg-background" style={{ overflowX: "hidden" }}>
      <Header />

      <main className="flex-1">

        <section
          className="page-container"
          style={{ paddingTop: "var(--sp-12)", paddingBottom: "var(--sp-8)" }}
        >
          <p
            className="uppercase text-foreground/40 font-medium animate-fade-in"
            style={{ fontSize: "var(--fs-xs)", letterSpacing: "0.2em", marginBottom: "var(--sp-4)" }}
          >
            Gallery
          </p>
          <h1
            className="font-serif italic font-bold text-foreground animate-fade-in-up"
            style={{ maxWidth: "400px" }}
          >
            Fine Art
          </h1>
          <p
            className="text-foreground/60 text-pretty animate-fade-in-up delay-100"
            style={{ marginTop: "var(--sp-4)", maxWidth: "480px", lineHeight: 1.7 }}
          >
            This space is dedicated to my personal drawings and paintings.
            Intuitive, emotional, and often created as a way to explore form,
            identity, and expression.
          </p>
        </section>

        {current.length === 0 ? (
          <div style={{ paddingTop: "var(--sp-16)", paddingBottom: "var(--sp-16)", textAlign: "center" }}>
            <p className="font-serif italic font-bold text-foreground/40" style={{ fontSize: "var(--fs-h2)" }}>
              Coming Soon
            </p>
            <p className="text-foreground/30" style={{ marginTop: "var(--sp-3)", fontSize: "var(--fs-sm)" }}>
              This section is being updated with new work.
            </p>
          </div>
        ) : (
          <section style={{ paddingBottom: "var(--sp-16)" }}>
            {row1.length > 0 && (
              <HangingRow
                items={row1}
                centers={R1_CENTERS}
                tilts={R1_TILTS}
                attachYs={R1_ATTACH_Y}
                wallY={R1_WALL_Y}
                clipXOffsets={[22, 0, 0]}
                rowId="1"
                onArtClick={setLightbox}
              />
            )}
            {row2.length > 0 && (
              <HangingRow
                items={row2}
                centers={R2_CENTERS}
                tilts={R2_TILTS}
                attachYs={R2_ATTACH_Y}
                wallY={R2_WALL_Y}
                rowId="2"
                onArtClick={setLightbox}
              />
            )}
          </section>
        )}

      </main>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.9)", zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px", cursor: "zoom-out",
          }}
        >
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            style={{ maxHeight: "90vh", maxWidth: "90vw", objectFit: "contain", borderRadius: "8px" }}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute", top: "20px", right: "24px",
              background: "none", border: "none", color: "white",
              fontSize: "32px", cursor: "pointer", lineHeight: 1,
            }}
          >×</button>
        </div>
      )}

      <Footer />

      {sidebarOpen && (
        <div
          onClick={handleArmClick}
          style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.2)" }}
        />
      )}

      <div style={{
        position: "fixed", top: 0, right: 0,
        height: "100vh", width: "280px",
        background: "#111111", zIndex: 50,
        display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "48px 40px",
        transform: sidebarOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.60s cubic-bezier(0.34, 1.06, 0.64, 1)",
        boxShadow: sidebarOpen ? "-8px 0 48px rgba(0,0,0,0.3)" : "none",
      }}>
        <p style={{
          color: "rgba(255,255,255,0.3)", fontSize: "11px",
          letterSpacing: "0.18em", textTransform: "uppercase",
          marginBottom: "36px", fontWeight: 500,
        }}>Filter by</p>
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              style={{
                background: "none", border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                cursor: "pointer", textAlign: "left", padding: "14px 0",
                fontSize: "var(--fs-h3)", fontWeight: 600,
                fontFamily: "var(--font-serif)", fontStyle: "italic",
                color: activeTab === cat ? "#FBD541" : "rgba(255,255,255,0.4)",
                transition: "color 0.2s ease", letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== cat)
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)"
              }}
              onMouseLeave={(e) => {
                if (activeTab !== cat)
                  e.currentTarget.style.color = "rgba(255,255,255,0.4)"
              }}
            >{cat}</button>
          ))}
        </nav>
        <button
          onClick={handleArmClick}
          style={{
            marginTop: "48px", background: "none", border: "none",
            cursor: "pointer", color: "rgba(255,255,255,0.2)",
            fontSize: "12px", letterSpacing: "0.12em",
            textTransform: "uppercase", textAlign: "left", padding: 0,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) =>
            e.currentTarget.style.color = "rgba(255,255,255,0.55)"
          }
          onMouseLeave={(e) =>
            e.currentTarget.style.color = "rgba(255,255,255,0.2)"
          }
        >← Close</button>
      </div>

      {/* ── "Click here" hint cue near the waving arm ── */}
      <div
        style={{
          position: "fixed",
          right: armExtended ? "-200px" : "168px",
          bottom: "calc(8% + 720px)",
          zIndex: 52,
          pointerEvents: "none",
          opacity: armExtended ? 0 : 1,
          transition: "opacity 0.5s ease, right 0.62s cubic-bezier(0.34, 1.06, 0.64, 1)",
          animation: armExtended ? "none" : "hintPulse 4s ease-in-out infinite",
          animationDelay: "1.8s",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "6px",
        }}
      >
        {/* Label bubble */}
        <div style={{
          background: "#FBD541",
          borderRadius: "999px",
          padding: "6px 14px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        }}>
          {/* Cursor icon */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#111" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4l7 18 3-7 7-3L4 4z"/>
          </svg>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#111",
            whiteSpace: "nowrap",
          }}>
            Click me!
          </span>
        </div>
        {/* Arrow pointing down-right toward the hand */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ marginRight: "8px" }} xmlns="http://www.w3.org/2000/svg">
          <path d="M6 4 Q20 4 22 22" stroke="#111" strokeWidth="1.8" strokeLinecap="round" fill="none" strokeDasharray="3 3"/>
          <path d="M17 17 L22 22 L27 17" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>

      <div
        onClick={handleArmClick}
        role="button" tabIndex={0}
        aria-label={armExtended ? "Close category filter" : "Open category filter"}
        onKeyDown={(e) => e.key === "Enter" && handleArmClick()}
        style={{
          position: "fixed",
          right: armExtended ? "208px" : "-360px",
          bottom: "8%",
          width: "600px",
          zIndex: 51,
          cursor: "pointer",
          transformOrigin: "right center",
          transition: "right 0.62s cubic-bezier(0.34, 1.06, 0.64, 1), transform 0.5s ease",
          filter: "drop-shadow(-6px 6px 20px rgba(0,0,0,0.35))",
          animation: armExtended ? "none" : "armWave 3.8s ease-in-out infinite",
        }}
      >
        <img src={import.meta.env.BASE_URL + "hands.png"} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      <style>{`
        @keyframes armWave {
          0%,  100% { transform: rotate(  0deg); }
          16%        { transform: rotate( -5deg); }
          36%        { transform: rotate(  3.5deg); }
          54%        { transform: rotate( -4deg); }
          72%        { transform: rotate(  2.5deg); }
          88%        { transform: rotate( -1.5deg); }
        }
        @keyframes hintPulse {
          0%,  100% { opacity: 0.45; transform: translateX(0); }
          50%        { opacity: 0.75; transform: translateX(-4px); }
        }
      `}</style>
    </div>
  )
}
