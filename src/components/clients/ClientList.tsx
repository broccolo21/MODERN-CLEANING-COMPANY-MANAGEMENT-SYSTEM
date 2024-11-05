import React from 'react';
import { MapPin, Phone, Mail, Building2, CheckCircle2, XCircle } from 'lucide-react';
import { Client } from '../../types/client';

interface ClientListProps {
  clients: Client[];
  selectedClient: Client | null;
  onSelectClient: (client: Client) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (clientId: string) => void;
}

function ClientList({ clients, selectedClient, onSelectClient }: ClientListProps) {
  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <div
          key={client.id}
          onClick={() => onSelectClient(client)}
          className={`bg-slate-800 rounded-lg p-6 cursor-pointer transition-colors ${
            selectedClient?.id === client.id ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-white">{client.name}</h3>
                <span className={`text-sm ${getStatusColor(client.status)}`}>
                  {client.status === 'active' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {client.address}
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {client.phone}
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {client.email}
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {client.type === 'business' ? 'Business' : 'Residenziale'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClientList;