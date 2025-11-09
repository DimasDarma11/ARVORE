import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ProtectedRoute } from './Arvocloud/ProtectedRoute';
import { Login } from './Arvocloud/dashboard/Login';
import { Signup } from './Arvocloud/dashboard/Signup';
import { CustomerDashboard } from './Arvocloud/dashboard/CustomerDashboard';
import { OrderServer } from './Arvocloud/dashboard/OrderServer';
import { Checkout } from './Arvocloud/dashboard/Checkout';
import { Invoices } from './Arvocloud/dashboard/Invoices';
import { Admin } from './Arvocloud/dashboard/Admin';
import { Profile } from './Arvocloud/dashboard/Profile';

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
