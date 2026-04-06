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

function App() {
  return (
    <Router basename="/portfolio-react">
      <PaperTexture />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/heinz" element={<Heinz />} />
        <Route path="/work/kmp" element={<KMP />} />
        <Route path="/work/psych" element={<Psych />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/fine-art" element={<FineArt />} />
      </Routes>
    </Router>
  )
}

export default App
