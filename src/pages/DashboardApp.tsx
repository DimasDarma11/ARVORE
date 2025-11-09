import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Login } from './Login';
import { Signup } from './Signup';
import { CustomerDashboard } from './CustomerDashboard';
import { OrderServer } from './OrderServer';
import { Checkout } from './Checkout';
import { Invoices } from './Invoices';
import { Admin } from './Admin';
import { Profile } from './Profile';

function DashboardApp() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="order"
          element={
            <ProtectedRoute>
              <OrderServer />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout/:invoiceId"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="invoices"
          element={
            <ProtectedRoute>
              <Invoices />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute adminOnly>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default DashboardApp;
