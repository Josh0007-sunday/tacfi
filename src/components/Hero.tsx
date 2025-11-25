import CryptoLogos from './CryptoLogos'

const Hero = () => {
  return (
    <main className="hero">
      <div className="hero-center">
        <p className="badge">Trusted by 400K+ tactical investors</p>
        <h1>Invest Crypto Smarter<br />With TACFI</h1>
        <p className="lead">
          Explore market opportunities, stress test portfolios, and receive
          real-time signals powered by TACFI's adaptive intelligence.
        </p>
        <form className="cta-form">
          <input type="email" placeholder="Enter your email" aria-label="Email" />
          <button type="submit" className="primary-btn">Subscribe for free</button>
        </form>
      </div>

      <div className="stats">
        <div>
          <p className="stat-label">Managed volume</p>
          <p className="stat-value">$27.9B+</p>
        </div>
        <div>
          <p className="stat-label">AI accuracy</p>
          <p className="stat-value">92.4%</p>
        </div>
        <div>
          <p className="stat-label">Signal latency</p>
          <p className="stat-value">&lt; 2s</p>
        </div>
      </div>

      <section className="dashboard">
        {/* Row 1 */}
        <article className="card portfolio-card">
          <div>
            <p className="card-label">My Portfolio</p>
            <h3>$1,948.12</h3>
          </div>
          <p className="trend up">+2.57% | 24h</p>
          <div className="chart-placeholder"></div>
        </article>

        <article className="card secured-card">
          <div className="icon-circle">
            <span>🛡️</span>
          </div>
          <div>
            <p className="card-label">Vault Status</p>
            <h4>Secured</h4>
          </div>
          <p className="muted">Multi-sig enabled</p>
        </article>

        <article className="card asset-card">
          <div className="card-head">
            <div>
              <p className="card-label">Alexandria (AAR)</p>
              <h4>$27,942.65</h4>
            </div>
            <button className="ghost-btn small">+</button>
          </div>
          <p className="trend down">-1.83% today</p>
          <div className="token-chip">AI DeFi Index</div>
        </article>

        <article className="card market-card">
          <p className="card-label">AI Forecast</p>
          <p className="muted">
            Bitcoin expected to lead the digital assets market within 12 months.
          </p>
          <div className="forecast-bars">
            <div>
              <span>BTC</span>
              <span>78%</span>
            </div>
            <div>
              <span>ETH</span>
              <span>52%</span>
            </div>
            <div>
              <span>AI Index</span>
              <span>65%</span>
            </div>
          </div>
        </article>

        {/* Row 2 */}
        <article className="card transfer-card">
          <p className="card-label">Cash Portfolio</p>
          <h4>$128.1k</h4>
          <p className="muted">Swipe to send</p>
          <div className="avatar-row">
            <span className="avatar">A</span>
            <span className="avatar">R</span>
            <span className="avatar">K</span>
          </div>
        </article>

        <article className="card allocation-card">
          <p className="card-label">Investment Style</p>
          <div className="allocation-ring">
            <span>Aggressive</span>
          </div>
          <div className="allocation-legend">
            <span>DeFi 55%</span>
            <span>AI 30%</span>
            <span>Stable 15%</span>
          </div>
        </article>

        <article className="user-icon-card">
          <img src="/src/img/usricon.png" alt="User Icon" className="user-icon-image" />
        </article>
      </section>

      <CryptoLogos />
    </main>
  )
}

export default Hero
