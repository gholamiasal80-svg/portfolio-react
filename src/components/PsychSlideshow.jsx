import { useState } from "react"

const SLIDES = [
  {
    src: import.meta.env.BASE_URL + "DASHBOARD.jpg",
    label:       "Dashboard / Home",
    description: "The home screen gives users a quick snapshot of their mental wellness for the day. A large Emotional Clarity Score sits front and centre, alongside notes and daily tasks. Users can start a new chat, access an emergency hold button for anxiety, track their goal progress, or jump to their therapist profile. It acts as the emotional hub of the entire app.",
  },
  {
    src: import.meta.env.BASE_URL + "mood%20page.png",
    label:       "Mood Tracker",
    description: "This screen tracks the user's emotional patterns over time using a line graph at the top. Below the chart, users can log daily habits like sleep, stress, workout, food, and water using slider-style bars. The date display and comparison between yesterday and today help users notice trends. It makes self-reflection feel approachable rather than clinical.",
  },
  {
    src: import.meta.env.BASE_URL + "chat.png",
    label:       "Chat List",
    description: "This screen gives the user an overview of all their active conversations. Each contact shows a name, last message preview, and timestamp so nothing gets missed. The bottom navigation bar with Home, Mood, Chat, and Doctor makes it easy to switch between the app's main sections. It keeps communication accessible without feeling overwhelming.",
  },
  {
    src: import.meta.env.BASE_URL + "Messanger%20Chat.png",
    label:       "Chat Conversation",
    description: "This is a one-on-one messaging screen between the user and a contact. The chat bubbles follow a simple left/right layout with a warm accent colour used for the user's messages. Users can also share images directly in the conversation. It feels more like a personal conversation than a clinical interaction, which helps users feel at ease.",
  },
  {
    src: import.meta.env.BASE_URL + "doctor%20calender.png",
    label:       "Doctor Scheduling",
    description: "This screen lets users browse and book appointments with licensed psychologists. A full calendar sits at the top so users can pick a date, and below it shows available doctors with their ratings, a short bio, session hours, and pricing. The Book Now button is clear and easy to find. It simplifies what can often feel like a stressful process.",
  },
  {
    src: import.meta.env.BASE_URL + "call.png",
    label:       "Call Screen",
    description: "This screen shows an outgoing call in progress to a contact. The user's photo fills the background in a soft blur, creating a personal and calm feel. Simple controls for camera, microphone, and speaker sit in the bottom left, with a red end-call button front and centre. The minimal layout keeps distractions low during what could be a sensitive conversation.",
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

export default function PsychSlideshow() {
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
          App Screens
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

              {/* screen image — wrapped in link for active card */}
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
                  {/* click hint */}
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

      {/* ── figma link ── */}
      <div style={{
        display:        "flex",
        justifyContent: "center",
        marginTop:      "52px",
      }}>
        <a
          href="https://www.figma.com/design/XcBl5LlfQn1vRIKJJ7Q9Mo/Psych-Mental-Health-App?t=S1FgHmqmogKF5i8i-1"
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
          View full screens in Figma ↗
        </a>
      </div>

    </section>
  )
}
