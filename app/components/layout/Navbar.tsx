'use client';

import { Home, User, Code, Briefcase, Terminal, BarChart3} from 'lucide-react';
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
      <ul className="flex items-center gap-1 px-2 py-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg shadow-zinc-200/50 dark:shadow-black/50">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link 
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all"
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