import { Link } from "react-router-dom"
import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import HeroPortrait from "../components/HeroPortrait"

const projects = [
  {
    slug: "heinz",
    title: "Heinz Ketchup Campaign",
    category: "Graphic Design",
    image: "work1.jpg",
    alt: "Heinz ketchup campaign design",
  },
  {
    slug: "kmp",
    title: "KMP Music App Redesign",
    category: "UI/UX",
    image: "work2.jpg",
    alt: "KMP music app redesign",
  },
  {
    slug: "psych",
    title: "Psych — Mental Health App",
    category: "UI/UX",
    image: "work3.jpg",
    alt: "Psych mental health app",
  },
]

function SelectedWorkSlideshow() {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length)
  const next = () => setCurrent((c) => (c + 1) % projects.length)
  const p = projects[current]

  const arrowStyle = {
    flexShrink: 0,
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "#111111",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
    transition: "background 0.2s",
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Row: left arrow — image — right arrow */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button onClick={prev} style={arrowStyle}>←</button>

        <Link to={`/work/${p.slug}`} className="block group" style={{ textDecoration: "none", flex: 1, minWidth: 0 }}>
          <div className="overflow-hidden" style={{ borderRadius: "var(--radius-lg)", boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}>
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <img
                key={p.image}
                src={import.meta.env.BASE_URL + p.image}
                alt={p.alt}
                className="w-full h-full object-cover"
                style={{ transition: "transform var(--dur-slow) var(--ease)", display: "block" }}
                loading="lazy"
              />
            </div>
          </div>
        </Link>

        <button onClick={next} style={arrowStyle}>→</button>
      </div>

      {/* Project meta + dots */}
      <div className="flex items-center justify-between project-meta-row" style={{ marginTop: "var(--sp-4)" }}>
        <Link to={`/work/${p.slug}`} style={{ textDecoration: "none", flex: 1 }}>
          <h3 className="font-medium text-foreground" style={{ fontSize: "var(--fs-h3)" }}>{p.title}</h3>
          <p className="text-foreground/40" style={{ fontSize: "var(--fs-sm)", marginTop: "var(--sp-1)" }}>{p.category}</p>
        </Link>
        <Link to={`/work/${p.slug}`} className="text-foreground/30" style={{ fontSize: "var(--fs-sm)", textDecoration: "none", whiteSpace: "nowrap" }}>
          View Project →
        </Link>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", gap: "8px", marginTop: "var(--sp-4)" }}>
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "999px",
              background: i === current ? "#111111" : "rgba(17,17,17,0.2)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex flex-col">
        <section className="flex flex-col md:flex-row hero-section-mobile">
          <HeroPortrait />

          <div
            className="w-full md:w-2/5 flex flex-col justify-center items-start animate-slide-right hero-text-panel"
            style={{ padding: "4vw", position: "sticky", top: "80px", alignSelf: "flex-start" }}
          >
              <p
                className="uppercase text-foreground/40 font-medium tracking-widest"
                style={{
                  fontSize: "var(--fs-xs)",
                  letterSpacing: "0.2em",
                  marginBottom: "var(--sp-4)",
                }}
              >
                Designer & Fine Artist
              </p>

              <h1
                className="font-serif italic font-bold text-foreground text-balance"
                style={{ fontSize: "var(--fs-display)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
              >
                See Through
                <br />
                My World
                <br />
                with Me
              </h1>

              <div
                className="animate-fade-in delay-200"
                style={{
                  width: "64px",
                  height: "3px",
                  background: "var(--accent)",
                  borderRadius: "var(--radius-pill)",
                  marginTop: "var(--sp-5)",
                }}
                aria-hidden="true"
              />

              <p
                className="text-foreground/60 text-pretty"
                style={{
                  marginTop: "var(--sp-5)",
                  maxWidth: "420px",
                  fontSize: "var(--fs-body)",
                  lineHeight: 1.7,
                }}
              >
                Design and art are how I process the world. This portfolio is a
                collection of projects, experiments, and ideas that reflect how I
                think, feel, and create.
              </p>

              <div
                className="flex items-center animate-fade-in-up delay-300"
                style={{ marginTop: "var(--sp-6)", gap: "var(--sp-4)" }}
              >
                <Link to="/work" className="btn-primary">
                  View Work
                </Link>
                <Link to="/fine-art" className="btn-outline">
                  Fine Art
                </Link>
              </div>
            </div>
        </section>

        <section className="home-selected-work" style={{ paddingTop: "var(--sp-6)", paddingBottom: "var(--sp-12)" }}>
          <div className="page-container">
            <div
              className="flex items-center justify-between work-header-row"
              style={{ marginBottom: "var(--sp-6)" }}
            >
              <h2
                className="font-serif italic font-bold text-foreground"
                style={{ fontSize: "var(--fs-h2)" }}
              >
                Selected Work
              </h2>
              <Link
                to="/work"
                className="link-underline text-foreground/50 hover:text-foreground"
                style={{
                  fontSize: "var(--fs-sm)",
                  transition: "color var(--dur-base) var(--ease)",
                  textDecoration: "none",
                }}
              >
                View all
              </Link>
            </div>

            <SelectedWorkSlideshow />
          </div>
        </section>

        <section className="home-values-strip" style={{ padding: "var(--sp-16) 0" }}>
          <div className="page-container">
            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ gap: "var(--sp-10)" }}
            >
              {[
                {
                  number: "01",
                  title: "Curiosity",
                  description:
                    "Every project begins with exploration. I believe strong work comes from asking questions, not rushing to answers.",
                },
                {
                  number: "02",
                  title: "Expression",
                  description:
                    "Art and design are tools for communication — ways to connect, reflect, and convey what words cannot.",
                },
                {
                  number: "03",
                  title: "Honesty",
                  description:
                    "Raw, human elements and honest visuals that communicate emotion rather than polish alone.",
                },
              ].map((value) => (
                <div key={value.number}>
                  <span
                    className="font-serif italic text-accent"
                    style={{ fontSize: "var(--fs-h2)", fontWeight: 700 }}
                  >
                    {value.number}
                  </span>
                  <h3
                    className="font-medium text-foreground"
                    style={{
                      fontSize: "var(--fs-h3)",
                      marginTop: "var(--sp-3)",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-foreground/60"
                    style={{
                      marginTop: "var(--sp-3)",
                      lineHeight: 1.7,
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="home-cta-band"
          style={{
            padding: "var(--sp-16) 0",
            background: "#111111",
          }}
        >
          <div className="page-container text-center">
            <h2
              className="font-serif italic font-bold text-balance"
              style={{ fontSize: "var(--fs-h1)", color: "#FBD541" }}
            >
              {"Let's create something together"}
            </h2>
            <p
              className="mx-auto text-pretty"
              style={{
                marginTop: "var(--sp-4)",
                maxWidth: "420px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Whether {"it's"} a design project, a collaboration, or just a
              conversation about art {"&"} creativity.
            </p>
            <Link
              to="/contact"
              className="btn-primary"
              style={{ marginTop: "var(--sp-8)", display: "inline-flex" }}
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
