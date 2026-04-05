import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    )},
    { name: 'Create', path: '/create-complaint', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    )},
    { name: 'Feed', path: '/feed', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )},
    { name: 'My Complaints', path: '/my-complaints', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    )},
    { name: 'Alerts', path: '/notifications', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    )}
  ];

  return (
    <aside className="hidden md:flex flex-col w-[260px] bg-white dark:bg-dark-card border-r border-gray-100 dark:border-gray-800/60 h-screen sticky top-0 shrink-0 transition-colors duration-300">
      <div className="p-6 flex flex-col h-full">
        {/* Logo Area */}
        <div className="flex flex-col items-center justify-center mb-10 pt-4">
          <div className="w-[50px] h-[50px] bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-900/20 mb-3 ring-1 ring-white/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="10" x2="5" y2="14" />
              <line x1="9.5" y1="7" x2="9.5" y2="17" />
              <line x1="14" y1="4" x2="14" y2="20" />
              <line x1="18.5" y1="7" x2="18.5" y2="17" />
              <line x1="23" y1="10" x2="23" y2="14" />
            </svg>
          </div>
          <h1 className="text-[20px] font-extrabold text-primary-900 dark:text-white tracking-tight">Voice2Gov</h1>
          <span className="text-[10px] font-bold text-primary-400 dark:text-accent-400 uppercase tracking-[0.2em] mt-0.5">Civic Platform</span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-4 py-3.5 rounded-xl font-semibold text-[14px] transition-all duration-200 group relative overflow-hidden
                ${isActive 
                  ? 'bg-gradient-to-r from-primary-700 to-primary-800 text-white shadow-lg shadow-primary-700/25' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-elevated hover:text-primary-800 dark:hover:text-white'}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 to-transparent pointer-events-none" />
                  )}
                  <div className="w-6 h-6 mr-3 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 relative z-10">
                    {item.icon}
                  </div>
                  <span className="tracking-tight relative z-10">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse-slow relative z-10" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* User Profile Section */}
        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700/50 flex items-center px-2 py-4 group cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-elevated rounded-xl transition-all duration-200">
          <div className="relative">
            <img 
              src="https://i.pravatar.cc/150?u=gov" 
              className="w-11 h-11 rounded-xl object-cover shadow-sm ring-2 ring-gray-100 dark:ring-gray-700"
              alt="Profile"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-dark-card rounded-full"></div>
          </div>
          <div className="ml-3 overflow-hidden">
            <h4 className="text-[14px] font-bold text-primary-900 dark:text-white truncate">Avinash Sharma</h4>
            <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 tracking-wide">Contributor Lv. 4</p>
          </div>
          <button className="ml-auto w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
