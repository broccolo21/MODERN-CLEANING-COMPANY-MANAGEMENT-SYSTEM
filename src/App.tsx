import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import AdminPortal from './pages/AdminPortal';
import ClientPortal from './pages/ClientPortal';
import EmployeePortal from './pages/EmployeePortal';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-900">
          <nav className="bg-slate-800 border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <Link to="/" className="flex items-center gap-2">
                  <Eye className="w-8 h-8 text-blue-500" />
                  <span className="text-xl font-bold text-white">CleanVision</span>
                </Link>
                <div className="flex items-center gap-4">
                  <Link to="/pricing" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Prezzi
                  </Link>
                  <Link to="/login" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                    Accedi
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pricing" element={<Pricing />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPortal />
                  </ProtectedRoute>
                }
              />

              {/* Protected Client Routes */}
              <Route
                path="/client/*"
                element={
                  <ProtectedRoute requiredRole="client">
                    <ClientPortal />
                  </ProtectedRoute>
                }
              />

              {/* Protected Employee Routes */}
              <Route
                path="/employee/*"
                element={
                  <ProtectedRoute requiredRole="employee">
                    <EmployeePortal />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;