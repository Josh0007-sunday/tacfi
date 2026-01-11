import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import DashboardHeader from './DashboardHeader';
import CryptoPriceTicker from './CryptoPriceTicker';
import InfoFAQ from './InfoFAQ';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  const [cryptoPrices, setCryptoPrices] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));

    const fetchBalance = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Fetched data:', data);
        if (data.success && data.data.user) {
          setUser(data.data.user);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();

    // Fetch crypto prices
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,usd-coin,tether,binancecoin&order=market_cap_desc&sparkline=false'
        );
        const data = await response.json();
        setCryptoPrices(data);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };

    fetchCryptoPrices();
    const priceInterval = setInterval(fetchCryptoPrices, 30000);
    return () => clearInterval(priceInterval);
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020107] via-[#0a0514] to-[#020107]">
      <DashboardHeader user={user} />
      <CryptoPriceTicker />

      <main className="max-w-[1800px] mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* Trading Terminal - Token List */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Trading Terminal</h2>
          </div>

          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-black/20">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Token</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">24h Change</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Market Cap</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {cryptoPrices.length > 0 ? (
                  cryptoPrices.map((crypto) => (
                    <tr
                      key={crypto.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={crypto.image}
                            alt={crypto.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-white font-semibold">{crypto.symbol.toUpperCase()}</p>
                            <p className="text-gray-500 text-sm">{crypto.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-white font-bold">
                          ${crypto.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {crypto.price_change_percentage_24h >= 0 ? (
                            <>
                              <MdTrendingUp className="text-green-400 text-lg" />
                              <span className="text-green-400 font-semibold">
                                +{crypto.price_change_percentage_24h.toFixed(2)}%
                              </span>
                            </>
                          ) : (
                            <>
                              <MdTrendingDown className="text-red-400 text-lg" />
                              <span className="text-red-400 font-semibold">
                                {crypto.price_change_percentage_24h.toFixed(2)}%
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-gray-300 font-semibold">
                          ${(crypto.market_cap / 1e9).toFixed(2)}B
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => navigate(`/trade/${crypto.id}`)}
                          className="px-6 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-semibold hover:bg-purple-500/30 transition-all"
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                      <p>Loading token data...</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <InfoFAQ />
      </main>
    </div>
  );
};

export default Dashboard;