import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import tricklIcon from '../assets/blue-transparent_background.svg'
import Team from './Team'

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    title: 'Open Source',
    desc: 'Fully transparent codebase. Fork it, extend it, or contribute back.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8h.01M11 8h.01"/>
      </svg>
    ),
    title: 'Self Hosted',
    desc: 'Your data never leaves your infrastructure. Full ownership, zero vendor lock-in.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Full Metrics Pipeline',
    desc: 'A complete, fully provisioned metrics telemetry pipeline ready out of the box.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
        <path d="M15 15l2 2-2 2"/>
        <path d="M13 17h4"/>
      </svg>
    ),
    title: 'Grafana Dashboards',
    desc: 'Best-in-class visualization powered by Grafana — familiar, powerful, and extensible.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"/>
        <line x1="12" y1="19" x2="20" y2="19"/>
      </svg>
    ),
    title: 'One-Command AWS Deploy',
    desc: 'Automated infrastructure provisioning on AWS via a simple CLI. Up and running in minutes.',
  },
]

function Home() {
  useLayoutEffect(() => {
    if (window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView()
    }
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-inner">
          <div className="hero-icon-wrap">
            <img src={tricklIcon} alt="Trickl" className="hero-icon" />
          </div>
          <div className="hero-text">
            <h1 className="hero-heading">
              Metrics<br />Observability<br />in Minutes
            </h1>
            <p className="hero-sub">
              Open-source metrics observability for small teams — self-hosted on your own infrastructure, with intelligent cardinality control built in.
            </p>
            <Link to="/case-study" className="btn-primary">
              Read our Case Study <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="features-inner">
          {features.map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="team-section-bg">
        <Team />
      </section>
    </>
  )
}

export default Home
