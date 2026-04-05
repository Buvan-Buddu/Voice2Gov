import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-bg flex flex-col font-sans transition-colors duration-300 gradient-mesh">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
