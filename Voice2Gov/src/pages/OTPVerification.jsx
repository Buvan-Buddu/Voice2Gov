import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ChevronLeft, ShieldCheck, ArrowRight, RefreshCw, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.some(digit => !digit)) {
      toast.error('Please enter the full 4-digit code');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Identity verified successfully!', {
        icon: '🔒',
        duration: 3000
      });
      navigate('/dashboard');
    }, 1200);
  };

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
            <h1 className="text-[28px] font-black text-primary-900 dark:text-white tracking-tight mb-2">Verify Identity</h1>
            <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400 max-w-[280px] mb-1">
              Enter the 4-digit code sent to your email.
            </p>
            <p className="text-[14px] font-bold text-primary-700 dark:text-accent-400">
              citizen.veritas@gov.com
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-10">
            {otp.map((digit, index) => (
              <input 
                key={index}
                id={`otp-${index}`}
                type="text" 
                maxLength="1" 
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-14 h-16 sm:w-16 sm:h-20 bg-gray-50 dark:bg-dark-elevated border border-transparent dark:border-gray-700/30 rounded-2xl text-center text-[28px] font-black text-primary-950 dark:text-white focus:bg-white dark:focus:bg-dark-elevated focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none" 
              />
            ))}
          </div>

          <div className="space-y-6">
            <button 
              onClick={handleVerify}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-primary-700 to-primary-900 text-white py-4.5 rounded-2xl text-[16px] font-black shadow-xl shadow-primary-900/20 flex items-center justify-center hover:shadow-primary-900/40 transition-all outline-none focus:ring-4 focus:ring-primary-500/30 active:scale-[0.98] ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : (
                <>
                  Verify Account
                  <ArrowRight className="w-5 h-5 ml-3" strokeWidth={3} />
                </>
              )}
            </button>

            <div className="text-center">
              <button className="inline-flex items-center text-[13px] font-bold text-gray-500 dark:text-gray-400 hover:text-primary-700 dark:hover:text-accent-400 transition-colors group">
                <RefreshCw size={14} className="mr-2 group-hover:rotate-180 transition-transform duration-500" strokeWidth={3} />
                Resend Code
              </button>
            </div>
          </div>
          
          <div className="pt-8 mt-10 border-t border-gray-50 dark:border-gray-700/30 text-center">
            <button onClick={() => navigate('/login')} className="flex items-center justify-center w-full text-primary-700 dark:text-accent-400 font-bold text-[14px] hover:text-primary-900 dark:hover:text-white transition-colors group">
              <ChevronLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" strokeWidth={3} />
              Return to Sign In
            </button>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-white/40 dark:bg-dark-card/40 backdrop-blur-sm rounded-2xl p-5 flex items-center border border-white/50 dark:border-gray-700/20 shadow-sm mx-2">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-accent-300 rounded-xl flex shrink-0 items-center justify-center mr-4">
            <Lock size={20} strokeWidth={2.5} />
          </div>
          <p className="text-[12px] font-bold text-gray-500 dark:text-gray-400 leading-tight">
            Encrypted session. This code will expire in <span className="text-primary-900 dark:text-white">04:59</span>.
          </p>
        </div>

      </div>

      <footer className="w-full text-center px-4 mt-auto">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">
          &copy; 2026 Voice2Gov Platform. Verified Citizen Access.
        </p>
      </footer>
      
    </div>
  );
};

export default OTPVerification;
