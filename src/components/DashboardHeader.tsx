import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoRocketSharp, IoLogOutOutline, IoPersonOutline, IoSettingsOutline, IoWalletOutline } from 'react-icons/io5';
import { MdNotifications } from 'react-icons/md';
import { logout } from '../utils/api';

interface DashboardHeaderProps {
  user: {
    name: string;
    email: string;
    plan: string;
    balance: number;
  };
}

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0514]/95 backdrop-blur-xl">
      <div className="max-w-[1800px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <IoRocketSharp className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold text-white">TACFI</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Deposit Button */}
            <Link
              to="/deposit"
              className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold text-sm transition-all flex items-center gap-2 no-underline"
            >
              <IoWalletOutline size={18} />
              Deposit
            </Link>

            {/* Plan Badge */}
            <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wide">
              {user.plan}
            </div>

            {/* Balance */}
            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <span className="text-white text-sm font-semibold">${user.balance ? user.balance.toLocaleString() : '0.00'}</span>
            </div>

            {/* Notifications */}
            <button className="relative w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
              <MdNotifications className="text-gray-400 text-lg" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-green-400" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-white text-sm font-medium">{user.name.split(' ')[0]}</span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-[#0a0514]/98 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                  <div className="px-4 py-3 border-b border-white/10">
                    <div className="text-white text-sm font-semibold">{user.name}</div>
                    <div className="text-gray-400 text-xs mt-0.5 truncate">{user.email}</div>
                  </div>

                  <div className="p-2">
                    <Link
                      to="/profile"
                      className="w-full px-3 py-2 rounded-lg flex items-center gap-3 text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm no-underline"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <IoPersonOutline size={18} />
                      Profile
                    </Link>

                    <Link
                      to="/settings"
                      className="w-full px-3 py-2 rounded-lg flex items-center gap-3 text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm no-underline"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <IoSettingsOutline size={18} />
                      Settings
                    </Link>

                    <div className="h-px bg-white/10 my-2" />

                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 rounded-lg flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition-all text-sm"
                    >
                      <IoLogOutOutline size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
