import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoRocketSharp } from 'react-icons/io5';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { login } from './api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(formData);

      if (response.success) {
        // Show success message
        alert('Login successful! Welcome back to TACFI.');
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
         style={{
           background: '#020107',
           backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(129, 92, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 106, 213, 0.15) 0%, transparent 50%)'
         }}>
      <div className="w-full max-w-[480px]">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                 style={{ background: 'linear-gradient(135deg, #ff6ad5 0%, #815cff 100%)' }}>
              <IoRocketSharp className="text-white text-2xl" />
            </div>
            <span className="text-3xl font-bold" style={{ color: '#f7f5ff', letterSpacing: '0.02em' }}>TACFI</span>
          </Link>
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#f7f5ff', letterSpacing: '-0.02em' }}>
            Welcome Back
          </h1>
          <p style={{ color: '#a397c4', fontSize: '1.0625rem' }}>
            Sign in to continue to your portfolio
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '48px 40px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          marginBottom: '24px'
        }}>
          {/* Error Message */}
          {error && (
            <div style={{
              padding: '12px 16px',
              marginBottom: '24px',
              borderRadius: '12px',
              background: 'rgba(255, 107, 107, 0.1)',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              color: '#ff6b6b',
              fontSize: '0.9375rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" style={{
                display: 'block',
                fontSize: '0.9375rem',
                fontWeight: '600',
                marginBottom: '10px',
                color: '#e4e0f0'
              }}>
                Email Address
              </label>
              <div className="relative">
                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{ color: '#9d92b7', fontSize: '1.25rem' }} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full outline-none transition-all duration-300"
                  style={{
                    paddingLeft: '3rem',
                    paddingRight: '1rem',
                    paddingTop: '0.875rem',
                    paddingBottom: '0.875rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1.5px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#f7f5ff',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                  placeholder="john@example.com"
                  required
                  onFocus={(e) => e.target.style.borderColor = '#815cff'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: '10px' }}>
                <label htmlFor="password" style={{
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  color: '#e4e0f0'
                }}>
                  Password
                </label>
                <a href="#" style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#815cff',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <MdLock className="absolute left-4 top-1/2 -translate-y-1/2"
                       style={{ color: '#9d92b7', fontSize: '1.25rem' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full outline-none transition-all duration-300"
                  style={{
                    paddingLeft: '3rem',
                    paddingRight: '3.5rem',
                    paddingTop: '0.875rem',
                    paddingBottom: '0.875rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1.5px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#f7f5ff',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                  placeholder="••••••••"
                  required
                  onFocus={(e) => e.target.style.borderColor = '#815cff'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:opacity-70 transition-opacity"
                  style={{ color: '#9d92b7' }}
                >
                  {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3" style={{ marginTop: '-8px' }}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#815cff',
                  cursor: 'pointer'
                }}
              />
              <label htmlFor="remember" style={{
                color: '#c7c1dc',
                fontSize: '0.9375rem',
                cursor: 'pointer'
              }}>
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-semibold text-white transition-all duration-300"
              style={{
                background: loading ? '#6b6b6b' : 'linear-gradient(135deg, #ff6ad5 0%, #815cff 100%)',
                padding: '1rem',
                borderRadius: '12px',
                border: 'none',
                fontSize: '1.0625rem',
                marginTop: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 20px rgba(129, 92, 255, 0.3)',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(129, 92, 255, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(129, 92, 255, 0.3)';
                }
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Signup Link */}
        <p className="text-center" style={{ color: '#c7c1dc', fontSize: '0.9375rem', marginBottom: '32px' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{
            color: '#815cff',
            fontWeight: '600',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
            Create account
          </Link>
        </p>

        {/* Security Badge */}
        <div className="text-center">
          <p style={{ color: '#9d92b7', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Secured by 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
