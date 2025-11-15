
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Dice1 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuestionModal from '@/components/QuestionModal';
import { getRandomQuestion, rollDice, generateBoardCells, getBullyingTypeColor, getBullyingTypeName } from '@/utils/gameUtils';
import bullyingQuestions from '@/data/bullying-questions.json';

const BoardPage = ({ gameData, updateGameData, onNavigate, resetGame }) => {
  const [diceValue, setDiceValue] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [boardCells, setBoardCells] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [profileCounts, setProfileCounts] = useState(
    gameData.profileCounts || {
      agressor: 0,
      vitima: 0,
      'vitima-agressora': 0,
      'vitima-agressora-ciclica': 0,
      espectador: 0,
      interventor: 0,
    }
  );
  const [showLegend, setShowLegend] = useState(false);
  const svgRef = useRef(null);

  const player = gameData.players[0];
  const totalQuestions = bullyingQuestions.length; // Total de perguntas disponíveis na base de dados
  const totalCells = 50;
  const legendItems = [
    { type: 'fisico', label: getBullyingTypeName('fisico') },
    { type: 'verbal', label: getBullyingTypeName('verbal') },
    { type: 'relacional', label: getBullyingTypeName('relacional') },
    { type: 'virtual', label: getBullyingTypeName('virtual') },
    { type: 'preconceito', label: getBullyingTypeName('preconceito') },
  ];

  useEffect(() => {
    setBoardCells(generateBoardCells());
    setCurrentPosition(player.position || 0);
    if (gameData.profileCounts) {
      setProfileCounts(gameData.profileCounts);
    }
    if (gameData.questionsAnswered) {
      setQuestionsAnswered(gameData.questionsAnswered);
    }
  }, []);

  const handleRollDice = () => {
    if (isRolling || showQuestion || currentPosition >= totalCells) return;

    setIsRolling(true);
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValue = rollDice();
      setDiceValue(finalValue);
      setIsRolling(false);

      const newPosition = Math.min(currentPosition + finalValue, totalCells);
      setCurrentPosition(newPosition);
      
      const updatedPlayers = [{ ...player, position: newPosition }];
      updateGameData({ players: updatedPlayers });

      // Mostrar pergunta quando chegar em uma nova casa (apenas se não estiver na última casa)
      if (newPosition !== currentPosition && newPosition < totalCells && newPosition > 0) {
        const question = getRandomQuestion(usedQuestions);
        if (question) {
          setCurrentQuestion(question);
          setShowQuestion(true);
          setUsedQuestions([...usedQuestions, question.id]);
        }
      }

      // Finalizar jogo ao chegar na última casa
      if (newPosition >= totalCells) {
        setTimeout(() => {
          updateGameData({ 
            gameFinished: true,
            profileCounts: profileCounts
          });
          onNavigate('score');
        }, 1500);
      }
    }, 1000);
  };

  const handleQuestionAnswer = (profile) => {
    // Atualizar contagem de perfis
    const newProfileCounts = {
      ...profileCounts,
      [profile]: profileCounts[profile] + 1,
    };
    setProfileCounts(newProfileCounts);
    updateGameData({ profileCounts: newProfileCounts });
    
    // Atualizar contagem de perguntas respondidas
    const newQuestionsAnswered = questionsAnswered + 1;
    setQuestionsAnswered(newQuestionsAnswered);
    updateGameData({ questionsAnswered: newQuestionsAnswered });
    
    setShowQuestion(false);
    setCurrentQuestion(null);
  };

  const getPlayerPosition = () => {
    const centerOffset = 45; // metade do tamanho atual da casa (90px)

    if (currentPosition === 0) {
      const firstCell = boardCells[0];
      return firstCell ? { x: firstCell.x + centerOffset, y: firstCell.y + centerOffset } : { x: 100, y: 100 };
    }

    const cell = boardCells[currentPosition - 1];
    return cell ? { x: cell.x + centerOffset, y: cell.y + centerOffset } : { x: 100, y: 100 };
  };

  const playerPos = getPlayerPosition();
  const playerScore = Object.values(profileCounts).reduce((a, b) => a + b, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-2 sm:p-4 md:p-8 pt-20 sm:pt-24 pb-4 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Título Centralizado */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-shadow mb-2">
            <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
              Jornada do Respeito
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {/* Painel Esquerdo - Controles */}
          <div className="space-y-4">
            {/* Informações do Jogador */}
            <div className="glass-effect rounded-xl shadow-lg p-4 sm:p-6 border-2 border-white/20">
              <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  👤
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm text-white/70 mb-1">Jogador</div>
                  <div className="text-sm sm:text-lg font-bold text-white truncate">{player.name}</div>
                </div>
              </div>
              <p className="text-white/80 mb-2 sm:mb-3 text-xs sm:text-sm">Sua vez de brilhar!</p>
              <div className="inline-block bg-yellow-400 text-gray-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-lg">
                {playerScore} pontos
              </div>
            </div>

            {/* Casa Atual */}
            <div className="glass-effect rounded-xl shadow-lg p-4 sm:p-6 border-2 border-white/20">
              <div className="text-xs sm:text-sm text-white/70 mb-2">Casa Atual</div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-300">
                {currentPosition} / {totalCells}
              </div>
            </div>

            {/* Botão Jogar Dado */}
            <div className="glass-effect rounded-xl shadow-lg p-4 sm:p-6 border-2 border-white/20">
              <Button
                onClick={handleRollDice}
                disabled={isRolling || showQuestion || currentPosition >= totalCells}
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg shadow-2xl transform hover:scale-105 disabled:opacity-50 text-sm sm:text-base"
              >
                {isRolling ? (
                  <>
                    <span className="animate-spin mr-2">🎲</span>
                    Rolando...
                  </>
                ) : currentPosition >= totalCells ? (
                  <>
                    <span className="mr-2">🏁</span>
                    Jogo Finalizado
                  </>
                ) : (
                  <>
                    <Dice1 className="mr-2" size={24} />
                    Jogar Dado
                  </>
                )}
              </Button>
            </div>

            {/* Botões Score e Reiniciar */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Button
                onClick={() => onNavigate('score')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 sm:py-3 px-2 sm:px-4 rounded-lg border border-white/20 transition-all text-xs sm:text-sm"
              >
                <Trophy className="mr-1 sm:mr-2" size={16} />
                Score
              </Button>
              <Button
                onClick={() => {
                  resetGame();
                  onNavigate('start');
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 sm:py-3 px-2 sm:px-4 rounded-lg border border-white/20 transition-all text-xs sm:text-sm"
              >
                <RotateCcw className="mr-1 sm:mr-2" size={16} />
                Reiniciar
              </Button>
            </div>

            <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              <Button
                onClick={() => setShowLegend((prev) => !prev)}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-full shadow-2xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                {showLegend ? 'Ocultar legenda' : 'Mostrar legenda'}
              </Button>

              {showLegend && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {legendItems.map((item) => (
                    <div
                      key={item.type}
                      className="glass-effect rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span
                          className="inline-block w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white flex-shrink-0"
                          style={{ backgroundColor: getBullyingTypeColor(item.type) }}
                        />
                        <span className="text-white/90 text-xs sm:text-sm font-semibold truncate">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tabuleiro - Direita */}
          <div className="lg:col-span-2 glass-effect rounded-xl shadow-lg p-2 sm:p-4 md:p-6 border-2 border-white/20 overflow-x-auto">
            <div className="relative min-w-0">
              <svg
                ref={svgRef}
                viewBox="0 0 1200 650"
                className="w-full h-auto"
                style={{ minHeight: '300px', maxHeight: '520px' }}
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Casas do tabuleiro */}
                {boardCells.map((cell) => {
                  const isCurrent = currentPosition === cell.number;
                  const cellColor = getBullyingTypeColor(cell.type);

                  return (
                    <g key={cell.number}>
                      <rect
                        x={cell.x}
                        y={cell.y}
                        width="90"
                        height="90"
                        fill={cellColor}
                        stroke={isCurrent ? '#FFD700' : '#fff'}
                        strokeWidth={isCurrent ? 4 : 2}
                        rx="12"
                        className={isCurrent ? 'animate-pulse' : ''}
                        style={{ 
                          filter: isCurrent ? 'drop-shadow(0 0 12px rgba(255,215,0,0.6))' : '',
                        }}
                      />
                      <text
                        x={cell.x + 45}
                        y={cell.y + 55}
                        textAnchor="middle"
                        fill="white"
                        fontSize="28"
                        fontWeight="bold"
                        stroke="#000"
                        strokeWidth="2.5"
                        paintOrder="stroke"
                      >
                        {cell.number}
                      </text>
                    </g>
                  );
                })}

                {/* Peão do jogador */}
                {currentPosition >= 0 && boardCells.length > 0 && (
                  <g>
                    <circle
                      cx={playerPos.x}
                      cy={playerPos.y - 52}
                      r="24"
                      fill="#FFD700"
                      stroke="#000"
                      strokeWidth="3"
                      style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))' }}
                    />
                    <circle
                      cx={playerPos.x}
                      cy={playerPos.y - 52}
                      r="17"
                      fill="#FFA500"
                    />
                    <text
                      x={playerPos.x}
                      y={playerPos.y - 47}
                      textAnchor="middle"
                      fontSize="26"
                    >
                      🎓
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Pergunta */}
      <AnimatePresence>
        {showQuestion && currentQuestion && (
          <QuestionModal
            question={currentQuestion}
            onAnswer={handleQuestionAnswer}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BoardPage;
