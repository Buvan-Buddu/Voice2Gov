import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { dummyComplaints, dummyFeed, dummyNotifications } from '../data/dummyData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState(dummyComplaints);
  const [feed, setFeed] = useState(dummyFeed);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('v2g-dark') === 'true'; } catch { return false; }
  });

  // Apply dark class to <html> whenever darkMode changes
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try { localStorage.setItem('v2g-dark', darkMode); } catch {}
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const login = async (email, password) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setIsLoading(false);
        if (email) {
          setUser({ email, name: 'Citizen User' });
          toast.success('Successfully logged in!');
          resolve(true);
        } else {
          toast.error('Please enter an email address.');
          reject(new Error('Missing email'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(null);
      setIsLoading(false);
      toast.success('Successfully logged out.');
    }, 500);
  };

  const addComplaint = async (complaint) => {
    setIsLoading(true);
    const result = new Promise((resolve, reject) => {
      setTimeout(() => {
        const newComplaint = {
          ...complaint,
          id: `VG-${Math.floor(10000 + Math.random() * 90000)}`,
          status: 'OPEN',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          upvotes: 0,
        };
        setComplaints(prev => [newComplaint, ...prev]);
        setIsLoading(false);
        resolve(newComplaint);
      }, 1000);
    });

    toast.promise(result, {
      loading: 'Submitting civic report...',
      success: 'Complaint posted successfully!',
      error: 'Failed to post complaint.',
    });

    return result;
  };

  const upvoteComplaint = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setComplaints(prev => prev.map(c => 
          c.id === id ? { ...c, upvotes: (c.upvotes || 0) + 1 } : c
        ));
        setFeed(prev => prev.map(f => 
          f.id === id ? { ...f, upvotes: (f.upvotes || 0) + 1 } : f
        ));
        toast.success('Vote recorded! Thank you for your engagement.', {
          icon: '👍',
          duration: 3000,
        });
        resolve();
      }, 600);
    });
  };

  return (
    <AppContext.Provider value={{
      user,
      complaints,
      feed,
      notifications,
      isLoading,
      darkMode,
      login,
      logout,
      addComplaint,
      upvoteComplaint,
      toggleDarkMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
