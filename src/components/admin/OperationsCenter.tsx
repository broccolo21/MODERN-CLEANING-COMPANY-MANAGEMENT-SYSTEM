import React, { useState } from 'react';
import { Camera, MapPin, Users, Clock, Search, Filter, Download, X, Maximize2, Minimize2 } from 'lucide-react';
import LiveView from './LiveView';

interface Operation {
  id: string;
  client: string;
  location: string;
  team: string;
  status: 'in-progress' | 'completed' | 'scheduled';
  startTime: Date;
  endTime?: Date;
  cameraId?: string;
}

function OperationsCenter() {
  const [operations] = useState<Operation[]>([
    {
      id: '1',
      client: 'TechCorp SpA',
      location: 'Via Roma 123, Milano',
      team: 'Squadra A',
      status: 'in-progress',
      startTime: new Date(),
      cameraId: 'CAM001'
    },
    {
      id: '2',
      client: 'Hospital Care',
      location: 'Via Salute 45, Milano',
      team: 'Squadra B',
      status: 'scheduled',
      startTime: new Date(Date.now() + 3600000),
      cameraId: 'CAM002'
    },
    {
      id: '3',
      client: 'Office Solutions',
      location: 'Via Uffici 78, Milano',
      team: 'Squadra C',
      status: 'completed',
      startTime: new Date(Date.now() - 7200000),
      endTime: new Date(Date.now() - 3600000),
      cameraId: 'CAM003'
    },
  ]);

  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'text-green-400';
      case 'scheduled':
        return 'text-yellow-400';
      case 'completed':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'In Corso';
      case 'scheduled':
        return 'Programmato';
      case 'completed':
        return 'Completato';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Centro Operativo</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cerca operazioni..."
              className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
            <Filter className="w-4 h-4" />
            Filtri
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Esporta
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {operations.map((operation) => (
            <div key={operation.id} className="bg-slate-800 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-white">{operation.client}</h3>
                    <span className={`flex items-center gap-1 text-sm ${getStatusColor(operation.status)}`}>
                      <div className={`w-2 h-2 rounded-full ${operation.status === 'in-progress' ? 'animate-pulse' : ''} ${getStatusColor(operation.status)}`} />
                      {getStatusText(operation.status)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {operation.location}
                    </p>
                    <p className="text-gray-300 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {operation.team}
                    </p>
                    <p className="text-gray-300 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {operation.startTime.toLocaleTimeString()} - 
                      {operation.endTime ? operation.endTime.toLocaleTimeString() : 'In corso'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  {operation.status === 'in-progress' && (
                    <button
                      onClick={() => setSelectedOperation(operation)}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                      Live View
                    </button>
                  )}
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                    <MapPin className="w-4 h-4" />
                    Tracking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Live View</h3>
            <div className="flex gap-2">
              {selectedOperation && (
                <>
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setSelectedOperation(null)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {selectedOperation ? (
            <LiveView
              operation={selectedOperation}
              isFullscreen={isFullscreen}
            />
          ) : (
            <div className="h-[400px] flex items-center justify-center text-gray-400">
              Seleziona un'operazione in corso per visualizzare il live streaming
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OperationsCenter;