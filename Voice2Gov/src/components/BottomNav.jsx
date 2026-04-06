import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  const navItems = [
    { name: 'Home', path: '/dashboard', icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    )},
    { name: 'Feed', path: '/feed', icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )},
    { name: 'Create', path: '/create-complaint', isCenter: true, icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 5v14M5 12h14" />
      </svg>
    )},
    { name: 'Status', path: '/my-complaints', icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    )},
    { name: 'Alerts', path: '/notifications', icon: (
      <svg className="w-6 h-6 relative" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    )}
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 px-4 pb-6 pt-2 pointer-events-none">
      <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl rounded-2xl shadow-glass-lg border border-gray-100/60 dark:border-gray-700/40 px-5 py-3 flex justify-between items-center relative pointer-events-auto max-w-[420px] mx-auto">
        {navItems.map((item) => {
          if (item.isCenter) {
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-primary-700/30 hover:shadow-primary-700/40 transition-all active:scale-95 -mt-4"
              >
                {item.icon}
              </NavLink>
            );
          }
          
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex flex-col items-center gap-1 transition-all duration-200 px-1
                ${isActive ? 'text-primary-700 dark:text-accent-400' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600'}`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`transition-transform duration-200 ${isActive ? '-translate-y-0.5 scale-110' : ''}`}>
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-semibold ${isActive ? 'text-primary-700 dark:text-accent-400' : 'text-gray-400'}`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="w-1 h-1 rounded-full bg-primary-500 dark:bg-accent-400 -mt-0.5" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
