import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Building2, FileText, MessageSquare, CreditCard } from 'lucide-react';
import ClientDashboard from '../components/client/ClientDashboard';
import ClientServices from '../components/client/ClientServices';
import ClientInvoices from '../components/client/ClientInvoices';
import ClientSupport from '../components/client/ClientSupport';
import ClientBilling from '../components/client/ClientBilling';

function ClientPortal() {
  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/client" className="text-xl font-bold text-white">
                Client Portal
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/client/services"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                Servizi
              </Link>
              <Link
                to="/client/invoices"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Fatture
              </Link>
              <Link
                to="/client/support"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Supporto
              </Link>
              <Link
                to="/client/billing"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Pagamenti
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<ClientDashboard />} />
          <Route path="/services" element={<ClientServices />} />
          <Route path="/invoices" element={<ClientInvoices />} />
          <Route path="/support" element={<ClientSupport />} />
          <Route path="/billing" element={<ClientBilling />} />
        </Routes>
      </main>
    </div>
  );
}

export default ClientPortal;