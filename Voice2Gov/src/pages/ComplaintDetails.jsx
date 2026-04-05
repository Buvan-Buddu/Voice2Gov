import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Loader2 } from 'lucide-react';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints, upvoteComplaint } = useAppContext();
  const [upvoting, setUpvoting] = useState(false);

  const handleUpvote = async () => {
    setUpvoting(true);
    await upvoteComplaint(id);
    setUpvoting(false);
  };

  const complaint = complaints?.find(c => c.id === id);

  if (!complaint) {
    return (
      <div className="animate-in fade-in transition-all duration-300 min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-20 h-20 bg-primary-50 dark:bg-primary-500/10 rounded-2xl flex items-center justify-center mb-5">
           <svg className="w-10 h-10 text-primary-300 dark:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <h2 className="text-[22px] font-bold text-primary-900 dark:text-white mb-2">Complaint Not Found</h2>
        <p className="text-[15px] text-gray-400 dark:text-gray-500 mb-8 max-w-[280px]">We couldn't find the civic report you're looking for.</p>
        <button 
          onClick={() => navigate('/my-complaints')}
          className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-primary-700/20 hover:shadow-xl transition-all active:scale-95"
        >
          Back to Complaints
        </button>
      </div>
    );
  }

  const getStatusStyle = (status) => {
    if (status === 'OPEN' || status === 'Open') return { bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' };
    if (status === 'RESOLVED' || status === 'Resolved' || status === 'Done') return { bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' };
    return { bg: 'bg-primary-50 dark:bg-primary-500/10', text: 'text-primary-600 dark:text-primary-400', dot: 'bg-primary-500' };
  };
  const statusStyle = getStatusStyle(complaint.status);

  return (
    <div className="animate-in fade-in transition-all duration-300 -mt-2">
      
      {/* Top Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center space-x-2 text-primary-800 dark:text-white font-bold hover:translate-x-[-4px] transition-transform group"
        >
          <div className="p-2 bg-white dark:bg-dark-card rounded-xl shadow-card border border-gray-100 dark:border-gray-700/50 group-hover:bg-gray-50 dark:group-hover:bg-dark-elevated transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-[14px]">Back to Feed</span>
        </button>

        <div className={`px-3.5 py-1.5 rounded-lg flex items-center ${statusStyle.bg}`}>
          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${statusStyle.dot}`}></div>
          <span className={`text-[11px] font-bold tracking-wider uppercase ${statusStyle.text}`}>{complaint.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Content */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-8">
          
          <div className="premium-card overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-[280px] md:h-[380px] w-full bg-gray-900 overflow-hidden">
              <img 
                src={complaint.image || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200"} 
                alt={complaint.title} 
                className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[11px] font-bold tracking-widest text-white/60 uppercase mb-2 block">Report ID: #{complaint.id}</span>
                <h1 className="text-[26px] md:text-[34px] font-extrabold text-white leading-tight">{complaint.title}</h1>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="flex flex-wrap gap-2.5 mb-8">
                <span className="px-4 py-1.5 bg-surface-50 dark:bg-dark-elevated border border-gray-100 dark:border-gray-700/50 rounded-lg text-[12px] font-bold text-primary-700 dark:text-primary-300">{complaint.tags?.[0] || 'Infrastructure'}</span>
                {complaint.tags?.[1] && (
                   <span className="px-4 py-1.5 bg-surface-50 dark:bg-dark-elevated border border-gray-100 dark:border-gray-700/50 rounded-lg text-[12px] font-bold text-primary-700 dark:text-primary-300">{complaint.tags[1]}</span>
                )}
                <span className="ml-auto flex items-center text-[12px] font-semibold text-gray-400 dark:text-gray-500">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  Submitted on {complaint.date || 'April 5, 2026'}
                </span>
              </div>

              <div>
                <h3 className="text-[17px] font-bold text-primary-900 dark:text-white mb-4">Detailed Description</h3>
                <p className="text-[15px] md:text-[17px] font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                  {complaint.description}
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-50 dark:border-gray-700/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 block">Community Support</span>
                  <div className="flex items-center">
                    <div className="flex -space-x-2.5 mr-4">
                      {[1,2,3,4].map(i => (
                        <img key={i} src={`https://i.pravatar.cc/150?img=${i+10}`} className="w-9 h-9 rounded-xl border-2 border-white dark:border-dark-card shadow-sm ring-1 ring-gray-100 dark:ring-gray-700"/>
                      ))}
                      <div className="w-9 h-9 rounded-xl bg-primary-700 text-white text-[10px] font-bold border-2 border-white dark:border-dark-card flex items-center justify-center shadow-sm">+{complaint.upvotes || 24}</div>
                    </div>
                    <span className="text-[14px] font-bold text-primary-900 dark:text-white">{complaint.upvotes || 24} upvoted</span>
                  </div>
                </div>

                <button 
                  onClick={handleUpvote}
                  disabled={upvoting}
                  className={`px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl font-bold text-[15px] flex items-center justify-center hover:shadow-lg hover:shadow-primary-700/20 transition-all active:scale-95 ${upvoting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {upvoting ? <Loader2 className="w-5 h-5 animate-spin mr-2.5" /> : (
                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                    </svg>
                  )}
                  {upvoting ? 'Processing...' : 'Support Priority'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          
          {/* Score Card */}
          <div className="premium-card p-7">
            <h3 className="text-[11px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-6 flex justify-between items-center">
              Civic Impact Score
              <span className="px-2 py-1 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-md text-[10px] tracking-normal normal-case font-bold">priority-high</span>
            </h3>
            <div className="flex items-center justify-between mb-8">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 36 36">
                  <path className="text-gray-100 dark:text-gray-700" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-primary-600 dark:text-accent-400" stroke="currentColor" strokeWidth="3" strokeDasharray={`${complaint.score || 84}, 100`} fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="text-[24px] font-extrabold text-primary-900 dark:text-white">{complaint.score || 84}%</span>
              </div>
              <div className="flex-1 pl-6">
                <p className="text-[13px] font-bold text-gray-600 dark:text-gray-300 leading-tight mb-1.5">High Urgency</p>
                <p className="text-[12px] font-medium text-gray-400 dark:text-gray-500">Top 5% district priority.</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="premium-card p-7">
            <h3 className="text-[11px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-6">Resolution Path</h3>
            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-gray-700/50">
              <div className="flex items-start relative z-10">
                <div className="w-6 h-6 rounded-full bg-emerald-500 border-[3px] border-white dark:border-dark-card shadow-sm ring-1 ring-gray-100 dark:ring-gray-700/50 mt-0.5"></div>
                <div className="ml-5">
                  <h4 className="text-[13px] font-bold text-primary-900 dark:text-white mb-0.5">Report Submitted</h4>
                  <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500">Verified by Community</p>
                </div>
              </div>
              <div className="flex items-start relative z-10">
                <div className={`w-6 h-6 rounded-full ${complaint.status === 'OPEN' || complaint.status === 'Open' ? 'bg-gray-200 dark:bg-gray-600' : 'bg-primary-600'} border-[3px] border-white dark:border-dark-card shadow-sm ring-1 ring-gray-100 dark:ring-gray-700/50 mt-0.5`}></div>
                <div className="ml-5">
                  <h4 className={`text-[13px] font-bold mb-0.5 ${complaint.status === 'OPEN' || complaint.status === 'Open' ? 'text-gray-400' : 'text-primary-900 dark:text-white'}`}>Assigned to Agency</h4>
                  <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500">Public Works Department</p>
                </div>
              </div>
              <div className="flex items-start relative z-10">
                <div className={`w-6 h-6 rounded-full ${complaint.status === 'RESOLVED' || complaint.status === 'Resolved' || complaint.status === 'Done' ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-600'} border-[3px] border-white dark:border-dark-card shadow-sm ring-1 ring-gray-100 dark:ring-gray-700/50 mt-0.5`}></div>
                <div className="ml-5">
                  <h4 className={`text-[13px] font-bold mb-0.5 ${complaint.status === 'RESOLVED' || complaint.status === 'Resolved' || complaint.status === 'Done' ? 'text-primary-900 dark:text-white' : 'text-gray-400'}`}>Resolution Complete</h4>
                  <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500">Awaiting final sign-off</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-primary-950 dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden border border-white/5 dark:border-gray-700/50">
            <div className="p-5 pb-3 flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold text-[14px] mb-0.5">{complaint.location || 'Metro Central'}</h4>
                <p className="text-white/40 text-[11px] font-medium">Incident Proximity</p>
              </div>
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-white backdrop-blur-sm">
                <svg className="w-4 h-4 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <div className="h-[180px] relative">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Map" className="w-full h-full object-cover opacity-50 contrast-125 brightness-75 scale-125" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950 dark:from-dark-card via-transparent to-primary-950/30 dark:to-dark-card/30"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute w-10 h-10 bg-accent-500/20 rounded-full animate-ping -inset-1.5"></div>
                  <div className="w-7 h-7 bg-accent-500 rounded-full border-[3px] border-white shadow-xl flex items-center justify-center relative z-10 ring-4 ring-accent-500/30">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
