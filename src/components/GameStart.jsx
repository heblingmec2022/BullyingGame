
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const GameStart = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4 md:p-8 pt-20 pb-8"
    >
      <div className="glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 max-w-2xl w-full shadow-2xl border-2 border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 text-shadow">
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              🎮 Jogo Educativo
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2">
            Bullying Escolar
          </h2>
          <p className="text-white/90 text-base sm:text-lg">
            Um jogo para aprender sobre convivência saudável
          </p>
        </div>

        <div className="glass-effect rounded-xl p-6 mb-8 border border-white/10">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
            📋 Como Jogar:
          </h3>
          <ul className="space-y-2 text-white/90 text-sm sm:text-base">
            <li className="flex items-start">
              <span className="mr-2">🎲</span>
              <span>Role o dado para avançar no tabuleiro</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">❓</span>
              <span>Responda situações sobre bullying</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">💡</span>
              <span>Receba feedback sobre suas escolhas</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">📊</span>
              <span>Ao final, veja seu relatório educativo</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="playerName"
              className="block text-sm font-medium text-white/90 mb-2"
            >
              Digite seu nome:
            </label>
            <input
              type="text"
              id="playerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 glass-effect border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-lg text-white placeholder-white/50 bg-white/5"
              placeholder="Seu nome aqui..."
              required
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full shadow-2xl transform hover:scale-105 text-base sm:text-lg"
          >
            Começar Jogo 🚀
          </Button>
        </form>
        
        {/* Link para área administrativa */}
        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="text-sm text-white/70 hover:text-yellow-300 transition-colors flex items-center justify-center gap-1 mx-auto"
          >
            <span>🔐</span>
            <span>Área Administrativa</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameStart;

