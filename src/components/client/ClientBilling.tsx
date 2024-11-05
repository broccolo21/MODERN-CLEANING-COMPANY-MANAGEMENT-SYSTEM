import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'credit_card';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  date: Date;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

function ClientBilling() {
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit_card',
      last4: '4242',
      expiry: '12/24',
      isDefault: true
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: new Date(2024, 2, 15),
      amount: 499,
      status: 'completed',
      description: 'Pagamento Marzo 2024'
    },
    {
      id: '2',
      date: new Date(2024, 1, 15),
      amount: 499,
      status: 'completed',
      description: 'Pagamento Febbraio 2024'
    }
  ]);

  const handleAddPaymentMethod = () => {
    console.log('Adding new payment method');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Gestione Pagamenti</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Metodi di Pagamento</h3>
            <button 
              onClick={handleAddPaymentMethod}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Aggiungi
            </button>
          </div>

          {paymentMethods.map(method => (
            <div key={method.id} className="bg-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">
                    Carta •••• {method.last4}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Scadenza: {method.expiry}
                  </p>
                </div>
                {method.isDefault && (
                  <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                    Predefinito
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Transazioni Recenti</h3>
          <div className="space-y-4">
            {transactions.map(transaction => (
              <div key={transaction.id} className="bg-slate-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">
                      {transaction.description}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {transaction.date.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">
                      €{transaction.amount}
                    </p>
                    <p className="text-green-400 text-sm">
                      {transaction.status === 'completed' ? 'Completato' : 
                       transaction.status === 'pending' ? 'In Attesa' : 'Fallito'}
                    </p>
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

export default ClientBilling;