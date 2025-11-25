import { IoRocketSharp } from 'react-icons/io5'

const CryptoLogos = () => {
  return (
    <section className="crypto-logos-section">
      <div className="crypto-logos">
        <div className="crypto-logos-left">
          <img src="https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400" alt="Bitcoin" />
          <img src="https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628" alt="Ethereum" />
          <img src="https://assets.coingecko.com/coins/images/44/standard/xrp-symbol-white-128.png?1696501442" alt="XRP" />
          <img src="https://assets.coingecko.com/coins/images/4128/standard/solana.png?1718769756" alt="Solana" />
          <img src="https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694" alt="USDC" />
        </div>

        <div className="crypto-logos-center">
          <div className="rocket-container">
            <div className="loading-circle"></div>
            <div className="rocket-icon">
              <IoRocketSharp size={50} />
            </div>
          </div>
        </div>

        <div className="crypto-logos-right">
          <img src="https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661" alt="USDT" />
          <img src="https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970" alt="BNB" />
          <img src="https://assets.coingecko.com/coins/images/975/standard/cardano.png?1696502090" alt="Cardano" />
          <img src="https://assets.coingecko.com/coins/images/486/standard/circle-zcash-color.png?1696501740" alt="Zcash" />
          <img src="https://assets.coingecko.com/coins/images/5/standard/dogecoin.png?1696501409" alt="Dogecoin" />
        </div>
      </div>

      <div className="crypto-cta">
        <h2 className="crypto-count">10k Crypto Assets<br/>Available to trade</h2>
        <div className="crypto-buttons">
          <button className="crypto-btn crypto-btn-primary">Trade Now</button>
          <button className="crypto-btn crypto-btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  )
}

export default CryptoLogos
