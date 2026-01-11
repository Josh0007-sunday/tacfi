import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import { IoPersonOutline, IoMailOutline, IoCalendarOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setFormData({
      name: parsedUser.name || '',
      email: parsedUser.email || '',
      bio: parsedUser.bio || '',
      location: parsedUser.location || '',
      website: parsedUser.website || '',
    });
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Update user data in localStorage
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020107] via-[#0a0514] to-[#020107]">
      <DashboardHeader user={user} />

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-6">
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
              <p className="text-gray-400 mb-3">{user.email}</p>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold uppercase tracking-wide w-fit">
                <IoShieldCheckmarkOutline size={16} />
                {user.plan} Plan
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-all"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <IoPersonOutline className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <IoMailOutline className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all disabled:cursor-not-allowed disabled:opacity-60 resize-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Save Button */}
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-all"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Account Stats */}
          <div className="space-y-6">
            {/* Account Status */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Status</span>
                  <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold rounded">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Member Since</span>
                  <span className="text-sm text-white font-medium">Jan 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Trades</span>
                  <span className="text-sm text-white font-medium">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Volume</span>
                  <span className="text-sm text-white font-medium">$156,789</span>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Security</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IoShieldCheckmarkOutline className="text-green-400" size={18} />
                    <span className="text-sm text-gray-300">2FA Enabled</span>
                  </div>
                  <span className="text-xs text-green-400 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IoMailOutline className="text-green-400" size={18} />
                    <span className="text-sm text-gray-300">Email Verified</span>
                  </div>
                  <span className="text-xs text-green-400 font-medium">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IoCalendarOutline className="text-gray-400" size={18} />
                    <span className="text-sm text-gray-300">Last Login</span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">Today, 2:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
