import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import tricklLogo from '../assets/trickl-logo.png'
import Features from './Features'
import Team from './Team'

function Home() {
  useLayoutEffect(() => {
    if (window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView()
    }
  }, [])

  return (
    <>
      <div className="home-hero">
        <img src={tricklLogo} alt="Trickle" className="home-logo" />
        <h1>A self-hosted, open-source metrics observability platform with built in cardinality control in minutes</h1>
        <Link to="/case-study" className="btn-primary">Read the Case Study</Link>
      </div>

      <Features />
      <Team />
    </>
  )
}

export default Home
