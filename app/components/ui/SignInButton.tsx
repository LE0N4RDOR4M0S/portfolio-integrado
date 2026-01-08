'use client';

import { signIn } from 'next-auth/react';
import { Github } from 'lucide-react';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('github', { callbackUrl: '/#guestbook' }); 
    } catch (error) {
      console.error("Erro ao logar", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="flex items-center gap-2 bg-[#24292F] hover:bg-[#24292F]/90 text-white font-medium py-2.5 px-5 rounded-lg transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <Github size={20} />
      )}
      <span>Entrar com GitHub</span>
    </button>
  );
}