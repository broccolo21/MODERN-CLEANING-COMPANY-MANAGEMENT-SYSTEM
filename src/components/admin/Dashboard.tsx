import React from 'react';
import { Users, Building2, Calendar, Target, BrainCircuit, ArrowUp, ArrowDown, Activity } from 'lucide-react';
import { PerformanceChart } from './charts/PerformanceChart';
import { AIInsights } from './AIInsights';

function Dashboard() {
  const stats = [
    { title: 'Dipendenti Attivi', value: '24', icon: <Users className="w-8 h-8 text-blue-400" />, trend: '+2' },
    { title: 'Clienti', value: '156', icon: <Building2 className="w-8 h-8 text-green-400" />, trend: '+5' },
    { title: 'Interventi Oggi', value: '47', icon: <Calendar className="w-8 h-8 text-purple-400" />, trend: '-3' },
    { title: 'Efficienza Media', value: '94%', icon: <Target className="w-8 h-8 text-yellow-400" />, trend: '+2%' },
  ];

  const aiInsights = [
    {
      title: 'Ottimizzazione Turni',
      description: 'L\'AI suggerisce di riorganizzare i turni del martedì per migliorare l\'efficienza del 15%',
      icon: <BrainCircuit className="w-6 h-6 text-blue-400" />,
      impact: 'Alto' as const
    },
    {
      title: 'Previsione Materiali',
      description: 'Scorte di detergenti in esaurimento. Ordinare entro 3 giorni per evitare interruzioni',
      icon: <Activity className="w-6 h-6 text-yellow-400" />,
      impact: 'Medio' as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend.startsWith('+') ? (
                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-400 mr-1" />
                  )}
                  <span className={stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                    {stat.trend}
                  </span>
                </div>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">Performance Settimanale</h3>
          <PerformanceChart />
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">AI Insights</h3>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <AIInsights key={index} {...insight} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">Interventi in Corso</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Cliente {index + 1}</h4>
                    <p className="text-gray-400 text-sm">Via Roma {index + 1}, Milano</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    <span className="text-green-400 text-sm">In corso</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">Prossimi Interventi</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Cliente {index + 4}</h4>
                    <p className="text-gray-400 text-sm">Via Venezia {index + 1}, Milano</p>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {new Date(Date.now() + (index + 1) * 3600000).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;