import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background" style={{ overflowX: "hidden" }}>
      <Header />

      <main className="flex-1">

        <div style={{ position: "relative" }}>

          <section
            style={{
              padding: "var(--sp-12) 5% var(--sp-10)",
              position: "relative",
              zIndex: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ width: "55%", minWidth: "300px" }}>
              <h1
                className="font-serif italic font-bold text-foreground animate-fade-in-up"
                style={{ fontSize: "var(--fs-display)" }}
              >
                {"Let's Talk!"}
              </h1>
              <p
                className="text-foreground/60 text-pretty animate-fade-in-up delay-100"
                style={{
                  marginTop: "var(--sp-4)",
                  maxWidth: "420px",
                  lineHeight: 1.7,
                }}
              >
                {"If you'd like to work together, ask a question, or start a conversation, feel free to reach out."}
              </p>
            </div>
          </section>

          <section
            style={{
              background: "#111111",
              position: "relative",
              zIndex: 1,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: "380px",
              }}
            >
              <div
                className="contact-illustration-spacer"
                style={{ width: "42%", flexShrink: 0 }}
              />

              <div
                className="animate-slide-right delay-300"
                style={{
                  flex: 1,
                  padding: "60px 5% 60px 2%",
                  minWidth: 0,
                }}
              >
                <div
                  className="bg-card contact-form-card"
                  style={{
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "0 8px 48px rgba(0,0,0,0.28)",
                    padding: "var(--sp-10)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {submitted ? (
                    <div className="text-center" style={{ padding: "var(--sp-16) 0" }}>
                      <div
                        className="mx-auto"
                        style={{
                          width: "48px", height: "3px",
                          background: "var(--accent)",
                          borderRadius: "var(--radius-pill)",
                          marginBottom: "var(--sp-6)",
                        }}
                        aria-hidden="true"
                      />
                      <p className="font-serif italic font-bold text-card-foreground" style={{ fontSize: "var(--fs-h2)" }}>
                        Thanks for reaching out!
                      </p>
                      <p className="text-card-foreground/50" style={{ marginTop: "var(--sp-3)", fontSize: "var(--fs-body)" }}>
                        {"Please also drop me a line at "}
                        <a href="mailto:Gholamiasal80@gmail.com"
                          style={{ color: "var(--accent)", textDecoration: "underline" }}>
                          Gholamiasal80@gmail.com
                        </a>
                        {" to make sure I receive your message."}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: "var(--sp-6)" }}>

                      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "var(--sp-6)" }}>
                        <div className="flex flex-col" style={{ gap: "6px" }}>
                          <label htmlFor="fullname" className="text-card-foreground/50 uppercase font-medium"
                            style={{ fontSize: "var(--fs-xs)", letterSpacing: "0.08em" }}>
                            Full name
                          </label>
                          <input id="fullname" name="fullname" type="text" required autoComplete="name"
                            className="text-card-foreground"
                            style={{ border: "none", borderBottom: "var(--border-w) solid var(--input)",
                              background: "transparent", padding: "var(--sp-3) 0", fontSize: "var(--fs-body)",
                              transition: "border-color var(--dur-base) var(--ease)" }} />
                        </div>
                        <div className="flex flex-col" style={{ gap: "6px" }}>
                          <label htmlFor="email" className="text-card-foreground/50 uppercase font-medium"
                            style={{ fontSize: "var(--fs-xs)", letterSpacing: "0.08em" }}>
                            Email
                          </label>
                          <input id="email" name="email" type="email" required autoComplete="email"
                            className="text-card-foreground"
                            style={{ border: "none", borderBottom: "var(--border-w) solid var(--input)",
                              background: "transparent", padding: "var(--sp-3) 0", fontSize: "var(--fs-body)",
                              transition: "border-color var(--dur-base) var(--ease)" }} />
                        </div>
                      </div>

                      <div className="flex flex-col" style={{ gap: "6px" }}>
                        <label htmlFor="phone" className="text-card-foreground/50 uppercase font-medium"
                          style={{ fontSize: "var(--fs-xs)", letterSpacing: "0.08em" }}>
                          Phone (optional)
                        </label>
                        <input id="phone" name="phone" type="tel" autoComplete="tel"
                          className="text-card-foreground"
                          style={{ border: "none", borderBottom: "var(--border-w) solid var(--input)",
                            background: "transparent", padding: "var(--sp-3) 0", fontSize: "var(--fs-body)",
                            transition: "border-color var(--dur-base) var(--ease)" }} />
                      </div>

                      <div className="flex flex-col" style={{ gap: "6px" }}>
                        <label htmlFor="message" className="text-card-foreground/50 uppercase font-medium"
                          style={{ fontSize: "var(--fs-xs)", letterSpacing: "0.08em" }}>
                          Message
                        </label>
                        <textarea id="message" name="message" rows={4} required
                          className="text-card-foreground resize-none"
                          style={{ border: "none", borderBottom: "var(--border-w) solid var(--input)",
                            background: "transparent", padding: "var(--sp-3) 0", fontSize: "var(--fs-body)",
                            transition: "border-color var(--dur-base) var(--ease)" }} />
                      </div>

                      <div className="flex items-center justify-end" style={{ paddingTop: "var(--sp-4)" }}>
                        <button type="submit" className="btn-primary">Send Message</button>
                      </div>

                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          <div
            className="contact-illustration-wrap"
            style={{
              position: "absolute",
              left: "-10%",
              bottom: 0,
              width: "56%",
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <div style={{ animation: "contactBreathe 8s ease-in-out infinite", transformOrigin: "50% 58%" }}>
              <img
                src={import.meta.env.BASE_URL + "contact-sleepy.png"}
                alt="Artistic ink drawing of a resting figure with closed eyes"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
                loading="eager"
              />
            </div>

            <div aria-hidden="true" style={{ position: "absolute", top: "20%", left: "78%", pointerEvents: "none" }}>
              <span className="sleep-z sleep-z-1">Z</span>
              <span className="sleep-z sleep-z-2">Z</span>
              <span className="sleep-z sleep-z-3">Z</span>
            </div>
          </div>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

            .sleep-z {
              display: block;
              position: absolute;
              font-family: 'Permanent Marker', cursive;
              font-weight: 400;
              font-style: normal;
              color: #111111;
              line-height: 1;
              opacity: 0;
              animation: sleepZ 3.6s ease-in-out infinite;
              transform-origin: center center;
            }
            .sleep-z-1 { font-size: 0.85rem; bottom: 0;      left: 0;      animation-delay: 0s;   rotate: -8deg;  }
            .sleep-z-2 { font-size: 1.15rem; bottom: 1.1rem; left: 0.7rem; animation-delay: 1.2s; rotate: -8deg;  }
            .sleep-z-3 { font-size: 1.55rem; bottom: 2.6rem; left: 1.5rem; animation-delay: 2.4s; rotate: -8deg;  }

            @keyframes sleepZ {
              0%   { opacity: 0;   transform: translateY(0px)   scale(0.7); }
              15%  { opacity: 0.9; transform: translateY(-6px)  scale(1);   }
              70%  { opacity: 0.7; transform: translateY(-18px) scale(1);   }
              100% { opacity: 0;   transform: translateY(-30px) scale(0.9); }
            }

            @keyframes contactBreathe {
              0%   { transform: scaleX(1)       scaleY(1)       skewX(0deg)    skewY(0deg); }
              20%  { transform: scaleX(1.025)   scaleY(1.035)   skewX(0.50deg) skewY(0.25deg); }
              45%  { transform: scaleX(1.042)   scaleY(1.060)   skewX(0.75deg) skewY(0.35deg); }
              55%  { transform: scaleX(1.042)   scaleY(1.060)   skewX(0.75deg) skewY(0.35deg); }
              80%  { transform: scaleX(1.018)   scaleY(1.025)   skewX(0.30deg) skewY(0.15deg); }
              100% { transform: scaleX(1)       scaleY(1)       skewX(0deg)    skewY(0deg); }
            }
          `}</style>

        </div>

      </main>

      <Footer />
    </div>
  )
}
