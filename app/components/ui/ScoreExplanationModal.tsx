import { Terminal, X, Clock, ShieldCheck, Zap, Repeat } from "lucide-react";

export function ScoreExplanationModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-border bg-muted/30">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Terminal size={18} className="text-primary" />
            Algoritmo de Classificação
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full transition-colors">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Este portfólio não é estático. Um worker coleta metadados e estatísticas de uso da API do GitHub para gerar uma classificação automática de <strong>0 a 100</strong> baseada em 4 pilares:
          </p>

          <div className="space-y-4">
            
            <div className="flex gap-4 p-3 rounded-lg border border-border/50 bg-card hover:bg-muted/20 transition-colors">
              <div className="p-2 bg-blue-500/10 rounded-lg h-fit shrink-0">
                <Clock size={20} className="text-blue-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-sm">Recência & Manutenção</h4>
                  <span className="text-xs font-bold bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded">30%</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Projetos atualizados recentemente valem mais. Um commit na última semana garante nota máxima neste critério. Projetos "abandonados" há mais de 1 ano perdem relevância.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-3 rounded-lg border border-border/50 bg-card hover:bg-muted/20 transition-colors">
              <div className="p-2 bg-purple-500/10 rounded-lg h-fit shrink-0">
                <ShieldCheck size={20} className="text-purple-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-sm">Qualidade Estrutural</h4>
                  <span className="text-xs font-bold bg-purple-500/10 text-purple-600 px-2 py-0.5 rounded">30%</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A IA analisa se o projeto tem <strong>Testes (Jest/Cypress)</strong>, Pipelines de DevOps, boa documentação (README) e Deploy ativo. Projetos complexos pontuam mais.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-3 rounded-lg border border-border/50 bg-card hover:bg-muted/20 transition-colors">
              <div className="p-2 bg-amber-500/10 rounded-lg h-fit shrink-0">
                <Zap size={20} className="text-amber-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-sm">Volume de Atividade</h4>
                  <span className="text-xs font-bold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded">20%</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Mede a intensidade do desenvolvimento. Um volume saudável de commits indica um projeto robusto, não apenas um "Hello World".
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-3 rounded-lg border border-border/50 bg-card hover:bg-muted/20 transition-colors">
              <div className="p-2 bg-emerald-500/10 rounded-lg h-fit shrink-0">
                <Repeat size={20} className="text-emerald-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-sm">Consistência</h4>
                  <span className="text-xs font-bold bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded">20%</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Premia a disciplina. Codar um pouco por vários dias vale mais do que fazer 100 commits em um único dia e nunca mais voltar.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="p-4 bg-muted/30 border-t border-border flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Entendi, obrigado
          </button>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}