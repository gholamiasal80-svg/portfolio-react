import { useState } from "react"

const SLIDES = [
  {
    src: import.meta.env.BASE_URL + "Home%20page.png",
    label:       "Homepage",
    description: "The homepage is designed to create a strong first impression through large, visually engaging artwork and a clean, structured layout. A neutral and minimal color palette ensures that the artwork remains the primary focus. Clear navigation helps users quickly understand where to go, while a prominent call-to-action encourages exploration of the gallery.",
  },
  {
    src: import.meta.env.BASE_URL + "Exhibition.png",
    label:       "Gallery / Exhibition",
    description: "The gallery page is focused on browsing and discovery, using a structured grid layout to display multiple artworks at once. Consistent spacing makes it easy for users to scan and compare pieces. Subtle interaction cues and filtering options support a smooth exploration process, helping users narrow down and select artworks more efficiently.",
  },
  {
    src: import.meta.env.BASE_URL + "Artist%20info%20section.png",
    label:       "Artist Info",
    description: "The artist information page provides deeper context about the creator behind the artwork. It combines imagery with descriptive text in a balanced layout that guides the user through the artist's background, style, and featured works. Hierarchy is used carefully to separate sections and maintain readability.",
  },
  {
    src: import.meta.env.BASE_URL + "Favorite.png",
    label:       "Favourites",
    description: "The favourites page allows users to collect and revisit artworks they are interested in. It follows a similar layout to the gallery page to maintain consistency and familiarity. The structure is kept simple so users can quickly recognize saved pieces and return to them without confusion.",
  },
  {
    src: import.meta.env.BASE_URL + "Shopping%20section.png",
    label:       "Shopping Cart",
    description: "The shopping page organizes selected artworks and purchase details in a clear and structured way. Each item is presented with enough visual and textual information to help users review their choices before proceeding. The design aims to reduce friction and guide users smoothly toward checkout.",
  },
  {
    src: import.meta.env.BASE_URL + "paymeny%20info.png",
    label:       "Payment Info",
    description: "The payment page is designed to be straightforward and easy to follow, reducing cognitive load during checkout. Form fields are clearly labeled and organized in a logical order, helping users complete their information efficiently. The minimal design creates a sense of trust and focus while completing the transaction.",
  },
  {
    src: import.meta.env.BASE_URL + "thank%20you%20section.png",
    label:       "Order Confirmation",
    description: "The thank you page confirms that the purchase has been successfully completed. The layout is intentionally simple, providing clear confirmation feedback while maintaining consistency with the rest of the design. It reassures users and marks the end of the transaction in a clean and organized way.",
  },
  {
    src: import.meta.env.BASE_URL + "Information%20submission%20thank%20you%20section.png",
    label:       "Submission Confirmation",
    description: "This page provides feedback after a user submits information, such as a contact form or inquiry. The design focuses on clarity and reassurance, letting users know their submission was successful. The minimal layout keeps the message clear and avoids unnecessary distractions.",
  },
  {
    src: import.meta.env.BASE_URL + "Get%20in%20touch%20section.png",
    label:       "Get In Touch",
    description: "The contact page is designed to make communication easy and accessible. A structured form layout with clearly labeled fields helps users quickly understand what information is required. The clean and minimal design reduces friction and encourages users to reach out without feeling overwhelmed.",
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

export default function WireframeSlideshow() {
  const [current, setCurrent]  = useState(0)
  const [hovered, setHovered]  = useState(false)

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
    <section style={{ padding: "72px 0 80px", overflow: "hidden" }}>

      {/* ── section label ── */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{
          fontFamily:    "system-ui, sans-serif",
          fontSize:      "10px",
          fontWeight:    700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         "rgba(17,17,17,0.3)",
        }}>
          Wireframes
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
        height:   "clamp(480px, 56vw, 760px)",
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
          const pos     = relPos(i)
          const isActive = pos === 0
          const base    = cardStyle(pos)

          return (
            <div
              key={slide.src}
              onMouseEnter={() => isActive && setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                position: "absolute",
                left:     "50%",
                top:      0,
                bottom:   0,
                width:    "clamp(220px, 44%, 560px)",
                overflow: "hidden",
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

              {/* wireframe image */}
              <img
                src={slide.src}
                alt={slide.label}
                style={{
                  display:        "block",
                  width:          "100%",
                  height:         "100%",
                  objectFit:      "contain",
                  objectPosition: "top center",
                  opacity:        isActive && hovered ? 0.15 : 1,
                  transition:     "opacity 0.35s ease",
                }}
              />

              {/* hover description overlay — active card only */}
              {isActive && (
                <div style={{
                  position:       "absolute",
                  inset:          0,
                  display:        "flex",
                  flexDirection:  "column",
                  justifyContent: "center",
                  alignItems:     "center",
                  padding:        "40px 36px",
                  background:     "rgba(255,255,255,0.93)",
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
                  }}>
                    {slide.label}
                  </p>
                  <p style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize:   "14px",
                    lineHeight: 1.8,
                    color:      "#111111",
                    textAlign:  "center",
                    maxWidth:   "340px",
                  }}>
                    {slide.description}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── dots only ── */}
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

      {/* ── figma link ── */}
      <div style={{
        display:        "flex",
        justifyContent: "center",
        marginTop:      "52px",
      }}>
        <a
          href="https://www.figma.com/design/JxV4pYfwVmXZDg2n30a73N/Artsy?t=7Myhxrod8iUNS9FX-1"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            "10px",
            padding:        "13px 28px",
            border:         "1.5px solid #111111",
            borderRadius:   "100px",
            background:     "transparent",
            textDecoration: "none",
            fontSize:       "13px",
            fontWeight:     600,
            letterSpacing:  "0.04em",
            color:          "#111111",
            fontFamily:     "system-ui, sans-serif",
            boxShadow:      "3px 3px 0px #111111",
            transition:     "box-shadow 0.2s ease, transform 0.2s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "1px 1px 0px #111111"
            e.currentTarget.style.transform = "translate(2px, 2px)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "3px 3px 0px #111111"
            e.currentTarget.style.transform = "translate(0, 0)"
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M12 2H8.5a3.5 3.5 0 1 0 0 7H12V2z"               fill="#F24E1E"/>
            <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"                fill="#FF7262"/>
            <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"   fill="#1ABCFE"/>
            <path d="M5 12.5a3.5 3.5 0 0 1 3.5-3.5H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" fill="#0ACF83"/>
            <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z"                fill="#A259FF"/>
          </svg>
          View full wireframes in Figma ↗
        </a>
      </div>

    </section>
  )
}
