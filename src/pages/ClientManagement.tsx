import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { getClients, addClient, updateClient, deleteClient } from '../services/firestore';
import ClientForm from '../components/clients/ClientForm';
import ClientDetails from '../components/clients/ClientDetails';
import ClientList from '../components/clients/ClientList';
import { Client } from '../types/client';

function ClientManagement() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'TechCorp SpA',
      type: 'business',
      email: 'info@techcorp.it',
      phone: '+39 02 1234567',
      address: 'Via Roma 123, Milano',
      vatNumber: 'IT12345678901',
      contactPerson: 'Mario Rossi',
      serviceFrequency: 'weekly',
      status: 'active',
      contractStart: new Date(2024, 0, 1),
      contractEnd: new Date(2024, 11, 31),
      nextService: new Date(2024, 2, 25),
      lastService: new Date(2024, 2, 18),
      notes: 'Pulizia uffici piano 1-3'
    },
    {
      id: '2',
      name: 'Hospital Care',
      type: 'business',
      email: 'facility@hospitalcare.it',
      phone: '+39 02 7654321',
      address: 'Via Salute 45, Milano',
      vatNumber: 'IT98765432109',
      contactPerson: 'Laura Bianchi',
      serviceFrequency: 'daily',
      status: 'active',
      contractStart: new Date(2023, 5, 1),
      nextService: new Date(2024, 2, 24),
      lastService: new Date(2024, 2, 23),
      notes: 'Protocollo sanitario speciale'
    }
  ]);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'business' | 'residential'>('all');

  const handleAddClient = () => {
    setSelectedClient(null);
    setIsModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleDeleteClient = async (clientId: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo cliente?')) {
      try {
        await deleteClient(clientId);
        setClients(clients.filter(client => client.id !== clientId));
        setSelectedClient(null);
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  const handleSaveClient = async (clientData: Partial<Client>) => {
    try {
      if (selectedClient) {
        await updateClient(selectedClient.id, clientData);
        setClients(clients.map(client => 
          client.id === selectedClient.id ? { ...client, ...clientData } : client
        ));
      } else {
        const newClient = {
          ...clientData,
          id: Date.now().toString(),
        } as Client;
        await addClient(newClient);
        setClients([...clients, newClient]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || client.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestione Clienti</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca clienti..."
              className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'business' | 'residential')}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tutti i tipi</option>
            <option value="business">Business</option>
            <option value="residential">Residenziale</option>
          </select>
          <button
            onClick={handleAddClient}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuovo Cliente
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClientList
          clients={filteredClients}
          selectedClient={selectedClient}
          onSelectClient={setSelectedClient}
          onEditClient={handleEditClient}
          onDeleteClient={handleDeleteClient}
        />

        <ClientDetails
          client={selectedClient}
          onEdit={handleEditClient}
          onDelete={handleDeleteClient}
        />
      </div>

      {isModalOpen && (
        <ClientForm
          client={selectedClient}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveClient}
        />
      )}
    </div>
  );
}

export default ClientManagement;