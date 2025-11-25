import Hero from './Hero'
import Footer from './Footer'

const LandingPage = () => {
  return (
    <div className="app-shell">
      <div className="hero-bg">
        <nav className="nav">
          <div className="logo">
            <span className="logo-mark">T</span>
            <div>
              <p className="logo-title">TACFI</p>
              <p className="logo-sub">Tactical Finance</p>
            </div>
          </div>
          <ul className="nav-links">
            <li><a href="#">About us</a></li>
            <li><a href="#">How it works</a></li>
            <li><a href="#">Smart solutions</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
          <div className="actions">
            <button className="ghost-btn">Login</button>
            <button className="primary-btn">Get started</button>
          </div>
        </nav>
        <Hero />
      </div>

      <section className="pricing">
        <div className="pricing-header">
          <p className="badge ghost">Plans & pricing</p>
          <h2>Flexible plans for every tactical investor</h2>
          <p className="lead">
            Choose the plan that fits your strategy, or contact TACFI for a custom quote.
          </p>
        </div>

        <div className="pricing-grid">
          <article className="plan-card">
            <p className="card-label">Basic Plan</p>
            <p className="muted">For solo traders or early-stage crypto investors.</p>
            <p className="price">$1,389<span>/month</span></p>
            <button className="ghost-btn wide">Get started now</button>
            <ul className="plan-list">
              <li>AI-powered portfolio scan</li>
              <li>Monthly asset trend report (PDF)</li>
              <li>Basic portfolio risk assessment</li>
              <li>Community access (Discord)</li>
              <li>Email-only support</li>
            </ul>
          </article>

          <article className="plan-card featured">
            <div className="pill">Our best seller</div>
            <p className="card-label">Pro Plan</p>
            <p className="muted">Best for growing crypto funds & DeFi analysts.</p>
            <p className="price">$2,871<span>/custom</span></p>
            <button className="primary-btn wide">Start free trial</button>
            <ul className="plan-list">
              <li>Weekly portfolio optimization by AI</li>
              <li>Asset insights (PDF + interactive dashboard)</li>
              <li>AI-generated token sentiment scores</li>
              <li>Priority analyst hours</li>
              <li>Multi-channel support</li>
            </ul>
          </article>

          <article className="plan-card">
            <p className="card-label">Enterprise Plan</p>
            <p className="muted">Fully modular AI analytics for institutions.</p>
            <p className="price">Custom<span>/month</span></p>
            <button className="ghost-btn wide">Contact us</button>
            <ul className="plan-list">
              <li>Unlimited AI modules & connectors</li>
              <li>Real-time anomaly detection engine</li>
              <li>Custom reporting templates (PDF/CSV/JSON)</li>
              <li>On-chain + off-chain data integration</li>
              <li>Dedicated account manager</li>
              <li>24/7 enterprise support & onboarding</li>
            </ul>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage
