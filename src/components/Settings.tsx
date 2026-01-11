import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import {
  IoNotificationsOutline,
  IoShieldCheckmarkOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoMoonOutline,
  IoLanguageOutline,
  IoWalletOutline,
} from 'react-icons/io5';

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications' | 'privacy'>('general');

  const [settings, setSettings] = useState({
    // General
    language: 'English',
    currency: 'USD',
    timezone: 'UTC',
    theme: 'dark',

    // Notifications
    emailNotifications: true,
    tradeAlerts: true,
    priceAlerts: false,
    newsletters: true,

    // Security
    twoFactorAuth: true,
    loginAlerts: true,

    // Privacy
    profileVisibility: 'public',
    showBalance: true,
    showActivity: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleToggle = (key: string) => {
    setSettings({
      ...settings,
      [key]: !settings[key as keyof typeof settings],
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Handle password change logic here
    alert('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  if (!user) {
    return null;
  }

  const tabs = [
    { id: 'general', label: 'General', icon: IoLanguageOutline },
    { id: 'security', label: 'Security', icon: IoShieldCheckmarkOutline },
    { id: 'notifications', label: 'Notifications', icon: IoNotificationsOutline },
    { id: 'privacy', label: 'Privacy', icon: IoLockClosedOutline },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020107] via-[#0a0514] to-[#020107]">
      <DashboardHeader user={user} />

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account preferences and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-500/20 text-white border border-purple-500/50'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">General Settings</h2>

                  <div className="space-y-6">
                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        <IoLanguageOutline className="inline mr-2" />
                        Language
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                    </div>

                    {/* Currency */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        <IoWalletOutline className="inline mr-2" />
                        Default Currency
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="BTC">BTC - Bitcoin</option>
                      </select>
                    </div>

                    {/* Theme */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        <IoMoonOutline className="inline mr-2" />
                        Theme
                      </label>
                      <select
                        value={settings.theme}
                        onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Timezone</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      >
                        <option value="UTC">UTC - Coordinated Universal Time</option>
                        <option value="EST">EST - Eastern Standard Time</option>
                        <option value="PST">PST - Pacific Standard Time</option>
                        <option value="GMT">GMT - Greenwich Mean Time</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>

                  <div className="space-y-6">
                    {/* Change Password */}
                    <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                      <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all pr-12"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                              {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-all"
                        >
                          Update Password
                        </button>
                      </form>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">Two-Factor Authentication</h3>
                        <p className="text-xs text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <button
                        onClick={() => handleToggle('twoFactorAuth')}
                        className={`relative w-12 h-6 rounded-full transition-all ${
                          settings.twoFactorAuth ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                            settings.twoFactorAuth ? 'right-0.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Login Alerts */}
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">Login Alerts</h3>
                        <p className="text-xs text-gray-400">Get notified of new login attempts</p>
                      </div>
                      <button
                        onClick={() => handleToggle('loginAlerts')}
                        className={`relative w-12 h-6 rounded-full transition-all ${
                          settings.loginAlerts ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                            settings.loginAlerts ? 'right-0.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">Email Notifications</h3>
                        <p className="text-xs text-gray-400">Receive updates via email</p>
                      </div>
                      <button
                        onClick={() => handleToggle('emailNotifications')}
                        className={`relative w-12 h-6 rounded-full transition-all ${
                          settings.emailNotifications ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                            settings.emailNotifications ? 'right-0.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">Trade Alerts</h3>
                        <p className="text-xs text-gray-400">Get notified when your trades execute</p>
                      </div>
                      <button
                        onClick={() => handleToggle('tradeAlerts')}
                        className={`relative w-12 h-6 rounded-full transition-all ${
                          settings.tradeAlerts ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                            settings.tradeAlerts ? 'right-0.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">Price Alerts</h3>
                        <p className="text-xs text-gray-400">Alerts when price targets are reached</p>
                      </div>
                      <button
                        onClick={() => handleToggle('priceAlerts')}
                        className={`relative w-12 h-6 rounded-full transition-all ${
                          settings.priceAlerts ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                            settings.priceAlerts ? 'right-0.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">Newsletters</h3>
                        <p className="text-xs text-gray-400">Weekly market updates and news</p>
                      </div>
                      <button
                        onClick={() => handleToggle('newsletters')}
                        className={`relative w-12 h-6 rounded-full transition-all ${
                          settings.newsletters ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                            settings.newsletters ? 'right-0.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Privacy Settings</h2>

                  <div className="space-y-6">
                    {/* Profile Visibility */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Profile Visibility</label>
                      <select
                        value={settings.profileVisibility}
                        onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="friends">Friends Only</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">Show Balance</h3>
                        <p className="text-xs text-gray-400">Display your portfolio balance publicly</p>
                      </div>
                      <button
                        onClick={() => handleToggle('showBalance')}
                        className={`relative w-12 h-6 rounded-full transition-all ${
                          settings.showBalance ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                            settings.showBalance ? 'right-0.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">Show Activity</h3>
                        <p className="text-xs text-gray-400">Display your trading activity publicly</p>
                      </div>
                      <button
                        onClick={() => handleToggle('showActivity')}
                        className={`relative w-12 h-6 rounded-full transition-all ${
                          settings.showActivity ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                            settings.showActivity ? 'right-0.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Save Button at Bottom */}
            <div className="mt-6">
              <button className="w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-all">
                Save All Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
