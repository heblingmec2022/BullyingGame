
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePage = ({ onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-4xl w-full text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <img 
            className="w-32 h-32 mx-auto mb-6 rounded-full shadow-2xl"
            alt="Bullying Game Logo"
            src="https://horizons-cdn.hostinger.com/d0df5df0-94b2-4066-8a7d-6106157ccc4c/generated-image-OjhSb.png"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl font-black text-shadow"
        >
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Bullying
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-300 via-green-300 to-yellow-300 bg-clip-text text-transparent">
            Game
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed"
        >
          Aprenda a identificar, prevenir e combater o bullying de forma divertida e educativa! 
          <span className="block mt-2 text-yellow-300 font-semibold">
            Juntos podemos criar escolas mais seguras e acolhedoras! 🌟
          </span>
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={() => onNavigate('select')}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all"
          >
            <Sparkles className="mr-2" size={24} />
            Começar a Aprender
          </Button>

          <Button
            onClick={() => onNavigate('board')}
            size="lg"
            variant="outline"
            className="bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white font-bold text-lg px-8 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all"
          >
            <Play className="mr-2" size={24} />
            Jogar Agora
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {[
            { icon: '📚', title: 'Aprenda', desc: '20 tipos de bullying' },
            { icon: '🎮', title: 'Jogue', desc: 'Tabuleiro para 2 jogadores' },
            { icon: '🏆', title: 'Conquiste', desc: 'Conhecimento e empatia' }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-2xl shadow-xl"
            >
              <div className="text-5xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/80">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;
