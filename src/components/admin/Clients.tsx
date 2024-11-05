import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Building2, MapPin, Phone, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { Client } from '../../types/client';

function Clients() {
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
  const [editingClient, setEditingClient] = useState<Partial<Client> | null>(null);

  const handleNewClient = () => {
    setEditingClient({
      type: 'business',
      status: 'active',
      serviceFrequency: 'weekly',
      contractStart: new Date()
    });
    setSelectedClient(null);
    setIsModalOpen(true);
  };

  const handleEditClient = () => {
    if (selectedClient) {
      setEditingClient(selectedClient);
      setIsModalOpen(true);
    }
  };

  const handleDeleteClient = () => {
    if (selectedClient) {
      if (window.confirm('Sei sicuro di voler eliminare questo cliente?')) {
        setClients(clients.filter(client => client.id !== selectedClient.id));
        setSelectedClient(null);
      }
    }
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      const newClient = {
        ...editingClient,
        id: editingClient.id || Date.now().toString()
      } as Client;

      if (selectedClient) {
        // Update existing client
        setClients(clients.map(client => 
          client.id === selectedClient.id ? newClient : client
        ));
      } else {
        // Add new client
        setClients([...clients, newClient]);
      }

      setIsModalOpen(false);
      setEditingClient(null);
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-400' : 'text-red-400';
  };

  const getServiceFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return 'Giornaliero';
      case 'weekly':
        return 'Settimanale';
      case 'biweekly':
        return 'Bisettimanale';
      case 'monthly':
        return 'Mensile';
      default:
        return frequency;
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
            onClick={handleNewClient}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuovo Cliente
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
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
                <div className="text-sm text-blue-400">
                  {getServiceFrequencyText(client.serviceFrequency)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          {selectedClient ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-white">Dettagli Cliente</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleEditClient}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleDeleteClient}
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
                    <p className="text-white">{selectedClient.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Tipo</label>
                    <p className="text-white capitalize">{selectedClient.type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">P.IVA</label>
                    <p className="text-white">{selectedClient.vatNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Referente</label>
                    <p className="text-white">{selectedClient.contactPerson}</p>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Contratto</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Data Inizio</label>
                      <p className="text-white">{selectedClient.contractStart.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Data Fine</label>
                      <p className="text-white">
                        {selectedClient.contractEnd?.toLocaleDateString() || 'Indeterminato'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Frequenza</label>
                      <p className="text-white">{getServiceFrequencyText(selectedClient.serviceFrequency)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Stato</label>
                      <p className={getStatusColor(selectedClient.status)}>
                        {selectedClient.status === 'active' ? 'Attivo' : 'Inattivo'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Servizio</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Prossimo Intervento</label>
                      <p className="text-white">{selectedClient.nextService?.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Ultimo Intervento</label>
                      <p className="text-white">
                        {selectedClient.lastService?.toLocaleDateString() || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedClient.notes && (
                  <div className="border-t border-slate-700 pt-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Note</h4>
                    <p className="text-white">{selectedClient.notes}</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Seleziona un cliente per visualizzare i dettagli
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6">
              {selectedClient ? 'Modifica Cliente' : 'Nuovo Cliente'}
            </h3>
            <form onSubmit={handleSaveClient} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={editingClient?.name || ''}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo
                  </label>
                  <select
                    value={editingClient?.type || 'business'}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, type: e.target.value as 'business' | 'residential' }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="business">Business</option>
                    <option value="residential">Residenziale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingClient?.email || ''}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    value={editingClient?.phone || ''}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Indirizzo
                  </label>
                  <input
                    type="text"
                    value={editingClient?.address || ''}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    P.IVA
                  </label>
                  <input
                    type="text"
                    value={editingClient?.vatNumber || ''}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, vatNumber: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Referente
                  </label>
                  <input
                    type="text"
                    value={editingClient?.contactPerson || ''}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, contactPerson: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Frequenza Servizio
                  </label>
                  <select
                    value={editingClient?.serviceFrequency || 'weekly'}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, serviceFrequency: e.target.value as 'daily' | 'weekly' | 'biweekly' | 'monthly' }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="daily">Giornaliero</option>
                    <option value="weekly">Settimanale</option>
                    <option value="biweekly">Bisettimanale</option>
                    <option value="monthly">Mensile</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Stato
                  </label>
                  <select
                    value={editingClient?.status || 'active'}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="active">Attivo</option>
                    <option value="inactive">Inattivo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Data Inizio Contratto
                  </label>
                  <input
                    type="date"
                    value={editingClient?.contractStart ? new Date(editingClient.contractStart).toISOString().split('T')[0] : ''}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, contractStart: new Date(e.target.value) }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Data Fine Contratto
                  </label>
                  <input
                    type="date"
                    value={editingClient?.contractEnd ? new Date(editingClient.contractEnd).toISOString().split('T')[0] : ''}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, contractEnd: new Date(e.target.value) }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Note
                  </label>
                  <textarea
                    value={editingClient?.notes || ''}
                    onChange={(e) => setEditingClient(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingClient(null);
                  }}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedClient ? 'Salva Modifiche' : 'Crea Cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;