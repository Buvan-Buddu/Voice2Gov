import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-50 dark:bg-dark-bg font-sans transition-colors duration-300 gradient-mesh">
      
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Top Navbar */}
        <Navbar />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto pb-[100px] md:pb-10 p-4 md:px-8 lg:px-12 pt-6">
          <div className="w-full max-w-7xl animate-in">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav />
        
      </div>
    </div>
  );
};

export default MainLayout;
