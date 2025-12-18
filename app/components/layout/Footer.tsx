export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 py-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
      <p>
        © {currentYear} Leonardo Ramos. Construído com <span className="text-foreground font-medium">Next.js 14</span>, <span className="text-foreground font-medium">Prisma</span> e <span className="text-foreground font-medium">Inteligência de Dados</span>.
      </p>
      
      <div className="flex gap-4 items-center">
        <span>Cuiabá, MT</span>
        <span className="h-1 w-1 rounded-full bg-border"></span>
        
        <span className="text-emerald-600 dark:text-emerald-500 flex items-center gap-1.5 font-medium bg-emerald-500/5 px-2 py-0.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Disponível para Projetos
        </span>
      </div>
    </footer>
  );
}