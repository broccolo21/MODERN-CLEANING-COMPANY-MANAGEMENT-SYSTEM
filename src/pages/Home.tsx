import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Bot, Building2, Users, Clock, Sparkles, Video, BrainCircuit, BarChart, MessageSquare, FileText } from 'lucide-react';
import RegistrationForms from '../components/RegistrationForms';

function Home() {
  const navigate = useNavigate();

  const handleDemoAccess = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="mb-8 flex justify-center">
            <Eye className="w-20 h-20 text-blue-400 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Il Futuro del <span className="text-blue-400">Cleaning Management</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Il sistema di gestione della tua Cleaning Company che ti proietta verso il futuro. 
            Monitora e gestisci gli interventi in tempo reale, offri trasparenza ai tuoi clienti 
            con lo streaming live, e ottimizza le tue operazioni con l'intelligenza artificiale.
          </p>

          <button
            onClick={handleDemoAccess}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-lg mb-12"
          >
            Accedi alla Demo Completa
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors">
              <Bot className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">AI Integrata</h3>
              <p className="text-gray-400">Ottimizzazione intelligente delle operazioni e monitoraggio automatico</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors">
              <Building2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Gestione Real-time</h3>
              <p className="text-gray-400">Monitoraggio in tempo reale di tutti gli interventi di pulizia</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Portale Cliente</h3>
              <p className="text-gray-400">Accesso dedicato per clienti e dipendenti con funzionalità specifiche</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the sections remain unchanged */}
      {/* AI Integration Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">AI Integrata per Ottimizzazione</h2>
              <div className="space-y-6">
                <Feature
                  icon={<BrainCircuit className="w-6 h-6 text-blue-400" />}
                  title="Pianificazione Intelligente"
                  description="L'AI analizza i pattern di pulizia e suggerisce programmi ottimizzati"
                />
                <Feature
                  icon={<Sparkles className="w-6 h-6 text-blue-400" />}
                  title="Previsione Manutenzione"
                  description="Predizione dei bisogni di manutenzione basata su dati storici"
                />
                <Feature
                  icon={<BarChart className="w-6 h-6 text-blue-400" />}
                  title="Analisi Prestazioni"
                  description="Report dettagliati e insights basati su AI per migliorare l'efficienza"
                />
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80" 
                  alt="AI Integration"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Management Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80" 
                  alt="Real-time Management"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-white mb-6">Gestione in Tempo Reale</h2>
              <div className="space-y-6">
                <Feature
                  icon={<Clock className="w-6 h-6 text-blue-400" />}
                  title="Monitoraggio Live"
                  description="Tracciamento in tempo reale dello stato di ogni intervento"
                />
                <Feature
                  icon={<Video className="w-6 h-6 text-blue-400" />}
                  title="Streaming Video"
                  description="Verifica visiva degli interventi attraverso streaming live"
                />
                <Feature
                  icon={<Building2 className="w-6 h-6 text-blue-400" />}
                  title="Gestione Spazi"
                  description="Mappatura digitale degli ambienti e tracking delle attività"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Portal Demo Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Portale Cliente Demo</h2>
          <div className="bg-slate-800 rounded-xl p-8 shadow-xl">
            <div className="grid md:grid-cols-3 gap-6">
              <DemoCard
                title="Dashboard Personalizzata"
                description="Visualizza lo stato dei servizi, programma interventi e monitora le performance"
                icon={<BarChart className="w-8 h-8 text-blue-400" />}
              />
              <DemoCard
                title="Comunicazione Diretta"
                description="Chat integrata con il team di pulizia e notifiche in tempo reale"
                icon={<MessageSquare className="w-8 h-8 text-blue-400" />}
              />
              <DemoCard
                title="Reportistica Avanzata"
                description="Report dettagliati sugli interventi effettuati e analisi della qualità"
                icon={<FileText className="w-8 h-8 text-blue-400" />}
              />
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={handleDemoAccess}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Accedi alla Demo Completa
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <div className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Registrazione</h2>
          <RegistrationForms />
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2 bg-slate-800 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function DemoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

export default Home;