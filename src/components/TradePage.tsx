import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import TradingViewWidget from './TradingViewWidget';
import DashboardHeader from './DashboardHeader';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TradePage = () => {
  const { tokenId } = useParams<{ tokenId: string }>();
  const [tokenData, setTokenData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentLoading, setInvestmentLoading] = useState(false);
  const [investmentError, setInvestmentError] = useState<string | null>(null);
  const [investments, setInvestments] = useState<any[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle case where user is not logged in
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success && data.data.user) {
        setUser(data.data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!tokenId) return;
      try {
        setLoading(true);
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${tokenId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch token data');
        }
        const data = await response.json();
        setTokenData(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
    fetchUser();

    // Fetch user data every 30 seconds
    intervalRef.current = window.setInterval(fetchUser, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tokenId]);

  const fetchInvestments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setActivityLoading(false);
      return;
    }
    try {
      setActivityLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/bot/investments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setInvestments(data.investments);
      }
    } catch (error) {
      console.error('Error fetching investments:', error);
    } finally {
      setActivityLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, [user]);

  const handleInvest = async () => {
    const token = localStorage.getItem('token');
    if (!token || !tokenId || !investmentAmount) {
      return;
    }

    setInvestmentLoading(true);
    setInvestmentError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/bot/invest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tokenId,
          amount: parseFloat(investmentAmount),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Investment failed');
      }

      setUser((prevUser: any) => ({ ...prevUser, balance: data.balance }));
      setInvestmentAmount('');
      fetchInvestments(); // Re-fetch investments after a successful investment
      // Optionally, show a success message
    } catch (err: any) {
      setInvestmentError(err.message);
    } finally {
      setInvestmentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020107] via-[#0a0514] to-[#020107] text-white">
      {user && <DashboardHeader user={user} />}
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column (20%) */}
          <div className="lg:col-span-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Token Info</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {tokenData && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={tokenData.image.large} alt={tokenData.name} className="w-12 h-12" />
                  <div>
                    <h3 className="text-2xl font-bold">{tokenData.name}</h3>
                    <p className="text-gray-400 text-lg">{tokenData.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Price:</span> ${tokenData.market_data.current_price.usd.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Market Cap:</span> ${tokenData.market_data.market_cap.usd.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">24h Change:</span>{' '}
                    <span
                      className={
                        tokenData.market_data.price_change_percentage_24h > 0
                          ? 'text-green-400'
                          : 'text-red-400'
                      }
                    >
                      {tokenData.market_data.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Center Column (60%) */}
          <div className="lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Trading View</h2>
            <div className="h-96 bg-black/20 rounded-lg">
              {tokenData ? (
                <TradingViewWidget symbol={tokenData.symbol} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p>Loading chart...</p>
                </div>
              )}
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Activity</h2>
              {activityLoading ? (
                <p>Loading activity...</p>
              ) : investments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        <th className="p-2">Token</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Bot P/L</th> {/* New header */}
                      </tr>
                    </thead>
                    <tbody>
                      {investments.map((investment) => (
                        <tr key={investment._id} className="border-b border-white/10">
                          <td className="p-2">{investment.tokenId}</td>
                          <td className="p-2">${investment.amount.toLocaleString()}</td>
                          <td className="p-2">
                            {new Date(investment.createdAt).toLocaleDateString()}{' '}
                            {new Date(investment.createdAt).toLocaleTimeString()}
                          </td>
                          <td className="p-2">
                            ${(investment.earnings || 0).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No investment activity yet.</p>
              )}
            </div>
          </div>

          {/* Right Column (20%) */}
          <div className="lg:col-span-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Trade</h2>
            {user ? (
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Your Balance:</p>
                  <p className="text-2xl font-bold">${user.balance.toLocaleString()}</p>
                </div>
                <div>
                  <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-400">
                    Amount to Invest
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      name="investmentAmount"
                      id="investmentAmount"
                      className="bg-black/20 w-full pl-7 pr-12 sm:text-sm border-white/10 rounded-md py-2 text-white"
                      placeholder="0.00"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  onClick={handleInvest}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                  disabled={investmentLoading}
                >
                  {investmentLoading ? 'Investing...' : 'Invest'}
                </button>
                {investmentError && <p className="text-red-500 text-sm mt-2">{investmentError}</p>}
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradePage;
