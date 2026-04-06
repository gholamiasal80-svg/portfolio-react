import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"


export default function AboutPage() {
  const [revealed, setRevealed] = useState(false)
  const [tugging, setTugging] = useState(false)

  const handlePull = () => {
    if (tugging) return
    setTugging(true)
    setTimeout(() => {
      setRevealed((r) => !r)
      setTugging(false)
    }, 300)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section
          className="page-container"
          style={{ paddingTop: "var(--sp-12)", paddingBottom: "var(--sp-10)" }}
        >
          <p
            className="uppercase text-foreground/40 font-medium animate-fade-in"
            style={{
              fontSize: "var(--fs-xs)",
              letterSpacing: "0.2em",
              marginBottom: "var(--sp-4)",
            }}
          >
            About
          </p>
          <h1
            className="font-serif italic font-bold text-foreground animate-fade-in-up"
            style={{ maxWidth: "600px" }}
          >
            The story behind the work
          </h1>
          <div
            className="animate-fade-in delay-200"
            style={{
              width: "48px",
              height: "3px",
              background: "var(--accent)",
              borderRadius: "var(--radius-pill)",
              marginTop: "var(--sp-6)",
            }}
            aria-hidden="true"
          />
        </section>

        <section style={{ paddingBottom: "var(--sp-8)", position: "relative", overflowX: "clip", overflowY: "visible", zIndex: 2 }}>
          <div
            className="page-container flex flex-col md:flex-row items-start"
            style={{ gap: "var(--sp-10)" }}
          >
            <div
              className="flex-shrink-0 w-full md:w-[400px] animate-slide-left delay-200"
              style={{ position: "relative", minHeight: "860px" }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3/4",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.14)",
                  zIndex: 2,
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "#F0C800" }}>
                  <img
                    src={import.meta.env.BASE_URL + "me.png"}
                    alt="Sal's self-portrait drawing"
                    className="about-portrait-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    transform: revealed ? "translateY(105%)" : "translateY(0%)",
                    transition: "transform 1.2s cubic-bezier(0.55, 0, 0.1, 1)",
                  }}
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/me-lTaHOLS6lDTtRBcHTtwtGweoqSZekJ.jpg"
                    alt="Sal - mirror selfie with curly hair and headphones"
                    className="about-portrait-img"
                    loading="eager"
                  />
                </div>
              </div>

              <div
                onClick={handlePull}
                role="button"
                tabIndex={0}
                aria-label={revealed ? "Release to restore photo" : "Pull to reveal drawing"}
                onKeyDown={(e) => e.key === "Enter" && handlePull()}
                style={{
                  position: "absolute",
                  top: "-180px",
                  left: "-530px",
                  width: "1120px",
                  zIndex: 1,
                  cursor: "pointer",
                  filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.15))",
                  transform: revealed ? "translateY(120px)" : "translateY(0px)",
                  transition: "transform 1.2s cubic-bezier(0.55, 0, 0.1, 1)",
                  pointerEvents: "auto",
                }}
              >
                <img
                  src={import.meta.env.BASE_URL + "hand-string.png"}
                  alt=""
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>

              <p
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "158px",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: revealed ? "#11111160" : "#11111145",
                  transition: "color 0.4s ease",
                  pointerEvents: "none",
                }}
              >
                {revealed ? "click to restore" : "pull to reveal ↓"}
              </p>
            </div>

            <div
              className="flex-1 animate-slide-right delay-300"
              style={{ paddingTop: "var(--sp-5)" }}
            >
              <p
                className="text-foreground/70"
                style={{ lineHeight: 1.8, fontSize: "var(--fs-body)" }}
              >
                {"I'm Sal, a designer and artist who works between digital design and fine art. I use visual storytelling as a way to observe, question, and communicate ideas that are often difficult to put into words."}
              </p>
              <p
                className="text-foreground/70"
                style={{
                  lineHeight: 1.8,
                  fontSize: "var(--fs-body)",
                  marginTop: "var(--sp-5)",
                }}
              >
                {"My work is shaped by curiosity, emotion, and a strong interest in how people connect with images and spaces. I believe strong work comes from exploration rather than perfection."}
              </p>

              <div
                className="grid grid-cols-3"
                style={{
                  gap: "var(--sp-6)",
                  marginTop: "var(--sp-10)",
                  paddingTop: "var(--sp-8)",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {[
                  { stat: "BFA", label: "Fine Art Degree" },
                  { stat: "5+", label: "Years Creating" },
                  { stat: "BCIT", label: "New Media Design" },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      className="font-serif italic font-bold text-foreground"
                      style={{ fontSize: "var(--fs-h2)" }}
                    >
                      {item.stat}
                    </p>
                    <p
                      className="text-foreground/40"
                      style={{ fontSize: "var(--fs-xs)", marginTop: "var(--sp-1)" }}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "var(--sp-12)",
                  paddingTop: "var(--sp-8)",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <p
                  className="uppercase text-foreground/40 font-medium"
                  style={{ fontSize: "var(--fs-xs)", letterSpacing: "0.2em", marginBottom: "var(--sp-4)" }}
                >
                  Philosophy
                </p>
                <h2
                  className="font-serif italic font-bold text-foreground"
                  style={{ marginBottom: "var(--sp-6)" }}
                >
                  What drives my creative practice
                </h2>
                <p className="text-foreground/70" style={{ lineHeight: 1.8, fontSize: "var(--fs-body)" }}>
                  {"I value curiosity, honesty, and meaningful expression in everything I create. Sketches, experiments, and mistakes are just as important as final outcomes. I'm drawn to raw, human elements and honest visuals that communicate emotion rather than polish alone."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-approach-section">

          <div className="about-approach-title">
            <p
              className="uppercase text-foreground/40 font-medium"
              style={{ fontSize: "var(--fs-xs)", letterSpacing: "0.2em", marginBottom: "var(--sp-4)" }}
            >
              Approach
            </p>
            <h2
              className="font-serif italic font-bold text-foreground"
            >
              How I Work
            </h2>
          </div>

          <div className="page-container about-approach-inner">
            <div className="about-approach-body">
              <p className="text-foreground/70" style={{ lineHeight: 1.8, fontSize: "var(--fs-body)" }}>
                {"My approach balances structure with intuition, allowing design and fine art to inform each other. I see art and design as tools for communication — ways to connect, reflect, and grow. Every project starts with observation and curiosity before it becomes a solution. I believe the most honest work comes from sitting with an idea long enough to understand what it actually wants to be."}
              </p>
            </div>
          </div>
          <img
            src={import.meta.env.BASE_URL + "about-face.png"}
            alt="Expressive painting of a face"
            className="about-face-img"
          />
        </section>

      </main>

      <Footer />
    </div>
  )
}
