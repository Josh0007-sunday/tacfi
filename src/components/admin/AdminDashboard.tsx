import { useCallback, useEffect, useState } from 'react';
import { getPendingDeposits, verifyManualDepositApi, getAdminUser } from '../../utils/api';
import Sidebar from './Sidebar';
import AdminUsers from './AdminUsers';
import AdminAdmins from './AdminAdmins';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState<'pending'|'users'|'admins'>('pending');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [loadingPending, setLoadingPending] = useState(false);
  const [pendingError, setPendingError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getPendingDeposits();
      setPending(res.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const viewPending = async (userId: string) => {
    setLoadingPending(true);
    setPendingError('');
    try {
      const res = await getAdminUser(userId);
      setSelectedUser(res.data || null);
    } catch (err: any) {
      setPendingError(err.message || 'Failed to load user deposits');
    } finally {
      setLoadingPending(false);
    }
  };

  const handleViewPendingFromUsers = (userId?: string) => {
    if (userId) {
      viewPending(userId);
    }
  };

  const handleVerify = async (userId: string, depositId: string) => {
    try {
      await verifyManualDepositApi(userId, depositId);
      await load();
      if (selectedUser && selectedUser._id === userId) await viewPending(userId);
    } catch (err: any) {
      setError(err.message || 'Failed to verify');
    }
  };

  return (
    <div className="min-h-screen py-10 px-2 md:px-6 lg:px-10" style={{ background: '#020107' }}>
      <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3 col-span-1">
          <Sidebar view={view} setView={setView} />
        </div>
        <div className="md:col-span-9 col-span-1">
          <div className="bg-white/5 p-8 rounded-lg shadow-lg border border-white/5 min-h-[420px]">
            <AdminNavbar />
            {error && <div className="text-red-400 mb-4">{error}</div>}
            {view === 'pending' && (
            <div>
              {loading && <div className="text-gray-300">Loading...</div>}
              {!loading && pending.length === 0 && <div className="text-gray-300">No pending deposits</div>}
              {!loading && pending.map(u => (
                <div key={u.userId} className="bg-white/5 p-6 rounded-lg mb-4 shadow-sm border border-white/6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <div className="text-white font-bold">{u.name} — {u.email}</div>
                      <div className="text-sm text-gray-300">{u.deposits.length} pending</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {u.deposits.map((d: any) => (
                      <div key={d._id} className="bg-gray-800/50 p-4 rounded flex justify-between items-center">
                        <div>
                          <div className="text-gray-100">Amount: ${d.amount}</div>
                          <div className="text-gray-400 text-sm break-all">Tx: {d.transactionHash || '—'}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => handleVerify(u.userId, d._id)} className="px-3 py-2 rounded bg-green-600 text-white focus:outline-none focus:ring-2 focus:ring-green-400">Verify</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

            {view === 'users' && <AdminUsers onViewPending={handleViewPendingFromUsers} />}
            {view === 'admins' && <AdminAdmins />}
          </div>
        </div>

        {selectedUser && view === 'users' && (
          <aside className="md:col-span-3 col-span-1">
            <div className="sticky top-24">
              <div className="h-full bg-white/5 p-6 rounded-lg shadow-lg border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white text-lg font-semibold">Pending Deposits</h3>
                  <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-white">✕</button>
                </div>

                <div className="mb-4 pb-4 border-b border-white/10">
                  <div className="text-white font-bold">{selectedUser.name}</div>
                  <div className="text-sm text-gray-400">{selectedUser.email}</div>
                </div>

                <div className="min-h-[200px] max-h-[60vh] overflow-y-auto space-y-3">
                  {loadingPending && <div className="text-gray-300">Loading...</div>}
                  {pendingError && <div className="text-red-400 mb-2">{pendingError}</div>}

                  {!loadingPending && selectedUser.manualDeposits && selectedUser.manualDeposits.filter((d: any) => d.status === 'pending').length === 0 && (
                    <div className="text-gray-300">No pending deposits</div>
                  )}

                  {!loadingPending && selectedUser.manualDeposits && selectedUser.manualDeposits.filter((d: any) => d.status === 'pending').map((d: any) => (
                    <div key={d._id} className="bg-gray-800/50 p-4 rounded-lg border border-white/10">
                      <div className="text-gray-100 font-medium mb-2">Amount: ${d.amount}</div>
                      <div className="text-gray-400 text-sm break-all mb-3">Tx: {d.transactionHash || '—'}</div>
                      <button onClick={() => handleVerify(selectedUser._id, d._id)} className="w-full px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400">Verify</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
