import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Users, Building2, Calendar, BarChart, Settings, Video } from 'lucide-react';
import Dashboard from '../components/admin/Dashboard';
import OperationsCenter from '../components/admin/OperationsCenter';
import EmployeeManagement from '../components/admin/EmployeeManagement';
import ClientManagement from '../components/admin/Clients';
import Analytics from '../components/admin/Analytics';
import AdminSettings from '../components/admin/Settings';

function AdminPortal() {
  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin" className="text-xl font-bold text-white">
                Admin Portal
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/admin/operations"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                Centro Operativo
              </Link>
              <Link
                to="/admin/employees"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Dipendenti
              </Link>
              <Link
                to="/admin/clients"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                Clienti
              </Link>
              <Link
                to="/admin/analytics"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <BarChart className="w-4 h-4" />
                Analytics
              </Link>
              <Link
                to="/admin/settings"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Impostazioni
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/operations" element={<OperationsCenter />} />
          <Route path="/employees" element={<EmployeeManagement />} />
          <Route path="/clients" element={<ClientManagement />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminPortal;