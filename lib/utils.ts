export function cleanReadme(markdown: string | null): string {
  if (!markdown) return "Sem documentação detalhada.";

  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/<img.*?>/g, '')
    .replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .slice(0, 2500); 
}