import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PaperTexture } from './components/PaperTexture'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'
import FineArt from './pages/FineArt'
import Heinz from './pages/work/Heinz'
import KMP from './pages/work/KMP'
import Psych from './pages/work/Psych'
import Oniwash from './pages/work/Oniwash'
import PosterRedesign from './pages/work/PosterRedesign'
import Photography from './pages/work/Photography'

function App() {
  return (
    <Router basename="/">
      <PaperTexture />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/heinz" element={<Heinz />} />
        <Route path="/work/kmp" element={<KMP />} />
        <Route path="/work/psych" element={<Psych />} />
        <Route path="/work/oniwash" element={<Oniwash />} />
        <Route path="/work/poster-redesign" element={<PosterRedesign />} />
        <Route path="/work/photography" element={<Photography />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/fine-art" element={<FineArt />} />
      </Routes>
    </Router>
  )
}

export default App
