import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/fine-art", label: "Fine Art" },
  { href: "/contact", label: "Contact" },
]

export default function Header() {
  const location = useLocation()
  const pathname = location.pathname
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className="relative flex items-center page-container"
        style={{ height: "72px" }}
      >
        <Link
          to="/"
          className="relative z-50 font-serif italic text-foreground"
          style={{
            fontSize: "var(--fs-h2)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            transition: "opacity var(--dur-base) var(--ease)",
          }}
          aria-label="SAL - Home"
        >
          SAL
        </Link>

        <nav
          className="hidden md:flex items-center"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(28, 25, 22, 0.82)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: "9999px",
            padding: "5px",
            gap: "2px",
            boxShadow: "0 2px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                to={item.href}
                className={isActive ? "bg-background text-foreground rounded-full font-medium transition-all" : "text-white/60 hover:text-white/90 hover:bg-white/8 rounded-full font-medium transition-all"}
                style={{
                  padding: "7px 18px",
                  fontSize: "var(--fs-sm)",
                  transition:
                    "color var(--dur-base) var(--ease), background var(--dur-base) var(--ease), box-shadow var(--dur-base) var(--ease)",
                  boxShadow: isActive ? "0 1px 6px rgba(0,0,0,0.12)" : "none",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <button
          className="relative z-50 flex md:hidden items-center justify-center w-10 h-10 text-foreground ml-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <div className="flex flex-col items-end" style={{ gap: "6px" }}>
            <span
              className="block bg-foreground rounded-full"
              style={{
                width: "24px",
                height: "2px",
                transition: "transform var(--dur-base) var(--ease)",
                transform: mobileOpen ? "rotate(45deg) translateY(4px)" : "none",
              }}
            />
            <span
              className="block bg-foreground rounded-full"
              style={{
                width: mobileOpen ? "24px" : "16px",
                height: "2px",
                transition:
                  "transform var(--dur-base) var(--ease), opacity var(--dur-base) var(--ease), width var(--dur-base) var(--ease)",
                transform: mobileOpen ? "rotate(-45deg) translateY(-4px)" : "none",
              }}
            />
          </div>
        </button>
      </div>

      <div
        className={mobileOpen ? "fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden pointer-events-auto" : "fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden pointer-events-none"}
        style={{
          background: "var(--background)",
          opacity: mobileOpen ? 1 : 0,
          transition: "opacity var(--dur-slow) var(--ease)",
        }}
      >
        <nav className="flex flex-col items-center" style={{ gap: "var(--sp-6)" }}>
          {navItems.map((item, i) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={isActive ? "font-serif italic text-foreground" : "font-serif italic text-foreground/40 hover:text-foreground/70"}
                style={{
                  fontSize: "var(--fs-h1)",
                  fontWeight: 600,
                  transition:
                    "color var(--dur-base) var(--ease), opacity var(--dur-base) var(--ease), transform var(--dur-base) var(--ease)",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
