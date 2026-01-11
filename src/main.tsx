import React, { type JSX } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LandingPage from './components/LandingPage'
import Login from './utils/Login'
import Signup from './utils/Signup'
import TradePage from './components/TradePage'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Settings from './components/Settings'
import Deposit from './components/Deposit'
import WalletContextProvider from './components/WalletContextProvider'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminRegister from './components/admin/AdminRegister'

// Optionally protect admin route with a simple client-side guard (checks isAdmin flag)
function AdminRoute({ element }: { element: JSX.Element }) {
  const isAdmin = localStorage.getItem('isAdmin');
  if (!isAdmin) {
    // client-side redirect to admin login
    return <AdminLogin />;
  }
  return element;
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <WalletContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/trade/:tokenId" element={<TradePage />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
          {/* Backwards-compatible admin paths */}
          <Route path="/admin/login/legacy" element={<AdminLogin />} />
          <Route path="/admin/register/legacy" element={<AdminRegister />} />
        </Routes>
      </BrowserRouter>
    </WalletContextProvider>
  </React.StrictMode>,
)
