import React, { useState } from 'react';
import { Building2, FileText, MessageSquare, CreditCard } from 'lucide-react';

interface DashboardCard {
  id: number;
  name: string;
  value: string;
  icon: React.ReactNode;
}

function ClientDashboard() {
  const [services] = useState<DashboardCard[]>([
    { id: 1, name: 'Servizi Attivi', value: '3', icon: <Building2 className="w-8 h-8 text-blue-400" /> },
    { id: 2, name: 'Fatture in Sospeso', value: '2', icon: <FileText className="w-8 h-8 text-yellow-400" /> },
    { id: 3, name: 'Ticket Supporto', value: '1', icon: <MessageSquare className="w-8 h-8 text-green-400" /> },
    { id: 4, name: 'Prossimo Pagamento', value: '€499', icon: <CreditCard className="w-8 h-8 text-purple-400" /> }
  ]);

  return (
    <div className="bg-slate-800 shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Welcome to Your Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{service.name}</p>
                <p className="text-2xl font-bold text-white mt-1">{service.value}</p>
              </div>
              {service.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientDashboard;