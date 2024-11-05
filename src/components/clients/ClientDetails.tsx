import React from 'react';
import { Edit2, Trash2, Building2, Calendar } from 'lucide-react';
import { Client } from '../../types/client';

interface ClientDetailsProps {
  client: Client | null;
  onEdit: (client: Client) => void;
  onDelete: (clientId: string) => void;
}

function ClientDetails({ client, onEdit, onDelete }: ClientDetailsProps) {
  if (!client) {
    return (
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="h-full flex items-center justify-center text-gray-400">
          Seleziona un cliente per visualizzare i dettagli
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-bold text-white">Dettagli Cliente</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(client)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(client.id)}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Nome</label>
            <p className="text-white">{client.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Tipo</label>
            <p className="text-white capitalize">{client.type}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">P.IVA</label>
            <p className="text-white">{client.vatNumber}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Referente</label>
            <p className="text-white">{client.contactPerson}</p>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6">
          <h4 className="text-lg font-semibold text-white mb-4">Contratto</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Data Inizio</label>
              <p className="text-white">{client.contractStart.toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Data Fine</label>
              <p className="text-white">
                {client.contractEnd?.toLocaleDateString() || 'Indeterminato'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Frequenza</label>
              <p className="text-white">{client.serviceFrequency}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Stato</label>
              <p className={getStatusColor(client.status)}>
                {client.status === 'active' ? 'Attivo' : 'Inattivo'}
              </p>
            </div>
          </div>
        </div>

        {client.notes && (
          <div className="border-t border-slate-700 pt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Note</h4>
            <p className="text-white">{client.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientDetails;