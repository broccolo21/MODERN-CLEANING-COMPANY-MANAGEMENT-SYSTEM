import React from 'react';

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

export function PageContainer({ title, children }: PageContainerProps) {
  return (
    <div className="bg-slate-800 shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      {children}
    </div>
  );
}