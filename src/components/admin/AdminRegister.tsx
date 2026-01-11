import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminSignup, adminLogin } from '../../utils/api';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await adminSignup({ name, email, password });
      if (res.success) {
        // Optionally auto-login the admin
        try {
          const loginRes = await adminLogin({ email, password });
          if (loginRes.success) {
            navigate('/admin');
            return;
          }
        } catch (_) {
          // If auto-login fails, redirect to admin login page
        }
        navigate('/admin/login');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#020107' }}>
      <div className="w-full max-w-md p-8 bg-white/5 rounded-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Admin Register</h2>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 rounded bg-gray-800/60 text-white" />
          <input required type="email" placeholder="admin@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 rounded bg-gray-800/60 text-white" />
          <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 rounded bg-gray-800/60 text-white" />
          <input required type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full p-2 rounded bg-gray-800/60 text-white" />
          <button type="submit" disabled={loading} className="w-full py-2 rounded bg-purple-600 text-white">{loading ? 'Registering...' : 'Register'}</button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
