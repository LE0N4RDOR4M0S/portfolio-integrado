export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-foreground dark:text-muted-foreground gap-4">
      <p>
        © {currentYear} Leonardo Ramos • Full Stack Developer
      </p>
      <p className="text-xs text-muted-foreground">
        💡 Dica: Pressione <kbd className="rounded bg-muted border border-border px-1.5 py-0.5 font-mono text-xs text-foreground">Cmd + K</kbd> para navegar
      </p>
    </footer>
  );
}