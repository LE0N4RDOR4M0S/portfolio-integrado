import { Github, Linkedin, Mail, Phone, BookOpen, Download } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <header id="hero" className="mb-12 pt-10 scroll-mt-24">
      <div className="flex flex-col-reverse md:flex-row gap-8 items-start md:items-center mb-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
            Leonardo Ramos
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Full Stack Developer
          </p>
        </div>
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 border border-border shadow-sm flex items-center justify-center text-3xl">
          <img src="/perfil.jpg" className="rounded-full" />
        </div>
      </div>

      <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-2xl text-balance">
        Graduando em Ciência da Computação pela UFMT, com vivência prática em
        <strong className="text-foreground"> desenvolvimento de sistemas</strong> e
        <strong className="text-foreground"> engenharia de software de verdade</strong>.
        Curto resolver problema grande, quebrar arquitetura quando precisa e explorar
        o caos controlado entre <strong className="text-foreground">DevOps</strong>,
        <strong className="text-foreground"> sistemas escaláveis</strong> e
        <strong className="text-foreground"> IA aplicada</strong>.
      </p>

      <div className="flex flex-wrap gap-3">
        <SocialButton href="https://github.com/LE0N4RDOR4M0S" icon={Github} label="GitHub" />
        <SocialButton href="https://linkedin.com/in/leonardo-de-oliveira-ramos-690318270" icon={Linkedin} label="LinkedIn" colorClass="hover:bg-blue-600 hover:text-white" />
        <SocialButton href="https://medium.com/@leoolivramos" icon={BookOpen} label="Medium" colorClass="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" />
        <SocialButton href="mailto:leoolivramos@gmail.com" icon={Mail} label="Email" />
        <SocialButton href="https://wa.me/5565992121341" icon={Phone} label="Contato" colorClass="hover:bg-green-600 hover:text-white" />
        <SocialButton href="/Leonardo_Ramos_CV.pdf" icon={Download} label="Baixar CV" download />
      </div>
    </header>
  );
}

function SocialButton({ href, icon: Icon, label, colorClass = "hover:bg-primary hover:text-primary-foreground" }: any) {
  return (
    <Link href={href} target="_blank" className={`inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-md transition-all ${colorClass}`}>
      <Icon size={18} /> {label}
    </Link>
  );
}