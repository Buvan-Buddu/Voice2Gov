import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const { user, login, isLoading } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-bg flex flex-col items-center justify-center p-4 font-sans gradient-mesh">
      
      <div className="w-full max-w-[420px] bg-white dark:bg-dark-card rounded-2xl shadow-glass dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] p-8 sm:p-10 border border-gray-100/80 dark:border-gray-700/50">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-900 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-primary-900/20 ring-1 ring-white/10">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 4v16" />
              <path d="M8 8v8" />
              <path d="M16 8v8" />
              <path d="M4 11v2" />
              <path d="M20 11v2" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-primary-900 dark:text-white">Voice2Gov</h1>
          <p className="text-[14px] text-gray-500 dark:text-gray-400 mt-1 font-medium">Digital Concierge for Civic Change</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 tracking-wider mb-2 uppercase">
              Email Address
            </label>
            <div className="flex items-center px-4 py-3.5 border border-gray-200 dark:border-gray-600 rounded-xl focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 transition-all bg-white dark:bg-dark-elevated">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <input 
                type="email" 
                placeholder="e.g. name@agency.gov" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-[15px] ml-3 text-primary-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Password</label>
              <Link to="/forgot-password" className="text-[12px] font-bold text-primary-600 dark:text-accent-400 hover:text-primary-700 dark:hover:text-accent-300 transition-colors">Forgot Password?</Link>
            </div>
            <div className="flex items-center px-4 py-3.5 border border-gray-200 dark:border-gray-600 rounded-xl focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 transition-all bg-white dark:bg-dark-elevated">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-[15px] ml-3 text-primary-900 dark:text-white tracking-widest placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white rounded-xl font-bold text-[15px] transition-all focus:ring-4 focus:ring-primary-500/20 outline-none flex items-center justify-center shadow-lg shadow-primary-700/20 ${isLoading ? 'opacity-80 cursor-not-allowed' : 'active:scale-[0.98]'}`}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <button 
              type="button"
              className="w-full py-3.5 bg-white dark:bg-dark-elevated border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-dark-elevated/80 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-[14px] transition-all flex items-center justify-center"
              onClick={() => { setEmail('test@agency.gov'); setPassword('password'); }}
            >
              Mock Quick Fill
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-[14px] text-gray-500 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 dark:text-accent-400 font-bold hover:text-primary-700 dark:hover:text-accent-300 transition-colors">Register Now</Link>
        </div>
      </div>

      <div className="mt-10 flex space-x-8">
        <span className="text-[11px] font-bold text-gray-400 tracking-widest hover:text-primary-600 dark:hover:text-accent-400 transition-colors cursor-pointer">PRIVACY POLICY</span>
        <span className="text-[11px] font-bold text-gray-400 tracking-widest hover:text-primary-600 dark:hover:text-accent-400 transition-colors cursor-pointer">CIVIC STANDARDS</span>
        <span className="text-[11px] font-bold text-gray-400 tracking-widest hover:text-primary-600 dark:hover:text-accent-400 transition-colors cursor-pointer">SUPPORT</span>
      </div>
      
    </div>
  );
};

export default Login;
