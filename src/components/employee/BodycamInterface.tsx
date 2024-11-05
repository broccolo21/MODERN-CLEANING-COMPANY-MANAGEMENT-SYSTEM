import React, { useState, useEffect } from 'react';
import { Camera, Video, Mic, MicOff, Volume2, VolumeX, MessageSquare, Battery, Signal, MapPin } from 'lucide-react';

function BodycamInterface() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [signalStrength, setSignalStrength] = useState(4); // 0-4
  const [messages, setMessages] = useState<{ id: string; text: string; timestamp: Date; isOperator: boolean }[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Simulate battery drain
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, prev - 1));
    }, 30000);

    // Simulate signal fluctuation
    const signalInterval = setInterval(() => {
      setSignalStrength(Math.floor(Math.random() * 5));
    }, 10000);

    // Simulate receiving operator messages
    const messageInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: 'Messaggio dalla centrale operativa',
          timestamp: new Date(),
          isOperator: true
        }]);
      }
    }, 15000);

    return () => {
      clearInterval(batteryInterval);
      clearInterval(signalInterval);
      clearInterval(messageInterval);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: newMessage,
        timestamp: new Date(),
        isOperator: false
      }]);
      setNewMessage('');
    }
  };

  const getBatteryColor = () => {
    if (batteryLevel > 60) return 'text-green-400';
    if (batteryLevel > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${getBatteryColor()}`}>
                <Battery className="w-5 h-5" />
                <span>{batteryLevel}%</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <Signal className="w-5 h-5" />
                <span>{signalStrength}/4</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-400" />
              <span className="text-white">GPS Attivo</span>
            </div>
          </div>

          <div className="relative bg-black rounded-lg overflow-hidden">
            <div className="aspect-video bg-slate-900 flex items-center justify-center">
              <Camera className="w-12 h-12 text-gray-600" />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsStreaming(!isStreaming)}
                    className={`p-2 rounded-full ${isStreaming ? 'bg-red-600' : 'bg-slate-700'} text-white hover:bg-opacity-80 transition-colors`}
                  >
                    <Video className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-2 rounded-full ${isMuted ? 'bg-red-600' : 'bg-slate-700'} text-white hover:bg-opacity-80 transition-colors`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                </div>
                {isStreaming && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white">Live</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Comunicazioni</h3>
          </div>

          <div className="h-80 overflow-y-auto space-y-4 mb-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`p-3 rounded-lg ${
                  message.isOperator
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
  );
}

export default BodycamInterface;