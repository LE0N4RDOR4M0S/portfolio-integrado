export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 dark:text-slate-400 gap-4">
      <p>
        © {currentYear} Leonardo Ramos • Full Stack Developer
      </p>
    </footer>
  );
}