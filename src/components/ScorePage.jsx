
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, XCircle, RotateCcw, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScorePage = ({ gameData, onNavigate, resetGame }) => {
  const player = gameData.players[0];
  const totalQuestions = player.answers.length;
  const correctAnswers = player.answers.filter(a => a.correct).length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  let performance = {
    title: "Vamos Tentar de Novo?",
    message: "Parece que você não respondeu muitas perguntas. Jogue novamente para aprender mais!",
    icon: <Star size={40} className="text-gray-400" />,
  };

  if (totalQuestions > 0) {
    if (percentage === 100) {
      performance = {
        title: "🏆 Perfeito! Herói Anti-Bullying!",
        message: "Você gabaritou! Seu conhecimento e empatia são inspiradores. Continue sendo essa força do bem!",
        icon: <Trophy size={40} className="text-yellow-400" />,
      };
    } else if (percentage >= 80) {
      performance = {
        title: "🌟 Excelente! Defensor da Paz!",
        message: "Seu desempenho foi incrível! Você tem um ótimo entendimento sobre como combater o bullying.",
        icon: <Star size={40} className="text-green-400" />,
      };
    } else if (percentage >= 50) {
      performance = {
        title: "👍 Bom Trabalho! Guardião em Treinamento!",
        message: "Você está no caminho certo! Continue aprendendo para se tornar um especialista em criar ambientes seguros.",
        icon: <Star size={40} className="text-blue-400" />,
      };
    } else {
      performance = {
        title: "💪 Continue Aprendendo, Futuro Aliado!",
        message: "Não desanime! Cada erro é uma oportunidade de aprendizado. Jogue de novo para fortalecer seu conhecimento.",
        icon: <Star size={40} className="text-orange-400" />,
      };
    }
  }


  const handleResetAndPlay = () => {
    resetGame();
    onNavigate('board');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-4 md:p-8 pt-24 flex items-center justify-center"
    >
      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
          className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/20"
        >
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
              {performance.icon}
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 text-shadow bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {performance.title}
            </h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              {performance.message}
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 mb-8 space-y-4">
            <div className="flex justify-between items-center text-2xl">
              <span className="text-white/70">Pontuação Final:</span>
              <span className="font-black text-yellow-300">{player.score}</span>
            </div>
            <div className="h-px bg-white/10"></div>
            <div className="flex justify-around items-center pt-2">
                <div className="text-center">
                    <span className="text-4xl font-bold text-green-400">{correctAnswers}</span>
                    <p className="text-sm text-white/70">Acertos</p>
                </div>
                <div className="text-center">
                    <span className="text-4xl font-bold text-red-400">{wrongAnswers}</span>
                    <p className="text-sm text-white/70">Erros</p>
                </div>
                <div className="text-center">
                    <span className="text-4xl font-bold text-purple-400">{percentage}%</span>
                    <p className="text-sm text-white/70">Aproveitamento</p>
                </div>
            </div>
          </div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={handleResetAndPlay}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-8 py-6 rounded-full shadow-xl flex-1"
            >
              <RotateCcw className="mr-2" size={24} />
              Jogar Novamente
            </Button>
            <Button
              onClick={() => onNavigate('select')}
              size="lg"
              variant="outline"
              className="bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white font-bold px-8 py-6 rounded-full shadow-xl flex-1"
            >
              <BookOpen className="mr-2" size={24} />
              Estudar Mais
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScorePage;
