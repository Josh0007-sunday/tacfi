import CryptoLogos from './CryptoLogos'

const Hero = () => {
  return (
    <main className="flex flex-col gap-8 lg:gap-14 items-center bg-[url('./img/tacfibg.png')] bg-[length:100%_auto] bg-[center_top] bg-no-repeat relative">
      <div className="text-center max-w-[800px] w-full">
        <p className="inline-flex items-center gap-2 bg-white/[0.08] py-1.5 px-4 rounded-full text-[0.85rem] tracking-[0.01em] mb-4">Trusted by 400K+ tactical investors</p>
        <h1 className="text-[clamp(2.5rem,4.5vw,4.4rem)] font-light leading-[1.1] my-4 tracking-[0.01em]">Invest Crypto Smarter<br />With TACFI</h1>
        <p className="text-[#c7c1dc] text-[1.05rem] mb-7 max-w-[700px] mx-auto">
          Explore market opportunities, stress test portfolios, and receive
          real-time signals powered by TACFI's adaptive intelligence.
        </p>
        <form className="flex flex-wrap justify-center gap-3 mb-7">
          <input type="email" placeholder="Enter your email" aria-label="Email" className="flex-1 min-w-[220px] rounded-full border border-white/20 bg-[rgba(5,2,13,0.4)] text-white py-3.5 px-5 text-base outline-none placeholder:text-white/50" />
          <button type="submit" className="bg-gradient-to-br from-pink-400 to-purple-600 border-none text-white py-3.5 px-7 rounded-full font-semibold cursor-pointer hover:opacity-85 transition-opacity">Subscribe for free</button>
        </form>
      </div>

      <div className="grid grid-cols-3 gap-8 w-full max-w-[900px] mx-auto mb-0 text-center">
        <div>
          <p className="text-[#a397c4] text-[0.85rem] uppercase tracking-[0.05em]">Managed volume</p>
          <p className="text-[1.4rem] font-semibold">$27.9B+</p>
        </div>
        <div>
          <p className="text-[#a397c4] text-[0.85rem] uppercase tracking-[0.05em]">AI accuracy</p>
          <p className="text-[1.4rem] font-semibold">92.4%</p>
        </div>
        <div>
          <p className="text-[#a397c4] text-[0.85rem] uppercase tracking-[0.05em]">Signal latency</p>
          <p className="text-[1.4rem] font-semibold">&lt; 2s</p>
        </div>
      </div>

      <section className="grid grid-cols-4 grid-rows-2 gap-4 w-full max-w-[1400px] mx-auto mt-8 px-6 min-h-[600px]">
        {/* Row 1 */}
        <article className="col-start-1 row-start-1 bg-[linear-gradient(135deg,rgba(19,11,34,0.95),rgba(30,15,50,0.9))] border border-white/10 rounded-3xl p-6 backdrop-blur-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all relative overflow-hidden flex flex-col justify-between gap-4 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] hover:border-pink-400/30 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(129,92,255,0.2)]">
          <div>
            <p className="text-[#a397c4] text-xs uppercase tracking-[0.1em] font-semibold mb-1">My Portfolio</p>
            <h3 className="text-4xl font-bold m-0 mt-1 tracking-tight bg-[linear-gradient(135deg,#ffffff,#e0d5ff)] bg-clip-text text-transparent">$1,948.12</h3>
          </div>
          <p className="text-[0.9rem] font-semibold m-0 inline-flex items-center gap-1.5 text-[#42ffa1] before:content-['↗'] before:text-[1.1rem]">+2.57% | 24h</p>
          <div className="mt-auto h-[70px] w-full rounded-xl bg-[url('data:image/svg+xml,%3Csvg width=&quot;400&quot; height=&quot;120&quot; viewBox=&quot;0 0 400 120&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cpath d=&quot;M0 100L60 60L110 85L190 30L260 70L320 40L400 10&quot; stroke=&quot;%23fe6dd6&quot; stroke-width=&quot;3&quot; stroke-linecap=&quot;round&quot; fill=&quot;none&quot;/%3E%3C/svg%3E')] bg-center bg-cover bg-no-repeat opacity-80 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(180deg,transparent_0%,rgba(254,109,214,0.05)_100%)]"></div>
        </article>

        <article className="col-start-2 row-start-1 bg-[rgba(20,14,40,0.85)] border border-white/10 rounded-3xl p-6 backdrop-blur-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all relative overflow-hidden flex flex-col gap-3 items-start justify-center text-left before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] hover:border-pink-400/30 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(129,92,255,0.2)]">
          <div className="w-14 h-14 rounded-[18px] bg-[linear-gradient(135deg,rgba(66,255,161,0.15),rgba(129,92,255,0.15))] border border-[rgba(66,255,161,0.2)] grid place-items-center text-2xl shadow-[0_4px_16px_rgba(66,255,161,0.1)]">
            <span>🛡️</span>
          </div>
          <div>
            <p className="text-[#a397c4] text-xs uppercase tracking-[0.1em] font-semibold mb-1">Vault Status</p>
            <h4 className="text-[1.35rem] font-semibold m-0 text-[#42ffa1]">Secured</h4>
          </div>
          <p className="text-[#9d92b7] text-[0.85rem] leading-6">Multi-sig enabled</p>
        </article>

        <article className="col-start-3 row-start-1 bg-[rgba(20,14,40,0.85)] border border-white/10 rounded-3xl p-6 backdrop-blur-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all relative overflow-hidden flex flex-col justify-between gap-3 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] hover:border-pink-400/30 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(129,92,255,0.2)]">
          <div className="flex justify-between items-center mb-2.5">
            <div>
              <p className="text-[#a397c4] text-xs uppercase tracking-[0.1em] font-semibold mb-1">Alexandria (AAR)</p>
              <h4 className="text-2xl font-bold m-0 mt-1 tracking-tight">$27,942.65</h4>
            </div>
            <button className="py-1.5 px-3.5 rounded-[10px] text-[1.1rem] leading-none bg-[linear-gradient(135deg,rgba(255,106,213,0.08),rgba(129,92,255,0.08))] border border-white/20 hover:bg-[linear-gradient(135deg,rgba(255,106,213,0.15),rgba(129,92,255,0.15))] hover:border-pink-400/40 transition-all">+</button>
          </div>
          <p className="text-[0.9rem] font-semibold m-0 inline-flex items-center gap-1.5 text-[#ff7ab6] before:content-['↘'] before:text-[1.1rem]">-1.83% today</p>
          <div className="inline-flex py-1.5 px-4 rounded-full bg-[linear-gradient(135deg,rgba(255,106,213,0.12),rgba(129,92,255,0.12))] border border-pink-400/25 text-xs font-semibold tracking-[0.02em]">AI DeFi Index</div>
        </article>

        <article className="col-start-4 row-start-1 bg-[rgba(20,14,40,0.85)] border border-white/10 rounded-3xl p-3.5 backdrop-blur-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all relative overflow-hidden flex flex-col justify-between before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] hover:border-pink-400/30 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(129,92,255,0.2)]">
          <p className="text-[#a397c4] text-xs uppercase tracking-[0.1em] font-semibold mb-1">AI Forecast</p>
          <p className="text-[#9d92b7] text-xs leading-[1.3] mb-2">
            Bitcoin expected to lead the digital assets market within 12 months.
          </p>
          <div className="mt-3 flex flex-col gap-2 overflow-hidden">
            <div className="flex justify-between items-center font-semibold bg-[linear-gradient(90deg,rgba(129,92,255,0.08),rgba(255,106,213,0.08))] border border-white/[0.08] py-2.5 px-3.5 rounded-[10px] text-[0.85rem] transition-all hover:bg-[linear-gradient(90deg,rgba(129,92,255,0.15),rgba(255,106,213,0.15))] hover:border-pink-400/30 hover:translate-x-1">
              <span>BTC</span>
              <span>78%</span>
            </div>
            <div className="flex justify-between items-center font-semibold bg-[linear-gradient(90deg,rgba(129,92,255,0.08),rgba(255,106,213,0.08))] border border-white/[0.08] py-2.5 px-3.5 rounded-[10px] text-[0.85rem] transition-all hover:bg-[linear-gradient(90deg,rgba(129,92,255,0.15),rgba(255,106,213,0.15))] hover:border-pink-400/30 hover:translate-x-1">
              <span>ETH</span>
              <span>52%</span>
            </div>
            <div className="flex justify-between items-center font-semibold bg-[linear-gradient(90deg,rgba(129,92,255,0.08),rgba(255,106,213,0.08))] border border-white/[0.08] py-2.5 px-3.5 rounded-[10px] text-[0.85rem] transition-all hover:bg-[linear-gradient(90deg,rgba(129,92,255,0.15),rgba(255,106,213,0.15))] hover:border-pink-400/30 hover:translate-x-1">
              <span>AI Index</span>
              <span>65%</span>
            </div>
          </div>
        </article>

        {/* Row 2 */}
        <article className="col-start-1 row-start-2 bg-[linear-gradient(135deg,rgba(19,11,34,0.9),rgba(30,15,50,0.85))] border border-white/10 rounded-3xl p-6 backdrop-blur-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all relative overflow-hidden flex flex-col gap-3 justify-between before:content-[''] before:absolute before:top-1/2 before:right-[-10%] before:w-[120%] before:h-[120%] before:-translate-y-1/2 before:bg-[url('data:image/svg+xml,%3Csvg width=&quot;300&quot; height=&quot;200&quot; viewBox=&quot;0 0 300 200&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cpath d=&quot;M10 150 Q 50 100, 100 120 T 190 100 T 280 110&quot; stroke=&quot;rgba(255,106,213,0.15)&quot; stroke-width=&quot;2.5&quot; fill=&quot;none&quot;/%3E%3Cpath d=&quot;M10 130 Q 50 80, 100 100 T 190 80 T 280 90&quot; stroke=&quot;rgba(129,92,255,0.15)&quot; stroke-width=&quot;2.5&quot; fill=&quot;none&quot;/%3E%3Cpath d=&quot;M10 110 Q 50 60, 100 80 T 190 60 T 280 70&quot; stroke=&quot;rgba(255,106,213,0.1)&quot; stroke-width=&quot;2&quot; fill=&quot;none&quot;/%3E%3Ccircle cx=&quot;100&quot; cy=&quot;120&quot; r=&quot;4&quot; fill=&quot;rgba(255,106,213,0.4)&quot;/%3E%3Ccircle cx=&quot;190&quot; cy=&quot;100&quot; r=&quot;4&quot; fill=&quot;rgba(129,92,255,0.4)&quot;/%3E%3Ccircle cx=&quot;280&quot; cy=&quot;110&quot; r=&quot;4&quot; fill=&quot;rgba(255,106,213,0.4)&quot;/%3E%3C/svg%3E')] before:bg-no-repeat before:bg-[center_right] before:bg-contain before:opacity-40 before:pointer-events-none before:z-0 hover:border-pink-400/30 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(129,92,255,0.2)]">
          <p className="text-[#a397c4] text-xs uppercase tracking-[0.1em] font-semibold mb-1 relative z-10">Cash Portfolio</p>
          <h4 className="text-[1.75rem] font-bold m-0 my-1 tracking-tight bg-[linear-gradient(135deg,#ffffff,#e0d5ff)] bg-clip-text text-transparent relative z-10">$128.1k</h4>
          <p className="text-[#9d92b7] text-[0.85rem] leading-6 relative z-10">Swipe to send</p>
          <div className="flex gap-1.5 relative z-10">
            <span className="w-[38px] h-[38px] rounded-full bg-[linear-gradient(135deg,rgba(255,106,213,0.2),rgba(129,92,255,0.2))] border-2 border-white/15 grid place-items-center font-semibold text-[0.9rem] transition-all hover:scale-110 hover:border-pink-400/50 hover:shadow-[0_4px_12px_rgba(255,106,213,0.3)]">A</span>
            <span className="w-[38px] h-[38px] rounded-full bg-[linear-gradient(135deg,rgba(255,106,213,0.2),rgba(129,92,255,0.2))] border-2 border-white/15 grid place-items-center font-semibold text-[0.9rem] transition-all hover:scale-110 hover:border-pink-400/50 hover:shadow-[0_4px_12px_rgba(255,106,213,0.3)]">R</span>
            <span className="w-[38px] h-[38px] rounded-full bg-[linear-gradient(135deg,rgba(255,106,213,0.2),rgba(129,92,255,0.2))] border-2 border-white/15 grid place-items-center font-semibold text-[0.9rem] transition-all hover:scale-110 hover:border-pink-400/50 hover:shadow-[0_4px_12px_rgba(255,106,213,0.3)]">K</span>
          </div>
        </article>

        <article className="col-start-2 row-start-2 bg-[rgba(20,14,40,0.85)] border border-white/10 rounded-3xl p-3 backdrop-blur-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all relative overflow-hidden text-center flex flex-col justify-center items-center before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] hover:border-pink-400/30 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(129,92,255,0.2)]">
          <p className="text-[#a397c4] text-xs uppercase tracking-[0.1em] font-semibold mb-1">Investment Style</p>
          <div className="my-3 w-[100px] h-[100px] rounded-full relative grid place-items-center font-bold text-xs uppercase tracking-[0.05em] bg-[radial-gradient(circle_at_center,rgba(129,92,255,0.15)_0%,rgba(255,106,213,0.08)_50%,transparent_70%)] before:content-[''] before:absolute before:inset-0 before:rounded-full before:border-[3px] before:border-transparent before:border-t-[#ff6ad5] before:border-r-[#815cff] before:border-b-[rgba(255,106,213,0.3)] before:border-l-[rgba(129,92,255,0.3)] after:content-[''] after:absolute after:inset-2 after:rounded-full after:border-2 after:border-white/10 after:shadow-[0_0_20px_rgba(255,106,213,0.3),inset_0_0_20px_rgba(129,92,255,0.2)]">
            <span className="relative z-10">Aggressive</span>
          </div>
          <div className="flex flex-col gap-1.5 text-xs text-[#c7c1dc] font-medium">
            <span>DeFi 55%</span>
            <span>AI 30%</span>
            <span>Stable 15%</span>
          </div>
        </article>

        <article className="col-start-3 row-start-2 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center justify-center bg-[linear-gradient(135deg,rgba(255,106,213,0.08),rgba(129,92,255,0.08))] border border-white/10 p-0 hover:border-pink-400/30 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(129,92,255,0.2)] transition-all">
          <img src="/src/img/usricon.png" alt="User Icon" className="w-full h-full object-cover block transition-transform hover:scale-105" />
        </article>
      </section>

      <CryptoLogos />
    </main>
  )
}

export default Hero
