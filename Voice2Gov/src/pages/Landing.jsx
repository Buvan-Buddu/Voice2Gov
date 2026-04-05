import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-bg font-sans transition-colors duration-300 overflow-x-hidden gradient-mesh">
      
      {/* Top Navbar */}
      <header className="px-6 py-5 flex items-center justify-between bg-white/70 dark:bg-dark-card/70 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-100/80 dark:border-gray-800/40">
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-700/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="12" y1="4" x2="12" y2="20" />
              <line x1="18" y1="8" x2="18" y2="16" />
              <line x1="6" y1="8" x2="6" y2="16" />
            </svg>
          </div>
          <span className="font-extrabold text-primary-900 dark:text-white text-[19px] tracking-tight">Voice2Gov</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-[14px] font-bold text-gray-500 dark:text-gray-400 hover:text-primary-700 dark:hover:text-accent-400 transition-colors">
            Sign In
          </Link>
          <Link to="/register" className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-5 py-2.5 rounded-xl text-[13px] font-bold shadow-lg shadow-primary-700/20 hover:shadow-xl transition-all active:scale-95">
            Get Started
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-32 md:pb-24 flex flex-col items-center text-center relative z-10">
          {/* Pill Badge */}
          <div className="inline-flex items-center bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 px-4 py-2 rounded-full mb-8 animate-in">
            <div className="w-2 h-2 bg-accent-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-[11px] font-bold text-primary-700 dark:text-accent-400 uppercase tracking-widest">Join the Platform for Civic Action</span>
          </div>
          
          <h1 className="text-[42px] md:text-[64px] font-black leading-[1.1] text-primary-950 dark:text-white mb-8 tracking-tighter max-w-4xl">
            Empowering Your Voice for <span className="gradient-text">Real Community Change</span>
          </h1>
          
          <p className="text-gray-500 dark:text-gray-400 text-[17px] md:text-[20px] font-medium leading-relaxed mb-12 max-w-2xl px-4">
            Be part of a collective movement that turns local concerns into community triumphs. Your voice is the catalyst for progress.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/register" className="bg-gradient-to-r from-primary-700 to-primary-900 text-white rounded-2xl py-5 px-10 font-bold text-[16px] shadow-xl shadow-primary-900/25 hover:shadow-primary-900/40 transition-all hover:scale-105 active:scale-95 text-center">
              Join the Movement
            </Link>
            <button className="bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/50 text-primary-900 dark:text-white rounded-2xl py-5 px-10 font-bold text-[16px] shadow-card hover:bg-gray-50 dark:hover:bg-dark-elevated transition-all text-center">
              Watch Demo
            </button>
          </div>
        </section>

        {/* Hero Image / Video Section */}
        <section className="mb-32 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-[40px] blur-3xl opacity-50 dark:opacity-20 animate-pulse-slow"></div>
          <div className="relative w-full h-[400px] md:h-[600px] rounded-[32px] overflow-hidden shadow-glass-xl premium-border border-4 border-white/50 dark:border-gray-700/30">
            <img 
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1600" 
              alt="Community Collaboration" 
              className="w-full h-full object-cover" 
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent"></div>
            
            {/* Glassmorphic Interaction Card */}
            <div className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-[360px] bg-white/10 dark:bg-dark-card/30 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 p-6 rounded-2xl shadow-2xl flex items-center">
              <div className="w-14 h-14 bg-accent-500 rounded-xl flex items-center justify-center shrink-0 mr-5 shadow-lg shadow-accent-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <h3 className="text-white text-[15px] font-bold leading-tight mb-1">Community-Driven</h3>
                <p className="text-white/70 text-[12px] leading-tight font-medium">10,000+ local concerns resolved this quarter.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Instant Reporting", 
              desc: "Snap a photo, tag the location, and submit in seconds. We handle the routing.", 
              icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8", 
              color: "primary" 
            },
            { 
              title: "Real-time Tracking", 
              desc: "Follow your report from submission to resolution with live status updates.", 
              icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", 
              color: "accent" 
            },
            { 
              title: "Public Accountability", 
              desc: "Transparent metrics show how local government is performing for you.", 
              icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", 
              color: "emerald" 
            }
          ].map((f, i) => (
            <div key={i} className="premium-card p-10 flex flex-col items-center text-center group hover:scale-[1.02]">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform ${i === 1 ? 'bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400' : i === 2 ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'}`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d={f.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-950 dark:text-white mb-4 tracking-tight">{f.title}</h3>
              <p className="text-[15px] font-medium text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* Stats Section */}
        <section className="mb-32">
          <div className="bg-primary-900 rounded-[40px] p-12 md:p-24 relative overflow-hidden text-center">
             <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950"></div>
             <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4"></div>
             
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
               {[
                 { val: "1.2k+", label: "Success Stories" },
                 { val: "15k+", label: "Active Citizens" },
                 { val: "$2M+", label: "Gov Efficiency" }
               ].map((s, i) => (
                 <div key={i} className="flex flex-col items-center">
                   <h3 className="text-[52px] md:text-[64px] font-black text-white leading-none mb-4 tracking-tighter">{s.val}</h3>
                   <span className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.3em]">{s.label}</span>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-32 text-center">
          <h2 className="text-[32px] md:text-[48px] font-black text-primary-950 dark:text-white mb-8 tracking-tight">Ready to make an impact?</h2>
          <div className="flex flex-col items-center space-y-6">
            <Link to="/register" className="bg-gradient-to-r from-primary-700 to-primary-900 text-white rounded-2xl py-6 px-12 font-extrabold text-[18px] shadow-2xl shadow-primary-900/30 hover:shadow-primary-900/50 transition-all hover:scale-105 active:scale-95">
              Get Started Now — It's Free
            </Link>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">No credit card required • Secure data handling</p>
          </div>
        </section>

      </main>

      {/* Footer Area */}
      <footer className="border-t border-gray-100 dark:border-gray-800/60 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="4" x2="12" y2="20" /><line x1="18" y1="8" x2="18" y2="16" /><line x1="6" y1="8" x2="6" y2="16" /></svg>
              </div>
              <span className="font-extrabold text-primary-950 dark:text-white text-[17px] tracking-tight">Voice2Gov</span>
            </div>
            <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-6">Building a more transparent and responsive future for our communities.</p>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-primary-950 dark:text-white uppercase tracking-widest mb-6">Platform</h4>
            <ul className="space-y-4 text-[14px] font-semibold text-gray-500 dark:text-gray-500">
              <li className="hover:text-primary-600 transition-colors cursor-pointer">Security</li>
              <li className="hover:text-primary-600 transition-colors cursor-pointer">Mobile App</li>
              <li className="hover:text-primary-600 transition-colors cursor-pointer">Accessibility</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-primary-950 dark:text-white uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-[14px] font-semibold text-gray-500 dark:text-gray-500">
              <li className="hover:text-primary-600 transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-primary-600 transition-colors cursor-pointer">Blog</li>
              <li className="hover:text-primary-600 transition-colors cursor-pointer">Success Stories</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-primary-950 dark:text-white uppercase tracking-widest mb-6">Connect</h4>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-dark-elevated flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors cursor-pointer border border-gray-100 dark:border-gray-700/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-dark-elevated flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors cursor-pointer border border-gray-100 dark:border-gray-700/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-gray-50 dark:border-gray-800/40 text-center">
          <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.2em]">&copy; 2026 Voice2Gov Platform. Powered by Civic Innovation.</p>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
