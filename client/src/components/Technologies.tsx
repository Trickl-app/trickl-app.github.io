import type React from 'react'

function AwsIcon() {
  return (
    <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="50" y="36" textAnchor="middle" fill="#FF9900" fontSize="36" fontWeight="900" fontFamily="'Amazon Ember', Arial, sans-serif">aws</text>
      <path d="M28 48 Q50 58 72 48" stroke="#FF9900" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <polygon points="72,44 76,52 68,52" fill="#FF9900"/>
    </svg>
  )
}

function VectorIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 25 L50 75 L90 25" stroke="#FF7433" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="25" r="8" fill="#FF7433"/>
      <circle cx="90" cy="25" r="8" fill="#FF7433"/>
      <circle cx="50" cy="75" r="8" fill="#FF7433"/>
    </svg>
  )
}

// Techs using Simple Icons CDN use a slug that must match https://simpleicons.org exactly.
// AWS and Vector are not in Simple Icons, so they use inline SVG components above instead.
const techs: { name: string; icon: React.ReactNode }[] = [
  { name: 'TypeScript',      icon: <img src="https://cdn.simpleicons.org/typescript"      alt="TypeScript"      className="tech-icon" loading="lazy" /> },
  { name: 'Grafana',         icon: <img src="https://cdn.simpleicons.org/grafana"         alt="Grafana"         className="tech-icon" loading="lazy" /> },
  { name: 'VictoriaMetrics', icon: <img src="https://cdn.simpleicons.org/victoriametrics" alt="VictoriaMetrics" className="tech-icon" loading="lazy" /> },
  { name: 'Vector',          icon: <VectorIcon /> },
  { name: 'AWS',             icon: <AwsIcon /> },
  { name: 'Docker',          icon: <img src="https://cdn.simpleicons.org/docker"          alt="Docker"          className="tech-icon" loading="lazy" /> },
  { name: 'React',           icon: <img src="https://cdn.simpleicons.org/react"           alt="React"           className="tech-icon" loading="lazy" /> },
]

export default function Technologies() {
  return (
    <section className="tech-section">
      <h2 className="tech-title">Technologies</h2>
      <div className="tech-track">
        {techs.map(t => (
          <div className="tech-card" key={t.name}>
            <div className="tech-icon-wrap">
              {t.icon}
            </div>
            <span className="tech-name">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
