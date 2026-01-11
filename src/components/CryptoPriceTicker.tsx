import { useEffect, useState } from 'react';

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const CryptoPriceTicker = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);

  const cryptoIds = ['bitcoin', 'ethereum', 'solana', 'usd-coin', 'tether', 'binancecoin'];

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoIds.join(',')}&order=market_cap_desc&sparkline=false`
        );
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    // Refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-[#1a0f2e] to-[#0f051a] border-b border-white/10 px-6 py-4">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-32 h-12 bg-white/5 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#1a0f2e] to-[#0f051a] border-b border-white/10 sticky top-[72px] z-40">
      <div className="max-w-[1800px] mx-auto px-6 py-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {prices.map((crypto) => (
            <div
              key={crypto.id}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-purple-500/30 transition-all"
            >
              <img src={crypto.image} alt={crypto.name} className="w-6 h-6 rounded-full" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-400 uppercase">{crypto.symbol}</span>
                <span className="text-sm font-bold text-white">${crypto.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <span
                className={`text-xs font-semibold ml-1 ${
                  crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {crypto.price_change_percentage_24h >= 0 ? '↑' : '↓'} {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoPriceTicker;
