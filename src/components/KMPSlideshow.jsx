import { useState } from "react"

const SLIDES = [
  {
    src: import.meta.env.BASE_URL + "homepage.jpg",
    label:       "Home Screen",
    description: "The redesigned home screen brings video content front and centre with a hero player, clear resume functionality, and organised Watched and New sections. Navigation is simplified to a clean bottom bar, making the most-used features immediately accessible.",
  },
  {
    src: import.meta.env.BASE_URL + "music.jpg",
    label:       "Music Screen",
    description: "The music section introduces a full playlist experience with album art, track listings, and a tabbed filter for Favourite, Recent, and Albums. The layout is visually engaging while keeping playback controls simple and easy to reach.",
  },
  {
    src: import.meta.env.BASE_URL + "kmp%20exchange.jpg",
    label:       "KMPlex Screen",
    description: "The KMPlex screen redesigns the earn and use experience with a card-based layout that surfaces exchange options clearly. Each card provides a summary of the service and direct action buttons, reducing the steps needed to complete a transaction.",
  },
]

function cardStyle(pos) {
  const t = "transform 0.52s cubic-bezier(0.4,0,0.2,1), opacity 0.52s ease, filter 0.52s ease, box-shadow 0.52s ease"

  if (Math.abs(pos) > 1) {
    return {
      transform:     `translateX(calc(-50% + ${pos > 0 ? 52 : -52}%)) scale(0.6)`,
      opacity:       0,
      zIndex:        0,
      filter:        "blur(6px)",
      pointerEvents: "none",
      transition:    t,
      boxShadow:     "none",
    }
  }

  const xPct    = pos * 36
  const scale   = pos === 0 ? 1 : 0.87
  const opacity = pos === 0 ? 1 : 0.45
  const blur    = pos === 0 ? 0 : 2
  const shadow  = pos === 0
    ? "0 24px 64px rgba(0,0,0,0.14)"
    : "0 4px 18px rgba(0,0,0,0.07)"

  return {
    transform:     `translateX(calc(-50% + ${xPct}%)) scale(${scale})`,
    opacity,
    zIndex:        pos === 0 ? 10 : 6,
    filter:        blur > 0 ? `blur(${blur}px)` : "none",
    pointerEvents: pos === 0 ? "auto" : "none",
    transition:    t,
    boxShadow:     shadow,
  }
}

export default function KMPSlideshow() {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)

  const relPos = (i) => {
    const n   = SLIDES.length
    let   pos = i - current
    if (pos >  n / 2) pos -= n
    if (pos < -n / 2) pos += n
    return pos
  }

  const go = (dir) => {
    setHovered(false)
    setCurrent(c => (c + dir + SLIDES.length) % SLIDES.length)
  }

  return (
    <section style={{ padding: "0 0 80px", overflow: "hidden" }}>

      {/* ── section label ── */}
      <div style={{ textAlign: "center", marginBottom: "32px", paddingTop: "16px" }}>
        <p style={{
          fontFamily:    "system-ui, sans-serif",
          fontSize:      "10px",
          fontWeight:    700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         "rgba(17,17,17,0.3)",
        }}>
          Redesigned Screens
        </p>
        <p style={{
          fontFamily:    "system-ui, sans-serif",
          fontSize:      "14px",
          fontWeight:    500,
          color:         "#111111",
          marginTop:     "10px",
          letterSpacing: "0.01em",
        }}>
          {SLIDES[current].label}
        </p>
      </div>

      {/* ── card stack ── */}
      <div style={{
        position: "relative",
        width:    "100%",
        height:   "clamp(440px, 52vw, 680px)",
      }}>

        {/* left arrow */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          style={{
            position:       "absolute",
            left:           "20px",
            top:            "50%",
            transform:      "translateY(-50%)",
            zIndex:         20,
            width:          "40px",
            height:         "40px",
            borderRadius:   "50%",
            border:         "1.5px solid rgba(17,17,17,0.18)",
            background:     "transparent",
            cursor:         "pointer",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            color:          "#111111",
            fontSize:       "17px",
            lineHeight:     1,
            transition:     "background 0.18s, color 0.18s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#111111"
            e.currentTarget.style.color      = "white"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.color      = "#111111"
          }}
        >‹</button>

        {/* right arrow */}
        <button
          onClick={() => go(1)}
          aria-label="Next"
          style={{
            position:       "absolute",
            right:          "20px",
            top:            "50%",
            transform:      "translateY(-50%)",
            zIndex:         20,
            width:          "40px",
            height:         "40px",
            borderRadius:   "50%",
            border:         "1.5px solid rgba(17,17,17,0.18)",
            background:     "transparent",
            cursor:         "pointer",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            color:          "#111111",
            fontSize:       "17px",
            lineHeight:     1,
            transition:     "background 0.18s, color 0.18s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#111111"
            e.currentTarget.style.color      = "white"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.color      = "#111111"
          }}
        >›</button>

        {SLIDES.map((slide, i) => {
          const pos      = relPos(i)
          const isActive = pos === 0
          const base     = cardStyle(pos)

          return (
            <div
              key={slide.src}
              onMouseEnter={() => isActive && setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                position:     "absolute",
                left:         "50%",
                top:          0,
                bottom:       0,
                width:        "clamp(160px, 22%, 270px)",
                overflow:     "hidden",
                borderRadius: "20px",
                ...base,
              }}
            >
              {/* dark tint on inactive cards */}
              {!isActive && (
                <div style={{
                  position:      "absolute",
                  inset:         0,
                  background:    "rgba(17,17,17,0.2)",
                  zIndex:        1,
                  pointerEvents: "none",
                }} />
              )}

              {isActive ? (
                <a
                  href={slide.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:        "block",
                    width:          "100%",
                    height:         "100%",
                    cursor:         "zoom-in",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={slide.src}
                    alt={slide.label}
                    style={{
                      display:        "block",
                      width:          "100%",
                      height:         "100%",
                      objectFit:      "contain",
                      objectPosition: "top center",
                      opacity:        hovered ? 0.1 : 1,
                      transition:     "opacity 0.35s ease",
                    }}
                  />
                </a>
              ) : (
                <img
                  src={slide.src}
                  alt={slide.label}
                  style={{
                    display:        "block",
                    width:          "100%",
                    height:         "100%",
                    objectFit:      "contain",
                    objectPosition: "top center",
                    opacity:        1,
                    transition:     "opacity 0.35s ease",
                  }}
                />
              )}

              {/* hover description overlay — active card only */}
              {isActive && (
                <div style={{
                  position:       "absolute",
                  inset:          0,
                  display:        "flex",
                  flexDirection:  "column",
                  justifyContent: "center",
                  alignItems:     "center",
                  padding:        "40px 28px",
                  background:     "rgba(255,255,255,0.95)",
                  opacity:        hovered ? 1 : 0,
                  transition:     "opacity 0.35s ease",
                  pointerEvents:  "none",
                }}>
                  <p style={{
                    fontFamily:    "system-ui, sans-serif",
                    fontSize:      "10px",
                    fontWeight:    700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color:         "rgba(17,17,17,0.4)",
                    marginBottom:  "16px",
                    textAlign:     "center",
                  }}>
                    {slide.label}
                  </p>
                  <p style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize:   "13px",
                    lineHeight: 1.8,
                    color:      "#111111",
                    textAlign:  "center",
                    maxWidth:   "300px",
                  }}>
                    {slide.description}
                  </p>
                  <div style={{
                    marginTop:     "20px",
                    background:    "#111111",
                    color:         "white",
                    fontSize:      "8px",
                    fontWeight:    700,
                    letterSpacing: "0.14em",
                    fontFamily:    "system-ui, sans-serif",
                    padding:       "5px 12px",
                    borderRadius:  "3px",
                  }}>
                    VIEW FULL ↗
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── dots ── */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "8px",
        marginTop:      "32px",
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setHovered(false); setCurrent(i) }}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width:        i === current ? "22px" : "6px",
              height:       "6px",
              borderRadius: "100px",
              border:       "none",
              background:   i === current ? "#111111" : "rgba(17,17,17,0.18)",
              cursor:       "pointer",
              padding:      0,
              transition:   "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* counter */}
      <p style={{
        textAlign:     "center",
        marginTop:     "14px",
        fontFamily:    "'Courier New', monospace",
        fontSize:      "10px",
        letterSpacing: "0.14em",
        color:         "rgba(17,17,17,0.28)",
      }}>
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </p>

    </section>
  )
}
