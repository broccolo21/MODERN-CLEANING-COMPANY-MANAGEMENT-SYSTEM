import React, { useState } from 'react';
import { Users, Mail, Phone, Calendar, MapPin, CheckCircle2, Clock, MessageSquare, Video } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'available' | 'on_duty' | 'off_duty';
  currentLocation?: string;
  nextShift?: Date;
}

interface TeamSchedule {
  date: Date;
  shift: 'morning' | 'afternoon' | 'night';
  location: string;
  members: string[];
}

interface TeamChat {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
}

function Team() {
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Marco Rossi',
      role: 'Team Leader',
      email: 'marco.rossi@example.com',
      phone: '+39 333 1234567',
      status: 'on_duty',
      currentLocation: 'TechCorp SpA - Via Roma 123',
      nextShift: new Date(Date.now() + 86400000)
    },
    {
      id: '2',
      name: 'Laura Bianchi',
      role: 'Operatore',
      email: 'laura.bianchi@example.com',
      phone: '+39 333 7654321',
      status: 'available',
      nextShift: new Date(Date.now() + 86400000 * 2)
    },
    {
      id: '3',
      name: 'Giuseppe Verdi',
      role: 'Operatore',
      email: 'giuseppe.verdi@example.com',
      phone: '+39 333 9876543',
      status: 'off_duty',
      nextShift: new Date(Date.now() + 86400000 * 3)
    }
  ]);

  const [schedule] = useState<TeamSchedule[]>([
    {
      date: new Date(),
      shift: 'morning',
      location: 'TechCorp SpA - Via Roma 123',
      members: ['1', '2']
    },
    {
      date: new Date(Date.now() + 86400000),
      shift: 'afternoon',
      location: 'Hospital Care - Via Salute 45',
      members: ['2', '3']
    }
  ]);

  const [chatMessages] = useState<TeamChat[]>([
    {
      id: '1',
      sender: 'Marco Rossi',
      message: 'Buongiorno team, oggi ci occupiamo del piano terra di TechCorp',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      sender: 'Laura Bianchi',
      message: 'Ok, sono già sul posto',
      timestamp: new Date(Date.now() - 1800000)
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-400';
      case 'on_duty':
        return 'text-blue-400';
      case 'off_duty':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponibile';
      case 'on_duty':
        return 'In Servizio';
      case 'off_duty':
        return 'Fuori Servizio';
      default:
        return status;
    }
  };

  const getShiftText = (shift: string) => {
    switch (shift) {
      case 'morning':
        return 'Mattina (6:00 - 14:00)';
      case 'afternoon':
        return 'Pomeriggio (14:00 - 22:00)';
      case 'night':
        return 'Notte (22:00 - 6:00)';
      default:
        return shift;
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, this would send the message to a backend
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Members Section */}
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Il Tuo Team</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Video className="w-4 h-4" />
            Avvia Video Call
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-slate-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-gray-400 text-sm">{member.role}</p>
                </div>
                <span className={`flex items-center gap-1 text-sm ${getStatusColor(member.status)}`}>
                  <CheckCircle2 className="w-4 h-4" />
                  {getStatusText(member.status)}
                </span>
              </div>
              
              <div className="space-y-3">
                <p className="text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {member.email}
                </p>
                <p className="text-gray-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {member.phone}
                </p>
                {member.currentLocation && (
                  <p className="text-gray-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {member.currentLocation}
                  </p>
                )}
                {member.nextShift && (
                  <p className="text-gray-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Prossimo turno: {member.nextShift.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Turni Programmati</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Calendario Completo
            </button>
          </div>

          <div className="space-y-4">
            {schedule.map((shift, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">
                        {shift.date.toLocaleDateString()}
                      </span>
                      <span className="text-gray-400">
                        {getShiftText(shift.shift)}
                      </span>
                    </div>
                    <p className="text-gray-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {shift.location}
                    </p>
                    <div className="mt-3">
                      <p className="text-sm text-gray-400 mb-2">Team assegnato:</p>
                      <div className="flex flex-wrap gap-2">
                        {shift.members.map(memberId => {
                          const member = teamMembers.find(m => m.id === memberId);
                          return member ? (
                            <span key={member.id} className="px-3 py-1 bg-slate-600 rounded-full text-sm text-white">
                              {member.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">
                      {new Date().toDateString() === shift.date.toDateString() ? 'Oggi' : 'Prossimo'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Chat Section */}
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Chat di Team</h2>
          </div>

          <div className="h-[400px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {chatMessages.map((message) => (
                <div key={message.id} className="bg-slate-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-white">{message.sender}</span>
                    <span className="text-sm text-gray-400">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-300">{message.message}</p>
                </div>
              ))}
            </div>

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
                Invia
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;