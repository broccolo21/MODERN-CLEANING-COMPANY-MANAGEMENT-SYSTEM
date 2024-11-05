import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, AlertCircle, Building2, Users, User } from 'lucide-react';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'employee' | 'client'>('admin');

  const handleLogin = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const credentials = {
        admin: { email: 'admin@example.com', password: 'demo-password', redirect: '/admin' },
        employee: { email: 'employee@example.com', password: 'demo-password', redirect: '/employee' },
        client: { email: 'client@example.com', password: 'demo-password', redirect: '/client' }
      }[selectedRole];

      await login(credentials.email, credentials.password);
      navigate(credentials.redirect);
    } catch (error) {
      setError('Accesso fallito. Per favore riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Lock className="w-12 h-12 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Accesso Demo</h2>
          <p className="text-gray-400">Seleziona un ruolo per accedere alla demo completa del sistema</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-slate-800 rounded-xl p-8 shadow-xl space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedRole('admin')}
              className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                selectedRole === 'admin'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-sm">Admin</span>
            </button>
            <button
              onClick={() => setSelectedRole('employee')}
              className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                selectedRole === 'employee'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
              }`}
            >
              <Users className="w-6 h-6" />
              <span className="text-sm">Dipendente</span>
            </button>
            <button
              onClick={() => setSelectedRole('client')}
              className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                selectedRole === 'client'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
              }`}
            >
              <Building2 className="w-6 h-6" />
              <span className="text-sm">Cliente</span>
            </button>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Accesso in corso...' : `Accedi come ${selectedRole}`}
          </button>

          <div className="text-sm text-gray-400 text-center">
            Password demo: demo-password
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;