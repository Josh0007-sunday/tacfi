import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../utils/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await adminLogin({ email, password });
      if (res.success) {
        navigate('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#020107' }}>
      <div className="w-full max-w-md p-8 bg-white/5 rounded-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Admin Login</h2>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="email" placeholder="admin@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 rounded bg-gray-800/60 text-white" />
          <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 rounded bg-gray-800/60 text-white" />
          <button type="submit" disabled={loading} className="w-full py-2 rounded bg-purple-600 text-white">{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
