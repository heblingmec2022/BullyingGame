
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, List, Trophy, Gamepad as GamepadIcon } from 'lucide-react';
import HomePage from '@/components/HomePage';
import SelectPage from '@/components/SelectPage';
import BoardPage from '@/components/BoardPage';
import ScorePage from '@/components/ScorePage';
import { Toaster } from '@/components/ui/toaster';
import { boardQuestions } from '@/data/boardQuestions';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to create initial game state
  const createInitialGameState = () => {
    // Select 5 random questions for the game session
    const gameQuestions = shuffleArray(boardQuestions).slice(0, 5);

    return {
      players: [
        { id: 1, name: 'Jogador', position: 0, score: 0, answers: [] }
      ],
      gameFinished: false,
      questions: gameQuestions, // Store the 5 questions for the session
      currentQuestionIndex: 0, // Track which question to show next
      completedTopics: [],
    };
  };

  const [gameData, setGameData] = useState(createInitialGameState());

  const menuItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'select', label: 'Tipos de Bullying', icon: List },
    { id: 'board', label: 'Tabuleiro', icon: GamepadIcon },
    { id: 'score', label: 'Score', icon: Trophy }
  ];

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  const updateGameData = (data) => {
    setGameData(prev => ({ ...prev, ...data }));
  };

  const resetGame = () => {
    setGameData(createInitialGameState());
    setCurrentPage('board'); // Go back to board after reset
  };

  return (
    <>
      <Helmet>
        <title>Jornada do Respeito - Jogo Educativo sobre Bullying</title>
        <meta name="description" content="Jogo educativo interativo para identificar e prevenir situações de bullying nas escolas. Aprenda sobre as causas, consequências e como combater o bullying." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Menu Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="fixed top-6 left-6 z-50 p-3 rounded-full glass-effect hover:bg-white/20 transition-all shadow-lg"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>

        {/* Sidebar Menu */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'spring', damping: 25 }}
                className="fixed left-0 top-0 h-full w-80 glass-effect z-50 shadow-2xl border-r border-white/20"
              >
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-8 text-shadow bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                    Menu
                  </h2>
                  <nav className="space-y-4">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.id}
                          whileHover={{ scale: 1.05, x: 10 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleNavigate(item.id)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                            currentPage === item.id
                              ? 'bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg'
                              : 'hover:bg-white/10'
                          }`}
                        >
                          <Icon size={24} />
                          <span className="text-lg font-semibold">{item.label}</span>
                        </motion.button>
                      );
                    })}
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <HomePage key="home" onNavigate={handleNavigate} />
            )}
            {currentPage === 'select' && (
              <SelectPage key="select" gameData={gameData} updateGameData={updateGameData} />
            )}
            {currentPage === 'board' && (
              <BoardPage key="board" gameData={gameData} updateGameData={updateGameData} onNavigate={handleNavigate} resetGame={resetGame} />
            )}
            {currentPage === 'score' && (
              <ScorePage key="score" gameData={gameData} onNavigate={handleNavigate} resetGame={resetGame} />
            )}
          </AnimatePresence>
        </div>

        <Toaster />
      </div>
    </>
  );
}

export default App;
