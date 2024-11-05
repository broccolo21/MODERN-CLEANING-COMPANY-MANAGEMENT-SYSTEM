import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { it } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Download, Edit2, Trash2, Plus } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import SchedulePDF from './SchedulePDF';

const locales = {
  'it': it,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  client: string;
  address: string;
  team: string;
  notes?: string;
}

function Schedule() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Pulizia Uffici Piano 1',
      start: new Date(2024, 2, 20, 9, 0),
      end: new Date(2024, 2, 20, 11, 0),
      client: 'TechCorp SpA',
      address: 'Via Roma 123, Milano',
      team: 'Squadra A',
      notes: 'Utilizzare prodotti specifici per pavimenti in marmo'
    },
    {
      id: '2',
      title: 'Sanificazione Locali',
      start: new Date(2024, 2, 21, 14, 0),
      end: new Date(2024, 2, 21, 16, 0),
      client: 'Hospital Care',
      address: 'Via Salute 45, Milano',
      team: 'Squadra B',
      notes: 'Protocollo di sanificazione ospedaliera'
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedEvent, setEditedEvent] = useState<Event | null>(null);

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    setIsModalOpen(false);
  };

  const handleEditClick = () => {
    setEditedEvent(selectedEvent);
    setIsEditMode(true);
  };

  const handleAddEvent = () => {
    const newEvent: Event = {
      id: String(Date.now()),
      title: '',
      start: new Date(),
      end: new Date(),
      client: '',
      address: '',
      team: '',
      notes: ''
    };
    setSelectedEvent(newEvent);
    setEditedEvent(newEvent);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedEvent) {
      if (selectedEvent?.id) {
        // Update existing event
        setEvents(events.map(event => 
          event.id === selectedEvent.id ? editedEvent : event
        ));
      } else {
        // Add new event
        setEvents([...events, editedEvent]);
      }
      setIsModalOpen(false);
      setIsEditMode(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Calendario Interventi</h2>
          <div className="flex gap-4">
            <button
              onClick={handleAddEvent}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nuovo Intervento
            </button>
            <PDFDownloadLink
              document={<SchedulePDF events={events} />}
              fileName="calendario-interventi.pdf"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Scarica PDF
            </PDFDownloadLink>
          </div>
        </div>

        <div className="bg-slate-700 p-6 rounded-lg">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={handleSelectEvent}
            messages={{
              next: "Succ",
              previous: "Prec",
              today: "Oggi",
              month: "Mese",
              week: "Settimana",
              day: "Giorno"
            }}
            className="text-white"
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full">
            {isEditMode ? (
              <form onSubmit={handleSaveEvent} className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">
                  {selectedEvent?.id ? 'Modifica Intervento' : 'Nuovo Intervento'}
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Titolo
                  </label>
                  <input
                    type="text"
                    value={editedEvent?.title || ''}
                    onChange={e => setEditedEvent(prev => prev ? {...prev, title: e.target.value} : null)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Cliente
                  </label>
                  <input
                    type="text"
                    value={editedEvent?.client || ''}
                    onChange={e => setEditedEvent(prev => prev ? {...prev, client: e.target.value} : null)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Indirizzo
                  </label>
                  <input
                    type="text"
                    value={editedEvent?.address || ''}
                    onChange={e => setEditedEvent(prev => prev ? {...prev, address: e.target.value} : null)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Squadra
                  </label>
                  <input
                    type="text"
                    value={editedEvent?.team || ''}
                    onChange={e => setEditedEvent(prev => prev ? {...prev, team: e.target.value} : null)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Data Inizio
                  </label>
                  <input
                    type="datetime-local"
                    value={format(editedEvent?.start || new Date(), "yyyy-MM-dd'T'HH:mm")}
                    onChange={e => setEditedEvent(prev => prev ? {...prev, start: new Date(e.target.value)} : null)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Data Fine
                  </label>
                  <input
                    type="datetime-local"
                    value={format(editedEvent?.end || new Date(), "yyyy-MM-dd'T'HH:mm")}
                    onChange={e => setEditedEvent(prev => prev ? {...prev, end: new Date(e.target.value)} : null)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Note
                  </label>
                  <textarea
                    value={editedEvent?.notes || ''}
                    onChange={e => setEditedEvent(prev => prev ? {...prev, notes: e.target.value} : null)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditMode(false);
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Salva
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white mb-4">Dettagli Intervento</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Cliente</label>
                    <p className="text-white">{selectedEvent?.client}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Indirizzo</label>
                    <p className="text-white">{selectedEvent?.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Squadra</label>
                    <p className="text-white">{selectedEvent?.team}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Data e Ora</label>
                    <p className="text-white">
                      {selectedEvent && format(selectedEvent.start, "dd/MM/yyyy HH:mm")} - {selectedEvent && format(selectedEvent.end, "HH:mm")}
                    </p>
                  </div>
                  {selectedEvent?.notes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Note</label>
                      <p className="text-white">{selectedEvent.notes}</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => handleDeleteEvent(selectedEvent?.id || '')}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Elimina
                  </button>
                  <button
                    onClick={handleEditClick}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Modifica
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Chiudi
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Schedule;