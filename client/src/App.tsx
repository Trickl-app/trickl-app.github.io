import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import CaseStudy from './components/CaseStudy'
import tricklLogo from './assets/trickl-logo.png'
import './App.css'

function App() {
  return (
    <>
      <nav className="navbar">
        <a href="/" className="nav-logo">
          <img src={tricklLogo} alt="Trickle" />
        </a>
        <Link to="/case-study">Case Study</Link>
        <a href="/#team">Team</a>
        <Link to="https://github.com/metropolis-capstone">GitHub</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study" element={<CaseStudy />} />
      </Routes>
    </>
  )
}

export default App
