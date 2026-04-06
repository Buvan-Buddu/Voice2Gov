import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Notifications = () => {
  const { notifications } = useAppContext();
  const [activeTab, setActiveTab] = useState("all");
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);

  const handleMarkAllAsRead = () => {
    setIsMarkingAsRead(true);
    setTimeout(() => {
      setIsMarkingAsRead(false);
      toast.success('All notifications marked as read', { icon: '✅' });
    }, 800);
  };

  const filteredNotifications = notifications?.filter(n => {
    if (activeTab === "all") return true;
    if (activeTab === "updates") return n.type === "update";
    if (activeTab === "actions") return n.type === "action";
    if (activeTab === "archive") return n.type === "archive";
    return true;
  }) || [];

  return (
    <div className="animate-in fade-in transition-all duration-300 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-2 block">Updates Center</span>
          <h1 className="text-[30px] md:text-[36px] font-extrabold text-primary-900 dark:text-white leading-tight tracking-tight">Notifications</h1>
        </div>
        
        <button 
          onClick={handleMarkAllAsRead}
          disabled={isMarkingAsRead || !notifications?.some(n => n.unread)}
          className={`px-5 py-2.5 premium-card text-[13px] font-bold text-primary-700 dark:text-accent-400 hover:bg-gray-50 dark:hover:bg-dark-elevated transition-all flex items-center shrink-0 ${isMarkingAsRead || !notifications?.some(n => n.unread) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isMarkingAsRead ? <Loader2 className="w-4 h-4 animate-spin mr-2.5" /> : (
            <svg className="w-4 h-4 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
          Mark all as read
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
        
        {/* Main Column */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Filter Tabs */}
          <div className="bg-white dark:bg-dark-card p-1.5 rounded-xl shadow-card border border-gray-100/80 dark:border-gray-700/50 flex items-center space-x-1 mb-8 overflow-x-auto no-scrollbar">
            {[
              { label: 'All', id: 'all' },
              { label: 'Updates', id: 'updates' },
              { label: 'Actions', id: 'actions' },
              { label: 'Archive', id: 'archive' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200 shrink-0 ${activeTab === tab.id ? 'bg-gradient-to-r from-primary-700 to-primary-800 text-white shadow-lg shadow-primary-700/20' : 'text-gray-400 dark:text-gray-500 hover:text-primary-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-elevated'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-3 min-h-[400px]">
            {filteredNotifications.length === 0 ? (
              <div className="premium-card p-16 text-center flex flex-col items-center justify-center rounded-2xl">
                <div className="w-20 h-20 bg-primary-50 dark:bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-primary-300 dark:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                </div>
                <h3 className="text-primary-900 dark:text-white font-bold text-xl mb-2">No notifications available</h3>
                <p className="text-[15px] text-gray-400 dark:text-gray-500 font-medium max-w-sm leading-relaxed">We'll alert you when something happens in this category.</p>
              </div>
            ) : (
              filteredNotifications.map((notif, index) => (
                <div 
                  key={notif.id} 
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`animate-in group relative rounded-xl p-5 flex transition-all duration-200 hover:scale-[1.005] ${notif.unread ? 'premium-card ring-1 ring-primary-100 dark:ring-primary-500/10' : 'bg-gray-50/50 dark:bg-dark-elevated/30 border border-transparent'}`}
                >
                  {notif.unread && <div className="absolute right-5 top-5 w-2 h-2 bg-accent-500 rounded-full shadow-glow-cyan"></div>}
                  
                  <div className="mr-5 shrink-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${notif.unread ? 'bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-sm' : 'bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/50 text-gray-400'}`}>
                      {notif.type === 'update' && (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                      )}
                      {notif.type === 'action' && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>
                      )}
                      {notif.type === 'archive' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1.5">
                      <h3 className={`text-[15px] font-bold ${notif.unread ? 'text-primary-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>{notif.title}</h3>
                      <span className="text-gray-400 dark:text-gray-600 text-[11px] font-semibold uppercase tracking-wider ml-4 shrink-0">{notif.time}</span>
                    </div>
                    <p className={`text-[14px] leading-relaxed max-w-2xl ${notif.unread ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'}`}>
                      {notif.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Weekly Impact */}
          <div className="rounded-2xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 overflow-hidden relative p-8 shadow-xl shadow-primary-900/20">
            <div className="absolute top-0 right-0 w-60 h-60 bg-accent-400/10 rounded-full blur-[80px] transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-400/10 rounded-full blur-[60px] transform -translate-x-1/4 translate-y-1/4"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/5">
                  <svg className="w-5 h-5 text-accent-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L7.31 8.35 1 11l6.31 2.65L10 20l2.69-6.35L19 11l-6.31-2.65z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold tracking-widest text-accent-300 uppercase">Weekly Status</span>
              </div>
              
              <h2 className="text-[28px] font-extrabold text-white mb-4 leading-tight">Your impact in numbers.</h2>
              <p className="text-[14px] font-medium text-primary-200/70 leading-relaxed mb-8">
                This week, your reports influenced high-priority improvements for 2,400+ citizens.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                  <span className="text-[32px] font-extrabold text-white block mb-1">12</span>
                  <span className="text-[10px] font-bold tracking-widest text-accent-300 uppercase">Impact XP</span>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                  <span className="text-[32px] font-extrabold text-white block mb-1">84%</span>
                  <span className="text-[10px] font-bold tracking-widest text-accent-300 uppercase">Resolution</span>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="premium-card p-6">
            <h4 className="text-[14px] font-bold text-primary-900 dark:text-white mb-3">Notification Settings</h4>
            <p className="text-[13px] text-gray-400 dark:text-gray-500 font-medium leading-relaxed mb-5">Customize what alerts you receive in your profile settings.</p>
            <button className="w-full py-3.5 bg-gray-50 dark:bg-dark-elevated rounded-xl text-[13px] font-bold text-primary-700 dark:text-accent-400 hover:bg-gray-100 dark:hover:bg-dark-elevated/80 transition-colors">
              Manage Preferences
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Notifications;
