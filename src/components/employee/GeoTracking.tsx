import React, { useState, useEffect } from 'react';
import { MapPin, Video, Download } from 'lucide-react';

interface TrackingSession {
  id: string;
  clientName: string;
  address: string;
  startTime: Date;
  endTime: Date | null;
  status: 'active' | 'completed';
  videoUrl: string;
}

function GeoTracking() {
  const [currentLocation, setCurrentLocation] = useState<GeolocationCoordinates | null>(null);
  const [trackingSessions, setTrackingSessions] = useState<TrackingSession[]>([
    {
      id: '1',
      clientName: 'TechCorp SpA',
      address: 'Via Roma 123, Milano',
      startTime: new Date(),
      endTime: null,
      status: 'active',
      videoUrl: 'https://example.com/video1.mp4'
    }
  ]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation(position.coords);
          checkProximity(position.coords);
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const checkProximity = (coords: GeolocationCoordinates) => {
    // Simulate proximity check with client location
    // In a real application, you would compare with actual client coordinates
    const clientLocation = {
      latitude: 45.4642,
      longitude: 9.1900
    };

    const distance = calculateDistance(
      coords.latitude,
      coords.longitude,
      clientLocation.latitude,
      clientLocation.longitude
    );

    if (distance <= 0.001) { // 1 meter in kilometers
      // Start tracking
      console.log('Tracking started - within 1 meter of client location');
    } else if (distance >= 0.005) { // 5 meters in kilometers
      // Stop tracking
      console.log('Tracking stopped - more than 5 meters from client location');
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (value: number): number => {
    return value * Math.PI / 180;
  };

  const generateReport = (session: TrackingSession) => {
    // In a real application, this would generate a PDF report combining
    // geolocation data and video footage
    console.log('Generating report for session:', session);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-6">GeoTracking</h2>
        
        <div className="grid gap-6">
          {trackingSessions.map(session => (
            <div key={session.id} className="bg-slate-700 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{session.clientName}</h3>
                  <p className="text-gray-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {session.address}
                  </p>
                  <p className="text-gray-300 mt-2">
                    Inizio: {session.startTime.toLocaleTimeString()}
                  </p>
                  {session.endTime && (
                    <p className="text-gray-300">
                      Fine: {session.endTime.toLocaleTimeString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Video className="w-4 h-4" />
                    Video
                  </button>
                  <button
                    onClick={() => generateReport(session)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Report
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      session.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                    }`} />
                    <span className="text-gray-300">
                      {session.status === 'active' ? 'Tracciamento attivo' : 'Completato'}
                    </span>
                  </div>
                  {currentLocation && (
                    <p className="text-gray-400 mt-2">
                      Posizione attuale: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GeoTracking;