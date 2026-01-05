import { execSync } from 'child_process';

console.log("Iniciando Rotina de Atualização Diária...");

try {
  console.log("1. Rodando Sync GitHub...");
  console.log("-------------------------------------------\n");
  execSync('npx tsx scripts/sync-github.ts', { stdio: 'inherit' });

  console.log("2. Rodando Sync Commits...");
  console.log("-------------------------------------------\n");
  execSync('npx tsx scripts/sync-commits.ts', { stdio: 'inherit' });

  console.log("3. Calculando Scores...");
  console.log("-------------------------------------------\n");
  execSync('npx tsx scripts/calculate-score.ts', { stdio: 'inherit' });

  console.log("\nRotina finalizada com sucesso");
  process.exit(0);

} catch (error) {
  console.error("\nErro durante a execução da cadeia", error);
  process.exit(1);
}