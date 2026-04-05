import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Loader2 } from 'lucide-react';

const Feed = () => {
  const { feed, upvoteComplaint } = useAppContext();
  const [activeTab, setActiveTab] = useState('Recent Issues');
  const [upvotingId, setUpvotingId] = useState(null);

  const handleUpvote = async (id) => {
    setUpvotingId(id);
    await upvoteComplaint(id);
    setUpvotingId(null);
  };

  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80';

  const filteredFeed = feed?.filter(f => {
    if (activeTab === 'Resolved') return f.status === 'RESOLVED' || f.status === 'Resolved' || f.status === 'Done';
    return true;
  }) || [];

  const getStatusStyle = (status) => {
    if (status === 'OPEN' || status === 'Open') return { bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' };
    if (status === 'RESOLVED' || status === 'Resolved') return { bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' };
    return { bg: 'bg-primary-50 dark:bg-primary-500/10', text: 'text-primary-600 dark:text-primary-400' };
  };

  return (
    <div className="animate-in fade-in transition-all duration-300">
      
      {/* Page Title */}
      <div className="mb-8 mt-2">
        <h1 className="text-[30px] md:text-[36px] font-extrabold text-primary-900 dark:text-white mb-1.5 tracking-tight">Community Feed</h1>
        <p className="text-[15px] md:text-[17px] font-medium text-gray-500 dark:text-gray-400 leading-snug pr-4">
          Real-time civic updates for your district
        </p>
      </div>

      {/* Filter Pills */}
      <div className="flex space-x-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {['Recent Issues', 'Trending', 'My Area', 'Resolved'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 outline-none shrink-0 ${activeTab === tab ? 'bg-gradient-to-r from-primary-700 to-primary-800 text-white shadow-lg shadow-primary-700/20 scale-105' : 'bg-white dark:bg-dark-card text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-dark-elevated hover:text-primary-700 dark:hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {filteredFeed.length === 0 ? (
          <div className="col-span-full premium-card p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-primary-50 dark:bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-primary-300 dark:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <h3 className="text-primary-900 dark:text-white font-bold text-xl mb-2">No Reports Found</h3>
            <p className="text-[15px] text-gray-400 dark:text-gray-500 max-w-[300px] leading-relaxed mx-auto">This section is currently empty. Be the first to report an issue in your area.</p>
          </div>
        ) : (
          filteredFeed.map((issue, idx) => {
            const statusStyle = getStatusStyle(issue.status);
            return (
            <React.Fragment key={issue.id}>
              {/* Breakout Card */}
              {idx === 2 && (
                <div className="col-span-full bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 rounded-2xl flex items-center justify-between p-10 shadow-xl shadow-primary-900/20 overflow-hidden relative mb-2">
                  <div className="absolute right-0 top-0 w-80 h-80 bg-accent-400/10 rounded-full blur-[80px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                  <div className="absolute left-0 bottom-0 w-40 h-40 bg-primary-400/10 rounded-full blur-[60px] transform -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
                  <div className="flex-1 pr-10 z-10">
                    <h2 className="text-[11px] font-bold tracking-widest text-accent-300 uppercase mb-4">Community Impact</h2>
                    <p className="text-[22px] md:text-[26px] font-extrabold text-white leading-tight">
                      Your collective voice is driving 84% faster municipal responses this month.
                    </p>
                  </div>
                  <div className="relative w-24 h-24 shrink-0 z-10 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 36 36">
                      <path className="text-white/10" stroke="currentColor" strokeWidth="2.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-accent-400" stroke="currentColor" strokeWidth="2.5" strokeDasharray="84, 100" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="text-white text-[18px] font-extrabold pt-1">84%</div>
                  </div>
                </div>
              )}

              {/* Issue Card */}
              <div className="premium-card flex flex-col overflow-hidden cursor-pointer group hover:scale-[1.01]">
                <Link to={`/complaint/${issue.id}`} className="block relative w-full h-[220px] bg-gray-100 dark:bg-dark-elevated overflow-hidden">
                  <img 
                    src={issue.image || FALLBACK_IMAGE} 
                    alt={issue.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center shadow-sm">
                    <svg className="w-3.5 h-3.5 text-primary-600 dark:text-accent-400 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"/>
                    </svg>
                    <span className="text-[10px] font-bold text-primary-900 dark:text-white uppercase tracking-wider truncate max-w-[140px]">
                      {issue.location || 'Metro District'}
                    </span>
                  </div>

                  <div className={`absolute top-4 right-4 px-2.5 py-1.5 rounded-lg flex items-center backdrop-blur-sm shadow-sm ${statusStyle.bg}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${issue.status === 'OPEN' || issue.status === 'Open' ? 'bg-amber-500' : issue.status === 'RESOLVED' || issue.status === 'Resolved' ? 'bg-emerald-500' : 'bg-primary-500'}`}></div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${statusStyle.text}`}>
                      {issue.status}
                    </span>
                  </div>
                </Link>
                
                <div className="p-6 flex flex-col flex-1">
                  <Link to={`/complaint/${issue.id}`} className="text-[18px] font-bold text-primary-900 dark:text-white leading-tight mb-2.5 pr-2 hover:text-primary-700 dark:hover:text-accent-300 transition-colors">
                    {issue.title}
                  </Link>
                  <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-6 line-clamp-2">
                    {issue.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-50 dark:border-gray-700/30">
                    <div className="flex space-x-5">
                      <div className="flex items-center">
                        <div className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-dark-elevated flex items-center justify-center mr-2">
                          <svg className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23 10a2 2 0 00-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32 0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10a2 2 0 002 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05A1.976 1.976 0 0023 12v-2zM1 21h4V9H1v12z"/>
                          </svg>
                        </div>
                        <span className="text-[14px] font-bold text-primary-900 dark:text-white">{issue.upvotes || 0}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-dark-elevated flex items-center justify-center mr-2">
                          <svg className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                          </svg>
                        </div>
                        <span className="text-[14px] font-bold text-primary-900 dark:text-white">{Math.floor(Math.random() * 50)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleUpvote(issue.id)}
                      disabled={upvotingId === issue.id}
                      className={`px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl text-[12px] font-bold tracking-wide transition-all shadow-sm shadow-primary-600/10 flex items-center ${upvotingId === issue.id ? 'opacity-70 cursor-not-allowed' : 'active:scale-95 hover:shadow-md'}`}
                    >
                      {upvotingId === issue.id ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : null}
                      {upvotingId === issue.id ? 'Voting...' : 'Upvote'}
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )})
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

export default Feed;
