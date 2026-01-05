export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 py-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
      <p>
        © {currentYear} Leonardo Ramos - Desenvolvedor Full Stack. Todos os direitos reservados.
      </p>
      
      <div className="flex gap-4 items-center">
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