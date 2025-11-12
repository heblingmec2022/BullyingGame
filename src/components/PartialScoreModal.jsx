
import React from 'react';
import { motion } from 'framer-motion';
import { X, Crown, Play, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PartialScoreModal = ({ gameData, onClose, onNavigate }) => {
  const player1 = gameData.players[0];
  const player2 = gameData.players[1];
  const isFinished = gameData.gameFinished;

  const winner = isFinished ? (player1.score > player2.score ? player1 : player2.score > player1.score ? player2 : null) : null;
  const isDraw = isFinished && player1.score === player2.score;

  const title = isFinished ? (isDraw ? '🤝 Empate!' : `🏆 ${winner.name} Venceu!`) : '📊 Resultado Parcial';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-3xl p-8 max-w-3xl w-full shadow-2xl border-2 border-white/20"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl md:text-4xl font-black text-white text-shadow bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            {title}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[player1, player2].map((player, index) => (
            <div key={player.id} className={`bg-white/5 rounded-2xl p-6 ${winner?.id === player.id ? 'ring-2 ring-yellow-400' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${ index === 0 ? 'bg-blue-500' : 'bg-red-500' }`}>
                    {index === 0 ? '🔵' : '🔴'}
                  </div>
                  <h3 className="text-xl font-bold">{player.name}</h3>
                </div>
                {winner?.id === player.id && <Crown className="text-yellow-400" size={32} />}
              </div>
              <div className="space-y-3 text-lg">
                <div className="flex justify-between"><span>Pontos:</span> <span className="font-bold text-yellow-300">{player.score}</span></div>
                <div className="flex justify-between"><span>Posição:</span> <span className="font-bold">{player.position}/20</span></div>
                <div className="flex justify-between"><span>Acertos:</span> <span className="font-bold text-green-300">{player.answers.filter(a => a.correct).length}/{player.answers.length}</span></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
            {isFinished ? (
                <Button onClick={() => onNavigate('score')} size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold px-8 py-6 rounded-full shadow-lg">
                    <Trophy className="mr-2" /> Ver Resultado Final
                </Button>
            ) : (
                <Button onClick={onClose} size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-6 rounded-full shadow-lg">
                    <Play className="mr-2" /> Continuar Jogando
                </Button>
            )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PartialScoreModal;
