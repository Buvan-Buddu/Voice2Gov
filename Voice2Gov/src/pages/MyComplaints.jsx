import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const MyComplaints = () => {
  const { complaints } = useAppContext();
  const [activeTab, setActiveTab] = useState('All');

  const total = complaints?.length || 0;
  const resolved = complaints?.filter(c => c.status === 'RESOLVED' || c.status === 'Resolved' || c.status === 'Done').length || 0;
  const impactScore = total > 0 ? Math.round((resolved / total) * 100) : 0;

  const filteredComplaints = complaints?.filter(c => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Pending') return c.status === 'OPEN' || c.status === 'Open';
    if (activeTab === 'Resolved') return c.status === 'RESOLVED' || c.status === 'Resolved' || c.status === 'Done';
    if (activeTab === 'In Progress') return c.status === 'IN PROGRESS' || c.status === 'In Progress';
    return true;
  }) || [];

  const getStatusStyle = (status) => {
    if (status === 'OPEN' || status === 'Open') return 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400';
    if (status === 'RESOLVED' || status === 'Resolved') return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
    return 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400';
  };

  return (
    <div className="animate-in fade-in transition-all duration-300">
      
      <div className="mb-10 mt-2">
        <h1 className="text-[30px] md:text-[36px] font-extrabold text-primary-900 dark:text-white mb-1.5 tracking-tight">My Complaints</h1>
        <p className="text-[15px] md:text-[17px] font-medium text-gray-500 dark:text-gray-400 leading-snug">
          Track and manage your civic requests for local improvement.
        </p>
      </div>

      {/* Impact Card */}
      <div className="premium-card overflow-hidden relative group mb-10">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary-600 to-accent-500 rounded-r-full"></div>
        <div className="p-8 pl-10 flex justify-between items-center">
          <div>
            <h2 className="text-[11px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-2">Community Impact</h2>
            <div className="text-[52px] leading-none font-extrabold text-primary-900 dark:text-white mb-2">{impactScore}%</div>
            <div className="text-[13px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              Resolution efficiency score
            </div>
          </div>
          <div className="w-14 h-14 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M22 7L13.5 15.5 8.5 10.5 2 17" />
              <path d="M16 7h6v6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex space-x-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {['All', 'Pending', 'Resolved', 'In Progress'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 outline-none shrink-0 ${activeTab === tab ? 'bg-gradient-to-r from-primary-700 to-primary-800 text-white shadow-lg shadow-primary-700/20 scale-105' : 'bg-white dark:bg-dark-card text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-dark-elevated hover:text-primary-700 dark:hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Complaint Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredComplaints.length === 0 ? (
          <div className="col-span-full premium-card p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-primary-50 dark:bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-primary-300 dark:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-primary-900 dark:text-white font-bold text-xl mb-3 tracking-tight">No Reports Found</h3>
            <p className="text-[15px] text-gray-400 dark:text-gray-500 font-medium max-w-[320px] mx-auto leading-relaxed mb-8">You haven't submitted any civic reports yet. Every report matters for community growth.</p>
            <Link to="/create-complaint" className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-8 py-3.5 rounded-xl font-bold text-[14px] shadow-lg shadow-primary-700/20 hover:shadow-xl transition-all active:scale-95">
              Start Your First Report
            </Link>
          </div>
        ) : (
          filteredComplaints.map(complaint => (
            <Link to={`/complaint/${complaint.id}`} key={complaint.id} className="premium-card p-6 flex flex-col group hover:scale-[1.01]">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase ${getStatusStyle(complaint.status)}`}>
                    {complaint.status}
                  </span>
                  {complaint.score > 80 && (
                    <span className="bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase">High Priority</span>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-600 tracking-wider">#{complaint.id}</span>
              </div>
              
              <h3 className="text-[17px] font-bold text-primary-900 dark:text-white leading-snug mb-5 pr-4 group-hover:text-primary-700 dark:group-hover:text-accent-300 transition-colors">{complaint.title}</h3>
              
              <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-50 dark:border-gray-700/30">
                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-dark-elevated flex items-center justify-center mr-2">
                    <svg className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3l4 7H8l4-7zM5 13h5v8H5v-8zM14 13h5v8h-5v-8z" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-bold text-primary-900 dark:text-white">{complaint.tags?.[0] || 'General'}</span>
                </div>
                <div className="flex items-center text-primary-600 dark:text-accent-400 group-hover:translate-x-1 transition-transform">
                  <span className="text-[11px] font-bold">Details</span>
                  <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* FAB */}
      <div className="fixed bottom-[100px] md:bottom-12 right-12 z-40 pointer-events-none pb-2 hidden md:block">
        <Link to="/create-complaint" className="pointer-events-auto w-[64px] h-[64px] bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-lg shadow-primary-700/30 flex items-center justify-center text-white hover:shadow-xl hover:shadow-primary-700/40 transition-all hover:scale-110 active:scale-95 outline-none cursor-pointer ring-4 ring-white/10 dark:ring-white/5">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </Link>
      </div>

    </div>
  );
};

export default MyComplaints;
