import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  app.innerHTML = `
    <div class="app-shell">
      <nav class="nav">
        <div class="logo">
          <span class="logo-mark">T</span>
          <div>
            <p class="logo-title">TACFI</p>
            <p class="logo-sub">Tactical Finance</p>
          </div>
        </div>
        <ul class="nav-links">
          <li><a href="#">About us</a></li>
          <li><a href="#">How it works</a></li>
          <li><a href="#">Smart solutions</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Contact us</a></li>
        </ul>
        <div class="actions">
          <button class="ghost-btn">Login</button>
          <button class="primary-btn">Get started</button>
        </div>
      </nav>

      <main class="hero">
        <div class="hero-copy">
          <p class="badge">Trusted by 400K+ tactical investors</p>
          <h1>Invest Crypto Smarter<br />With TACFI</h1>
          <p class="lead">
            Explore market opportunities, stress test portfolios, and receive
            real-time signals powered by TACFI’s adaptive intelligence.
          </p>
          <form class="cta-form">
            <input type="email" placeholder="Enter your email" aria-label="Email" />
            <button type="submit" class="primary-btn">Subscribe for free</button>
          </form>
          <div class="stats">
            <div>
              <p class="stat-label">Managed volume</p>
              <p class="stat-value">$27.9B+</p>
            </div>
            <div>
              <p class="stat-label">AI accuracy</p>
              <p class="stat-value">92.4%</p>
            </div>
            <div>
              <p class="stat-label">Signal latency</p>
              <p class="stat-value">&lt; 2s</p>
            </div>
          </div>
        </div>

        <section class="dashboard">
          <article class="card portfolio-card">
            <div>
              <p class="card-label">My Portfolio</p>
              <h3>$1,948.12</h3>
            </div>
            <p class="trend up">+2.57% | 24h</p>
            <div class="chart-placeholder"></div>
          </article>

          <article class="card secured-card">
            <div class="icon-circle">
              <span>🛡️</span>
            </div>
            <div>
              <p class="card-label">Vault Status</p>
              <h4>Secured</h4>
            </div>
            <p class="muted">Multi-sig enabled</p>
          </article>

          <article class="card asset-card">
            <div class="card-head">
              <div>
                <p class="card-label">Alexandria (AAR)</p>
                <h4>$27,942.65</h4>
              </div>
              <button class="ghost-btn small">+</button>
            </div>
            <p class="trend down">-1.83% today</p>
            <div class="token-chip">AI DeFi Index</div>
          </article>

          <article class="card transfer-card">
            <p class="card-label">Cash Portfolio</p>
            <h4>$128.1k</h4>
            <p class="muted">Swipe to send</p>
            <div class="avatar-row">
              <span class="avatar">A</span>
              <span class="avatar">R</span>
              <span class="avatar">K</span>
            </div>
          </article>

          <article class="card allocation-card">
            <p class="card-label">Investment Style</p>
            <div class="allocation-ring">
              <span>Aggressive</span>
            </div>
            <div class="allocation-legend">
              <span>DeFi 55%</span>
              <span>AI 30%</span>
              <span>Stable 15%</span>
            </div>
          </article>

          <article class="card market-card">
            <p class="card-label">AI Forecast</p>
            <p class="muted">
              Bitcoin expected to lead the digital assets market within 12 months.
            </p>
            <div class="forecast-bars">
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
        </section>
      </main>

      <section class="pricing">
        <div class="pricing-header">
          <p class="badge ghost">Plans & pricing</p>
          <h2>Flexible plans for every tactical investor</h2>
          <p class="lead">
            Choose the plan that fits your strategy, or contact TACFI for a custom quote.
          </p>
        </div>

        <div class="pricing-grid">
          <article class="plan-card">
            <p class="card-label">Basic Plan</p>
            <p class="muted">For solo traders or early-stage crypto investors.</p>
            <p class="price">$1,389<span>/month</span></p>
            <button class="ghost-btn wide">Get started now</button>
            <ul class="plan-list">
              <li>AI-powered portfolio scan</li>
              <li>Monthly asset trend report (PDF)</li>
              <li>Basic portfolio risk assessment</li>
              <li>Community access (Discord)</li>
              <li>Email-only support</li>
            </ul>
          </article>

          <article class="plan-card featured">
            <div class="pill">Our best seller</div>
            <p class="card-label">Pro Plan</p>
            <p class="muted">Best for growing crypto funds & DeFi analysts.</p>
            <p class="price">$2,871<span>/custom</span></p>
            <button class="primary-btn wide">Start free trial</button>
            <ul class="plan-list">
              <li>Weekly portfolio optimization by AI</li>
              <li>Asset insights (PDF + interactive dashboard)</li>
              <li>AI-generated token sentiment scores</li>
              <li>Priority analyst hours</li>
              <li>Multi-channel support</li>
            </ul>
          </article>

          <article class="plan-card">
            <p class="card-label">Enterprise Plan</p>
            <p class="muted">Fully modular AI analytics for institutions.</p>
            <p class="price">Custom<span>/month</span></p>
            <button class="ghost-btn wide">Contact us</button>
            <ul class="plan-list">
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
    </div>
  `
}
