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
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-full blur-sm"></div>
        <ul className="relative flex items-center gap-1 px-2 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-full shadow-xl shadow-zinc-200/50 dark:shadow-black/50">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all duration-200 hover:shadow-md"
              >
                <item.icon size={16} className="transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}