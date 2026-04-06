import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WireframeSlideshow from '../../components/WireframeSlideshow'

/* ═══════════════════════════════════════════════════════════
   Card dimensions — viewBox coordinate space
═══════════════════════════════════════════════════════════ */
const CARD_W = 290
const CARD_H = 385

/* ═══════════════════════════════════════════════════════════
   Shared card shell — white paper + black header
═══════════════════════════════════════════════════════════ */
function CardShell({ title }) {
  const mx = CARD_W / 2
  return (
    <>
      <rect x={0} y={0} width={CARD_W} height={CARD_H} fill="#F8F7F3" rx={2} />
      <rect x={0} y={0} width={CARD_W} height={36} fill="#111111" rx={2} />
      <rect x={0} y={32} width={CARD_W} height={4} fill="#111111" />
      <text
        x={mx} y={22}
        textAnchor="middle" fill="white"
        fontSize="9" fontFamily="'Courier New', monospace"
        letterSpacing="2.5" fontWeight="700"
      >{title}</text>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   Card — Empathy Map  (Says / Think / Feel / Does)
   Content sourced from Sal's actual empathy map research
═══════════════════════════════════════════════════════════ */
function EmpathyMapCard() {
  const cx = CARD_W / 2          // 145 — vertical divider
  const cy = 36 + (CARD_H - 36) / 2  // ≈ 210 — horizontal divider

  // ── quadrant labels ──
  const labelStyle = { fontSize: "8.5", fontFamily: "system-ui", fontWeight: "700", letterSpacing: "1" }

  // ── bullet text helper ──
  function Bullets({ lines, x, startY, color }) {
    return (
      <>
        {lines.map((t, i) => (
          <text key={i} x={x} y={startY + i * 13} fill={color} fontSize="7" fontFamily="system-ui" fontWeight="400">
            · {t}
          </text>
        ))}
      </>
    )
  }

  return (
    <g>
      <CardShell title="EMPATHY MAP" />

      {/* ── quadrant fills ── */}
      <rect x={0}  y={36}  width={cx}       height={cy - 36}   fill="#EDE8FA" />  {/* TL — Says   */}
      <rect x={cx} y={36}  width={CARD_W-cx} height={cy - 36}   fill="#E8EEFF" />  {/* TR — Think  */}
      <rect x={0}  y={cy}  width={cx}       height={CARD_H-cy} fill="#E0F5EF" />  {/* BL — Feel   */}
      <rect x={cx} y={cy}  width={CARD_W-cx} height={CARD_H-cy} fill="#FFF0F4" />  {/* BR — Does   */}

      {/* ── divider cross ── */}
      <line x1={cx} y1={36}  x2={cx}      y2={CARD_H} stroke="white" strokeWidth="2.5" />
      <line x1={0}  y1={cy}  x2={CARD_W}  y2={cy}     stroke="white" strokeWidth="2.5" />

      {/* ── axis labels (centered on each edge of the cross) ── */}
      {/* Says — top of vertical axis */}
      <rect x={cx - 22} y={38} width={44} height={14} fill="#C4B5F5" rx={3} />
      <text x={cx} y={48} textAnchor="middle" fill="#4A35A0" {...labelStyle}>SAYS</text>
      {/* Does — bottom */}
      <rect x={cx - 22} y={CARD_H - 18} width={44} height={14} fill="#F5B5C8" rx={3} />
      <text x={cx} y={CARD_H - 8} textAnchor="middle" fill="#A03055" {...labelStyle}>DOES</text>
      {/* Feel — left (rotated) */}
      <rect x={2} y={cy - 22} width={14} height={44} fill="#A0DFD0" rx={3} />
      <text x={9} y={cy + 4} textAnchor="middle" fill="#1A6A58" transform={`rotate(-90,9,${cy})`} {...labelStyle}>FEEL</text>
      {/* Think — right (rotated) */}
      <rect x={CARD_W - 16} y={cy - 22} width={14} height={44} fill="#B5C8F5" rx={3} />
      <text x={CARD_W - 9} y={cy + 4} textAnchor="middle" fill="#2040A0" transform={`rotate(90,${CARD_W - 9},${cy})`} {...labelStyle}>THINK</text>

      {/* ── TL: Says ── */}
      <Bullets
        x={10} startY={68} color="#5540A0"
        lines={["love supporting indie artists", "want something original", "want to know more", "about the artist", "want oil paintings"]}
      />

      {/* ── TR: Think ── */}
      <Bullets
        x={cx + 8} startY={68} color="#2040A0"
        lines={["is this trustworthy?", "will art look same", "when i hang it?", "too expensive?", "sure about quality?"]}
      />

      {/* ── BL: Feel ── */}
      <Bullets
        x={10} startY={cy + 18} color="#1A6A58"
        lines={["curious & excited", "inspired by artist talent", "fascinated by stories", "behind art pieces", "cautious about info"]}
      />

      {/* ── BR: Does ── */}
      <Bullets
        x={cx + 8} startY={cy + 18} color="#A03055"
        lines={["scrolls exhibitions", "clicks to zoom images", "reads about artist", "before buying", "saves favorites"]}
      />
    </g>
  )
}

/* ═══════════════════════════════════════════════════════════
   Card — Customer Journey Map
   5 stages × 3 columns (Stage / Actions / Opportunity)
   Content sourced from Sal's actual journey map research
═══════════════════════════════════════════════════════════ */
function JourneyMapCard() {
  const hdr    = 36
  const thH    = 26           // table header row height
  const rH     = 64           // content row height  (5 × 64 + 26 + 36 = 382 ≤ 385 ✓)
  const c0     = 0            // stage col x-start
  const c1     = 58           // actions col x-start
  const c2     = 174          // opportunity col x-start
  const c0w    = 58, c1w = 116, c2w = 116

  const stageColors = ["#D6EAFF", "#D6F5EA", "#FFE8D6", "#FFD6D6", "#EDD6FF"]

  const rows = [
    {
      stage: ["Discover"],
      actions:  ["Sees Instagram ad", "Clicks link to gallery", "Scrolls landing visuals"],
      opp:      ["Eye-catching CTA", "Easy to scan layout", "Clear navigation"],
    },
    {
      stage: ["Explore"],
      actions:  ["Views exhibitions", "Clicks into category", "Uses search/filters"],
      opp:      ["Style/color filters", "Featured art sections", "Sort by newest"],
    },
    {
      stage: ["Connect"],
      actions:  ["Reads artist bio", "Zooms into artworks", "Views upcoming shows"],
      opp:      ["High-res zoom", "Artist video/stories", "Follow artist button"],
    },
    {
      stage: ["Purchase"],
      actions:  ["Adds to cart", "Fills payment info", "Completes transaction"],
      opp:      ["Trust/security badges", "Multiple payments", "Shipping preview"],
    },
    {
      stage: ["Follow-up", "/ Engage"],
      actions:  ["Sends contact form", "Subscribes to emails", "Shares with friends"],
      opp:      ["Artist update emails", "Favorites / wishlist", "Social sharing"],
    },
  ]

  return (
    <g>
      <CardShell title="JOURNEY MAP" />

      {/* ── table column headers ── */}
      <rect x={c0} y={hdr} width={c0w} height={thH} fill="#E0E0DC" />
      <rect x={c1} y={hdr} width={c1w} height={thH} fill="#E0E0DC" />
      <rect x={c2} y={hdr} width={c2w} height={thH} fill="#E0E0DC" />
      <text x={c0 + c0w/2} y={hdr+17} textAnchor="middle" fill="#444" fontSize="8" fontFamily="system-ui" fontWeight="700">Stage</text>
      <text x={c1 + c1w/2} y={hdr+17} textAnchor="middle" fill="#444" fontSize="8" fontFamily="system-ui" fontWeight="700">Actions</text>
      <text x={c2 + c2w/2} y={hdr+17} textAnchor="middle" fill="#444" fontSize="8" fontFamily="system-ui" fontWeight="700">Opportunity</text>

      {/* ── content rows ── */}
      {rows.map((row, i) => {
        const ry = hdr + thH + i * rH
        const sc = stageColors[i]
        return (
          <g key={i}>
            {/* backgrounds */}
            <rect x={c0} y={ry} width={c0w} height={rH} fill={sc} />
            <rect x={c1} y={ry} width={c1w} height={rH} fill="white" />
            <rect x={c2} y={ry} width={c2w} height={rH} fill={sc} opacity="0.45" />
            {/* row divider */}
            <line x1={0} y1={ry+rH} x2={CARD_W} y2={ry+rH} stroke="white" strokeWidth="1.5" />
            {/* col dividers */}
            <line x1={c1} y1={ry} x2={c1} y2={ry+rH} stroke="white" strokeWidth="1.5" />
            <line x1={c2} y1={ry} x2={c2} y2={ry+rH} stroke="white" strokeWidth="1.5" />
            {/* stage name */}
            {row.stage.map((line, li) => (
              <text key={li} x={c0+c0w/2} y={ry + rH/2 - (row.stage.length-1)*6 + li*13}
                textAnchor="middle" fill="#222" fontSize="8.5" fontFamily="system-ui" fontWeight="700">{line}</text>
            ))}
            {/* actions bullets */}
            {row.actions.map((a, ai) => (
              <text key={ai} x={c1+6} y={ry+14+ai*16} fill="#333" fontSize="7" fontFamily="system-ui">· {a}</text>
            ))}
            {/* opportunity bullets */}
            {row.opp.map((o, oi) => (
              <text key={oi} x={c2+6} y={ry+14+oi*16} fill="#333" fontSize="7" fontFamily="system-ui">· {o}</text>
            ))}
          </g>
        )
      })}
    </g>
  )
}

/* ═══════════════════════════════════════════════════════════
   Card — User Flow  (matches Sal's actual detailed diagram)
   Home → Gallery → Category → Product → Favourites/Cart →
   Payment → Confirmation → Home
═══════════════════════════════════════════════════════════ */
function UserFlowCard({ mid }) {
  const cx = CARD_W / 2   // 145

  // ── node y-positions (top of each shape) ──
  const yHome1  = 46   // start oval
  const yGal    = 76   // Gallery rect
  const yCatD   = 100  // Category? diamond (h=22 → center=111, bottom=122)
  const yCats   = 132  // 4 category boxes (h=14)
  const yProd   = 164  // Product Info rect
  const yFavD   = 188  // Favourites? diamond (center=199, bottom=210)
  const yCartD  = 218  // Add to Cart? diamond (center=229, bottom=240)
  const yPay    = 250  // Payment rect
  const yConf   = 276  // Confirmation oval
  const yHome2  = 306  // end oval

  const rH = 16   // rect/oval height
  const dH = 22   // diamond height
  const dW = 42   // diamond half-width

  // ── diamond path helper ──
  const dia = (y) =>
    `M${cx},${y} L${cx+dW},${y+dH/2} L${cx},${y+dH} L${cx-dW},${y+dH/2} Z`

  // ── 4 category boxes ──
  const catW = 58, catH = 14
  const cats = [
    { label: "Mixed Media", x: 4   },
    { label: "Oil Painting", x: 68  },
    { label: "Acrylic",      x: 156 },
    { label: "Drawing",      x: 220 },
  ]
  const catCenters = cats.map(c => c.x + catW / 2)

  return (
    <g>
      <CardShell title="USER FLOW" />

      {/* ── Start: Home ── */}
      <rect x={cx-46} y={yHome1} width={92} height={rH} fill="#FBD541" stroke="#333" strokeWidth="1.5" rx={8} />
      <text x={cx} y={yHome1+11} textAnchor="middle" fill="#111" fontSize="9" fontFamily="system-ui" fontWeight="700">User Lands on Home</text>

      <line x1={cx} y1={yHome1+rH} x2={cx} y2={yGal} stroke="#888" strokeWidth="1.4" markerEnd={`url(#${mid})`} />

      {/* ── Gallery ── */}
      <rect x={cx-52} y={yGal} width={104} height={rH} fill="white" stroke="#555" strokeWidth="1.4" rx={3} />
      <text x={cx} y={yGal+11} textAnchor="middle" fill="#222" fontSize="9" fontFamily="system-ui">Clicks "Gallery"</text>

      <line x1={cx} y1={yGal+rH} x2={cx} y2={yCatD} stroke="#888" strokeWidth="1.4" markerEnd={`url(#${mid})`} />

      {/* ── Category? diamond ── */}
      <path d={dia(yCatD)} fill="white" stroke="#555" strokeWidth="1.4" />
      <text x={cx} y={yCatD+dH/2+3} textAnchor="middle" fill="#222" fontSize="7.5" fontFamily="system-ui">Choose category?</text>
      {/* No → Redirect */}
      <line x1={cx+dW} y1={yCatD+dH/2} x2={cx+dW+8} y2={yCatD+dH/2} stroke="#AAA" strokeWidth="1.2" markerEnd={`url(#${mid})`} />
      <rect x={cx+dW+8} y={yCatD+dH/2-8} width={52} height={14} fill="#F5F5F0" stroke="#CCC" strokeWidth="1" rx={2} />
      <text x={cx+dW+34} y={yCatD+dH/2+4} textAnchor="middle" fill="#AAA" fontSize="7" fontFamily="system-ui">→ Home</text>
      <text x={cx+dW+4} y={yCatD+dH/2-2} fill="#AAA" fontSize="6.5" fontFamily="system-ui">No</text>

      {/* ── 4 category branches ── */}
      {/* stem from diamond bottom */}
      <line x1={cx} y1={yCatD+dH} x2={cx} y2={yCats-4} stroke="#888" strokeWidth="1.4" />
      {/* horizontal spread */}
      <line x1={catCenters[0]} y1={yCats-4} x2={catCenters[3]} y2={yCats-4} stroke="#888" strokeWidth="1.2" />
      {cats.map((c, i) => (
        <g key={i}>
          <line x1={catCenters[i]} y1={yCats-4} x2={catCenters[i]} y2={yCats} stroke="#888" strokeWidth="1.2" />
          <rect x={c.x} y={yCats} width={catW} height={catH} fill="#F0F0EC" stroke="#AAA" strokeWidth="1" rx={2} />
          <text x={catCenters[i]} y={yCats+9} textAnchor="middle" fill="#555" fontSize="6.5" fontFamily="system-ui">{c.label}</text>
        </g>
      ))}
      {/* converge back to center below categories */}
      <line x1={catCenters[0]} y1={yCats+catH} x2={catCenters[3]} y2={yCats+catH} stroke="#888" strokeWidth="1.2" />
      <line x1={cx} y1={yCats+catH} x2={cx} y2={yProd} stroke="#888" strokeWidth="1.4" markerEnd={`url(#${mid})`} />

      {/* ── Product Info Page ── */}
      <rect x={cx-62} y={yProd} width={124} height={rH} fill="white" stroke="#555" strokeWidth="1.4" rx={3} />
      <text x={cx} y={yProd+11} textAnchor="middle" fill="#222" fontSize="9" fontFamily="system-ui">Product Info Page</text>

      <line x1={cx} y1={yProd+rH} x2={cx} y2={yFavD} stroke="#888" strokeWidth="1.4" markerEnd={`url(#${mid})`} />

      {/* ── Favourites? diamond ── */}
      <path d={dia(yFavD)} fill="white" stroke="#555" strokeWidth="1.4" />
      <text x={cx} y={yFavD+dH/2+3} textAnchor="middle" fill="#222" fontSize="7.5" fontFamily="system-ui">Add to favourites?</text>
      {/* Yes → Saved */}
      <line x1={cx+dW} y1={yFavD+dH/2} x2={cx+dW+8} y2={yFavD+dH/2} stroke="#AAA" strokeWidth="1.2" markerEnd={`url(#${mid})`} />
      <rect x={cx+dW+8} y={yFavD+dH/2-8} width={46} height={14} fill="#FFFCE0" stroke="#DDD" strokeWidth="1" rx={2} />
      <text x={cx+dW+31} y={yFavD+dH/2+4} textAnchor="middle" fill="#888" fontSize="7" fontFamily="system-ui">★ Saved</text>
      <text x={cx+dW+4} y={yFavD+dH/2-2} fill="#AAA" fontSize="6.5" fontFamily="system-ui">Yes</text>
      {/* No — straight down */}
      <line x1={cx} y1={yFavD+dH} x2={cx} y2={yCartD} stroke="#888" strokeWidth="1.4" markerEnd={`url(#${mid})`} />
      <text x={cx+3} y={yFavD+dH+8} fill="#AAA" fontSize="6.5" fontFamily="system-ui">No</text>

      {/* ── Add to Cart? diamond ── */}
      <path d={dia(yCartD)} fill="white" stroke="#555" strokeWidth="1.4" />
      <text x={cx} y={yCartD+dH/2+3} textAnchor="middle" fill="#222" fontSize="7.5" fontFamily="system-ui">Add to cart?</text>
      {/* No → Redirect */}
      <line x1={cx+dW} y1={yCartD+dH/2} x2={cx+dW+8} y2={yCartD+dH/2} stroke="#AAA" strokeWidth="1.2" markerEnd={`url(#${mid})`} />
      <rect x={cx+dW+8} y={yCartD+dH/2-8} width={52} height={14} fill="#F5F5F0" stroke="#CCC" strokeWidth="1" rx={2} />
      <text x={cx+dW+34} y={yCartD+dH/2+4} textAnchor="middle" fill="#AAA" fontSize="7" fontFamily="system-ui">→ Home</text>
      <text x={cx+dW+4} y={yCartD+dH/2-2} fill="#AAA" fontSize="6.5" fontFamily="system-ui">No</text>

      <line x1={cx} y1={yCartD+dH} x2={cx} y2={yPay} stroke="#888" strokeWidth="1.4" markerEnd={`url(#${mid})`} />

      {/* ── Payment ── */}
      <rect x={cx-58} y={yPay} width={116} height={rH} fill="white" stroke="#555" strokeWidth="1.4" rx={3} />
      <text x={cx} y={yPay+11} textAnchor="middle" fill="#222" fontSize="9" fontFamily="system-ui">Payment (Card/PayPal)</text>

      <line x1={cx} y1={yPay+rH} x2={cx} y2={yConf} stroke="#888" strokeWidth="1.4" markerEnd={`url(#${mid})`} />

      {/* ── Confirmation ── */}
      <rect x={cx-54} y={yConf} width={108} height={rH} fill="white" stroke="#555" strokeWidth="1.4" rx={3} />
      <text x={cx} y={yConf+11} textAnchor="middle" fill="#222" fontSize="9" fontFamily="system-ui">Order Confirmed</text>

      <line x1={cx} y1={yConf+rH} x2={cx} y2={yHome2} stroke="#888" strokeWidth="1.4" markerEnd={`url(#${mid})`} />

      {/* ── End: Home ── */}
      <rect x={cx-46} y={yHome2} width={92} height={rH} fill="#FBD541" stroke="#333" strokeWidth="1.5" rx={8} />
      <text x={cx} y={yHome2+11} textAnchor="middle" fill="#111" fontSize="9" fontFamily="system-ui" fontWeight="700">Returns to Home</text>
    </g>
  )
}

/* ═══════════════════════════════════════════════════════════
   Wireframe card — Sitemap
═══════════════════════════════════════════════════════════ */
function SitemapCard() {
  const mx  = CARD_W / 2
  const nW  = 76, nH = 20, nr = 3
  const homeY = 60, trunkY = 122, l2Y = 152, l3Y = 232

  const l2 = [
    { label: "Gallery", cx: 58 },
    { label: "About",   cx: mx },
    { label: "Contact", cx: CARD_W - 58 },
  ]
  const l3 = [
    { label: "Art Detail", cx: 42 },
    { label: "Search",     cx: 128 },
  ]

  return (
    <g>
      <CardShell title="SITEMAP" />
      <rect x={mx - nW / 2} y={homeY} width={nW} height={nH} fill="#FBD541" stroke="#333" strokeWidth="1.5" rx={nr} />
      <text x={mx} y={homeY + 13} textAnchor="middle" fill="#111" fontSize="9.5" fontFamily="system-ui" fontWeight="700">Home</text>
      <line x1={mx} y1={homeY + nH} x2={mx} y2={trunkY} stroke="#888" strokeWidth="1.5" />
      <line x1={58} y1={trunkY} x2={CARD_W - 58} y2={trunkY} stroke="#888" strokeWidth="1.5" />
      {l2.map((n, i) => (
        <g key={i}>
          <line x1={n.cx} y1={trunkY} x2={n.cx} y2={l2Y} stroke="#888" strokeWidth="1.5" />
          <rect x={n.cx - nW / 2} y={l2Y} width={nW} height={nH} fill="white" stroke="#555" strokeWidth="1.5" rx={nr} />
          <text x={n.cx} y={l2Y + 13} textAnchor="middle" fill="#333" fontSize="8.5" fontFamily="system-ui">{n.label}</text>
        </g>
      ))}
      <line x1={58} y1={l2Y + nH} x2={58} y2={215} stroke="#BBB" strokeWidth="1" />
      <line x1={42} y1={215} x2={165} y2={215} stroke="#BBB" strokeWidth="1" />
      {l3.map((n, i) => (
        <g key={i}>
          <line x1={n.cx} y1={215} x2={n.cx} y2={l3Y} stroke="#BBB" strokeWidth="1" />
          <rect x={n.cx - nW / 2} y={l3Y} width={nW} height={nH} fill="#F0F0EC" stroke="#AAA" strokeWidth="1" rx={nr} />
          <text x={n.cx} y={l3Y + 13} textAnchor="middle" fill="#888" fontSize="8" fontFamily="system-ui">{n.label}</text>
        </g>
      ))}
      <rect x={16} y={CARD_H - 42} width={10} height={10} fill="#FBD541" stroke="#333" strokeWidth="1" rx={1} />
      <text x={30} y={CARD_H - 34} fill="#888" fontSize="7.5" fontFamily="system-ui">primary</text>
      <rect x={80} y={CARD_H - 42} width={10} height={10} fill="white" stroke="#555" strokeWidth="1" rx={1} />
      <text x={94} y={CARD_H - 34} fill="#888" fontSize="7.5" fontFamily="system-ui">secondary</text>
      <rect x={160} y={CARD_H - 42} width={10} height={10} fill="#F0F0EC" stroke="#AAA" strokeWidth="1" rx={1} />
      <text x={174} y={CARD_H - 34} fill="#888" fontSize="7.5" fontFamily="system-ui">tertiary</text>
    </g>
  )
}

/* ═══════════════════════════════════════════════════════════
   Wireframe card — Homepage
═══════════════════════════════════════════════════════════ */
function HomepageWF() {
  const mx = CARD_W / 2, pad = 16
  return (
    <g>
      <CardShell title="HOMEPAGE" />
      <rect x={pad} y={44} width={CARD_W - pad * 2} height={18} fill="none" stroke="#CCC" strokeWidth="1" rx={2} />
      <rect x={pad + 4} y={48} width={28} height={10} fill="#DDD" rx={2} />
      <rect x={CARD_W - pad - 22} y={48} width={20} height={10} fill="#EEE" rx={2} />
      <rect x={CARD_W - pad - 48} y={48} width={20} height={10} fill="#EEE" rx={2} />
      <rect x={CARD_W - pad - 74} y={48} width={20} height={10} fill="#EEE" rx={2} />
      <rect x={pad} y={70} width={CARD_W - pad * 2} height={95} fill="#E8E8E4" stroke="#CCC" strokeWidth="1" rx={2} />
      <line x1={pad} y1={70} x2={CARD_W - pad} y2={165} stroke="#D8D8D4" strokeWidth="1" />
      <line x1={CARD_W - pad} y1={70} x2={pad} y2={165} stroke="#D8D8D4" strokeWidth="1" />
      <rect x={pad} y={175} width={150} height={11} fill="#666" rx={2} />
      <rect x={pad} y={192} width={110} height={9} fill="#999" rx={2} />
      <rect x={pad} y={212} width={CARD_W - pad * 2} height={6} fill="#DDD" rx={2} />
      <rect x={pad} y={223} width={CARD_W - pad * 2 - 20} height={6} fill="#DDD" rx={2} />
      <rect x={pad} y={234} width={CARD_W - pad * 2 - 40} height={6} fill="#DDD" rx={2} />
      <line x1={pad} y1={256} x2={CARD_W - pad} y2={256} stroke="#DDD" strokeWidth="1" strokeDasharray="4,3" />
      <text x={mx} y={272} textAnchor="middle" fill="#CCC" fontSize="8" fontFamily="system-ui">— artwork row —</text>
      <rect x={mx - 36} y={290} width={72} height={20} fill="#111" rx={10} />
      <text x={mx} y={303} textAnchor="middle" fill="white" fontSize="8.5" fontFamily="system-ui">View All</text>
      <line x1={pad} y1={CARD_H - 24} x2={CARD_W - pad} y2={CARD_H - 24} stroke="#EEE" strokeWidth="1" />
    </g>
  )
}

/* ═══════════════════════════════════════════════════════════
   Wireframe card — Gallery
═══════════════════════════════════════════════════════════ */
function GalleryWF() {
  const pad = 16, thumbW = 122, thumbH = 76, gapX = 10, gridY = 96
  return (
    <g>
      <CardShell title="GALLERY PAGE" />
      <rect x={pad} y={44} width={CARD_W - pad * 2} height={16} fill="none" stroke="#CCC" strokeWidth="1" rx={2} />
      <rect x={pad + 4} y={48} width={26} height={8} fill="#DDD" rx={2} />
      <rect x={pad} y={68} width={30} height={14} fill="#111" rx={7} />
      <text x={pad + 15} y={78} textAnchor="middle" fill="white" fontSize="7.5" fontFamily="system-ui">All</text>
      <rect x={pad + 36} y={68} width={48} height={14} fill="none" stroke="#CCC" rx={7} />
      <text x={pad + 60} y={78} textAnchor="middle" fill="#AAA" fontSize="7.5" fontFamily="system-ui">Painting</text>
      <rect x={pad + 90} y={68} width={32} height={14} fill="none" stroke="#CCC" rx={7} />
      <text x={pad + 106} y={78} textAnchor="middle" fill="#AAA" fontSize="7.5" fontFamily="system-ui">Ink</text>
      {[0, 1, 2].map(row =>
        [0, 1].map(col => {
          const tx = pad + col * (thumbW + gapX)
          const ty = gridY + row * (thumbH + 10)
          return (
            <g key={`${row}-${col}`}>
              <rect x={tx} y={ty} width={thumbW} height={thumbH} fill="#E8E8E4" stroke="#D8D8D4" strokeWidth="1" rx={2} />
              <line x1={tx} y1={ty} x2={tx + thumbW} y2={ty + thumbH} stroke="#D4D4D0" strokeWidth="0.8" />
              <line x1={tx + thumbW} y1={ty} x2={tx} y2={ty + thumbH} stroke="#D4D4D0" strokeWidth="0.8" />
              <rect x={tx + 4} y={ty + thumbH - 14} width={thumbW - 8} height={6} fill="#CCC" rx={2} />
            </g>
          )
        })
      )}
    </g>
  )
}

/* ═══════════════════════════════════════════════════════════
   Wireframe card — Artwork Detail
═══════════════════════════════════════════════════════════ */
function ArtDetailWF() {
  const mx = CARD_W / 2, pad = 16
  return (
    <g>
      <CardShell title="ARTWORK DETAIL" />
      <rect x={pad} y={44} width={CARD_W - pad * 2} height={16} fill="none" stroke="#CCC" strokeWidth="1" rx={2} />
      <rect x={pad + 4} y={48} width={24} height={8} fill="#DDD" rx={2} />
      <text x={pad} y={76} fill="#AAA" fontSize="8.5" fontFamily="system-ui">← Back</text>
      <rect x={pad} y={84} width={CARD_W - pad * 2} height={130} fill="#E0E0DC" stroke="#CCC" strokeWidth="1" rx={2} />
      <line x1={pad} y1={84} x2={CARD_W - pad} y2={214} stroke="#D4D4D0" strokeWidth="1" />
      <line x1={CARD_W - pad} y1={84} x2={pad} y2={214} stroke="#D4D4D0" strokeWidth="1" />
      <rect x={pad} y={224} width={140} height={11} fill="#555" rx={2} />
      <rect x={pad} y={240} width={95} height={9} fill="#999" rx={2} />
      <rect x={pad} y={260} width={CARD_W - pad * 2} height={6} fill="#DDD" rx={2} />
      <rect x={pad} y={272} width={CARD_W - pad * 2 - 15} height={6} fill="#DDD" rx={2} />
      <rect x={pad} y={284} width={CARD_W - pad * 2 - 35} height={6} fill="#DDD" rx={2} />
      <text x={pad} y={CARD_H - 18} fill="#AAA" fontSize="12" fontFamily="system-ui">←</text>
      <text x={CARD_W - pad} y={CARD_H - 18} textAnchor="end" fill="#AAA" fontSize="12" fontFamily="system-ui">→</text>
    </g>
  )
}

/* ═══════════════════════════════════════════════════════════
   Wireframe card — Early Sketches
═══════════════════════════════════════════════════════════ */
function SketchesCard() {
  return (
    <g>
      <CardShell title="EARLY SKETCHES" />
      <rect x={14} y={50} width={118} height={88} fill="white" stroke="#CCC" strokeWidth="1" rx={2} strokeDasharray="3,2" />
      <rect x={19} y={55} width={108} height={12} fill="#DDD" rx={1} />
      <rect x={19} y={72} width={108} height={52} fill="#EEE" rx={1} />
      <line x1={19} y1={72} x2={127} y2={124} stroke="#DDD" strokeWidth="0.8" />
      <line x1={127} y1={72} x2={19} y2={124} stroke="#DDD" strokeWidth="0.8" />
      <text x={73} y={152} textAnchor="middle" fill="#AAA" fontSize="7.5" fontFamily="system-ui">home v1</text>
      <rect x={158} y={50} width={118} height={88} fill="white" stroke="#CCC" strokeWidth="1" rx={2} strokeDasharray="3,2" />
      <rect x={163} y={55} width={108} height={10} fill="#DDD" rx={1} />
      {[0, 1].map(col => [0, 1, 2].map(row => (
        <rect key={`${col}${row}`} x={164 + col * 52} y={71 + row * 21} width={48} height={17} fill="#EEE" rx={1} stroke="#D8D8D4" strokeWidth="0.5" />
      )))}
      <text x={217} y={152} textAnchor="middle" fill="#AAA" fontSize="7.5" fontFamily="system-ui">gallery v1</text>
      <rect x={14} y={164} width={118} height={88} fill="white" stroke="#CCC" strokeWidth="1" rx={2} strokeDasharray="3,2" />
      <rect x={19} y={169} width={108} height={12} fill="#DDD" rx={1} />
      <rect x={19} y={186} width={108} height={52} fill="#EEE" rx={1} />
      <line x1={19} y1={186} x2={127} y2={238} stroke="#DDD" strokeWidth="0.8" />
      <line x1={127} y1={186} x2={19} y2={238} stroke="#DDD" strokeWidth="0.8" />
      <text x={73} y={266} textAnchor="middle" fill="#AAA" fontSize="7.5" fontFamily="system-ui">detail v1</text>
      <line x1={132} y1={164} x2={152} y2={148} stroke="#FBD541" strokeWidth="1.5" />
      <rect x={152} y={134} width={118} height={18} fill="#FFFCE0" stroke="#FBD541" strokeWidth="1" rx={3} />
      <text x={158} y={145} fill="#8A7000" fontSize="7.5" fontFamily="system-ui">focus on the image</text>
      <line x1={132} y1={208} x2={152} y2={196} stroke="#FBD541" strokeWidth="1.5" />
      <rect x={152} y={182} width={118} height={18} fill="#FFFCE0" stroke="#FBD541" strokeWidth="1" rx={3} />
      <text x={158} y={193} fill="#8A7000" fontSize="7.5" fontFamily="system-ui">simple nav — max 3</text>
      <line x1={14} y1={300} x2={CARD_W - 14} y2={300} stroke="#E8E8E4" strokeWidth="1" />
      <rect x={14} y={310} width={180} height={7} fill="#E8E8E4" rx={2} />
      <rect x={14} y={323} width={140} height={7} fill="#FBD541" rx={2} opacity="0.55" />
      <rect x={14} y={336} width={100} height={7} fill="#E8E8E4" rx={2} />
    </g>
  )
}

/* ═══════════════════════════════════════════════════════════
   Wireframe card — Design Decisions
═══════════════════════════════════════════════════════════ */
function DecisionsCard() {
  const lines = [
    { y: 50,  w: 215, bold: false, hl: false },
    { y: 65,  w: 180, bold: false, hl: true  },
    { y: 80,  w: 235, bold: false, hl: false },
    { y: 95,  w: 160, bold: false, hl: false },
    { y: 110, w: 220, bold: true,  hl: false },
    { y: 126, w: 200, bold: false, hl: false },
    { y: 141, w: 175, bold: false, hl: true  },
    { y: 156, w: 210, bold: false, hl: false },
    { y: 171, w: 155, bold: false, hl: false },
    { y: 186, w: 230, bold: true,  hl: false },
    { y: 202, w: 195, bold: false, hl: false },
    { y: 217, w: 170, bold: false, hl: true  },
    { y: 232, w: 220, bold: false, hl: false },
    { y: 247, w: 140, bold: false, hl: false },
    { y: 262, w: 195, bold: false, hl: false },
    { y: 277, w: 165, bold: false, hl: false },
  ]
  return (
    <g>
      <CardShell title="DESIGN DECISIONS" />
      <line x1={16} y1={44} x2={16} y2={CARD_H - 28} stroke="#F5E88A" strokeWidth="1" opacity="0.7" />
      {lines.map((l, i) => (
        <g key={i}>
          {l.hl && <rect x={20} y={l.y - 7} width={l.w + 8} height={14} fill="#FBD541" opacity="0.3" rx={2} />}
          <rect x={20} y={l.y} width={l.w} height={l.bold ? 9 : 6} fill={l.bold ? "#555" : "#D8D8D4"} rx={2} />
        </g>
      ))}
      <text x={CARD_W - 14} y={lines[1].y + 4} textAnchor="end" fill="#8A7000" fontSize="7.5" fontFamily="system-ui">key choice</text>
      <text x={CARD_W - 14} y={lines[6].y + 4} textAnchor="end" fill="#8A7000" fontSize="7.5" fontFamily="system-ui">kept</text>
      <text x={CARD_W - 14} y={lines[11].y + 4} textAnchor="end" fill="#8A7000" fontSize="7.5" fontFamily="system-ui">refined</text>
      <rect x={14} y={CARD_H - 40} width={CARD_W - 28} height={22} fill="#FFFCE0" stroke="#DDD" strokeWidth="1" rx={3} />
      <text x={20} y={CARD_H - 26} fill="#888" fontSize="7.5" fontFamily="system-ui" fontStyle="italic">→ simplify navigation to 3 items max</text>
    </g>
  )
}

/* ═══════════════════════════════════════════════════════════
   Wireframe card — Iterations
═══════════════════════════════════════════════════════════ */
function IterationsCard() {
  const tW = 118, tH = 138, gap = 10, pad = 14
  const versions = [
    { col: 0, row: 0, label: "v1",    selected: false },
    { col: 1, row: 0, label: "v2",    selected: false },
    { col: 0, row: 1, label: "v3",    selected: false },
    { col: 1, row: 1, label: "v4  ✓", selected: true  },
  ]
  return (
    <g>
      <CardShell title="ITERATIONS" />
      {versions.map(({ col, row, label, selected }, i) => {
        const tx = pad + col * (tW + gap)
        const ty = 50  + row * (tH + gap)
        return (
          <g key={i}>
            <rect x={tx} y={ty} width={tW} height={tH} fill={selected ? "#FFFCE0" : "#F4F4F0"} stroke={selected ? "#FBD541" : "#D8D8D4"} strokeWidth={selected ? 2 : 1} rx={3} />
            <rect x={tx + 5} y={ty + 5}  width={tW - 10} height={13} fill={selected ? "#F5E04A" : "#DDD"} rx={1} />
            <rect x={tx + 5} y={ty + 23} width={tW - 10} height={60} fill="#E8E8E4" rx={1} />
            <line x1={tx + 5} y1={ty + 23} x2={tx + tW - 5} y2={ty + 83} stroke="#D8D8D4" strokeWidth="0.7" />
            <line x1={tx + tW - 5} y1={ty + 23} x2={tx + 5} y2={ty + 83} stroke="#D8D8D4" strokeWidth="0.7" />
            <rect x={tx + 5} y={ty + 88}  width={65}      height={8} fill="#CCC" rx={1} />
            <rect x={tx + 5} y={ty + 100} width={tW - 10} height={6} fill="#DDD" rx={1} />
            <rect x={tx + 5} y={ty + 111} width={tW - 20} height={6} fill="#DDD" rx={1} />
            <text x={tx + tW / 2} y={ty + tH - 9} textAnchor="middle" fill={selected ? "#8A7000" : "#AAA"} fontSize="8" fontFamily="system-ui" fontWeight={selected ? "700" : "400"}>{label}</text>
          </g>
        )
      })}
    </g>
  )
}

/* ═══════════════════════════════════════════════════════════
   Block wrapper — alternates left/right, holds space for
   future hand drawings (side) and support elements (bottom)
═══════════════════════════════════════════════════════════ */
function Block({
  align,
  label,
  markerId,
  description,
  children,
}) {
  const cardCol = (
    <div style={{
      width:    "52%",
      maxWidth: "480px",
      minWidth: "280px",
      flexShrink: 0,
      position: "relative",
      overflow: "visible",
      zIndex:   1,
    }}>
      {/* Minimal label above the card */}
      <p style={{
        fontSize:      "10px",
        fontWeight:    600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color:         "rgba(17,17,17,0.38)",
        marginBottom:  "12px",
        fontFamily:    "system-ui, sans-serif",
      }}>
        {label}
      </p>
      <div style={{ position: "relative", overflow: "visible", boxShadow: "4px 8px 28px rgba(0,0,0,0.11)" }}>
        <svg
          viewBox={`0 0 ${CARD_W} ${CARD_H}`}
          style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
        >
          {markerId && (
            <defs>
              <marker id={markerId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 z" fill="#999" />
              </marker>
            </defs>
          )}
          {children}
        </svg>
      </div>
    </div>
  )

  /* When no description, keep original simple layout */
  if (!description) {
    return (
      <div style={{
        display:        "flex",
        justifyContent: align === "left" ? "flex-start" : "flex-end",
        position:       "relative",
        overflow:       "visible",
        marginBottom:   "88px",
      }}>
        {cardCol}
      </div>
    )
  }

  /* With description — same 3-slot layout as PhotoBlock */
  const spacer  = <div style={{ flex: 1, minWidth: 0 }} />
  const textCol = (
    <div style={{ width: "340px", flexShrink: 0 }}>
      <p style={{
        fontSize:      "11px",
        fontWeight:    600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color:         "rgba(17,17,17,0.38)",
        marginBottom:  "16px",
        fontFamily:    "system-ui, sans-serif",
      }}>
        {label}
      </p>
      <p style={{
        color:      "rgba(17,17,17,0.6)",
        fontSize:   "var(--fs-sm)",
        lineHeight: 1.85,
        fontFamily: "system-ui, sans-serif",
      }}>
        {description}
      </p>
    </div>
  )

  return (
    <div style={{
      display:       "flex",
      flexDirection: "row",
      alignItems:    "stretch",
      gap:           "36px",
      position:      "relative",
      overflow:      "visible",
      marginBottom:  "88px",
    }}>
      {align === "left"  && <>{cardCol}{spacer}<div style={{display:"flex",alignItems:"flex-start",paddingTop:"28px",width:"340px",flexShrink:0}}>{textCol}</div></>}
      {align === "right" && <><div style={{display:"flex",alignItems:"flex-start",paddingTop:"28px",width:"340px",flexShrink:0}}>{textCol}</div>{spacer}{cardCol}</>}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Photo block — real image with black header bar + wiggly
   border. Description sits in the opposite column (the space
   currently left empty for future hand drawings).
═══════════════════════════════════════════════════════════ */
function PhotoBlock({
  align,
  label,
  title,
  src,
  alt,
  description,
}) {
  const imageCol = (
    <div style={{
      width:    "52%",
      maxWidth: "480px",
      minWidth: "280px",
      flexShrink: 0,
      position: "relative",
      overflow: "visible",
      zIndex:   1,
    }}>
      {/* Clickable card — black header + image + wiggly border */}
      <a
        href={import.meta.env.BASE_URL + src}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display:   "block",
          position:  "relative",
          overflow:  "visible",
          boxShadow: "4px 8px 28px rgba(0,0,0,0.11)",
          cursor:    "zoom-in",
          textDecoration: "none",
        }}
      >
        {/* ── Black header bar — same style as wireframe CardShell ── */}
        <div style={{
          background:  "#111111",
          padding:     "9px 16px 8px",
          lineHeight:  1,
        }}>
          <span style={{
            color:         "white",
            fontSize:      "9px",
            fontFamily:    "'Courier New', monospace",
            letterSpacing: "2.5px",
            fontWeight:    700,
            textTransform: "uppercase",
          }}>
            {label}
          </span>
        </div>

        {/* ── Image ── */}
        <img
          src={import.meta.env.BASE_URL + src}
          alt={alt}
          style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(1)" }}
        />

        {/* Subtle warm overlay */}
        <div style={{
          position:      "absolute",
          inset:         0,
          background:    "rgba(248, 247, 243, 0.18)",
          pointerEvents: "none",
        }} />

        {/* Hand-drawn wiggly black border — matches Fine Art page */}
        <svg
          style={{
            position:      "absolute",
            inset:         0,
            width:         "100%",
            height:        "100%",
            overflow:      "visible",
            pointerEvents: "none",
          }}
        >
          <defs>
            <filter id="cs-edge" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.016 0.022"
                numOctaves="2"
                seed="7"
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.016 0.022;0.020 0.018;0.013 0.026;0.018 0.020;0.016 0.022"
                  dur="9s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <rect
            x="0" y="0" width="100%" height="100%"
            fill="none"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeOpacity="0.82"
            filter="url(#cs-edge)"
          />
        </svg>

        {/* Click hint badge */}
        <div style={{
          position:      "absolute",
          bottom:        "10px",
          right:         "12px",
          background:    "rgba(17,17,17,0.52)",
          color:         "white",
          fontSize:      "8px",
          fontWeight:    600,
          letterSpacing: "0.14em",
          fontFamily:    "system-ui, sans-serif",
          padding:       "4px 9px",
          borderRadius:  "3px",
          pointerEvents: "none",
        }}>
          VIEW FULL ↗
        </div>
      </a>
    </div>
  )

  const textCol = (title || description) ? (
    <div style={{
      width:      "340px",
      flexShrink: 0,
    }}>
      {/* Eyebrow — matches "PHILOSOPHY" style */}
      <p style={{
        fontSize:      "11px",
        fontWeight:    600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color:         "rgba(17,17,17,0.38)",
        marginBottom:  "14px",
        fontFamily:    "system-ui, sans-serif",
      }}>
        {label}
      </p>

      {/* Big italic serif heading — matches "What drives my creative practice" */}
      {title && (
        <h3 style={{
          fontSize:    "clamp(18px, 2vw, 24px)",
          fontStyle:   "italic",
          fontWeight:  700,
          lineHeight:  1.25,
          color:       "#111111",
          marginBottom:"18px",
          fontFamily:  "Georgia, 'Times New Roman', serif",
        }}>
          {title}
        </h3>
      )}

      {/* Body paragraph */}
      {description && (
        <p style={{
          color:      "rgba(17,17,17,0.6)",
          fontSize:   "var(--fs-sm)",
          lineHeight: 1.8,
          fontFamily: "system-ui, sans-serif",
        }}>
          {description}
        </p>
      )}
    </div>
  ) : null

  /*
    Three-slot row:
      LEFT  image → [image][text][spacer]
      RIGHT image → [spacer][text][image]

    This keeps the image flush against its edge and the text
    sitting immediately beside it with a fixed gap — no flex
    stretching, no shifting based on content length.
  */
  const spacer = <div style={{ flex: 1, minWidth: 0 }} />

  return (
    <div style={{
      display:     "flex",
      flexDirection:"row",
      alignItems:  "stretch",
      gap:         "36px",
      position:    "relative",
      overflow:    "visible",
      marginBottom:"88px",
    }}>
      {align === "left"  && <>{imageCol}{spacer}<div style={{display:"flex",alignItems:"flex-start",paddingTop:"48px",width:"340px",flexShrink:0}}>{textCol}</div></>}
      {align === "right" && <><div style={{display:"flex",alignItems:"flex-start",paddingTop:"48px",width:"340px",flexShrink:0}}>{textCol}</div>{spacer}{imageCol}</>}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Section divider — eyebrow + description
═══════════════════════════════════════════════════════════ */
function SectionHeader({
  eyebrow,
  description,
  first = false,
}) {
  return (
    <div style={{
      borderTop:     first ? "none" : "1px solid rgba(17,17,17,0.1)",
      paddingTop:    first ? "var(--sp-12)" : "var(--sp-10)",
      paddingBottom: "var(--sp-6)",
    }}>
      <div className="cs-section-eyebrow">{eyebrow}</div>
      {description && (
        <p style={{
          color:      "rgba(17,17,17,0.5)",
          fontSize:   "var(--fs-sm)",
          maxWidth:   "440px",
          marginTop:  "var(--sp-2)",
          lineHeight: 1.7,
        }}>
          {description}
        </p>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Page
═══════════════════════════════════════════════════════════ */
export default function HeinzProjectPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">

        {/* ══ Hero ══════════════════════════════════════════ */}
        <section className="cs-hero-section">
          <div className="page-container">

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--sp-8)" }}>
              <Link
                to="/work"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  fontSize: "var(--fs-sm)", color: "rgba(17,17,17,0.4)",
                  fontWeight: 500, transition: "color 0.2s",
                }}
                className="hover:text-foreground"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                </svg>
                Back to Work
              </Link>
              <span style={{ fontSize: "var(--fs-xs)", fontWeight: 600, letterSpacing: "0.16em", color: "rgba(17,17,17,0.35)" }}>01 / 03</span>
            </div>

            <div className="cs-hero-tags">
              <span className="cs-hero-tag">UX Design</span>
              <span className="cs-hero-tag">Research</span>
              <span className="cs-hero-tag">Wireframing</span>
              <span className="cs-hero-tag">2024</span>
            </div>

            <h1 className="cs-hero-title">
              Art Gallery<br /><em>Experience</em>
            </h1>

            <div className="cs-hero-bottom">
              <p className="cs-hero-subtitle">
                Designing a clean, gallery-like digital experience for browsing and discovering original artwork —
                from first landing to intimate detail view.
              </p>
              <div className="cs-hero-meta">
                <div className="cs-meta-row">
                  <span className="cs-meta-label">Role</span>
                  <span className="cs-meta-value">UX Design &amp; Research</span>
                </div>
                <div className="cs-meta-row">
                  <span className="cs-meta-label">Tools</span>
                  <span className="cs-meta-value">Figma · Whimsical</span>
                </div>
                <div className="cs-meta-row">
                  <span className="cs-meta-label">Timeline</span>
                  <span className="cs-meta-value">4 Weeks</span>
                </div>
                <div className="cs-meta-row">
                  <span className="cs-meta-label">Type</span>
                  <span className="cs-meta-value">UX Case Study</span>
                </div>
                <div className="cs-meta-row" style={{ paddingTop: "var(--sp-3)", borderTop: "1px solid rgba(17,17,17,0.08)", marginTop: "var(--sp-2)" }}>
                  <span className="cs-meta-label">Figma</span>
                  <a
                    href="https://www.figma.com/design/JxV4pYfwVmXZDg2n30a73N/Artsy?t=7Myhxrod8iUNS9FX-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:        "inline-flex",
                      alignItems:     "center",
                      gap:            "7px",
                      fontSize:       "13px",
                      fontWeight:     700,
                      color:          "#111111",
                      textDecoration: "none",
                      background:     "#ffffff",
                      border:         "1.5px solid #111111",
                      borderRadius:   "100px",
                      padding:        "7px 16px",
                      boxShadow:      "3px 3px 0px #111111",
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M12 2H8.5a3.5 3.5 0 1 0 0 7H12V2z" fill="#F24E1E"/>
                      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" fill="#FF7262"/>
                      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="#1ABCFE"/>
                      <path d="M5 12.5a3.5 3.5 0 0 1 3.5-3.5H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" fill="#0ACF83"/>
                      <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z" fill="#A259FF"/>
                    </svg>
                    View project file ↗
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ══ Wireframe Slideshow ═══════════════════════════
            Replaces the static hero image — interactive carousel
            showing all wireframe screens.
        ══════════════════════════════════════════════════════ */}
        <div style={{ paddingBottom: "var(--sp-14)" }}>
          <WireframeSlideshow />
        </div>

        {/* ══ Case Study Body ════════════════════════════════
            overflow: visible on the container so hand drawings
            added later can extend freely outside any block.
        ══════════════════════════════════════════════════════ */}
        <div className="page-container" style={{ overflow: "visible" }}>

          {/* ── 01 Research & Insights ── */}
          <SectionHeader
            first
            eyebrow="01 — Research & Insights"
            description=""
          />

          {/* Empathy Map — LEFT, text on RIGHT */}
          <PhotoBlock
            align="left"
            label="Empathy Map"
            filterId="cs-edge-empathy"
            src="empathy%20map.png"
            alt="Empathy map — art buyer research"
            description="Through research and observation I mapped how a potential art buyer thinks and behaves. The four quadrants reveal that users are emotionally driven — they want to connect with the artist, not just buy a product. Trust and quality were recurring concerns that shaped every design decision that followed."
          />

          {/* Journey Map — RIGHT, text on LEFT */}
          <PhotoBlock
            align="right"
            label="Customer Journey Map"
            filterId="cs-edge-journey"
            src="journy%20map.png"
            alt="Customer journey map — five stage experience"
            description="I traced the full experience across five stages — Discover, Explore, Connect, Purchase, and Follow-up. Each stage surfaces distinct emotions and friction points. The map made it clear where the design needed to build trust, reduce hesitation, and give users a reason to come back."
          />

          {/* ── 02 User Flow ── */}
          <SectionHeader
            eyebrow="02 — User Flow"
            description=""
          />

          {/* User Flow — LEFT, text on RIGHT */}
          <PhotoBlock
            align="left"
            label="User Flow"
            filterId="cs-edge-flow"
            src="Flow%20chart.png"
            alt="User flow diagram"
            description="Mapping the complete journey from homepage to order confirmation. Key decision points — choosing a category, saving favourites, adding to cart — directly shaped the information architecture and navigation structure of the final design."
          />

          {/* ── 03 Wireframes ── */}
          {/* ── 04 Design Evolution ── */}
          <div style={{
            borderTop:     "1px solid rgba(17,17,17,0.1)",
            paddingTop:    "var(--sp-10)",
            paddingBottom: "var(--sp-10)",
          }}>
            <div className="cs-section-eyebrow">04 — Design Evolution</div>
          </div>

          {/* ── Part 1: Before & After — image LEFT, text RIGHT ── */}
          <div style={{
            display:       "flex",
            flexDirection: "row",
            alignItems:    "center",
            gap:           "clamp(32px, 5vw, 72px)",
            marginBottom:  "clamp(64px, 10vw, 112px)",
          }}>
            {/* image — left */}
            <div style={{ flex: "0 0 54%", maxWidth: "54%" }}>
              <a
                href={import.meta.env.BASE_URL + "before and after.png"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:        "block",
                  position:       "relative",
                  overflow:       "visible",
                  boxShadow:      "4px 8px 28px rgba(0,0,0,0.11)",
                  cursor:         "zoom-in",
                  textDecoration: "none",
                }}
              >
                {/* black header bar */}
                <div style={{ background: "#111111", padding: "9px 16px 8px", lineHeight: 1 }}>
                  <span style={{
                    color: "white", fontSize: "9px", fontFamily: "'Courier New', monospace",
                    letterSpacing: "2.5px", fontWeight: 700, textTransform: "uppercase",
                  }}>
                    Iterations
                  </span>
                </div>
                {/* Image */}
                <img
                  src={import.meta.env.BASE_URL + "before and after.png"}
                  alt="Before and after design comparison"
                  style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(1)" }}
                />
                {/* warm overlay */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(248,247,243,0.18)", pointerEvents: "none" }} />
                {/* wiggly border */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
                  <defs>
                    <filter id="cs-edge-iter" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
                      <feTurbulence type="fractalNoise" baseFrequency="0.016 0.022" numOctaves="2" seed="7" result="noise">
                        <animate attributeName="baseFrequency" values="0.016 0.022;0.020 0.018;0.013 0.026;0.018 0.020;0.016 0.022" dur="9s" repeatCount="indefinite" />
                      </feTurbulence>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#111111" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.82" filter="url(#cs-edge-iter)" />
                </svg>
              </a>
            </div>

            {/* text — right */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily:    "system-ui, sans-serif",
                fontSize:      "10px",
                fontWeight:    700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color:         "rgba(17,17,17,0.35)",
                marginBottom:  "var(--sp-4)",
              }}>
                Iterations
              </p>
              <h3 style={{
                fontFamily:  "Georgia, 'Times New Roman', serif",
                fontSize:    "clamp(22px, 2.4vw, 32px)",
                fontStyle:   "italic",
                fontWeight:  700,
                lineHeight:  1.25,
                color:       "#111111",
                marginBottom:"var(--sp-4)",
              }}>
                From initial layout to refined experience
              </h3>
              <p style={{
                fontFamily: "system-ui, sans-serif",
                fontSize:   "var(--fs-sm)",
                lineHeight: 1.85,
                color:      "rgba(17,17,17,0.58)",
              }}>
                The design evolved through adjustments in layout, structure, and feature organization.
                The updated version introduces clearer navigation, improved hierarchy, and additional
                functionality such as favorites and a more complete user flow. These changes resulted
                in a more intuitive and cohesive experience.
              </p>
            </div>
          </div>

          {/* ── Part 2: Brand Identity — text LEFT, image RIGHT ── */}
          <div style={{
            display:       "flex",
            flexDirection: "row",
            alignItems:    "center",
            gap:           "clamp(32px, 5vw, 72px)",
            marginBottom:  "clamp(64px, 10vw, 112px)",
          }}>
            {/* text — left */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily:    "system-ui, sans-serif",
                fontSize:      "10px",
                fontWeight:    700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color:         "rgba(17,17,17,0.35)",
                marginBottom:  "var(--sp-4)",
              }}>
                Brand Identity
              </p>
              <h3 style={{
                fontFamily:  "Georgia, 'Times New Roman', serif",
                fontSize:    "clamp(22px, 2.4vw, 32px)",
                fontStyle:   "italic",
                fontWeight:  700,
                lineHeight:  1.25,
                color:       "#111111",
                marginBottom:"var(--sp-4)",
              }}>
                Defining a consistent visual language
              </h3>
              <p style={{
                fontFamily: "system-ui, sans-serif",
                fontSize:   "var(--fs-sm)",
                lineHeight: 1.85,
                color:      "rgba(17,17,17,0.58)",
              }}>
                The visual identity was developed to support a calm and minimal user experience.
                A soft color palette, clean typography, and consistent UI components create a cohesive
                system across the platform. Each element was designed to enhance usability while
                allowing the artwork to remain the main focus.
              </p>
            </div>

            {/* image — right */}
            <div style={{ flex: "0 0 54%", maxWidth: "54%" }}>
              <a
                href={import.meta.env.BASE_URL + "color-pallet.png"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:        "block",
                  position:       "relative",
                  overflow:       "visible",
                  boxShadow:      "4px 8px 28px rgba(0,0,0,0.11)",
                  cursor:         "zoom-in",
                  textDecoration: "none",
                }}
              >
                {/* black header bar */}
                <div style={{ background: "#111111", padding: "9px 16px 8px", lineHeight: 1 }}>
                  <span style={{
                    color: "white", fontSize: "9px", fontFamily: "'Courier New', monospace",
                    letterSpacing: "2.5px", fontWeight: 700, textTransform: "uppercase",
                  }}>
                    Brand Identity
                  </span>
                </div>
                {/* Image */}
                <img
                  src={import.meta.env.BASE_URL + "color-pallet.png"}
                  alt="Brand identity — color palette and visual system"
                  style={{ display: "block", width: "100%", height: "auto", filter: "grayscale(1)" }}
                />
                {/* warm overlay */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(248,247,243,0.18)", pointerEvents: "none" }} />
                {/* wiggly border */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
                  <defs>
                    <filter id="cs-edge-brand" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
                      <feTurbulence type="fractalNoise" baseFrequency="0.016 0.022" numOctaves="2" seed="12" result="noise">
                        <animate attributeName="baseFrequency" values="0.016 0.022;0.020 0.018;0.013 0.026;0.018 0.020;0.016 0.022" dur="9s" repeatCount="indefinite" />
                      </feTurbulence>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#111111" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" strokeOpacity="0.82" filter="url(#cs-edge-brand)" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* ══ Next Project ══════════════════════════════════ */}
        <section className="cs-next-section">
          <div className="page-container cs-next-inner">
            <div>
              <div className="cs-next-eyebrow">Next Case Study</div>
              <h2 className="cs-next-title">KMP <em>Music App</em></h2>
            </div>
            <Link to="/work" className="cs-next-cta">View All Work →</Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
