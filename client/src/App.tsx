import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import CaseStudy from './components/CaseStudy'
import Team from './components/Team'
import tricklLogo from './assets/trickl-logo.png'
import './App.css'

function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <img src={tricklLogo} alt="Trickle" />
        </Link>
        <Link to="/case-study">Case Study</Link>
        <Link to="/team">Team</Link>
        <Link to="https://github.com/metropolis-capstone">GitHub</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study" element={<CaseStudy />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </>
  )
}

export default App
