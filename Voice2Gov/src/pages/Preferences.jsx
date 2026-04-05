import React, { useState } from 'react';
import { Bell, Moon, Globe, Shield, ChevronRight, Save, Loader2, Lock, Smartphone, Sun } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Toggle = ({ enabled, onChange, label, description, icon: Icon }) => (
  <div className="flex items-center justify-between py-5 group border-b border-gray-50 dark:border-gray-700/30 last:border-0 last:pb-0">
    <div className="flex items-center gap-5 min-w-0">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${enabled ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-accent-400 shadow-sm' : 'bg-gray-50 dark:bg-dark-elevated text-gray-400'}`}>
        <Icon size={20} strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <h4 className="text-[15px] font-bold text-primary-950 dark:text-white leading-tight mb-1">{label}</h4>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-md">{description}</p>
      </div>
    </div>
    <button 
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6.5 rounded-full transition-all relative shrink-0 ml-4 group/toggle ${enabled ? 'bg-primary-700 dark:bg-accent-500 shadow-lg shadow-primary-700/20 dark:shadow-accent-500/20' : 'bg-gray-200 dark:bg-gray-700 opacity-60'}`}
    >
      <div className={`absolute top-0.5 w-5.5 h-5.5 bg-white rounded-full transition-all shadow-md transform ${enabled ? 'translate-x-[22px]' : 'translate-x-0.5'}`}></div>
    </button>
  </div>
);

const Preferences = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  const [isSaving, setIsSaving] = useState(false);
  const [prefs, setPrefs] = useState({
    emailNotifications: true,
    pushNotifications: true,
    language: 'English'
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Preferences updated!', {
        icon: '⚙️',
        duration: 3000
      });
    }, 1200);
  };

  return (
    <div className="animate-in fade-in transition-all duration-300 pb-20 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="mb-12 mt-2">
        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3">
          <span>Account</span>
          <ChevronRight size={12} className="text-gray-300 dark:text-gray-700" />
          <span className="text-primary-700 dark:text-accent-400">System Preferences</span>
        </div>
        <h1 className="text-[32px] md:text-[38px] font-black text-primary-950 dark:text-white leading-tight mb-2 tracking-tight">Preferences</h1>
        <p className="text-gray-500 dark:text-gray-400 text-[16px] font-medium leading-snug">Personalize your interaction with the Voice2Gov community.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Main Settings Column */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* Card: Appearance */}
          <div className="premium-card p-10">
            <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8 flex items-center">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
              Visual Experience
            </h3>
            <Toggle 
              enabled={darkMode}
              onChange={toggleDarkMode}
              label="Dark Theme"
              description="Switch to a dark interface for reduced eye strain during night mode."
              icon={darkMode ? Sun : Moon}
            />
          </div>

          {/* Card: Communication */}
          <div className="premium-card p-10">
            <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8 flex items-center">
              <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-3"></div>
              Communication Channels
            </h3>
            <div className="flex flex-col">
              <Toggle 
                enabled={prefs.emailNotifications}
                onChange={(v) => setPrefs({...prefs, emailNotifications: v})}
                label="Municipal Email Updates"
                description="Receive official responses from local agencies about your reported concerns."
                icon={Globe}
              />
              <Toggle 
                enabled={prefs.pushNotifications}
                onChange={(v) => setPrefs({...prefs, pushNotifications: v})}
                label="Direct Alerts"
                description="Real-time browser notifications for upvotes and trending district issues."
                icon={Bell}
              />
            </div>
          </div>

          {/* Card: Regional Settings */}
          <div className="premium-card p-10">
            <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8 flex items-center">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
              Regional Context
            </h3>
            <div className="flex items-center justify-between gap-8 py-2">
              <div className="min-w-0">
                <h4 className="text-[15px] font-bold text-primary-950 dark:text-white mb-1">Language Localization</h4>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">System language for dashboard, reports, and AI transcriptions.</p>
              </div>
              <div className="relative group shrink-0">
                <select 
                  className="appearance-none bg-surface-50 dark:bg-dark-elevated/50 border border-gray-100 dark:border-gray-700/30 rounded-xl px-6 py-4 pr-12 text-[14px] font-bold text-primary-950 dark:text-white focus:bg-white dark:focus:bg-dark-elevated focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none cursor-pointer transition-all min-w-[160px]"
                  value={prefs.language}
                  onChange={(e) => setPrefs({...prefs, language: e.target.value})}
                >
                  <option>English (US)</option>
                  <option>Spanish (ES)</option>
                  <option>French (FR)</option>
                  <option>Hindi (IN)</option>
                </select>
                <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Card: Security Controls */}
          <div className="premium-card p-10">
            <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8 flex items-center">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3"></div>
              Security & Access
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center justify-between p-5 bg-surface-50 dark:bg-dark-elevated/50 border border-transparent dark:border-gray-700/30 rounded-2xl hover:bg-white dark:hover:bg-dark-elevated group transition-all duration-300 hover:shadow-card hover:border-gray-100 dark:hover:border-gray-600 text-left outline-none">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white dark:bg-dark-card rounded-xl flex items-center justify-center text-primary-700 dark:text-gray-400 shadow-sm transition-transform group-hover:scale-105">
                    <Lock size={18} strokeWidth={2.5} />
                  </div>
                  <span className="text-[14px] font-bold text-primary-950 dark:text-white">Change Credentials</span>
                </div>
                <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-primary-600 transition-colors" />
              </button>
              <button className="flex items-center justify-between p-5 bg-surface-50 dark:bg-dark-elevated/50 border border-transparent dark:border-gray-700/30 rounded-2xl hover:bg-white dark:hover:bg-dark-elevated group transition-all duration-300 hover:shadow-card hover:border-gray-100 dark:hover:border-gray-600 text-left outline-none">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white dark:bg-dark-card rounded-xl flex items-center justify-center text-primary-700 dark:text-gray-400 shadow-sm transition-transform group-hover:scale-105">
                    <Shield size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-[14px] font-bold text-primary-950 dark:text-white block">MFA Security</span>
                    <span className="text-[10px] font-bold text-red-500/60 uppercase tracking-tighter">Deactivated</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-primary-600 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="xl:col-span-4 space-y-8">
          
          {/* Card: Active Session */}
          <div className="premium-card p-8">
             <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6 block">Current Session</h3>
             <div className="flex items-center space-x-4 mb-8">
               <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/10">
                 <Smartphone size={22} strokeWidth={2.5} />
               </div>
               <div>
                  <h4 className="text-[15px] font-black text-primary-950 dark:text-white leading-tight">This Device</h4>
                  <div className="flex items-center mt-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-1.5"></div>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Active Secure Path</span>
                  </div>
               </div>
             </div>
             
             <div className="space-y-3">
               <div className="flex justify-between items-center text-[13px] font-bold text-gray-500 dark:text-gray-400 py-1.5">
                  <span>Last Location</span>
                  <span className="text-primary-900 dark:text-white">Metro Central</span>
               </div>
               <div className="flex justify-between items-center text-[13px] font-bold text-gray-500 dark:text-gray-400 py-1.5">
                  <span>IPv4 Status</span>
                  <span className="text-primary-900 dark:text-white">Verified Secure</span>
               </div>
             </div>
          </div>

          {/* Privacy Note */}
          <div className="rounded-[32px] bg-gradient-to-br from-primary-800 to-primary-950 p-8 shadow-xl shadow-primary-900/20 text-white relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-400/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-[3s]"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20 mb-6 shadow-lg">
                <Shield size={28} className="text-accent-300" strokeWidth={2.5} />
              </div>
              <h4 className="text-[18px] font-black mb-3">Privacy Guard</h4>
              <p className="text-[13px] text-primary-200/70 font-medium leading-relaxed">
                Your settings are encrypted and synced across all verified council access points.
              </p>
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-gradient-to-r from-primary-700 to-primary-900 text-white rounded-2xl py-6 font-black text-[16px] shadow-xl shadow-primary-900/20 hover:shadow-primary-900/40 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isSaving ? <Loader2 size={24} className="animate-spin" strokeWidth={3} /> : <Save size={24} strokeWidth={3} />}
            {isSaving ? 'Updating...' : 'Commit Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
