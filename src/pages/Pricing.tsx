import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Demo',
      price: '0',
      duration: '4 giorni',
      features: [
        'Accesso completo al sistema',
        'Gestione base delle attività',
        'Dashboard cliente',
        'Tracking GPS',
        'Video streaming',
        'Report base',
      ],
      limitations: 'Accesso limitato a 4 giorni'
    },
    {
      name: 'Base',
      price: '299',
      duration: 'mese',
      features: [
        'Fino a 5 dipendenti',
        'Gestione base delle attività',
        'Supporto email',
        'Dashboard cliente',
        'Tracking GPS',
        'Video streaming',
        'Report standard',
      ],
    },
    {
      name: 'Pro',
      price: '499',
      duration: 'mese',
      features: [
        'Fino a 15 dipendenti',
        'Gestione avanzata delle attività',
        'Supporto prioritario',
        'Dashboard cliente personalizzata',
        'Report dettagliati',
        'API access',
        'Tracking GPS avanzato',
        'Video streaming HD',
      ],
    },
    {
      name: 'Enterprise',
      price: '999',
      duration: 'mese',
      features: [
        'Dipendenti illimitati',
        'Gestione completa delle attività',
        'Supporto dedicato 24/7',
        'Dashboard personalizzata',
        'Report avanzati',
        'API access illimitato',
        'Integrazione sistemi custom',
        'Training dedicato',
        'Tracking GPS premium',
        'Video streaming 4K',
      ],
    },
  ];

  const handleSelectPlan = (plan: string) => {
    if (plan === 'Demo') {
      navigate('/register?plan=demo');
    } else {
      navigate(`/register?plan=${plan.toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Piani e Prezzi
          </h1>
          <p className="text-xl text-gray-400">
            Scegli il piano più adatto alle tue esigenze
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-slate-800 rounded-2xl p-8 border ${
                plan.name === 'Demo' 
                  ? 'border-yellow-500/50 hover:border-yellow-500' 
                  : 'border-slate-700 hover:border-blue-500'
              } transition-colors`}
            >
              {plan.name === 'Demo' && (
                <div className="flex items-center gap-2 text-yellow-500 mb-4">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">Accesso limitato nel tempo</span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">
                  {plan.price === '0' ? 'Gratis' : `€${plan.price}`}
                </span>
                <span className="text-gray-400">/{plan.duration}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.limitations && (
                  <li className="flex items-center text-yellow-500 mt-4">
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span>{plan.limitations}</span>
                  </li>
                )}
              </ul>
              <button 
                onClick={() => handleSelectPlan(plan.name)}
                className={`w-full py-3 px-6 rounded-lg ${
                  plan.name === 'Demo'
                    ? 'bg-yellow-600 hover:bg-yellow-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-medium transition-colors`}
              >
                {plan.name === 'Demo' ? 'Inizia la Demo' : 'Seleziona Piano'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Domande Frequenti</h2>
          <div className="grid gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Come funziona la demo gratuita?
              </h3>
              <p className="text-gray-400">
                La demo gratuita ti dà accesso completo a tutte le funzionalità del sistema per 4 giorni. 
                Dopo questo periodo, l'accesso verrà automaticamente disattivato se non passi a un piano a pagamento.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Posso cambiare piano in qualsiasi momento?
              </h3>
              <p className="text-gray-400">
                Sì, puoi aggiornare o declassare il tuo piano in qualsiasi momento. 
                Le modifiche verranno applicate al successivo ciclo di fatturazione.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Come funziona il tracking GPS?
              </h3>
              <p className="text-gray-400">
                Il sistema di tracking GPS si attiva automaticamente quando un dipendente si trova 
                nel raggio di 1 metro dall'ingresso del cliente e si disattiva a 5 metri di distanza. 
                Questo garantisce la massima precisione nel monitoraggio degli interventi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;