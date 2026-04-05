import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Loader2, ArrowRight, User, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const { login, isLoading } = useAppContext();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      await login(email, password);
      toast.success(`Welcome, ${name.split(' ')[0]}! Your account is ready.`, {
        icon: '🎉',
        duration: 4000
      });
      navigate('/dashboard');
    } catch (error) {
      // toast error handled
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-bg flex flex-col items-center justify-center p-6 font-sans gradient-mesh transition-colors duration-300">
      
      <div className="w-full max-w-[440px] pt-8">
        
        <div className="bg-white dark:bg-dark-card rounded-[32px] shadow-glass dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] p-8 sm:p-12 border border-gray-100/80 dark:border-gray-700/50 mb-8 relative z-10 w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-800"></div>
          
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-900/20 mb-5 ring-1 ring-white/10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v16M8 8v8M16 8v8M4 11v2M20 11v2" />
              </svg>
            </div>
            <h1 className="text-[28px] font-black text-primary-900 dark:text-white tracking-tight mb-1">Create Account</h1>
            <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400">Join Voice2Gov Civic Network</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[11px] font-bold text-primary-700 dark:text-primary-400 mb-2 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors">
                  <User size={18} strokeWidth={2.5} />
                </div>
                <input 
                  type="text" 
                  placeholder="e.g. John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-dark-elevated border border-transparent dark:border-gray-700/30 rounded-xl py-4 pl-12 pr-4 text-[15px] font-semibold text-primary-950 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:bg-white dark:focus:bg-dark-elevated focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-primary-700 dark:text-primary-400 mb-2 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors">
                  <Mail size={18} strokeWidth={2.5} />
                </div>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-dark-elevated border border-transparent dark:border-gray-700/30 rounded-xl py-4 pl-12 pr-4 text-[15px] font-semibold text-primary-950 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:bg-white dark:focus:bg-dark-elevated focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-primary-700 dark:text-primary-400 mb-2 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors">
                  <Lock size={18} strokeWidth={2.5} />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-dark-elevated border border-transparent dark:border-gray-700/30 rounded-xl py-4 pl-12 pr-4 text-[15px] font-semibold text-primary-950 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 tracking-widest focus:bg-white dark:focus:bg-dark-elevated focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-primary-700 to-primary-900 text-white py-4.5 rounded-2xl text-[16px] font-black shadow-xl shadow-primary-900/20 flex items-center justify-center hover:shadow-primary-900/40 transition-all outline-none focus:ring-4 focus:ring-primary-500/30 active:scale-[0.98] ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 ml-3" strokeWidth={3} />
                  </>
                )}
              </button>
            </div>
            
            <p className="text-center text-[12px] text-gray-500 dark:text-gray-400 px-2 leading-relaxed">
              By registering, you agree to our <span className="font-bold text-primary-700 dark:text-accent-400 hover:underline cursor-pointer">Terms</span> and <span className="font-bold text-primary-700 dark:text-accent-400 hover:underline cursor-pointer">Privacy Policy</span>.
            </p>

            <div className="text-center text-[14px] font-semibold text-gray-400 border-t border-gray-50 dark:border-gray-700/30 pt-6 mt-4">
              Already have an account? <Link to="/login" className="text-primary-800 dark:text-white hover:text-primary-600 dark:hover:text-accent-400 transition-colors">Log In</Link>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-between px-6 mb-12 relative z-0">
          <div className="flex -space-x-3">
            {[1,2,3].map(i => (
              <img key={i} src={`https://i.pravatar.cc/150?img=${i+20}`} alt="Citizen" className="w-[38px] h-[38px] rounded-xl border-2 border-surface-50 dark:border-dark-bg z-20 shadow-sm object-cover" />
            ))}
            <div className="w-[38px] h-[38px] rounded-xl bg-primary-800 text-white text-[10px] font-black border-2 border-surface-50 dark:border-dark-bg flex items-center justify-center z-0 shadow-sm">
              10k+
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black tracking-widest text-gray-400 dark:text-gray-600 uppercase block mb-[2px]">Verified Citizens</span>
            <span className="text-[13px] font-bold text-primary-950 dark:text-white">Active in your region</span>
          </div>
        </div>

      </div>
      
      <footer className="w-full text-center px-4 mt-auto">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">
          &copy; 2026 Voice2Gov Platform. All rights reserved.
        </p>
      </footer>
      
    </div>
  );
};

export default Register;
