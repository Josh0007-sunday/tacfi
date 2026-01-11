import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin') || 'null');

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
      <div className="text-white text-lg font-semibold">Admin Panel{admin ? ` — ${admin.name}` : ''}</div>
      <div className="flex items-center gap-3">
        <button onClick={logout} className="px-3 py-1 bg-red-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500">Logout</button>
      </div>
    </div>
  );
};

export default AdminNavbar;
