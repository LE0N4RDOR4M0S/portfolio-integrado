'use client';

import { Home, Code, Briefcase, Terminal, BarChart3, Moon, Sun, Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90vw] max-w-3xl">
      <div className="flex items-center gap-1 px-3 py-2.5 bg-card/95 backdrop-blur-lg border border-border rounded-lg shadow-lg">
        
        <ul className="hidden md:flex items-center gap-0 flex-1">
          {navItems.map((item) => (
            <li key={item.name} className="flex-1">
              <Link 
                href={item.href}
                className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors"
              >
                <item.icon size={16} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center p-2 text-muted-foreground hover:text-foreground transition-colors"
          title="Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="md:pl-2 md:ml-2 md:border-l md:border-border flex items-center ml-auto md:ml-0">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors"
            title="Alternar tema"
          >
            {!mounted ? (
              <div className="w-4 h-4" />
            ) : theme === 'dark' ? (
              <Sun size={16} />
            ) : (
              <Moon size={16} />
            )}
            <span className="hidden sm:inline text-xs">
              {!mounted ? '' : (theme === 'dark' ? 'Light' : 'Dark')}
            </span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-lg border border-border rounded-lg shadow-lg overflow-hidden animate-in slide-in-from-top-5 fade-in duration-200">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.name} className="border-b border-border last:border-b-0">
                <Link
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}