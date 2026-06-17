import linkedinLogo from '../assets/linkedin-logo.webp'
import githubLogo from '../assets/github-logo.svg'
import ianPhoto from '../assets/ian.jpeg'
import jonPhoto from '../assets/jon.jpeg'
import nazeerPhoto from '../assets/nazeer.jpeg'

function Team() {
  return (
    <div className="home-team" id="team">
      <h2 className="team-title">Meet the Team</h2>
      <div className="team-grid">

        <div className="team-member">
          <img src={ianPhoto} alt="Ian Lewis" className="team-photo-card" />
          <p className="team-name">Ian Lewis</p>
          <p className="team-location">North Carolina, USA</p>
          <div className="team-badges">
            <a href="https://www.linkedin.com/in/ianlewis314/" target="_blank" rel="noreferrer">
              <img src={linkedinLogo} alt="LinkedIn" className="team-badge" />
            </a>
            <a href="https://github.com/lewisian8787" target="_blank" rel="noreferrer">
              <img src={githubLogo} alt="GitHub" className="team-badge team-badge--github" />
            </a>
          </div>
        </div>
        <div className="team-member">
          <div className="team-photo-card team-photo-placeholder" />
          <p className="team-name">Syed Shah</p>
          <p className="team-location">London, England</p>
          <div className="team-badges">
            <a href="https://www.linkedin.com/in/syed-shah-367a44393/" target="_blank" rel="noreferrer">
              <img src={linkedinLogo} alt="LinkedIn" className="team-badge" />
            </a>
            <a href="https://github.com/5y3d" target="_blank" rel="noreferrer">
              <img src={githubLogo} alt="GitHub" className="team-badge team-badge--github" />
            </a>
          </div>
        </div>
        <div className="team-member">
          <img src={nazeerPhoto} alt="Nazeer Shaikh" className="team-photo-card" />
          <p className="team-name">Nazeer Shaikh</p>
          <p className="team-location">Florida, USA</p>
          <div className="team-badges">
            <a href="https://www.linkedin.com/in/nazeer-shaikh-0aaa8668/" target="_blank" rel="noreferrer">
              <img src={linkedinLogo} alt="LinkedIn" className="team-badge" />
            </a>
            <a href="https://github.com/nash226" target="_blank" rel="noreferrer">
              <img src={githubLogo} alt="GitHub" className="team-badge team-badge--github" />
            </a>
          </div>
        </div>
        <div className="team-member">
          <img src={jonPhoto} alt="Jonathon Norrie" className="team-photo-card" />
          <p className="team-name">Jonathon Norrie</p>
          <p className="team-location">Toronto, Canada</p>
          <div className="team-badges">
            <a href="https://linkedin.com/in/jonathon-norrie-632b2551" target="_blank" rel="noreferrer">
              <img src={linkedinLogo} alt="LinkedIn" className="team-badge" />
            </a>
            <a href="https://github.com/jonnorrie" target="_blank" rel="noreferrer">
              <img src={githubLogo} alt="GitHub" className="team-badge team-badge--github" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team
