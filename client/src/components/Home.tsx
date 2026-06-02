import { Link } from 'react-router-dom'
import tricklLogo from '../assets/trickl-logo.png'

function Home() {
  return (
    <>
      <div className="home-hero">
        <img src={tricklLogo} alt="Trickle" className="home-logo" />
        <h1>Self hosted, Open-source metrics observability platform with built in cardinality control in minutes</h1>
        <Link to="/case-study" className="btn-primary">Read the Case Study</Link>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <div className="feature-image-placeholder" />
        </div>
        <div className="feature-card">
          <div className="feature-image-placeholder" />
        </div>
        <div className="feature-card">
          <div className="feature-image-placeholder" />
        </div>
      </div>
    </>
  )
}

export default Home
