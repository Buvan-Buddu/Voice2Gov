import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { User, Mail, Shield, Camera, Loader2, CheckCircle2, ChevronRight, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAppContext();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Avinash Sharma',
    email: user?.email || 'avinash.s@example.gov'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Mock save functionality
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Profile updated successfully!', {
        icon: '👤',
        duration: 3000
      });
    }, 1200);
  };

  return (
    <div className="animate-in fade-in transition-all duration-300 pb-20 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="mb-12 mt-2">
        <div className="flex items-center space-x-2 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3">
          <span>Account</span>
          <ChevronRight size={12} className="text-gray-300 dark:text-gray-700" />
          <span className="text-primary-700 dark:text-accent-400">Profile Settings</span>
        </div>
        <h1 className="text-[32px] md:text-[38px] font-black text-primary-950 dark:text-white leading-tight mb-2 tracking-tight">Identity & Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 text-[16px] font-medium">Manage your public presence and account verification.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Avatar & Impact */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="premium-card p-10 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary-800 to-primary-950"></div>
            
            <div className="relative mt-10 mb-8 inline-block">
              <div className="w-36 h-36 rounded-[40px] bg-white dark:bg-dark-card p-1.5 shadow-glass-lg ring-4 ring-white/10">
                <img 
                  src="https://i.pravatar.cc/300?u=gov" 
                  alt="Profile" 
                  className="w-full h-full rounded-[34px] object-cover"
                />
              </div>
              <button className="absolute bottom-1 right-1 w-11 h-11 bg-primary-700 text-white rounded-2xl flex items-center justify-center border-4 border-white dark:border-dark-card shadow-xl hover:scale-110 active:scale-95 transition-all">
                <Camera size={20} strokeWidth={2.5} />
              </button>
            </div>

            <h2 className="text-[22px] font-black text-primary-950 dark:text-white mb-1.5 tracking-tight">{formData.name}</h2>
            <div className="inline-flex items-center space-x-2 bg-primary-50 dark:bg-primary-500/10 px-4 py-1.5 rounded-full mb-8">
              <Shield className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
              <span className="text-[11px] font-bold text-primary-700 dark:text-primary-400 uppercase tracking-widest leading-none pt-0.5">Verified Citizen</span>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 pt-8 border-t border-gray-50 dark:border-gray-700/30">
              <div className="p-4 bg-surface-50 dark:bg-dark-elevated/50 rounded-2xl border border-gray-50 dark:border-gray-700/30">
                <span className="block text-[22px] font-black text-primary-900 dark:text-white mb-0.5">12</span>
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Reports</span>
              </div>
              <div className="p-4 bg-surface-50 dark:bg-dark-elevated/50 rounded-2xl border border-gray-50 dark:border-gray-700/30">
                <span className="block text-[22px] font-black text-primary-900 dark:text-white mb-0.5">2600</span>
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Impact XP</span>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-gradient-to-br from-primary-800 to-primary-950 p-8 shadow-xl shadow-primary-900/20 text-white relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-400/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-[3s]"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-5">
                <div className="w-9 h-9 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 size={20} className="text-emerald-400" />
                </div>
                <span className="text-[14px] font-bold">Identity Verified</span>
              </div>
              <p className="text-[13px] text-primary-200/70 font-medium leading-relaxed mb-6">Verification allows you to submit priority reports that move to the front of the municipal queue.</p>
              <button className="text-[12px] font-bold text-accent-300 flex items-center hover:text-white transition-colors group/btn">
                View Verification Details 
                <ChevronRight size={14} className="ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Information Form */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-6">
          <div className="premium-card p-10">
            <form onSubmit={handleSave} className="space-y-10">
              
              <div>
                <div className="flex items-center mb-10">
                  <div className="w-11 h-11 bg-primary-50 dark:bg-primary-500/10 rounded-xl flex items-center justify-center text-primary-700 dark:text-primary-400 mr-4">
                    <User size={22} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[18px] font-black text-primary-950 dark:text-white tracking-tight">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Display Name</label>
                    <div className="relative group">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 group-focus-within:text-primary-600 transition-colors" size={18} />
                       <input 
                         type="text"
                         className="w-full pl-12 pr-6 py-4 bg-surface-50 dark:bg-dark-elevated/50 border border-transparent dark:border-gray-700/30 rounded-2xl text-[15px] font-bold text-primary-950 dark:text-white focus:bg-white dark:focus:bg-dark-elevated focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                       />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 group-focus-within:text-primary-600 transition-colors" size={18} />
                      <input 
                        type="email"
                        className="w-full pl-12 pr-6 py-4 bg-surface-50 dark:bg-dark-elevated/50 border border-transparent dark:border-gray-700/30 rounded-2xl text-[15px] font-bold text-primary-950 dark:text-white focus:bg-white dark:focus:bg-dark-elevated focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-gray-50 dark:border-gray-700/30">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div className="max-w-md">
                    <h4 className="text-[15px] font-black text-primary-900 dark:text-white mb-2">Platform Visibility</h4>
                    <p className="text-[13px] text-gray-400 dark:text-gray-500 font-medium leading-relaxed">Your display name and impact score will be visible on the community feed when you post reports.</p>
                  </div>
                  <button 
                    disabled={isSaving}
                    type="submit"
                    className="px-10 py-5 bg-gradient-to-r from-primary-700 to-primary-900 text-white rounded-2xl text-[16px] font-black shadow-xl shadow-primary-900/20 hover:shadow-primary-900/40 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center shrink-0"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" strokeWidth={3} /> 
                        Saving Changes...
                      </>
                    ) : 'Save Updates'}
                  </button>
                </div>
              </div>

            </form>
          </div>

          <div className="premium-card p-10 border-red-50/50 dark:border-red-500/10 bg-red-50/[0.03] flex items-center justify-between group cursor-pointer hover:bg-red-50/[0.08] dark:hover:bg-red-500/[0.05] transition-all">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-red-100/50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-red-600 transition-transform group-hover:rotate-12 group-hover:scale-110">
                <Trash2 size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-[17px] font-black text-red-600 leading-tight mb-1">Delete Account</h4>
                <p className="text-[13px] text-red-500/60 dark:text-red-400/50 font-bold tracking-tight">Permanently remove all your reports and verified status.</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-red-100 dark:border-red-500/10 flex items-center justify-center text-red-200 dark:text-red-500/20 group-hover:text-red-500 group-hover:border-red-500 transition-all">
              <ChevronRight size={20} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
