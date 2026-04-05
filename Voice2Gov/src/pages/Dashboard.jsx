import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { user, complaints, feed } = useAppContext();

  const total = complaints?.length || 0;
  const resolved = complaints?.filter(c => c.status === 'RESOLVED' || c.status === 'Resolved' || c.status === 'Done').length || 0;
  const pending = total - resolved;
  const recentActivity = feed?.slice(0, 3) || [];

  return (
    <div className="animate-in fade-in transition-all duration-300">
      {/* Welcome Section */}
      <div className="mb-10 mt-2">
        <h1 className="text-[30px] md:text-[36px] font-extrabold text-primary-900 dark:text-white mb-1 tracking-tight">Hello, {user?.name || 'Citizen'}</h1>
        <p className="text-[15px] md:text-[17px] font-medium text-gray-500 dark:text-gray-400">Here's your civic engagement overview</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Left Column: Stats & Impact */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Civic Impact Score Card */}
          <div className="premium-card overflow-hidden relative group">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary-600 to-accent-500 rounded-r-full"></div>
            <div className="p-8 pl-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-[11px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-2">Civic Impact Score</h2>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-[52px] leading-none font-extrabold text-primary-900 dark:text-white">{842 + (resolved * 150)}</span>
                    <div className="flex items-center bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg text-[12px] font-bold">
                      <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path></svg>
                      12.4%
                    </div>
                  </div>
                </div>
                <div className="w-14 h-14 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18" />
                    <path d="M18 9l-5 5-4-4-4 4" />
                    <circle cx="13" cy="7" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="18" cy="4" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-50 dark:bg-dark-elevated/50 rounded-xl p-5 border border-gray-50 dark:border-gray-700/30 flex items-center hover:border-primary-100 dark:hover:border-primary-500/20 transition-colors duration-200">
                  <div className="w-10 h-10 bg-white dark:bg-dark-card rounded-xl flex items-center justify-center mr-4 shadow-sm text-primary-600 dark:text-primary-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-0.5">Community Rank</p>
                    <p className="text-[17px] font-extrabold text-primary-900 dark:text-white">Top 5% Overall</p>
                  </div>
                </div>
                <div className="bg-surface-50 dark:bg-dark-elevated/50 rounded-xl p-5 border border-gray-50 dark:border-gray-700/30 flex items-center hover:border-amber-100 dark:hover:border-amber-500/20 transition-colors duration-200">
                  <div className="w-10 h-10 bg-white dark:bg-dark-card rounded-xl flex items-center justify-center mr-4 shadow-sm text-amber-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-0.5">Impact Points</p>
                    <p className="text-[17px] font-extrabold text-primary-900 dark:text-white">{2450 + (resolved * 150)} XP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Number Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link to="/my-complaints" className="bg-gradient-to-br from-primary-50 to-primary-100/60 dark:from-primary-500/10 dark:to-primary-600/5 border border-primary-100 dark:border-primary-500/20 hover:border-primary-200 dark:hover:border-primary-500/30 transition-all duration-200 rounded-2xl p-7 flex flex-col items-center justify-center cursor-pointer group hover:shadow-glow-blue hover:scale-[1.02]">
              <h3 className="text-[11px] font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase mb-2 group-hover:scale-105 transition-transform">Total Reports</h3>
              <span className="text-[40px] font-extrabold text-primary-800 dark:text-white">{total}</span>
            </Link>
            <div className="premium-card p-7 flex flex-col items-center justify-center hover:scale-[1.02] transition-all duration-200">
              <h3 className="text-[11px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-2">Pending</h3>
              <span className="text-[40px] font-extrabold text-primary-900 dark:text-white">{pending}</span>
            </div>
            <div className="premium-card p-7 flex flex-col items-center justify-center hover:scale-[1.02] transition-all duration-200">
              <h3 className="text-[11px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-2">Resolved</h3>
              <span className="text-[40px] font-extrabold text-emerald-600 dark:text-emerald-400">{resolved}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="lg:col-span-1">
          <div className="flex justify-between items-end mb-6 pl-1">
            <h2 className="text-[20px] font-bold text-primary-900 dark:text-white">Activity Stream</h2>
            <Link to="/feed" className="text-[13px] font-bold text-primary-600 dark:text-accent-400 hover:text-primary-700 dark:hover:text-accent-300 transition-colors mb-1">View All</Link>
          </div>
          
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <div className="premium-card p-10 text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-16 h-16 bg-gray-50 dark:bg-dark-elevated rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-primary-900 dark:text-white font-bold mb-1">No Activity</h3>
                <p className="text-[13px] text-gray-400 dark:text-gray-500 max-w-[200px] leading-relaxed mx-auto">Your district is quiet. Be the first to start a conversation.</p>
              </div>
            ) : (
              recentActivity.map((activity) => (
                <Link to={`/complaint/${activity.id}`} key={activity.id} className="block premium-card p-5 relative overflow-hidden group hover:scale-[1.01]">
                  <div className="flex items-start">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110 ${activity.status === 'OPEN' ? 'bg-red-50 dark:bg-red-500/10 text-red-500' : activity.status === 'RESOLVED' ? 'bg-gray-50 dark:bg-gray-700/30 text-gray-400' : 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'}`}>
                      {activity.status === 'OPEN' ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.5C8.41 21.5 5.5 18.59 5.5 15C5.5 10.5 12 2.5 12 2.5C12 2.5 18.5 10.5 18.5 15C18.5 18.59 15.59 21.5 12 21.5Z" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.69 2 6 4.69 6 8C6 10.66 7.73 12.92 10 13.71V16H14V13.71C16.27 12.92 18 10.66 18 8C18 4.69 15.31 2 12 2ZM11 20V18H13V20C13 20.55 12.55 21 12 21C11.45 21 11 20.55 11 20Z"></path></svg>
                      )}
                    </div>
                    <div className="ml-4 flex-grow pr-4">
                      <h3 className="text-[14px] font-bold text-primary-900 dark:text-white leading-snug mb-1 group-hover:text-primary-700 dark:group-hover:text-accent-300 transition-colors">{activity.title}</h3>
                      <p className="text-[12px] text-gray-400 dark:text-gray-500 font-medium">{activity.date} • #{activity.id}</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className="fixed bottom-[100px] md:bottom-12 right-12 z-40 pointer-events-none pb-2 hidden md:block">
        <Link to="/create-complaint" className="pointer-events-auto w-[64px] h-[64px] flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-lg shadow-primary-700/30 text-white hover:shadow-xl hover:shadow-primary-700/40 transition-all hover:scale-110 active:scale-95 outline-none ring-4 ring-white/10 dark:ring-white/5">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </Link>
      </div>

    </div>
  );
};

export default Dashboard;
