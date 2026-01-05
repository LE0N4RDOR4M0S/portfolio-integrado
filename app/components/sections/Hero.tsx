import { Github, Linkedin, Mail, Phone, BookOpen, Download } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <header id="hero" className="mb-16 pt-10 scroll-mt-24">
      <div className="flex flex-col-reverse md:flex-row gap-10 items-start md:items-center mb-10">
        <div className="flex-1">
          <div className="inline-block mb-3">
            <span className="text-xs font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800">
              ✦ Disponível para oportunidades
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-3 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
            Leonardo Ramos
          </h1>
          <p className="text-xl text-muted-foreground font-medium mb-1">
            Full Stack Developer
          </p>
          <p className="text-sm text-muted-foreground/80">
            Ciência da Computação • UFMT
          </p>
        </div>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 border-2 border-border shadow-xl flex items-center justify-center overflow-hidden">
            <img src="/perfil.jpg" className="rounded-full object-cover w-full h-full" alt="Leonardo Ramos" />
          </div>
        </div>
      </div>

      <div className="relative mb-10 max-w-2xl">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent rounded-full"></div>
        <p className="text-base text-muted-foreground leading-relaxed text-balance pl-4">
          Desenvolvedor com vivência prática em
          <strong className="text-foreground font-semibold"> desenvolvimento de sistemas</strong> e
          <strong className="text-foreground font-semibold"> engenharia de software de verdade</strong>.
          Focado em resolver problemas complexos, criar arquiteturas escaláveis e explorar
          o potencial entre <strong className="text-foreground font-semibold">DevOps</strong>,
          <strong className="text-foreground font-semibold"> sistemas distribuídos</strong> e
          <strong className="text-foreground font-semibold"> IA aplicada</strong>.
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <SocialButton href="https://github.com/LE0N4RDOR4M0S" icon={Github} label="GitHub" />
        <SocialButton href="https://linkedin.com/in/leonardo-de-oliveira-ramos-690318270" icon={Linkedin} label="LinkedIn" colorClass="hover:bg-blue-600 hover:text-white hover:border-blue-600" />
        <SocialButton href="https://medium.com/@leoolivramos" icon={BookOpen} label="Medium" colorClass="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-black dark:hover:border-white" />
        <SocialButton href="mailto:leoolivramos@gmail.com" icon={Mail} label="Email" colorClass="hover:bg-red-600 hover:text-white hover:border-red-600" />
        <SocialButton href="https://wa.me/5565992121341" icon={Phone} label="Contato" colorClass="hover:bg-green-600 hover:text-white hover:border-green-600" />
        <SocialButton href="/Leonardo_Ramos_CV.pdf" icon={Download} label="Baixar CV" colorClass="hover:bg-primary hover:text-primary-foreground hover:border-primary" download />
      </div>
    </header>
  );
}

function SocialButton({ href, icon: Icon, label, colorClass = "hover:bg-primary hover:text-primary-foreground hover:border-primary", download }: any) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      download={download}
      className={`group inline-flex items-center gap-2 px-4 py-2.5 bg-card border border-border text-foreground text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${colorClass}`}
    >
      <Icon size={18} className="transition-transform group-hover:scale-110" /> 
      <span>{label}</span>
    </Link>
  );
}