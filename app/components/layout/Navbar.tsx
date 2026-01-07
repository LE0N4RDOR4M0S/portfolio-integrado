'use client';

import { Home, Code, Briefcase, Terminal, BarChart3, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Início', icon: Home, href: '#hero' },
  { name: "Métricas", icon: BarChart3, href: '#analyticsdashboard' },
  { name: 'Skills', icon: Code, href: '#skills' },
  { name: 'Jornada', icon: Briefcase, href: '#experience' },
  { name: 'Projetos', icon: Terminal, href: '#projects' },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <ul className="flex items-center gap-1 px-3 py-2.5 bg-card/95 backdrop-blur-lg border border-border rounded-lg shadow-lg">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors"
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

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center gap-1 px-3 py-2.5 bg-card/95 backdrop-blur-lg border border-border rounded-lg shadow-lg">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link 
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors"
            >
              <item.icon size={16} />
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          </li>
        ))}
        
        {/* Theme Toggle Button */}
        <li className="pl-1 ml-1 border-l border-border">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors"
            title={`Mudar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`}
          >
            {theme === 'dark' ? (
              <Sun size={16} />
            ) : (
              <Moon size={16} />
            )}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}