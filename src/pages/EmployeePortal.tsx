import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ClipboardList, Calendar, Users2, Settings, MapPin, Bell, Shield, User, Mail, Phone } from 'lucide-react';
import Schedule from '../components/employee/Schedule';
import GeoTracking from '../components/employee/GeoTracking';
import Team from '../components/employee/Team';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile, updateUserSettings } from '../services/users';

function EmployeePortal() {
  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-white">
                Employee Portal
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/employee/schedule"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Calendario
              </Link>
              <Link
                to="/employee/geotracking"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                GeoTracking
              </Link>
              <Link
                to="/employee/team"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <Users2 className="w-4 h-4" />
                Team
              </Link>
              <Link
                to="/employee/settings"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/geotracking" element={<GeoTracking />} />
          <Route path="/team" element={<Team />} />
          <Route path="/settings" element={<EmployeeSettings />} />
        </Routes>
      </main>
    </div>
  );
}

function EmployeeSettings() {
  const { user } = useAuth();
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: true,
    schedule: true
  });

  const [profile, setProfile] = React.useState({
    name: 'Marco Rossi',
    email: 'marco.rossi@example.com',
    phone: '+39 333 1234567',
    emergencyContact: '+39 333 7654321'
  });

  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;

    try {
      setIsUpdating(true);
      await updateUserProfile(user.uid, {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        emergencyContact: profile.emergencyContact
      });
      alert('Profilo aggiornato con successo!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Errore durante l\'aggiornamento del profilo');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleNotificationUpdate = async (key: keyof typeof notifications, value: boolean) => {
    if (!user?.uid) return;

    try {
      setNotifications(prev => ({ ...prev, [key]: value }));
      await updateUserSettings(user.uid, {
        notifications: {
          ...notifications,
          [key]: value
        }
      });
    } catch (error) {
      console.error('Error updating notifications:', error);
      // Revert the change if the update fails
      setNotifications(prev => ({ ...prev, [key]: !value }));
      alert('Errore durante l\'aggiornamento delle notifiche');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Profilo Personale</h2>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Telefono
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contatto Emergenza
              </label>
              <input
                type="tel"
                value={profile.emergencyContact}
                onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? 'Salvataggio...' : 'Salva Modifiche'}
          </button>
        </form>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Notifiche</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Email Notifiche</p>
              <p className="text-gray-400 text-sm">Ricevi aggiornamenti via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={e => handleNotificationUpdate('email', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Push Notifiche</p>
              <p className="text-gray-400 text-sm">Notifiche in tempo reale</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={e => handleNotificationUpdate('push', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Aggiornamenti Turni</p>
              <p className="text-gray-400 text-sm">Notifiche modifiche calendario</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.schedule}
                onChange={e => handleNotificationUpdate('schedule', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-bold text-white">Sicurezza</h2>
        </div>

        <div className="space-y-4">
          <button className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            Cambia Password
          </button>
          <button className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            Attiva Autenticazione a Due Fattori
          </button>
          <button className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            Disconnetti Altri Dispositivi
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeePortal;