
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dices, Trophy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bullyingTypes } from '@/data/bullyingTypes';
import QuestionModal from '@/components/QuestionModal';
import { toast } from '@/components/ui/use-toast';

const BoardPage = ({ gameData, updateGameData, onNavigate, resetGame }) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const gameQuestions = useMemo(() => {
    if (!gameData.questions) return [];
    return gameData.questions;
  }, [gameData.questions]);

  const player = gameData.players[0];

  const rollDice = () => {
    if (gameData.gameFinished || showQuestion) return;

    const diceRoll = Math.floor(Math.random() * 3) + 1; // 1, 2 or 3
    const newPosition = Math.min(player.position + diceRoll, 20);

    toast({
      title: `🎲 Você avançou ${diceRoll} casa(s)!`,
      description: `Movendo para a casa ${newPosition}`,
      duration: 2000,
    });

    const updatedPlayers = [{ ...player, position: newPosition }];
    updateGameData({ players: updatedPlayers });

    // Show question after moving
    setTimeout(() => {
        const questionToShow = gameQuestions[gameData.currentQuestionIndex];
        if(questionToShow) {
            setCurrentQuestion(questionToShow);
            setShowQuestion(true);
        }
    }, 1200);
  };
  
  const handleAnswerQuestion = (isCorrect) => {
    const newScore = isCorrect ? player.score + 20 : player.score;
    const newAnswers = [...player.answers, { questionId: currentQuestion.id, correct: isCorrect }];
    
    const updatedPlayer = { ...player, score: newScore, answers: newAnswers };
    const nextQuestionIndex = gameData.currentQuestionIndex + 1;
    const isGameFinished = nextQuestionIndex >= gameQuestions.length;

    updateGameData({ 
        players: [updatedPlayer],
        currentQuestionIndex: nextQuestionIndex,
        gameFinished: isGameFinished
    });
    
    setShowQuestion(false);
    setCurrentQuestion(null);

    if (isGameFinished) {
        toast({
            title: '🎉 Jogo Finalizado!',
            description: `Você respondeu todas as perguntas!`,
            duration: 3000,
        });
        setTimeout(() => {
            onNavigate('score');
        }, 1500);
    }
  };

  const handleResetGame = () => {
    resetGame();
    toast({
      title: '🔄 Jogo Reiniciado!',
      description: 'Boa sorte!',
      duration: 2000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
    >
      <div className="max-w-7xl w-full mx-auto">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-black text-shadow bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
            Jornada do Respeito
          </h1>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <motion.div
              className="glass-effect rounded-2xl p-4 ring-4 ring-yellow-400"
            >
               <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl bg-blue-500">
                    🔵
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{player.name}</h3>
                    <span className="text-xs text-yellow-300">Sua vez de brilhar!</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-yellow-300">{player.score}</div>
                  <div className="text-xs text-white/70">pontos</div>
                </div>
              </div>
            </motion.div>
            <div className="glass-effect rounded-2xl p-4 space-y-3">
              <div className="text-center text-white/90">
                 <p className="font-bold text-lg">Perguntas Respondidas</p>
                 <p className="text-2xl font-black text-purple-300">{player.answers.length} de {gameQuestions.length}</p>
              </div>
              <Button onClick={rollDice} disabled={gameData.gameFinished || showQuestion} size="lg" className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-6 rounded-xl shadow-lg transform hover:scale-105 disabled:opacity-50">
                <Dices className="mr-2" size={24} />
                {gameData.gameFinished ? 'Jogo Finalizado!' : 'Jogar Dado'}
              </Button>
              <div className="flex gap-2">
                 <Button onClick={() => onNavigate('score')} variant="outline" className="w-full bg-white/10 border-white/30 hover:bg-white/20">
                  <Trophy className="mr-2" size={20} /> Score
                </Button>
                <Button onClick={handleResetGame} variant="outline" className="w-full bg-white/10 border-white/30 hover:bg-white/20">
                  <RotateCcw className="mr-2" size={20} /> Reiniciar
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 glass-effect rounded-3xl p-4 md:p-6 relative aspect-[4/3] flex flex-col">
            {[...Array(4)].map((_, rowIndex) => (
                <div key={rowIndex} className={`flex-1 flex ${rowIndex % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                    {[...Array(5)].map((_, colIndex) => {
                        const originalIndex = rowIndex * 5 + colIndex;
                        const position = bullyingTypes[originalIndex].id;
                        const type = bullyingTypes[originalIndex];
                        const playerHere = player.position === position;
                        
                        return (
                            <div key={position} className="flex-1 p-1 flex items-center justify-center">
                               <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: originalIndex * 0.05 }}
                                  className={`w-full h-full rounded-lg flex flex-col items-center justify-center relative text-white border-2 border-white/10`}
                                  style={{ background: `linear-gradient(135deg, ${type.color.replace('from-', '').replace('to-', ', ')})` }}
                                >
                                  <span className="font-bold text-3xl md:text-4xl text-shadow-sm">{position}</span>

                                  <div className="absolute -bottom-2 flex gap-1 z-10">
                                      {playerHere && <motion.div layoutId="player-pawn" className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs">🔵</motion.div>}
                                  </div>
                               </motion.div>
                            </div>
                        )
                    })}
                </div>
            ))}
             <div className="absolute inset-0 p-4 md:p-6 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="white" />
                        </marker>
                    </defs>
                    <polyline points="10%,12.5% 90%,12.5% 90%,37.5% 10%,37.5% 10%,62.5% 90%,62.5% 90%,87.5% 10%,87.5%" fill="none" stroke="white" strokeWidth="4" strokeDasharray="10 5" markerMid="url(#arrow)" markerStart="url(#arrow)"/>
                </svg>
             </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showQuestion && currentQuestion && (
          <QuestionModal question={currentQuestion} onAnswer={handleAnswerQuestion} onClose={() => setShowQuestion(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BoardPage;
