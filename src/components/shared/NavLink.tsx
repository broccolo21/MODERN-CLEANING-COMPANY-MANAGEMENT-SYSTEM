import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function NavLink({ to, icon, children }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors
        ${isActive 
          ? 'text-white bg-slate-700' 
          : 'text-gray-300 hover:text-white hover:bg-slate-700/50'}`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' })}
      {children}
    </Link>
  );
}