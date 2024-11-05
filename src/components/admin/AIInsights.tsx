import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AIInsightProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  impact: 'Alto' | 'Medio' | 'Basso';
}

export function AIInsights({ title, description, icon, impact }: AIInsightProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Alto':
        return 'text-red-400';
      case 'Medio':
        return 'text-yellow-400';
      case 'Basso':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg">
      <div className="flex items-start gap-3">
        <div className="mt-1">{icon}</div>
        <div>
          <h4 className="text-white font-medium mb-1">{title}</h4>
          <p className="text-gray-300 text-sm mb-2">{description}</p>
          <div className="flex items-center gap-1">
            <AlertCircle className={`w-4 h-4 ${getImpactColor(impact)}`} />
            <span className={`text-sm ${getImpactColor(impact)}`}>
              Impatto {impact}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}