import { Github, Linkedin, Mail, Phone, BookOpen, Download } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <header id="hero" className="mb-20 pt-12 scroll-mt-24">
      <div className="flex flex-col-reverse md:flex-row gap-12 items-start md:items-center mb-12">
        <div className="flex-1">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/50 px-4 py-2 rounded-lg border border-green-200 dark:border-green-800/50">
              ● Disponível para projetos
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            Leonardo Ramos
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 font-semibold mb-2">
            Full Stack Developer
          </p>
          <p className="text-base text-slate-500 dark:text-slate-400 mb-8">
            Ciência da Computação • UFMT
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border border-slate-300 dark:border-slate-600 shadow-lg flex items-center justify-center overflow-hidden">
            <img src="/perfil.jpg" className="rounded-xl object-cover w-full h-full" alt="Leonardo Ramos" />
          </div>
        </div>
      </div>

      <div className="relative mb-12 max-w-2xl">
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-balance">
          Desenvolvedor com vivência prática em
          <span className="font-semibold text-foreground"> desenvolvimento de sistemas</span> e
          <span className="font-semibold text-foreground"> engenharia de software</span>.
          Focado em resolver problemas complexos, criar arquiteturas escaláveis e explorar
          o potencial entre <span className="font-semibold text-foreground">DevOps</span>,
          <span className="font-semibold text-foreground"> sistemas distribuídos</span> e
          <span className="font-semibold text-foreground"> IA aplicada</span>.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <SocialButton href="https://github.com/LE0N4RDOR4M0S" icon={Github} label="GitHub" />
        <SocialButton href="https://linkedin.com/in/leonardo-de-oliveira-ramos-690318270" icon={Linkedin} label="LinkedIn" />
        <SocialButton href="https://medium.com/@leoolivramos" icon={BookOpen} label="Medium" />
        <SocialButton href="mailto:leoolivramos@gmail.com" icon={Mail} label="Email" />
        <SocialButton href="https://wa.me/5565992121341" icon={Phone} label="WhatsApp" />
        <SocialButton href="/Leonardo_Ramos_CV.pdf" icon={Download} label="CV" download />
      </div>
    </header>
  );
}

function SocialButton({ href, icon: Icon, label, download }: any) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      download={download}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-foreground text-sm font-semibold rounded-lg hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md transition-shadow"
    >
      <Icon size={18} /> 
      <span>{label}</span>
    </Link>
  );
}