
import React from 'react';
import { HashRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserRole } from './types';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import BrowseTiffins from './pages/customer/BrowseTiffins';
import TiffinProviderDetail from './pages/customer/TiffinProviderDetail';
import DashboardLayout from './layouts/DashboardLayout';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

// A component to protect routes based on user role
const ProtectedRoute: React.FC<{ allowedRoles: UserRole[] }> = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        // Not logged in, redirect to auth page
        return <Navigate to="/auth" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Logged in but wrong role, redirect to home
        return <Navigate to="/" replace />;
    }
    
    // Role is allowed, render the nested routes within the dashboard layout
    return (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    );
};

const MainLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);


const AppContent: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes with Header/Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/browse" element={<BrowseTiffins />} />
          <Route path="/provider/:id" element={<TiffinProviderDetail />} />
        </Route>

        {/* Auth Route (standalone) */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Customer Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={[UserRole.CUSTOMER]} />}>
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          {/* Add other customer routes here, e.g., /customer/orders */}
           <Route path="/customer/orders" element={<div>My Orders Page</div>} />
        </Route>

        {/* Provider Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={[UserRole.PROVIDER]} />}>
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
           {/* Add other provider routes here */}
           <Route path="/provider/orders" element={<div>Manage Orders Page</div>} />
           <Route path="/provider/menu" element={<div>Manage Menu Page</div>} />
           <Route path="/provider/subscribers" element={<div>Subscribers Page</div>} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* Add other admin routes here */}
          <Route path="/admin/users" element={<div>Manage Users Page</div>} />
          <Route path="/admin/vendors" element={<div>Manage Vendors Page</div>} />
          <Route path="/admin/orders" element={<div>All Orders Page</div>} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};


const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;
