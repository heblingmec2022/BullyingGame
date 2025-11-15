
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { saveReport } from '@/lib/storage';

const PROFILE_NAMES = {
  agressor: 'Agressor',
  vitima: 'Vítima',
  'vitima-agressora': 'Vítima-Agressora',
  'vitima-agressora-ciclica': 'Vítima-Agressora',
  espectador: 'Espectador',
  interventor: 'Interventor Positivo',
};

const ScorePage = ({ gameData, onNavigate, resetGame }) => {
  const [mlDiagnosis, setMlDiagnosis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  
  const player = gameData.players[0];
  const profileCounts = gameData.profileCounts || {
    agressor: 0,
    vitima: 0,
    'vitima-agressora': 0,
    'vitima-agressora-ciclica': 0,
    espectador: 0,
    interventor: 0,
  };

  useEffect(() => {
    // Simular análise de ML
    setTimeout(() => {
      const diagnosis = generateMLDiagnosis(profileCounts);
      setMlDiagnosis(diagnosis);
      setIsAnalyzing(false);
      
      // Salvar relatório automaticamente
      const total = Object.values(profileCounts).reduce((a, b) => a + b, 0);
      const reportData = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        playerName: player.name,
        date: new Date().toISOString(),
        profileCounts,
        percentages: {
          agressor: total > 0 ? ((profileCounts.agressor / total) * 100).toFixed(2) : '0',
          vitima: total > 0 ? ((profileCounts.vitima / total) * 100).toFixed(2) : '0',
          'vitima-agressora': total > 0 ? ((profileCounts['vitima-agressora'] / total) * 100).toFixed(2) : '0',
          'vitima-agressora-ciclica': total > 0 ? ((profileCounts['vitima-agressora-ciclica'] / total) * 100).toFixed(2) : '0',
          espectador: total > 0 ? ((profileCounts.espectador / total) * 100).toFixed(2) : '0',
          interventor: total > 0 ? ((profileCounts.interventor / total) * 100).toFixed(2) : '0',
        },
        diagnosis,
      };
      saveReport(reportData);
    }, 2000);
  }, [profileCounts, player.name]);

  const handleRestart = () => {
    resetGame();
    onNavigate('board');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-3 sm:p-4 md:p-8 pt-20 sm:pt-24 pb-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-white/20">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 text-shadow">
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              🎓 Diagnóstico Educativo
            </span>
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg">
            Parabéns, <span className="font-semibold text-yellow-300">{player.name}</span>! Você completou o jogo!
          </p>
        </div>

        {isAnalyzing ? (
          <div className="glass-effect rounded-xl shadow-lg p-8 sm:p-12 text-center border-2 border-white/20">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-base sm:text-xl text-white">Analisando suas respostas...</p>
            <p className="text-white/70 mt-2 text-sm sm:text-base">Gerando diagnóstico educativo</p>
          </div>
        ) : (
          mlDiagnosis && (
            <div className="space-y-6">
              {/* Diagnóstico ML */}
              <div className="glass-effect rounded-xl shadow-lg p-4 sm:p-6 border-2 border-white/20">
                <div className="flex items-center mb-3 sm:mb-4">
                  <BookOpen className="text-yellow-300 mr-2" size={20} />
                  <h3 className="text-xl sm:text-2xl font-semibold text-white text-shadow">Seu Diagnóstico</h3>
                </div>

                <div className="glass-effect rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-white/10">
                  <p className="text-white/90 leading-relaxed text-sm sm:text-base md:text-lg">{mlDiagnosis.analise}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-green-300 flex items-center text-shadow">
                      <span className="mr-2">💡</span>
                      Dicas de Convivência Saudável
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {mlDiagnosis.dicas.map((dica, index) => (
                        <li key={index} className="flex items-start glass-effect p-2 sm:p-3 rounded-lg border border-white/10">
                          <span className="mr-2 text-green-300 font-bold flex-shrink-0">✓</span>
                          <span className="text-white/90 text-sm sm:text-base">{dica}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-blue-300 flex items-center text-shadow">
                      <span className="mr-2">📚</span>
                      Recomendações
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {mlDiagnosis.recomendacoes.map((rec, index) => (
                        <li key={index} className="flex items-start glass-effect p-2 sm:p-3 rounded-lg border border-white/10">
                          <span className="mr-2 text-blue-300 font-bold flex-shrink-0">→</span>
                          <span className="text-white/90 text-sm sm:text-base">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mensagem Final */}
              <div className="glass-effect rounded-xl p-4 sm:p-6 text-center border-2 border-white/20">
                <p className="text-sm sm:text-base md:text-lg text-white/90 mb-3 sm:mb-4">
                  Continue praticando a empatia, o respeito e a inclusão em seu dia a dia!
                </p>
                <p className="text-white/80 text-xs sm:text-sm md:text-base">
                  Lembre-se: pequenas ações fazem grande diferença na construção de um ambiente escolar mais saudável e acolhedor.
                </p>
              </div>

              {/* Botão de Reiniciar */}
              <div className="text-center space-y-2 sm:space-y-3">
                <Button
                  onClick={handleRestart}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-2xl transform hover:scale-105 text-sm sm:text-base md:text-lg w-full sm:w-auto"
                >
                  <RotateCcw className="mr-2" size={18} />
                  Jogar Novamente 🎮
                </Button>
                
                {/* Link para área administrativa */}
                <div>
                  <button
                    onClick={() => onNavigate('admin')}
                    className="text-sm text-white/70 hover:text-yellow-300 transition-colors flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>🔐</span>
                    <span>Área Administrativa</span>
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </motion.div>
  );
};

function generateMLDiagnosis(profileCounts) {
  const total = Object.values(profileCounts).reduce((a, b) => a + b, 0);
  if (total === 0) {
    return {
      perfilDominante: 'Não identificado',
      analise: 'Você ainda não respondeu perguntas suficientes para gerar um diagnóstico. Continue jogando!',
      dicas: ['Continue jogando para receber um diagnóstico completo'],
      recomendacoes: ['Complete mais rodadas do jogo'],
    };
  }

  const percentages = {
    agressor: (profileCounts.agressor / total) * 100,
    vitima: (profileCounts.vitima / total) * 100,
    'vitima-agressora': (profileCounts['vitima-agressora'] / total) * 100,
    'vitima-agressora-ciclica': (profileCounts['vitima-agressora-ciclica'] / total) * 100,
    espectador: (profileCounts.espectador / total) * 100,
    interventor: (profileCounts.interventor / total) * 100,
  };

  // Determinar perfil dominante
  const entries = Object.entries(percentages);
  const maxEntry = entries.reduce((max, current) =>
    current[1] > max[1] ? current : max
  );
  const perfilDominante = maxEntry[0];

  // Gerar análise baseada no perfil dominante
  let analise = '';
  let dicas = [];
  let recomendacoes = [];

  if (perfilDominante === 'interventor') {
    analise = `Parabéns! Você demonstrou um perfil predominantemente de Interventor Positivo (${maxEntry[1].toFixed(1)}% das escolhas). Isso indica que você tem uma forte tendência a intervir de forma positiva em situações de bullying, buscando ajudar vítimas e resolver conflitos de maneira construtiva. Você mostra empatia, coragem e responsabilidade social.`;
    dicas = [
      'Continue sendo um exemplo positivo para seus colegas',
      'Mantenha sua postura de inclusão e respeito',
      'Compartilhe suas estratégias de intervenção com outros alunos',
      'Sempre busque ajuda de adultos quando necessário',
    ];
    recomendacoes = [
      'Considere participar de programas de mediação de conflitos',
      'Seja um mentor para alunos mais novos',
      'Continue desenvolvendo habilidades de comunicação não-violenta',
    ];
  } else if (perfilDominante === 'espectador') {
    analise = `Seu perfil predominante é de Espectador (${maxEntry[1].toFixed(1)}% das escolhas). Isso significa que você tende a observar situações de bullying sem intervir ativamente. Embora não seja você quem pratica o bullying, a falta de intervenção pode permitir que ele continue. É importante aprender formas seguras de intervir e apoiar vítimas.`;
    dicas = [
      'Aprenda formas seguras de intervir em situações de bullying',
      'Busque ajuda de adultos quando presenciar bullying',
      'Mostre apoio às vítimas, mesmo que seja apenas com um gesto amigável',
      'Não tenha medo de ser diferente - fazer a coisa certa é mais importante',
    ];
    recomendacoes = [
      'Participe de workshops sobre prevenção de bullying',
      'Pratique cenários de intervenção segura',
      'Desenvolva confiança para agir quando necessário',
    ];
  } else if (perfilDominante === 'agressor') {
    analise = `Seu perfil predominante é de Agressor (${maxEntry[1].toFixed(1)}% das escolhas). Isso indica uma tendência a escolher comportamentos agressivos ou que perpetuam o bullying. É importante refletir sobre como suas ações podem afetar outros e buscar formas mais positivas de interação. Lembre-se: todos podem mudar e aprender formas melhores de se relacionar.`;
    dicas = [
      'Reflita sobre como suas ações afetam os outros',
      'Pratique empatia - coloque-se no lugar da outra pessoa',
      'Busque ajuda de adultos para entender e mudar comportamentos',
      'Aprenda formas positivas de resolver conflitos',
    ];
    recomendacoes = [
      'Considere conversar com um orientador ou psicólogo escolar',
      'Participe de programas de desenvolvimento socioemocional',
      'Pratique técnicas de controle de impulsos e resolução de conflitos',
    ];
  } else if (perfilDominante === 'vitima') {
    analise = `Seu perfil predominante é de Vítima (${maxEntry[1].toFixed(1)}% das escolhas). Isso pode indicar que você se identifica com situações de vulnerabilidade ou que já passou por experiências similares. É importante saber que você não está sozinho e que há formas de buscar ajuda e proteção. Todos merecem respeito e segurança.`;
    dicas = [
      'Converse com adultos de confiança sobre suas experiências',
      'Saiba que você não tem culpa pelo bullying que sofre',
      'Procure grupos de apoio e amigos que te respeitem',
      'Desenvolva sua autoestima e autoconfiança',
    ];
    recomendacoes = [
      'Busque apoio psicológico se necessário',
      'Participe de atividades que fortaleçam sua autoestima',
      'Aprenda técnicas de assertividade e autodefesa emocional',
    ];
  } else if (perfilDominante === 'vitima-agressora') {
    analise = `Seu perfil predominante é de Vítima-Agressora (${maxEntry[1].toFixed(1)}% das escolhas). Isso indica que você pode ter vivenciado situações onde sofreu bullying e também praticou. Este é um ciclo que pode ser quebrado com apoio e aprendizado de formas mais saudáveis de lidar com conflitos e emoções.`;
    dicas = [
      'Reconheça o ciclo de violência e busque quebrá-lo',
      'Aprenda formas não-violentas de expressar suas emoções',
      'Busque ajuda profissional para lidar com traumas passados',
      'Pratique empatia e compreensão com os outros',
    ];
    recomendacoes = [
      'Considere terapia ou apoio psicológico',
      'Participe de programas de mediação de conflitos',
      'Desenvolva habilidades de regulação emocional',
    ];
  } else {
    // vitima-agressora-ciclica
    analise = `Seu perfil predominante é de Vítima-Agressora (${maxEntry[1].toFixed(1)}% das escolhas). Este perfil indica que você está preso em um ciclo repetitivo de violência, onde a experiência de ser vítima leva a comportamentos agressivos que, por sua vez, podem gerar mais violência. Este padrão pode ser especialmente difícil de quebrar sem apoio adequado, pois está profundamente enraizado em respostas emocionais automáticas.`;
    dicas = [
      'Reconheça que você está em um ciclo e que é possível sair dele',
      'Identifique os gatilhos que desencadeiam comportamentos agressivos',
      'Busque ajuda profissional especializada em trauma e ciclos de violência',
      'Pratique técnicas de mindfulness para quebrar respostas automáticas',
      'Crie um diário para mapear padrões de comportamento',
    ];
    recomendacoes = [
      'Procure terapia especializada em trauma e violência interpessoal',
      'Participe de grupos de apoio para pessoas em situações similares',
      'Aprenda técnicas de regulação emocional e controle de impulsos',
      'Desenvolva uma rede de apoio com pessoas que não perpetuem o ciclo',
      'Considere programas de intervenção precoce para quebrar o padrão',
    ];
  }

  return {
    perfilDominante: PROFILE_NAMES[perfilDominante] || perfilDominante,
    analise,
    dicas,
    recomendacoes,
  };
}

export default ScorePage;
