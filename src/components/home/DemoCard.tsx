import React from 'react';

interface DemoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function DemoCard({ icon, title, description }: DemoCardProps) {
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