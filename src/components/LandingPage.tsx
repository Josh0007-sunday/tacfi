import Hero from './Hero'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="min-h-screen">
      <div className="py-10 px-6 lg:px-16 relative">
        <nav className="flex items-center justify-between gap-4 mb-14 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-pink-400 to-purple-600 grid place-items-center font-bold">T</span>
            <div>
              <p className="font-semibold mb-0.5">TACFI</p>
              <p className="text-xs opacity-60">Tactical Finance</p>
            </div>
          </div>
          <ul className={`list-none flex gap-6 text-[0.95rem] text-[#c7c1dc] md:flex ${menuOpen ? 'fixed top-0 left-0 right-0 bottom-0 bg-[rgba(2,1,7,0.98)] backdrop-blur-[20px] flex-col justify-center items-center gap-8 text-lg z-[999]' : 'hidden md:flex'}`}>
            <li><a href="#" onClick={toggleMenu} className="text-inherit no-underline hover:text-white transition-colors">About us</a></li>
            <li><a href="#" onClick={toggleMenu} className="text-inherit no-underline hover:text-white transition-colors">How it works</a></li>
            <li><a href="#" onClick={toggleMenu} className="text-inherit no-underline hover:text-white transition-colors">Smart solutions</a></li>
            <li><a href="#" onClick={toggleMenu} className="text-inherit no-underline hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" onClick={toggleMenu} className="text-inherit no-underline hover:text-white transition-colors">Contact us</a></li>
            <li className={`flex flex-col gap-4 mt-6 w-4/5 max-w-[300px] ${menuOpen ? 'block' : 'hidden'} md:hidden`}>
              <Link to="/login" className="w-full bg-transparent border border-white/20 text-inherit py-3.5 px-6 rounded-full font-semibold cursor-pointer hover:border-white/50 transition-all text-center no-underline" onClick={toggleMenu}>Login</Link>
              <Link to="/signup" className="w-full bg-gradient-to-br from-pink-400 to-purple-600 border-none text-white py-3.5 px-7 rounded-full font-semibold cursor-pointer hover:opacity-85 transition-opacity text-center no-underline" onClick={toggleMenu}>Get started</Link>
            </li>
          </ul>
          <button className={`flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 z-[1000] ${menuOpen ? 'flex' : 'hidden'} md:hidden`} onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`w-[25px] h-[3px] bg-gradient-to-br from-pink-400 to-purple-600 rounded-sm transition-all ${menuOpen ? 'rotate-45 translate-x-2 translate-y-2' : ''}`}></span>
            <span className={`w-[25px] h-[3px] bg-gradient-to-br from-pink-400 to-purple-600 rounded-sm transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-[25px] h-[3px] bg-gradient-to-br from-pink-400 to-purple-600 rounded-sm transition-all ${menuOpen ? '-rotate-45 translate-x-[7px] -translate-y-[7px]' : ''}`}></span>
          </button>
          <div className="hidden md:flex gap-3">
            <Link to="/login" className="bg-transparent border border-white/20 text-inherit py-3.5 px-6 rounded-full font-semibold cursor-pointer hover:border-white/50 transition-all no-underline">Login</Link>
            <Link to="/signup" className="bg-gradient-to-br from-pink-400 to-purple-600 border-none text-white py-3.5 px-7 rounded-full font-semibold cursor-pointer hover:opacity-85 transition-opacity no-underline">Get started</Link>
          </div>
        </nav>
        <Hero />
      </div>

      <section className="mt-8 py-14 px-6 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="inline-flex items-center gap-2 bg-white/[0.08] py-1.5 px-4 rounded-full text-[0.75rem] uppercase tracking-[0.12em]">Plans & pricing</p>
          <h2 className="my-4 text-3xl lg:text-5xl">Flexible plans for every tactical investor</h2>
          <p className="text-[#c7c1dc] text-[1.05rem] mb-7">
            Choose the plan that fits your strategy, or contact TACFI for a custom quote.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article className="bg-[rgba(8,6,24,0.92)] border border-white/[0.06] rounded-3xl p-10 flex flex-col gap-5 min-h-[520px] transition-all hover:border-pink-400/65 hover:-translate-y-1 hover:bg-[linear-gradient(160deg,rgba(255,106,213,0.13),rgba(129,92,255,0.18))] hover:shadow-[0_25px_55px_rgba(255,106,213,0.18)]">
            <p className="text-[#a397c4] text-xs uppercase tracking-[0.1em] font-semibold mb-1">Basic Plan</p>
            <p className="text-[#9d92b7] text-[0.85rem] leading-6">For solo traders or early-stage crypto investors.</p>
            <p className="text-[2.5rem] font-semibold">$1,389<span className="text-base font-normal text-[#a397c4] ml-1 uppercase">/month</span></p>
            <Link to="/signup" className="w-full justify-center text-center bg-transparent border border-white/20 text-inherit py-3.5 px-6 rounded-full font-semibold cursor-pointer hover:border-white/50 transition-all no-underline">Get started now</Link>
            <ul className="list-none flex flex-col gap-2.5 text-[#d9d3ef] text-[0.95rem] pl-0">
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">AI-powered portfolio scan</li>
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">Monthly asset trend report (PDF)</li>
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">Basic portfolio risk assessment</li>
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">Community access (Discord)</li>
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">Email-only support</li>
            </ul>
          </article>

          <article className="relative border-2 border-transparent bg-[linear-gradient(160deg,rgba(8,6,24,0.92),rgba(20,10,40,0.95)),linear-gradient(135deg,#ff6ad5,#815cff)] bg-origin-border [background-clip:padding-box,border-box] rounded-3xl p-10 flex flex-col gap-5 min-h-[520px] shadow-[0_0_30px_rgba(255,106,213,0.3),0_20px_50px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-1.5 hover:shadow-[0_0_40px_rgba(255,106,213,0.5),0_32px_80px_rgba(255,106,213,0.28)]">
            <div className="self-center bg-white/95 text-[#111] font-semibold py-1.5 px-4 rounded-full uppercase text-xs tracking-wider">Our best seller</div>
            <p className="text-[#a397c4] text-xs uppercase tracking-[0.1em] font-semibold mb-1">Pro Plan</p>
            <p className="text-[#9d92b7] text-[0.85rem] leading-6">Best for growing crypto funds & DeFi analysts.</p>
            <p className="text-[2.5rem] font-semibold">$2,871<span className="text-base font-normal text-[#a397c4] ml-1 uppercase">/custom</span></p>
            <Link to="/signup" className="w-full justify-center text-center bg-gradient-to-br from-pink-400 to-purple-600 border-none text-white py-3.5 px-7 rounded-full font-semibold cursor-pointer hover:opacity-85 transition-opacity no-underline">Start free trial</Link>
            <ul className="list-none flex flex-col gap-2.5 text-[#d9d3ef] text-[0.95rem] pl-0">
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">Weekly portfolio optimization by AI</li>
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">Asset insights (PDF + interactive dashboard)</li>
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">AI-generated token sentiment scores</li>
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">Priority analyst hours</li>
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">Multi-channel support</li>
            </ul>
          </article>

          <article className="bg-[rgba(8,6,24,0.92)] border border-white/[0.06] rounded-3xl p-10 flex flex-col gap-5 min-h-[520px] transition-all hover:border-pink-400/65 hover:-translate-y-1 hover:bg-[linear-gradient(160deg,rgba(255,106,213,0.13),rgba(129,92,255,0.18))] hover:shadow-[0_25px_55px_rgba(255,106,213,0.18)]">
            <p className="text-[#a397c4] text-xs uppercase tracking-[0.1em] font-semibold mb-1">Enterprise Plan</p>
            <p className="text-[#9d92b7] text-[0.85rem] leading-6">Fully modular AI analytics for institutions.</p>
            <p className="text-[2.5rem] font-semibold">Custom<span className="text-base font-normal text-[#a397c4] ml-1 uppercase">/month</span></p>
            <button className="w-full justify-center text-center bg-transparent border border-white/20 text-inherit py-3.5 px-6 rounded-full font-semibold cursor-pointer hover:border-white/50 transition-all">Contact us</button>
            <ul className="list-none flex flex-col gap-2.5 text-[#d9d3ef] text-[0.95rem] pl-0">
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">Unlimited AI modules & connectors</li>
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">Real-time anomaly detection engine</li>
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">Custom reporting templates (PDF/CSV/JSON)</li>
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">On-chain + off-chain data integration</li>
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">Dedicated account manager</li>
              <li className="before:content-['•'] before:text-pink-400 before:mr-2">24/7 enterprise support & onboarding</li>
            </ul>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage
