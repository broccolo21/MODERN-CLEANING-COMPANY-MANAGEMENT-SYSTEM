import React, { useState } from 'react';
import { Calendar, Clock, Plus } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  frequency: string;
  nextService: Date;
  lastService: Date | null;
  status: 'active' | 'inactive';
}

function ClientServices() {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Pulizia Uffici',
      frequency: 'Settimanale',
      nextService: new Date(Date.now() + 86400000),
      lastService: new Date(Date.now() - 86400000 * 3),
      status: 'active'
    },
    {
      id: '2',
      name: 'Sanificazione',
      frequency: 'Mensile',
      nextService: new Date(Date.now() + 86400000 * 7),
      lastService: new Date(Date.now() - 86400000 * 23),
      status: 'active'
    }
  ]);

  const handleNewService = () => {
    const newService = {
      id: (services.length + 1).toString(),
      name: 'Nuovo Servizio',
      frequency: 'Settimanale',
      nextService: new Date(Date.now() + 86400000),
      lastService: null,
      status: 'active'
    };
    setServices([...services, newService]);
  };

  const handleModifyFrequency = (serviceId: string) => {
    console.log('Modifica frequenza per servizio:', serviceId);
  };

  const handleViewHistory = (serviceId: string) => {
    console.log('Visualizza storico per servizio:', serviceId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">I Tuoi Servizi</h2>
        <button 
          onClick={handleNewService}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Richiedi Nuovo Servizio
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map(service => (
          <div key={service.id} className="bg-slate-800 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                <p className="text-gray-400">Frequenza: {service.frequency}</p>
              </div>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                Attivo
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4" />
                Prossimo intervento: {service.nextService.toLocaleDateString()}
              </div>
              {service.lastService && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  Ultimo intervento: {service.lastService.toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-4">
              <button 
                onClick={() => handleModifyFrequency(service.id)}
                className="flex-1 py-2 px-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                Modifica Frequenza
              </button>
              <button 
                onClick={() => handleViewHistory(service.id)}
                className="flex-1 py-2 px-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                Storico Interventi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientServices;