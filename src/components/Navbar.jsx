import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LogOut, User, Settings, ChevronDown, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { user, logout, darkMode, toggleDarkMode } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/feed': return 'Community Feed';
      case '/create-complaint': return 'Report Issue';
      case '/my-complaints': return 'My Complaints';
      case '/notifications': return 'Alerts';
      case '/profile': return 'Profile';
      case '/preferences': return 'Preferences';
      default: return 'Voice2Gov';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 dark:bg-dark-card/70 backdrop-blur-xl border-b border-gray-100/80 dark:border-gray-800/40 px-6 py-3.5 flex items-center justify-between transition-all duration-300 shadow-sm shadow-gray-900/[0.02]">
      
      <div className="flex items-center">
        <h2 className="text-[18px] font-bold text-primary-950 dark:text-white tracking-tight">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center gap-3">
        
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary-600 dark:hover:text-accent-400 hover:bg-gray-50 dark:hover:bg-dark-elevated transition-all duration-200"
          title="Toggle theme"
        >
          {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 hover:bg-gray-50 dark:hover:bg-dark-elevated p-1.5 pr-3 rounded-xl border border-gray-100/80 dark:border-gray-700/50 transition-all duration-200 focus:outline-none"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg overflow-hidden flex items-center justify-center text-white shadow-sm relative">
              <span className="text-xs font-bold">{user?.name ? user.name.charAt(0) : 'U'}</span>
            </div>
            <span className="text-[13px] font-semibold text-primary-900 dark:text-white hidden md:block">
              {user?.name || 'Citizen'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 hidden md:block transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-dark-card rounded-xl shadow-glass-lg dark:shadow-[0_10px_40px_rgb(0,0,0,0.4)] border border-gray-100/80 dark:border-gray-700/50 overflow-hidden origin-top-right animate-in">
              <div className="p-1.5">
                <div className="px-3 py-3 mb-1">
                  <p className="text-[13px] font-bold text-primary-900 dark:text-white truncate">{user?.name || 'User'}</p>
                  <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                </div>
                
                <button 
                  className="w-full flex items-center px-3 py-2.5 text-[13px] font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-elevated hover:text-primary-800 dark:hover:text-white transition-all duration-200 rounded-lg"
                  onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                >
                  <User className="w-4 h-4 mr-3 text-gray-400" /> Profile Settings
                </button>
                <button 
                  className="w-full flex items-center px-3 py-2.5 text-[13px] font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-elevated hover:text-primary-800 dark:hover:text-white transition-all duration-200 rounded-lg"
                  onClick={() => { setDropdownOpen(false); navigate('/preferences'); }}
                >
                  <Settings className="w-4 h-4 mr-3 text-gray-400" /> Preferences
                </button>
                
                <div className="h-px bg-gray-100 dark:bg-gray-700/50 my-1"></div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2.5 text-[13px] font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 rounded-lg"
                >
                  <LogOut className="w-4 h-4 mr-3" /> Log out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
