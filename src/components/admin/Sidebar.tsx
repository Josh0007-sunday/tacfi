import React from 'react';


type View = 'pending' | 'users' | 'admins';

const Sidebar = ({ view, setView }: { view: View; setView: React.Dispatch<React.SetStateAction<View>> }) => {
  return (
    <aside className="h-full bg-white/5 p-6 rounded-md min-h-[220px]">
      <nav className="space-y-3">
        <button className={`w-full text-left p-3 rounded text-sm font-medium transition-colors ${view === 'pending' ? 'bg-purple-600 text-white' : 'hover:bg-white/3 text-gray-200'}`} onClick={() => setView('pending')}>Pending Deposits</button>
        <button className={`w-full text-left p-3 rounded text-sm font-medium transition-colors ${view === 'users' ? 'bg-purple-600 text-white' : 'hover:bg-white/3 text-gray-200'}`} onClick={() => setView('users')}>Users</button>
        <button className={`w-full text-left p-3 rounded text-sm font-medium transition-colors ${view === 'admins' ? 'bg-purple-600 text-white' : 'hover:bg-white/3 text-gray-200'}`} onClick={() => setView('admins')}>Admins</button>
      </nav>
    </aside> 
  );
};

export default Sidebar;