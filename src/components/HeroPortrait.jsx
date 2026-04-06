import { useEffect, useRef, useState, useCallback } from "react"

const MAX_X = 7
const MAX_Y = 3

export default function HeroPortrait() {
  const containerRef = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [blink, setBlink]   = useState(false)
  const blinkTimer = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    const cx = rect.left + rect.width  * 0.5
    const cy = rect.top  + rect.height * 0.42

    const dx  = e.clientX - cx
    const dy  = e.clientY - cy
    const mag = Math.hypot(dx, dy) || 1

    const t = Math.min(mag / 450, 1)

    setOffset({
      x: (dx / mag) * t * MAX_X,
      y: (dy / mag) * t * MAX_Y,
    })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [onMouseMove])

  useEffect(() => {
    const schedule = () => {
      blinkTimer.current = setTimeout(() => {
        setBlink(true)
        setTimeout(() => {
          setBlink(false)
          schedule()
        }, 360)
      }, 7000 + Math.random() * 5000)
    }
    blinkTimer.current = setTimeout(schedule, 3000)
    return () => { if (blinkTimer.current) clearTimeout(blinkTimer.current) }
  }, [])

  const pupilStyle = {
    position:       "absolute",
    inset:          0,
    width:          "100%",
    height:         "100%",
    pointerEvents:  "none",
    userSelect:     "none",
    transform:      `translate(${offset.x}px, ${offset.y}px)`,
    opacity:        blink ? 0 : 1,
    transition:     [
      "transform 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      blink ? "opacity 0.09s ease-in" : "opacity 0.20s ease-out",
    ].join(", "),
  }

  return (
    <div
      ref={containerRef}
      className="w-full md:w-3/5 animate-slide-left hero-image-wrap"
      style={{ flexShrink: 0, position: "relative" }}
    >
      <img
        src={import.meta.env.BASE_URL + "hero-face.png"}
        alt="Expressive ink drawing of a face with deep, searching eyes"
        className="w-full h-auto"
        loading="eager"
        style={{ display: "block" }}
      />

      <img src={import.meta.env.BASE_URL + "left-eye.png"}  alt="" style={pupilStyle} />
      <img src={import.meta.env.BASE_URL + "right-eye.png"} alt="" style={pupilStyle} />
    </div>
  )
}
