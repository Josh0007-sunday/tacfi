import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import { QRCodeSVG } from 'qrcode.react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const treasuryWallet = "6tiGkVDyQB6884Lhm3fUnytGRe6CP1zrdkfxn7YXsWCf";

const Deposit = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [manualAmount, setManualAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleManualDeposit = async () => {
    if (!manualAmount || parseFloat(manualAmount) <= 0 || !transactionHash || !walletAddress) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/deposits/manual`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: parseFloat(manualAmount),
          transactionHash,
          walletAddress,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Your manual deposit has been recorded. It will be verified shortly.' });
        setManualAmount('');
        setTransactionHash('');
        setWalletAddress('');
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to record manual deposit.' });
      }
    } catch (error) {
      console.error('Error recording manual deposit:', error);
      setMessage({ type: 'error', text: 'Failed to record manual deposit.' });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020107] via-[#0a0514] to-[#020107]">
      <DashboardHeader user={user} />
      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Deposit Funds</h1>
          <p className="text-gray-400">Add funds to your account.</p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg mb-4 ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/20'
                : 'bg-red-500/10 border border-red-500/20'
            }`}
          >
            <p className={`text-sm ${
              message.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {message.text}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Automatic Deposit</h2>
            <div className="flex justify-center mx-auto">
              <p className="text-gray-400">Automatic (Helio) deposits are disabled. Use Manual Transfer below.</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Manual Transfer</h2>
            <div className="space-y-6"> {/* Increased spacing */}
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <QRCodeSVG value={treasuryWallet} size={256} bgColor="#ffffff" fgColor="#000000" /> {/* Increased size */}
                </div>
                <p className="text-gray-400 text-sm mb-2">Treasury Wallet:</p>
                <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-2">
                  <span className="text-white font-mono text-sm break-all">{treasuryWallet}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(treasuryWallet)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 3a1 1 0 011-1h6a1 1 0 011 1v2.586l1.293-1.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 5.586V3z" />
                      <path d="M3.5 7.5A1.5 1.5 0 015 6h10a1.5 1.5 0 011.5 1.5v7A1.5 1.5 0 0115 16H5a1.5 1.5 0 01-1.5-1.5v-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-4"> {/* Grouped input fields */}
                <div>
                  <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Wallet Address
                  </label>
                  <input
                    type="text"
                    id="walletAddress"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="Your wallet address"
                  />
                </div>

                <div>
                  <label htmlFor="transactionHash" className="block text-sm font-medium text-gray-400 mb-2">
                    Transaction Hash
                  </label>
                  <input
                    type="text"
                    id="transactionHash"
                    value={transactionHash}
                    onChange={(e) => setTransactionHash(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="Transaction hash"
                  />
                </div>

                <div>
                  <label htmlFor="manualAmount" className="block text-sm font-medium text-gray-400 mb-2">
                    Amount Sent (USD)
                  </label>
                  <input
                    type="number"
                    id="manualAmount"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="e.g., 50"
                  />
                </div>
              </div>

              <button
                onClick={handleManualDeposit}
                style={{ backgroundColor: '#F000B0' }} // Changed button color
                className="w-full text-white font-bold py-2 px-4 rounded-lg mt-4 hover:opacity-90 transition-all"
              >
                I've Paid
              </button>
              <p className="text-gray-500 text-xs text-center">
                Recommended verification takes between 1-3 mins.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Deposit;
