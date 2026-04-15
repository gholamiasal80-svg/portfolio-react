import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const SW = 1400
const SH = 500
const BY = 42
const BW = 700
const BH = 416

const CARD_VARIANTS = [
  { bx: 220,  clipFrac: 0.38, tilt: -1.8 },
  { bx: 460,  clipFrac: 0.62, tilt:  1.5 },
  { bx: 295,  clipFrac: 0.46, tilt: -0.7 },
]

function PhysicsCard({
  project,
  idx,
  wobbleSeed,
  wobbleDur,
  bx,
  clipFrac,
  tilt,
}) {
  const CX = bx + BW * clipFrac

  const lineId   = `hd-line-${idx}`
  const wiggleId = `edge-wiggle-${idx}`
  const maskId   = `img-mask-${idx}`

  const boxGroupRef = useRef(null)
  const clipRef     = useRef(null)
  const boxHitRef   = useRef(null)
  const lStrRef     = useRef(null)
  const rStrRef     = useRef(null)
  const lHitRef     = useRef(null)
  const rHitRef     = useRef(null)

  const st = useRef({
    y: 5, vy: 0,
    dragging: false, hasDragged: false, grabOffset: 0,
  })

  const lPath = (by) => {
    const cy = BY + by
    return (
      `M 0,0 ` +
      `C ${CX * 0.28},${10 + by * 0.12} ` +
      `  ${CX * 0.73},${cy - 6 + by * 0.04} ` +
      `  ${CX},${cy}`
    )
  }

  const rPath = (by) => {
    const cy   = BY + by
    const span = SW - CX
    return (
      `M ${CX},${cy} ` +
      `C ${CX + span * 0.33},${cy + 18 + by * 0.25} ` +
      `  ${CX + span * 0.76},${10 + by * 0.05} ` +
      `  ${SW},0`
    )
  }

  useEffect(() => {
    let rafId

    const tick = () => {
      const s = st.current

      if (!s.dragging) {
        s.vy = s.vy * 0.82 - 0.15 * s.y
        s.y += s.vy
        if (Math.abs(s.y) < 0.08 && Math.abs(s.vy) < 0.08) { s.y = 0; s.vy = 0 }
      }
      const by = s.y

      boxGroupRef.current?.setAttribute(
        "transform",
        `translate(0,${by}) rotate(${tilt},${CX},${BY})`,
      )

      clipRef.current?.setAttribute("y", String(BY + by - 130))

      const ld = lPath(by), rd = rPath(by)
      lStrRef.current?.setAttribute("d", ld)
      rStrRef.current?.setAttribute("d", rd)
      lHitRef.current?.setAttribute("d", ld)
      rHitRef.current?.setAttribute("d", rd)

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    const hitEls = [
      lHitRef.current,
      rHitRef.current,
      boxHitRef.current,
    ].filter(Boolean)

    const toSvgY = (e) => {
      const svg = hitEls[0]?.ownerSVGElement
      if (!svg) return null
      const r = svg.getBoundingClientRect()
      return (e.clientY - r.top) * (SH / r.height)
    }

    const onDown = (e) => {
      e.preventDefault()
      const y = toSvgY(e)
      if (y === null) return
      st.current.dragging   = true
      st.current.hasDragged = false
      st.current.grabOffset = y - (BY + st.current.y)
    }

    const onMove = (e) => {
      if (!st.current.dragging) return
      const y = toSvgY(e)
      if (y === null) return
      const newY = y - BY - st.current.grabOffset
      if (Math.abs(newY - st.current.y) > 1.5) st.current.hasDragged = true
      st.current.y = newY
    }

    const onUp = () => { st.current.dragging = false }

    hitEls.forEach(el => el.addEventListener("pointerdown", onDown))
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup",   onUp)
    return () => {
      hitEls.forEach(el => el.removeEventListener("pointerdown", onDown))
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup",   onUp)
    }
  }, [])

  const iy = st.current.y
  const l0 = lPath(iy),  r0 = rPath(iy)
  const initTransform = `translate(0,${iy}) rotate(${tilt},${CX},${BY})`

  return (
    <g
      onClick={(e) => {
        if (st.current.hasDragged) {
          e.preventDefault()
          e.stopPropagation()
          st.current.hasDragged = false
        }
      }}
    >
      <defs>
        <filter
          id={lineId}
          filterUnits="userSpaceOnUse"
          x="-100" y="-50" width="1600" height="600"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise" baseFrequency="0.016 0.024"
            numOctaves="2" seed={wobbleSeed} result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.016 0.024;0.021 0.019;0.014 0.028;0.019 0.022;0.016 0.024"
              dur={`${wobbleDur}s`} repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise"
            scale="3.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter
          id={wiggleId}
          x="-3%" y="-3%" width="106%" height="106%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise" baseFrequency="0.016 0.022"
            numOctaves="2" seed={wobbleSeed + 2} result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.016 0.022;0.020 0.018;0.013 0.026;0.018 0.020;0.016 0.022"
              dur={`${wobbleDur}s`} repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise"
            scale="3.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x={bx - 15} y={-300}
          width={BW + 30} height={SH + 600}
        >
          <rect
            x={bx} y={BY}
            width={BW} height={BH}
            fill="white"
            filter={`url(#${wiggleId})`}
          />
        </mask>
      </defs>

      <path
        ref={lStrRef} d={l0}
        fill="none" stroke="#111111" strokeWidth="2.2"
        strokeLinecap="round" strokeOpacity="0.82"
        shapeRendering="geometricPrecision"
        filter={`url(#${lineId})`}
        style={{ pointerEvents: "none" }}
      />

      <path
        ref={rStrRef} d={r0}
        fill="none" stroke="#111111" strokeWidth="2.2"
        strokeLinecap="round" strokeOpacity="0.82"
        shapeRendering="geometricPrecision"
        filter={`url(#${lineId})`}
        style={{ pointerEvents: "none" }}
      />

      <g ref={boxGroupRef} transform={initTransform}>

        <rect x={bx} y={BY} width={BW} height={BH} fill="#FBD541" />

        <image
          href={project.image}
          x={bx} y={BY} width={BW} height={BH}
          preserveAspectRatio="xMidYMid slice"
          mask={`url(#${maskId})`}
        />

        <rect
          x={bx} y={BY} width={BW} height={BH}
          fill="none" stroke="#111111" strokeWidth="3.2"
          strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.82"
          shapeRendering="geometricPrecision"
          filter={`url(#${wiggleId})`}
        />

        <rect
          ref={boxHitRef}
          x={bx} y={BY - 16}
          width={BW} height={BH + 16}
          fill="transparent"
          pointerEvents="all"
          style={{ cursor: "grab" }}
        />
      </g>

      <image
        ref={clipRef}
        data-component="clip-image"
        href={import.meta.env.BASE_URL + "cliper1.png"}
        x={CX - 55}
        y={BY + iy - 130}
        width={110}
        height={170}
        preserveAspectRatio="xMidYMid meet"
        style={{ pointerEvents: "none" }}
      />

      <path
        ref={lHitRef} d={l0}
        fill="none" stroke="transparent" strokeWidth="24"
        pointerEvents="stroke"
        style={{ cursor: "grab" }}
      />

      <path
        ref={rHitRef} d={r0}
        fill="none" stroke="transparent" strokeWidth="24"
        pointerEvents="stroke"
        style={{ cursor: "grab" }}
      />
    </g>
  )
}

const categories = ["All", "UI/UX", "Graphic Design", "Video"]

const projects = [
  {
    slug: "heinz",
    title: "Artsy Gallery",
    category: "UI/UX",
    image: import.meta.env.BASE_URL + "work1.jpg",
    alt: "Artsy Gallery app design",
  },
  {
    slug: "kmp",
    title: "KMP Music App",
    category: "UI/UX",
    image: import.meta.env.BASE_URL + "work2.jpg",
    alt: "KMP music app redesign on a phone",
  },
  {
    slug: "psych",
    title: "Psych — Mental Health App",
    category: "UI/UX",
    image: import.meta.env.BASE_URL + "work3.jpg",
    alt: "Psych mental health app on a phone",
  },
  {
    slug: "oniwash",
    title: "Turkish Airline Advertisement",
    category: "Graphic Design",
    image: import.meta.env.BASE_URL + "Onivash-Cover.jpg",
    alt: "Turkish Airline advertisement poster campaign",
  },
  {
    slug: "poster-redesign",
    title: "We Met at BCIT",
    category: "Graphic Design",
    image: import.meta.env.BASE_URL + "redesign-cover.jpg",
    alt: "We Met at BCIT poster redesign",
  },
  {
    slug: "photography",
    title: "Photography & Photoshop",
    category: "Graphic Design",
    image: import.meta.env.BASE_URL + "photo-cover.jpg",
    alt: "Photography and Photoshop compositing project",
  },
]

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [armExtended, setArmExtended]       = useState(false)
  const [sidebarOpen, setSidebarOpen]       = useState(false)
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

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat)
    if (seqTimer.current) clearTimeout(seqTimer.current)
    setSidebarOpen(false)
    setArmExtended(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background" style={{ overflowX: "hidden" }}>
      <Header />

      <main className="flex-1">

        <section
          className="page-container"
          style={{ paddingTop: "var(--sp-12)", paddingBottom: "var(--sp-6)" }}
        >
          <p
            className="uppercase text-foreground/40 font-medium animate-fade-in"
            style={{ fontSize: "var(--fs-xs)", letterSpacing: "0.2em", marginBottom: "var(--sp-4)" }}
          >
            Portfolio
          </p>
          <h1
            className="font-serif italic font-bold text-foreground animate-fade-in-up"
            style={{ maxWidth: "500px" }}
          >
            My Work
          </h1>
          <p
            className="text-foreground/60 text-pretty animate-fade-in-up delay-100"
            style={{ marginTop: "var(--sp-4)", maxWidth: "460px", lineHeight: 1.7 }}
          >
            A selection of projects created through my studies and professional practice.
          </p>
          {activeCategory !== "All" && (
            <div style={{
              marginTop: "var(--sp-5)",
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "#111111", color: "#FBD541",
              borderRadius: "9999px", padding: "6px 16px 6px 14px",
              fontSize: "var(--fs-sm)", fontWeight: 500,
            }}>
              <span>{activeCategory}</span>
              <button
                onClick={() => setActiveCategory("All")}
                style={{ background: "none", border: "none", color: "#FBD541",
                  cursor: "pointer", fontSize: "18px", lineHeight: 1, padding: 0, opacity: 0.6 }}
                aria-label="Clear filter"
              >×</button>
            </div>
          )}
        </section>

        <section style={{ paddingBottom: "var(--sp-16)" }}>
          <div className="flex flex-col" style={{ gap: "var(--sp-16)" }}>
            {filtered.map((project, i) => {
              const variant    = CARD_VARIANTS[i % CARD_VARIANTS.length]
              const wobbleDur  = [14, 17, 11][i % 3]
              const wobbleSeed = i * 11 + 5

              const cardBody = (
                <article>
                  <div style={{
                    width: "100vw",
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}>
                    <svg
                      viewBox={`0 0 ${SW} ${SH}`}
                      style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
                      aria-label={project.alt}
                    >
                      <PhysicsCard
                        project={project}
                        idx={i}
                        wobbleSeed={wobbleSeed}
                        wobbleDur={wobbleDur}
                        bx={variant.bx}
                        clipFrac={variant.clipFrac}
                        tilt={variant.tilt}
                      />
                    </svg>
                  </div>

                  <div
                    className="page-container flex items-center justify-between"
                    style={{ marginTop: "var(--sp-5)" }}
                  >
                    <div>
                      <h2 className="font-medium text-foreground" style={{ fontSize: "var(--fs-h3)" }}>
                        {project.title}
                      </h2>
                      <p className="text-foreground/50"
                        style={{ fontSize: "var(--fs-sm)", marginTop: "var(--sp-1)" }}>
                        {project.category}
                      </p>
                    </div>
                    {project.slug && (
                      <span className="text-foreground/40" style={{ fontSize: "var(--fs-sm)" }}>
                        {"View ->"}
                      </span>
                    )}
                  </div>
                </article>
              )

              return project.slug ? (
                <Link
                  key={i}
                  to={`/work/${project.slug}`}
                  className="block"
                  style={{ textDecoration: "none" }}
                >
                  {cardBody}
                </Link>
              ) : (
                <div key={i}>{cardBody}</div>
              )
            })}

            {filtered.length === 0 && (
              <p className="page-container text-foreground/40" style={{ fontSize: "var(--fs-body)" }}>
                No projects in this category yet.
              </p>
            )}
          </div>
        </section>
      </main>

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
                color: activeCategory === cat ? "#FBD541" : "rgba(255,255,255,0.4)",
                transition: "color 0.2s ease", letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat)
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)"
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat)
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

      {/* ── "Click me!" hint cue near the waving arm ── */}
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
          transform: armExtended ? "rotate(0deg)" : undefined,
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
