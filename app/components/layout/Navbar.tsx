'use client';

import { Home, Code, Briefcase, Terminal, BarChart3 } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { name: 'Início', icon: Home, href: '#hero' },
  { name: "Métricas", icon: BarChart3, href: '#analyticsdashboard' },
  { name: 'Skills', icon: Code, href: '#skills' },
  { name: 'Jornada', icon: Briefcase, href: '#experience' },
  { name: 'Projetos', icon: Terminal, href: '#projects' },
];

export function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center gap-1 px-3 py-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link 
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              <item.icon size={16} />
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}