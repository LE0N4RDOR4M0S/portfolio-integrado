'use client';

import { useEffect, useState } from 'react';
import { Mail, FileText, Sun, Moon, Home, Code, BookOpen, MessageCircle, Check } from 'lucide-react';
import { useTheme } from 'next-themes';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        setSearch('');
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        onClose();
        setSearch('');
      }, 300);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('leonardoramos.dev@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
        setSearch('');
      }, 1500);
    });
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setTimeout(() => {
      onClose();
      setSearch('');
    }, 100);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Leonardo_Ramos_CV.pdf';
    link.download = 'Leonardo_Ramos_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      onClose();
      setSearch('');
    }, 100);
  };

  const commands = [
    // Navigation
    {
      id: 'home',
      label: 'Ir para Home',
      icon: Home,
      action: () => handleNavigate('hero'),
      group: 'Navegar'
    },
    {
      id: 'projects',
      label: 'Ir para Projetos',
      icon: Code,
      action: () => handleNavigate('projects'),
      group: 'Navegar'
    },
    {
      id: 'experience',
      label: 'Ir para Experiência',
      icon: MessageCircle,
      action: () => handleNavigate('experience'),
      group: 'Navegar'
    },
    {
      id: 'education',
      label: 'Ir para Educação',
      icon: BookOpen,
      action: () => handleNavigate('education'),
      group: 'Navegar'
    },
    // Actions
    {
      id: 'copy-email',
      label: copied ? 'Email copiado!' : 'Copiar Email',
      icon: copied ? Check : Mail,
      action: handleCopyEmail,
      group: 'Ações'
    },
    {
      id: 'download-cv',
      label: 'Baixar CV',
      icon: FileText,
      action: handleDownloadCV,
      group: 'Ações'
    },
    // Theme
    {
      id: 'toggle-theme',
      label: theme === 'dark' ? 'Modo Light' : 'Modo Dark',
      icon: theme === 'dark' ? Sun : Moon,
      action: handleToggleTheme,
      group: 'Aparência'
    }
  ];

  const groups = ['Navegar', 'Ações', 'Aparência'];
  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.group.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          onClose();
          setSearch('');
        }}
      />

      {/* Command Palette */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl">
        <div className="rounded-lg border border-border bg-card shadow-2xl overflow-hidden">
          <div className="flex items-center border-b border-border px-4">
            <span className="mr-2 text-muted-foreground">⌘</span>
            <input
              type="text"
              placeholder="Navegar, ações, tema..."
              className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto py-2">
            {filteredCommands.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Nenhum resultado encontrado.
              </div>
            ) : (
              groups.map((group) => {
                const groupCommands = filteredCommands.filter(cmd => cmd.group === group);
                if (groupCommands.length === 0) return null;

                return (
                  <div key={group}>
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {group}
                    </div>
                    {groupCommands.map((cmd) => {
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          className="w-full relative flex cursor-pointer select-none items-center rounded-sm px-4 py-2.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                        >
                          <Icon className={`mr-3 h-4 w-4 flex-shrink-0 ${copied && cmd.id === 'copy-email' ? 'text-green-500' : ''}`} />
                          <span>{cmd.label}</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
            Pressione <kbd className="rounded bg-muted px-1.5 font-mono">ESC</kbd> para fechar
          </div>
        </div>
      </div>
    </>
  );
}
