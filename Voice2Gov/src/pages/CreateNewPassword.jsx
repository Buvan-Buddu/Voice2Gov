import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, Lock, ShieldCheck, Eye, EyeOff, CheckCircle2, Circle } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateNewPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Password updated!', {
        icon: '🛡️',
        duration: 3000
      });
      navigate('/login');
    }, 1500);
  };

  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) }
  ];

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-bg flex flex-col items-center justify-center p-6 font-sans gradient-mesh transition-colors duration-300">
      
      <div className="w-full max-w-[440px] pt-8">
        
        {/* Main Card */}
        <div className="bg-white dark:bg-dark-card rounded-[32px] shadow-glass dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] p-8 sm:p-12 border border-gray-100/80 dark:border-gray-700/50 mb-8 relative z-10 w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-800"></div>
          
          <div className="flex flex-col items-center justify-center mb-10 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-900/20 mb-6 ring-1 ring-white/10">
              <ShieldCheck width={32} height={32} strokeWidth={2.5} className="text-white" />
            </div>
            <h1 className="text-[28px] font-black text-primary-900 dark:text-white tracking-tight mb-2">Secure Account</h1>
            <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400 max-w-[280px]">
              Establish a strong password to protect your civic data.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleReset}>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-primary-700 dark:text-primary-400 mb-2 uppercase tracking-widest ml-1">
                  New Password
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors">
                    <Lock size={18} strokeWidth={2.5} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-dark-elevated border border-transparent dark:border-gray-700/30 rounded-xl py-4 pl-12 pr-12 text-[15px] font-semibold text-primary-950 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:bg-white dark:focus:bg-dark-elevated focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-primary-700 dark:text-primary-400 mb-2 uppercase tracking-widest ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors">
                    <Lock size={18} strokeWidth={2.5} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-dark-elevated border border-transparent dark:border-gray-700/30 rounded-xl py-4 pl-12 pr-4 text-[15px] font-semibold text-primary-950 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:bg-white dark:focus:bg-dark-elevated focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Validation Checklist */}
            <div className="bg-gray-50/50 dark:bg-dark-elevated/30 rounded-2xl p-5 space-y-3 border border-gray-100/50 dark:border-gray-700/20">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className={`transition-colors duration-300 ${req.met ? 'text-emerald-500' : 'text-gray-300 dark:text-gray-600'}`}>
                    {req.met ? <CheckCircle2 size={14} strokeWidth={3} /> : <Circle size={14} strokeWidth={3} />}
                  </div>
                  <span className={`text-[12px] font-bold transition-colors duration-300 ${req.met ? 'text-primary-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading || !requirements.every(r => r.met)}
                className={`w-full bg-gradient-to-r from-primary-700 to-primary-900 text-white py-4.5 rounded-2xl text-[16px] font-black shadow-xl shadow-primary-900/20 flex items-center justify-center hover:shadow-primary-900/40 transition-all outline-none focus:ring-4 focus:ring-primary-500/30 active:scale-[0.98] ${isLoading || !requirements.every(r => r.met) ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : (
                  <>
                    Confirm Security Reset
                    <ArrowRight className="w-5 h-5 ml-3" strokeWidth={3} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Brand Footer */}
        <div className="text-center">
           <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
             Secure Infrastructure Provider<br/>
             <span className="text-primary-900 dark:text-white">Voice2Gov Node-04</span>
           </p>
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

export default CreateNewPassword;
