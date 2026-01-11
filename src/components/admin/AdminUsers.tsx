import { useCallback, useEffect, useState } from 'react';
import { getAdminUsers, deleteAdminUser, updateAdminUser } from '../../utils/api';

const AdminUsers = ({ onViewPending }: { onViewPending?: (userId: string) => void }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [edits, setEdits] = useState<any>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAdminUsers();
      setUsers(res.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete user?')) return;
    try {
      await deleteAdminUser(id);
      await load();
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
    }
  };

  const startEdit = (u: any) => { setEditingId(u._id); setEdits({ plan: u.plan, balance: u.balance }); };
  const cancelEdit = () => { setEditingId(null); setEdits({}); };
  const saveEdit = async (id: string) => {
    try {
      await updateAdminUser(id, edits);
      setEditingId(null);
      await load();
    } catch (err: any) { setError(err.message || 'Failed to save'); }
  };



  return (
    <div className="w-full">
      <div>
        <h2 className="text-white text-2xl mb-4">Users</h2>
        {error && <div className="text-red-400 mb-2">{error}</div>}
        {loading && <div className="text-gray-300">Loading...</div>}
        <div className="bg-white/5 p-6 rounded-lg shadow-sm border border-white/6 overflow-x-auto">
          <table className="w-full text-left table-auto divide-y divide-white/5">
            <thead>
              <tr className="text-sm text-gray-300">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium">Balance</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-t border-white/5">
                  <td className="p-4">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">{editingId === u._id ? (<input className="w-full p-2 rounded bg-black/20" value={edits.plan} onChange={e => setEdits({ ...edits, plan: e.target.value })} />) : u.plan}</td>
                  <td className="p-4">{editingId === u._id ? (<input className="w-28 p-2 rounded bg-black/20" type="number" value={edits.balance} onChange={e => setEdits({ ...edits, balance: parseFloat(e.target.value || '0') })} />) : `$${u.balance}`}</td>
                  <td className="p-4">
                    {editingId === u._id ? (
                      <div className="flex items-center gap-3">
                        <button onClick={() => saveEdit(u._id)} className="px-4 py-2 bg-green-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-400">Save</button>
                        <button onClick={cancelEdit} className="px-4 py-2 bg-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-gray-500">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button onClick={() => startEdit(u)} className="px-4 py-2 bg-purple-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500">Edit</button>
                        <button onClick={() => handleDelete(u._id)} className="px-4 py-2 bg-red-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>
                        <button onClick={() => onViewPending?.(u._id)} className="px-4 py-2 bg-blue-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500">View Pending</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
};

export default AdminUsers;
