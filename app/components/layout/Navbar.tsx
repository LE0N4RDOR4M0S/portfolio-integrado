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

  if (!mounted) {
    return (
      <nav className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-50">
        <div className="flex items-center gap-1 px-3 py-2.5 bg-card/95 backdrop-blur-lg border border-border rounded-lg shadow-lg">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors"
                >
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center p-2 text-muted-foreground hover:text-foreground transition-colors"
            title="Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Theme Toggle */}
          <div className="md:pl-1 md:ml-1 md:border-l md:border-border flex items-center">
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
              <span className="hidden sm:inline text-xs">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-lg border border-border rounded-lg shadow-lg overflow-hidden">
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

  return (
    <nav className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-50">
      <div className="flex items-center gap-1 px-3 py-2.5 bg-card/95 backdrop-blur-lg border border-border rounded-lg shadow-lg">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors"
              >
                <item.icon size={16} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center p-2 text-muted-foreground hover:text-foreground transition-colors"
          title="Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Theme Toggle */}
        <div className="md:pl-1 md:ml-1 md:border-l md:border-border flex items-center ml-auto md:ml-0">
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
            <span className="hidden sm:inline text-xs">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-lg border border-border rounded-lg shadow-lg overflow-hidden">
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