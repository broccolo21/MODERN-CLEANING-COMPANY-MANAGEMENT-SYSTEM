import React, { useState } from 'react';
import { UserPlus, Building } from 'lucide-react';

function RegistrationForms() {
  const [activeTab, setActiveTab] = useState('employee');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-3 rounded-l-lg flex items-center gap-2 ${
            activeTab === 'employee'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-gray-400'
          }`}
          onClick={() => setActiveTab('employee')}
        >
          <UserPlus className="w-5 h-5" />
          Registra Dipendente
        </button>
        <button
          className={`px-6 py-3 rounded-r-lg flex items-center gap-2 ${
            activeTab === 'client'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-gray-400'
          }`}
          onClick={() => setActiveTab('client')}
        >
          <Building className="w-5 h-5" />
          Registra Cliente
        </button>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl shadow-xl">
        {activeTab === 'employee' ? (
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cognome
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Registra Dipendente
            </button>
          </form>
        ) : (
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome Azienda
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Partita IVA
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Registra Cliente
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegistrationForms;