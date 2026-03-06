import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Flame, 
  Moon, 
  Heart, 
  Activity, 
  Brain, 
  Target, 
  ChevronRight,
  Database,
  Lock,
  Radar
} from 'lucide-react';

// --- DADOS DO SISTEMA E LÓGICA JUNGUIANA ---

const ESTAGIOS = {
  NIGREDO: {
    id: 'nigredo',
    nome: 'Nigredo',
    subtitulo: 'Fantasia Inicial e Encantamento',
    icone: <Flame className="w-8 h-8 text-orange-500" />,
    cor: 'border-orange-500/30 bg-orange-500/10 text-orange-400',
    descricao: 'Encontra-se sob forte projeção da Anima. A idealização ofusca a realidade. O foco não é ela, mas o que ela representa para preencher os seus vazios psíquicos.',
    acao: 'Desafiar a ilusão da projeção. Procure identificar defeitos práticos. Não tome decisões definitivas nem faça compromissos drásticos neste momento.'
  },
  ALBEDO: {
    id: 'albedo',
    nome: 'Albedo',
    subtitulo: 'Percepção Crítica e Desilusão',
    icone: <Moon className="w-8 h-8 text-blue-400" />,
    cor: 'border-blue-400/30 bg-blue-400/10 text-blue-300',
    descricao: 'A névoa está a baixar. Começa a ver a pessoa real, o que lhe está a causar frustração ou atrito. É a dolorosa fase da separação entre a sua fantasia e a realidade.',
    acao: 'Desenvolver a escolha consciente. Suporte o desconforto das falhas dela sem regredir ou procurar imediatamente um novo alvo de projeção noutra mulher.'
  },
  RUBEDO: {
    id: 'rubedo',
    nome: 'Rubedo',
    subtitulo: 'Amor Consciente e Maturidade',
    icone: <Heart className="w-8 h-8 text-red-500" />,
    cor: 'border-red-500/30 bg-red-500/10 text-red-400',
    descricao: 'Integração psíquica alcançada. O seu bem-estar não depende dela para tapar buracos emocionais. Escolhe partilhar a vida com a pessoa real, imperfeita.',
    acao: 'Gerir a dinâmica da relação e integrar os arquétipos maduros (Sábio, Guerreiro, Explorador) para manter o vínculo forte e autêntico.'
  }
};

// Motor de perguntas com pesos de pontuação { nigredo, albedo, rubedo }
const PERGUNTAS = [
  {
    texto: "Ao pensar nela, costuma focar-se numa imagem perfeita, ignorando possíveis incompatibilidades lógicas?",
    opcoes: [
      { label: "Sim, ela parece-me ter tudo o que procuro, é perfeita.", pontos: { nigredo: 3, albedo: 0, rubedo: 0 } },
      { label: "Noto algumas falhas, mas são irrelevantes agora.", pontos: { nigredo: 2, albedo: 1, rubedo: 0 } },
      { label: "Vejo as falhas de forma pragmática e sei lidar com elas.", pontos: { nigredo: 0, albedo: 1, rubedo: 2 } }
    ]
  },
  {
    texto: "Sente que o seu bem-estar emocional e humor diário dependem drasticamente da validação ou da atenção que ela lhe dá?",
    opcoes: [
      { label: "Totalmente. Se ela se afasta, o meu dia fica arruinado.", pontos: { nigredo: 3, albedo: 0, rubedo: 0 } },
      { label: "Afecta-me e causa ansiedade, mas tento manter o foco.", pontos: { nigredo: 1, albedo: 2, rubedo: 0 } },
      { label: "Não. O meu centro emocional é independente dela.", pontos: { nigredo: 0, albedo: 0, rubedo: 3 } }
    ]
  },
  {
    texto: "Ultimamente, tem sentido alguma sensação de desilusão, frustração ou vontade de a corrigir em certas atitudes?",
    opcoes: [
      { label: "Sim, tenho estado bastante frustrado com quem ela está a demonstrar ser.", pontos: { nigredo: 0, albedo: 3, rubedo: 0 } },
      { label: "Apenas choques pontuais, normais de convivência.", pontos: { nigredo: 1, albedo: 1, rubedo: 2 } },
      { label: "Não, acho as atitudes dela perfeitamente adequadas ao que eu esperava.", pontos: { nigredo: 3, albedo: 0, rubedo: 1 } }
    ]
  },
  {
    texto: "Se a relação, ou a possibilidade de relação, terminasse de forma abrupta hoje, qual seria o seu sentimento principal?",
    opcoes: [
      { label: "Devastação total, perda de sentido de vida ou vazio profundo.", pontos: { nigredo: 3, albedo: 0, rubedo: 0 } },
      { label: "Raiva ou enorme frustração por ter perdido tempo e energia.", pontos: { nigredo: 0, albedo: 3, rubedo: 0 } },
      { label: "Tristeza natural, mas a minha vida continuaria com os mesmos propósitos.", pontos: { nigredo: 0, albedo: 0, rubedo: 3 } }
    ]
  },
  {
    texto: "Como descreveria a sua postura em relação aos seus próprios limites e valores quando está com ela?",
    opcoes: [
      { label: "Dou por mim a ceder e a adaptar os meus valores para lhe agradar.", pontos: { nigredo: 3, albedo: 0, rubedo: 0 } },
      { label: "Defendo tanto os meus limites que por vezes gera conflitos ou discussões.", pontos: { nigredo: 0, albedo: 3, rubedo: 0 } },
      { label: "Mantenho-me autêntico, sem precisar de forçar e com respeito mútuo.", pontos: { nigredo: 0, albedo: 0, rubedo: 3 } }
    ]
  },
  {
    texto: "A presença dela na sua vida assemelha-se mais a um 'remédio' para a solidão ou a um 'bónus' para uma vida já construída?",
    opcoes: [
      { label: "É uma necessidade. Ela preenche um vazio ou silencia a minha mente.", pontos: { nigredo: 3, albedo: 0, rubedo: 0 } },
      { label: "Sinto que preciso dela para me estabilizar nalguns dias confusos.", pontos: { nigredo: 2, albedo: 2, rubedo: 0 } },
      { label: "É um complemento. A minha estrutura e solidão já são confortáveis para mim.", pontos: { nigredo: 0, albedo: 0, rubedo: 3 } }
    ]
  },
  {
    texto: "Qual é o seu grau de aceitação perante a ideia de que ela poderá nunca mudar os defeitos que tem hoje?",
    opcoes: [
      { label: "Acredito que com o meu amor/influência ela vai melhorar.", pontos: { nigredo: 2, albedo: 2, rubedo: 0 } },
      { label: "Causa-me desconforto. Não sei se consigo tolerar a longo prazo.", pontos: { nigredo: 0, albedo: 3, rubedo: 0 } },
      { label: "Aceito totalmente. Sei ao que vou e escolho estar lá na mesma.", pontos: { nigredo: 0, albedo: 0, rubedo: 3 } }
    ]
  }
];

export default function App() {
  // Estados da aplicação
  const [step, setStep] = useState('onboarding'); // onboarding, questionario, processando, dashboard
  const [alvo, setAlvo] = useState('');
  
  // Estados do Questionário e Motor Lógico
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [scores, setScores] = useState({ nigredo: 0, albedo: 0, rubedo: 0 });
  const [analiseIA, setAnaliseIA] = useState(null);

  // --- HANDLERS ---

  const iniciarAnalise = () => {
    if (!alvo.trim()) return;
    setStep('questionario');
    setPerguntaAtual(0);
    setScores({ nigredo: 0, albedo: 0, rubedo: 0 });
  };

  const responderPergunta = (pontos) => {
    // Acumula os scores
    const novosScores = {
      nigredo: scores.nigredo + pontos.nigredo,
      albedo: scores.albedo + pontos.albedo,
      rubedo: scores.rubedo + pontos.rubedo
    };
    
    setScores(novosScores);

    if (perguntaAtual < PERGUNTAS.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      processarResultados(novosScores);
    }
  };

  const processarResultados = (pontuacaoFinal) => {
    setStep('processando');
    
    // Algoritmo simples de decisão: o maior score dita o estágio
    setTimeout(() => {
      let estagioFinal = ESTAGIOS.NIGREDO;
      let maxScore = pontuacaoFinal.nigredo;

      if (pontuacaoFinal.albedo > maxScore) {
        maxScore = pontuacaoFinal.albedo;
        estagioFinal = ESTAGIOS.ALBEDO;
      }
      if (pontuacaoFinal.rubedo > maxScore) {
        maxScore = pontuacaoFinal.rubedo;
        estagioFinal = ESTAGIOS.RUBEDO;
      }

      setAnaliseIA(estagioFinal);
      setStep('dashboard');
    }, 3500); // Tempo artificial de processamento para imersão
  };

  const reiniciar = () => {
    setAlvo('');
    setStep('onboarding');
  };

  // --- RENDERIZAÇÃO (Embutida para prevenir re-renders de componentes aninhados) ---

  return (
    <div className="bg-zinc-950 min-h-screen font-sans selection:bg-zinc-700 selection:text-white pb-20">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
      
      {/* --- TELA 1: ONBOARDING --- */}
      {step === 'onboarding' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-slate-200 animate-fade-in">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <Brain className="w-12 h-12 text-zinc-400" />
              </div>
              <h1 className="text-3xl font-light tracking-wider">ARCHE</h1>
              <p className="text-xs text-zinc-500 tracking-widest uppercase">Motor de Análise Emocional Junguiana</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl space-y-6">
              <div className="flex items-start gap-3 text-xs text-zinc-400 mb-2 p-3 rounded-lg border border-zinc-800 bg-zinc-950">
                <Radar className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p>O sistema determinará de forma matemática o seu real estado emocional através de padrões de comportamento. Não tente manipular as respostas.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="alvo" className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Codinome do Alvo</label>
                  <input 
                    id="alvo"
                    type="text" 
                    placeholder="Ex: Inicial, Apelido ou Nome"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-zinc-500 transition-colors text-zinc-300"
                    value={alvo}
                    onChange={(e) => setAlvo(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>

              <button 
                onClick={iniciarAnalise}
                disabled={!alvo.trim()}
                className="w-full bg-zinc-100 text-zinc-900 font-medium p-3 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Calcular Assinatura Psicológica <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TELA 2: QUESTIONÁRIO --- */}
      {step === 'questionario' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-slate-200 animate-fade-in">
          <div className="w-full max-w-2xl space-y-8 text-center">
             <div className="flex justify-center mb-4">
               <Activity className="w-8 h-8 text-zinc-500 animate-pulse" />
             </div>
             
             <div className="space-y-2">
               <h2 className="text-xl font-medium tracking-wide">Mapeamento de Projeção</h2>
               <p className="text-xs text-zinc-500 uppercase tracking-widest">Alvo: {alvo.toUpperCase()} | Análise {perguntaAtual + 1} de {PERGUNTAS.length}</p>
             </div>

             {/* Barra de Progresso */}
             <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-zinc-400 transition-all duration-300 ease-out"
                 style={{ width: `${((perguntaAtual) / PERGUNTAS.length) * 100}%` }}
               ></div>
             </div>
             
             <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 min-h-[300px] flex flex-col justify-center shadow-lg">
               <p className="text-lg md:text-xl text-zinc-200 mb-8 font-light leading-relaxed">
                 {PERGUNTAS[perguntaAtual].texto}
               </p>
               
               <div className="grid grid-cols-1 gap-3">
                 {PERGUNTAS[perguntaAtual].opcoes.map((opcao, index) => (
                   <button 
                     key={index}
                     onClick={() => responderPergunta(opcao.pontos)} 
                     className="p-4 border border-zinc-700 rounded-lg hover:bg-zinc-800 hover:border-zinc-500 transition-all text-sm text-left text-zinc-300"
                   >
                     {opcao.label}
                   </button>
                 ))}
               </div>
             </div>
          </div>
       </div>
      )}

      {/* --- TELA 3: PROCESSAMENTO --- */}
      {step === 'processando' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-slate-200">
          <div className="w-full max-w-sm space-y-8 text-center">
            <Database className="w-12 h-12 text-zinc-600 animate-bounce mx-auto" />
            <div className="space-y-3">
              <h3 className="text-lg font-medium tracking-wide">A Compilar Dados</h3>
              <div className="space-y-1">
                <p className="text-xs text-zinc-500 uppercase tracking-widest animate-pulse">A calcular índice de idealização...</p>
                <p className="text-xs text-zinc-600 uppercase tracking-widest animate-pulse delay-75">A mapear complexos da Anima...</p>
                <p className="text-xs text-zinc-700 uppercase tracking-widest animate-pulse delay-150">A gerar plano de ação arquétipico...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TELA 4: DASHBOARD / RESULTADO --- */}
      {step === 'dashboard' && analiseIA && (
        <div className="min-h-screen p-4 md:p-8 animate-fade-in text-slate-200">
          <div className="max-w-4xl mx-auto space-y-6 pt-4">
            
            <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-4 gap-4">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-zinc-100" />
                <div>
                  <h1 className="text-xl font-semibold tracking-wide">Dossiê Analítico</h1>
                  <p className="text-xs text-zinc-500">Avaliação do vínculo com: <span className="font-bold text-zinc-400">{alvo.toUpperCase()}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Relatório Criptografado
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Diagnóstico Principal */}
              <div className={`col-span-1 lg:col-span-2 border rounded-xl p-6 lg:p-8 flex flex-col md:flex-row items-start gap-6 bg-zinc-900/60 ${analiseIA.cor} shadow-xl`}>
                <div className="bg-zinc-950 p-5 rounded-full border border-current shrink-0 shadow-inner">
                  {analiseIA.icone}
                </div>
                <div>
                  <h2 className="text-xs uppercase tracking-widest font-bold mb-2 opacity-80 flex items-center gap-2">
                    <Target className="w-3 h-3" /> Estado Identificado Pela IA
                  </h2>
                  <h3 className="text-4xl font-light mb-2">{analiseIA.nome}</h3>
                  <p className="text-sm font-semibold mb-5 opacity-90 uppercase tracking-wide">{analiseIA.subtitulo}</p>
                  <p className="text-sm opacity-90 leading-relaxed text-zinc-200 bg-zinc-950/40 p-4 rounded-lg border border-current/20">
                    {analiseIA.descricao}
                  </p>
                </div>
              </div>

              {/* Métricas e Termómetros */}
              <div className="space-y-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-zinc-400 uppercase font-semibold tracking-wider">Risco de Regressão</span>
                    <Activity className="w-4 h-4 text-zinc-500" />
                  </div>
                  <div className="text-2xl font-light text-zinc-100 mb-2">
                    {analiseIA.id === 'nigredo' ? 'Crítico (Alto)' : analiseIA.id === 'albedo' ? 'Moderado' : 'Estável (Baixo)'}
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full ${analiseIA.id === 'nigredo' ? 'bg-orange-500 w-[85%]' : analiseIA.id === 'albedo' ? 'bg-blue-400 w-[50%]' : 'bg-red-500 w-[15%]'}`}></div>
                  </div>
                </div>
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-zinc-400 uppercase font-semibold tracking-wider">Visão da Realidade</span>
                    <Moon className="w-4 h-4 text-zinc-500" />
                  </div>
                  <div className="text-xl font-medium text-zinc-200">
                     {analiseIA.id === 'nigredo' ? 'Fortemente Distorcida' : analiseIA.id === 'albedo' ? 'Em Desconstrução' : 'Clara e Integrada'}
                  </div>
                </div>
              </div>
            </div>

            {/* Recomendações Táticas */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold flex items-center gap-2">
                <Lock className="w-4 h-4" /> Protocolo de Ação Tática
              </h3>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 lg:p-8 shadow-lg">
                <h4 className="text-sm uppercase tracking-wide font-bold text-zinc-300 mb-3">Diretriz Primária</h4>
                <p className="text-base text-zinc-300 mb-8 border-l-2 border-zinc-600 pl-4">{analiseIA.acao}</p>

                <div className="space-y-4">
                   <h4 className="text-xs uppercase text-zinc-500 font-bold mb-4">Arquétipo a Invocar Imediatamente:</h4>
                   
                   {analiseIA.id === 'nigredo' && (
                     <div className="flex items-start gap-4 bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
                        <ShieldCheck className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                        <div>
                          <p className="text-base text-zinc-100 font-medium mb-1">O Sábio (Racionalidade Clínica)</p>
                          <p className="text-sm text-zinc-400 leading-relaxed">A sua mente está a fabricar um modelo irreal desta mulher. Para quebrar o feitiço psíquico, procure defeitos, observe incoerências lógicas e aplique distanciamento crítico. Corte o "abastecimento" imaginário que faz dela a sua deusa.</p>
                        </div>
                     </div>
                   )}

                  {analiseIA.id === 'albedo' && (
                     <div className="flex items-start gap-4 bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
                        <Activity className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                        <div>
                          <p className="text-base text-zinc-100 font-medium mb-1">O Guerreiro (Resiliência ao Desconforto)</p>
                          <p className="text-sm text-zinc-400 leading-relaxed">Ela desapontou as suas expectativas divinas, e isso dói. O Guerreiro aguenta a dor da desilusão sem atacar, cobrar desesperadamente ou fugir à procura de um novo "ópio" noutra mulher. Mantenha as fronteiras claras e tolere a realidade imperfeita dela.</p>
                        </div>
                     </div>
                   )}

                  {analiseIA.id === 'rubedo' && (
                     <div className="flex items-start gap-4 bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
                        <Heart className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                        <div>
                          <p className="text-base text-zinc-100 font-medium mb-1">O Rei e O Explorador (Liderança e Novidade)</p>
                          <p className="text-sm text-zinc-400 leading-relaxed">Já não precisa dela para curar traumas psíquicos. Agora é sobre gestão de parceria. Lidere com firmeza e propósito (O Rei) e continue a injetar aventura e imprevisibilidade na relação para que o vínculo não caia no tédio estéril (O Explorador).</p>
                        </div>
                     </div>
                   )}
                </div>
              </div>
            </div>

            <div className="pt-10 pb-6 text-center">
              <button 
                onClick={reiniciar}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest font-semibold px-4 py-2 border border-zinc-800 rounded-lg hover:bg-zinc-900"
              >
                Encerrar Sessão e Nova Análise
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );

}
