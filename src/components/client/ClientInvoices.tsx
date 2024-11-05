import React, { useState } from 'react';
import { Download } from 'lucide-react';

interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending';
  description: string;
}

function ClientInvoices() {
  const [invoices] = useState<Invoice[]>([
    {
      id: 'INV-2024-001',
      date: new Date(2024, 1, 15),
      amount: 499,
      status: 'paid',
      description: 'Servizi di Pulizia - Febbraio 2024'
    },
    {
      id: 'INV-2024-002',
      date: new Date(2024, 2, 15),
      amount: 499,
      status: 'pending',
      description: 'Servizi di Pulizia - Marzo 2024'
    }
  ]);

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log('Download invoice:', invoiceId);
  };

  const handleExportAll = () => {
    console.log('Exporting all invoices');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Fatture</h2>
        <button 
          onClick={handleExportAll}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Esporta Tutto
        </button>
      </div>

      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Numero
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Descrizione
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Importo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Stato
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {invoice.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {invoice.date.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {invoice.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  €{invoice.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    invoice.status === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.status === 'paid' ? 'Pagata' : 'In Attesa'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleDownloadInvoice(invoice.id)}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientInvoices;