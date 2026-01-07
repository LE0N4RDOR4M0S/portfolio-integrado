'use client';

import { useEffect, useState } from 'react';
import { CommandPalette } from './CommandPalette';

export function CommandPaletteWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandPalette 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)} 
    />
  );
}
