import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../components/ProtectedRoute';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import OTPVerification from '../pages/OTPVerification';
import CreateNewPassword from '../pages/CreateNewPassword';

import Dashboard from '../pages/Dashboard';
import MyComplaints from '../pages/MyComplaints';
import CreateComplaint from '../pages/CreateComplaint';
import Feed from '../pages/Feed';
import Notifications from '../pages/Notifications';
import ComplaintDetails from '../pages/ComplaintDetails';
import Profile from '../pages/Profile';
import Preferences from '../pages/Preferences';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/create-new-password" element={<CreateNewPassword />} />
      </Route>
 
      {/* Protected App Routes */}
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
        <Route path="/create-complaint" element={<CreateComplaint />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/complaint/:id" element={<ComplaintDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/preferences" element={<Preferences />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

