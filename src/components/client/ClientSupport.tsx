import React, { useState } from 'react';
import { Eye, Plus, Send } from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created: Date;
  lastUpdate: Date;
  messages: {
    id: string;
    text: string;
    timestamp: Date;
    isStaff: boolean;
  }[];
  description: string;
}

function ClientSupport() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      subject: 'Richiesta Modifica Orario',
      status: 'open',
      priority: 'medium',
      created: new Date(2024, 2, 20),
      lastUpdate: new Date(2024, 2, 21),
      messages: [
        {
          id: '1',
          text: 'Vorrei modificare l\'orario del servizio di pulizia',
          timestamp: new Date(2024, 2, 20),
          isStaff: false
        },
        {
          id: '2',
          text: 'Certamente, a che ora preferisce il servizio?',
          timestamp: new Date(2024, 2, 21),
          isStaff: true
        }
      ],
      description: 'Richiesta di modifica dell\'orario del servizio di pulizia settimanale'
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    description: ''
  });
  const [newMessage, setNewMessage] = useState('');

  const handleNewTicket = () => {
    setIsNewTicketModalOpen(true);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const ticket: Ticket = {
      id: (tickets.length + 1).toString(),
      subject: newTicket.subject,
      status: 'open',
      priority: newTicket.priority,
      created: new Date(),
      lastUpdate: new Date(),
      messages: [],
      description: newTicket.description
    };
    setTickets([...tickets, ticket]);
    setIsNewTicketModalOpen(false);
    setNewTicket({
      subject: '',
      priority: 'medium',
      description: ''
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date(),
      isStaff: false
    };

    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, message],
      lastUpdate: new Date()
    };

    setTickets(tickets.map(t => t.id === selectedTicket.id ? updatedTicket : t));
    setSelectedTicket(updatedTicket);
    setNewMessage('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Supporto</h2>
        <button 
          onClick={handleNewTicket}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuovo Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">I Tuoi Ticket</h3>
          <div className="space-y-4">
            {tickets.map(ticket => (
              <div key={ticket.id} className="bg-slate-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">{ticket.subject}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      ticket.status === 'open' 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {ticket.status === 'open' ? 'Aperto' : 'Chiuso'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)} bg-opacity-10`}>
                      {ticket.priority === 'high' ? 'Alta' : ticket.priority === 'medium' ? 'Media' : 'Bassa'}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Creato il: {ticket.created.toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-400">
                  Ultimo aggiornamento: {ticket.lastUpdate.toLocaleDateString()}
                </div>
                <button 
                  onClick={() => setSelectedTicket(ticket)}
                  className="mt-3 flex items-center gap-2 w-full py-2 px-4 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Visualizza Dettagli
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          {selectedTicket ? (
            <div className="h-full flex flex-col">
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{selectedTicket.subject}</h3>
                    <p className="text-gray-400 text-sm mt-1">{selectedTicket.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedTicket.status === 'open' 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {selectedTicket.status === 'open' ? 'Aperto' : 'Chiuso'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedTicket.priority)} bg-opacity-10`}>
                      Priorità {selectedTicket.priority === 'high' ? 'Alta' : selectedTicket.priority === 'medium' ? 'Media' : 'Bassa'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {selectedTicket.messages.map(message => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${
                      message.isStaff
                        ? 'bg-blue-600/20 ml-8'
                        : 'bg-slate-700 mr-8'
                    }`}
                  >
                    <p className="text-white">{message.text}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>

              {selectedTicket.status === 'open' && (
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Scrivi un messaggio..."
                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Seleziona un ticket per visualizzare i dettagli
            </div>
          )}
        </div>
      </div>

      {isNewTicketModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-6">Nuovo Ticket</h3>
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Oggetto
                </label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Priorità
                </label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as 'low' | 'medium' | 'high' })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Bassa</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrizione
                </label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsNewTicketModalOpen(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Crea Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientSupport;