import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, Mail, ChevronLeft, ShieldCheck, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Reset link sent to your email!', {
        icon: '✉️'
      });
      navigate('/otp');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-bg flex flex-col items-center justify-center p-6 font-sans gradient-mesh transition-colors duration-300">
      
      <div className="w-full max-w-[440px] pt-8">
        
        {/* Main Card */}
        <div className="bg-white dark:bg-dark-card rounded-[32px] shadow-glass dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] p-8 sm:p-12 border border-gray-100/80 dark:border-gray-700/50 mb-8 relative z-10 w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-800"></div>
          
          <div className="flex flex-col items-center justify-center mb-10 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-900/20 mb-5 ring-1 ring-white/10">
              <Lock width={26} height={26} strokeWidth={2.5} className="text-white" />
            </div>
            <h1 className="text-[28px] font-black text-primary-900 dark:text-white tracking-tight mb-2">Reset Password</h1>
            <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400 max-w-[280px]">
              Enter your email address to receive a secure password reset link.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[11px] font-bold text-primary-700 dark:text-primary-400 mb-2 uppercase tracking-widest ml-1">
                Registered Email
              </label>
              
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors">
                  <Mail size={18} strokeWidth={2.5} />
                </div>
                <input 
                  type="email" 
                  placeholder="citizen@gov.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-dark-elevated border border-transparent dark:border-gray-700/30 rounded-xl py-4 pl-12 pr-4 text-[15px] font-semibold text-primary-950 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:bg-white dark:focus:bg-dark-elevated focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
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
                    Send Secure Link
                    <ArrowRight className="w-5 h-5 ml-3" strokeWidth={3} />
                  </>
                )}
              </button>
            </div>
            
            <div className="pt-6 mt-4 border-t border-gray-50 dark:border-gray-700/30">
              <Link to="/login" className="flex items-center justify-center w-full text-primary-700 dark:text-accent-400 font-bold text-[14px] hover:text-primary-900 dark:hover:text-white transition-colors group">
                <ChevronLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" strokeWidth={3} />
                Back to Login
              </Link>
            </div>
          </form>
        </div>

        {/* Security Badges */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-4 flex items-center border border-gray-100 dark:border-gray-700/40 shadow-sm">
            <div className="w-9 h-9 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-accent-400 rounded-xl flex items-center justify-center shrink-0 mr-3">
              <ShieldCheck size={18} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-primary-900 dark:text-white tracking-widest mb-0.5">Secure</span>
              <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium leading-tight text-nowrap">AES-256 Link</span>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-2xl p-4 flex items-center border border-gray-100 dark:border-gray-700/40 shadow-sm">
            <div className="w-9 h-9 bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 rounded-xl flex items-center justify-center shrink-0 mr-3">
              <Mail size={18} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-primary-900 dark:text-white tracking-widest mb-0.5">Official</span>
              <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium leading-tight text-nowrap">Gov-Verified</span>
            </div>
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

export default ResetPassword;
