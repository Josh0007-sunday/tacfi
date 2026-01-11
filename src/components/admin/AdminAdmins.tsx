import { useEffect, useState } from 'react';
import { getAdminsApi, deleteAdminApi } from '../../utils/api';

const AdminAdmins = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAdminsApi();
      setAdmins(res.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete admin?')) return;
    try {
      await deleteAdminApi(id);
      await load();
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
    }
  };

  return (
    <div>
      <h2 className="text-white text-2xl mb-4">Admins</h2>
      {error && <div className="text-red-400 mb-2">{error}</div>}
      {loading && <div className="text-gray-300">Loading...</div>}
      <div className="bg-white/5 p-4 rounded-md shadow-sm">
        <ul>
          {admins.map(a => (
            <li key={a._id} className="flex justify-between items-center p-2 border-b border-white/5">
              <div>
                <div className="text-white font-bold">{a.name}</div>
                <div className="text-gray-400 text-sm">{a.email}</div>
              </div>
              <div>
                <button onClick={() => handleDelete(a._id)} className="px-2 py-1 bg-red-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminAdmins;
