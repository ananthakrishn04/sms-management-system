import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { jwtDecode } from 'jwt-decode';

const isAuthenticated = () => !!localStorage.getItem('token');

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token) // Decodes the JWT to get the role
    const userRole = decodedToken.sub['role'];

    if (!isAuthenticated()) return <Navigate to="/" replace />;
    if (userRole !== role) return <Navigate to="/" replace />;

    return children;
};

const App = () => {
  return (
      <Router>
          <div className="min-h-screen bg-gray-100 p-6">
              <Routes>
                  <Route path="/" element={<Login />} />
                  {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                  <Route
                      path="/admin/dashboard"
                      element={
                          <ProtectedRoute role="admin">
                              <AdminDashboard />
                          </ProtectedRoute>
                      }
                  />
                  <Route
                      path="/user/dashboard"
                      element={
                          <ProtectedRoute role="user">
                              <UserDashboard />
                          </ProtectedRoute>
                      }
                  />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
