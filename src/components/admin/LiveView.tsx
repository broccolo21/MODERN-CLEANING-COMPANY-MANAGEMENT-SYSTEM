import React, { useState, useEffect } from 'react';
import { Camera, Video, Mic, MicOff, Volume2, VolumeX, MessageSquare } from 'lucide-react';

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

interface LiveViewProps {
  operation: Operation;
  isFullscreen: boolean;
}

function LiveView({ operation, isFullscreen }: LiveViewProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [messages, setMessages] = useState<{ id: string; text: string; timestamp: Date }[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Simulate receiving messages
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: `Messaggio automatico ${prev.length + 1}`,
          timestamp: new Date()
        }]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: newMessage,
        timestamp: new Date()
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className={`grid ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900 p-6' : ''} ${isFullscreen ? 'grid-cols-3 gap-6' : 'grid-cols-1'}`}>
      <div className={`${isFullscreen ? 'col-span-2' : ''}`}>
        <div className="relative bg-black rounded-lg overflow-hidden">
          <div className="aspect-video bg-slate-900 flex items-center justify-center">
            <Camera className="w-12 h-12 text-gray-600" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{operation.client}</h4>
                <p className="text-gray-300 text-sm">{operation.team}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2 rounded-full ${isRecording ? 'bg-red-600' : 'bg-slate-700'} text-white hover:bg-opacity-80 transition-colors`}
                >
                  <Video className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2 rounded-full ${isMuted ? 'bg-red-600' : 'bg-slate-700'} text-white hover:bg-opacity-80 transition-colors`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className={`p-2 rounded-full ${!isAudioEnabled ? 'bg-red-600' : 'bg-slate-700'} text-white hover:bg-opacity-80 transition-colors`}
                >
                  {isAudioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div className="bg-slate-800 rounded-lg p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Chat Operativa</h3>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map(message => (
              <div key={message.id} className="bg-slate-700 rounded-lg p-3">
                <p className="text-white">{message.text}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
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
      )}
    </div>
  );
}

export default LiveView;