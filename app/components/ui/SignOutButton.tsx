'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="text-xs text-muted-foreground hover:text-red-500 flex items-center gap-1 transition-colors"
    >
      <LogOut size={12} />
      Sair
    </button>
  );
}