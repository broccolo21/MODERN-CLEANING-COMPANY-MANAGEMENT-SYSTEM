import React, { useState } from 'react';
import { Calendar, Users, Building2, Target, Download, Filter } from 'lucide-react';
import { EfficiencyChart } from './charts/EfficiencyChart';
import { ClientSatisfactionChart } from './charts/ClientSatisfactionChart';
import { TeamPerformanceChart } from './charts/TeamPerformanceChart';
import { PDFDownloadLink } from '@react-pdf/renderer';
import AnalyticsReport from './reports/AnalyticsReport';

function Analytics() {
  const [reportData] = useState({
    kpis: [
      { title: 'Efficienza Media', value: '94%', change: '+2.5%' },
      { title: 'Clienti Attivi', value: '156', change: '+12' },
      { title: 'Dipendenti', value: '24', change: '+3' },
      { title: 'Interventi Completati', value: '1,247', change: '+89' }
    ]
  });

  const kpis = [
    {
      title: 'Efficienza Media',
      value: '94%',
      change: '+2.5%',
      icon: <Target className="w-6 h-6 text-blue-400" />
    },
    {
      title: 'Clienti Attivi',
      value: '156',
      change: '+12',
      icon: <Building2 className="w-6 h-6 text-green-400" />
    },
    {
      title: 'Dipendenti',
      value: '24',
      change: '+3',
      icon: <Users className="w-6 h-6 text-purple-400" />
    },
    {
      title: 'Interventi Completati',
      value: '1,247',
      change: '+89',
      icon: <Calendar className="w-6 h-6 text-yellow-400" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Analytics</h2>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
            <Filter className="w-4 h-4" />
            Filtri
          </button>
          <PDFDownloadLink
            document={<AnalyticsReport data={reportData} />}
            fileName="analytics-report.pdf"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {({ loading }) => (
              <>
                <Download className="w-4 h-4" />
                {loading ? 'Generazione...' : 'Esporta Report'}
              </>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              {kpi.icon}
              <span className={`text-sm ${
                kpi.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {kpi.change}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm">{kpi.title}</h3>
            <p className="text-2xl font-bold text-white mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">Efficienza nel Tempo</h3>
          <EfficiencyChart />
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">Soddisfazione Clienti</h3>
          <ClientSatisfactionChart />
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6">Performance Team</h3>
        <TeamPerformanceChart />
      </div>
    </div>
  );
}

export default Analytics;