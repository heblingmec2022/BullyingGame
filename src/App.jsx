/**
 * App.jsx - Componente Principal da Aplicação
 * 
 * Este é o componente raiz que gerencia toda a navegação e estado global do jogo educativo sobre bullying.
 * Ele controla qual página está sendo exibida e mantém os dados do jogo em um estado centralizado.
 * 
 * Funcionalidades principais:
 * - Gerenciamento de navegação entre páginas
 * - Controle de estado do jogo (jogadores, perguntas, pontuações)
 * - Menu lateral responsivo
 * - Sistema de rotas internas
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, List, Trophy, Gamepad as GamepadIcon, Shield } from 'lucide-react';
import HomePage from '@/components/HomePage';
import SelectPage from '@/components/SelectPage';
import GameStart from '@/components/GameStart';
import BoardPage from '@/components/BoardPage';
import ScorePage from '@/components/ScorePage';
import AdminLogin from '@/components/AdminLogin';
import AdminReports from '@/components/AdminReports';
import { Toaster } from '@/components/ui/toaster';

function App() {
  // Estado que controla qual página está sendo exibida atualmente
  // Valores possíveis: 'home', 'select', 'start', 'board', 'score', 'admin', 'admin-reports'
  const [currentPage, setCurrentPage] = useState('home');
  
  // Estado que controla se o menu lateral está aberto ou fechado
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * Cria o estado inicial do jogo com valores padrão
   * As perguntas são selecionadas dinamicamente durante o jogo a partir de bullying-questions.json
   * @returns {Object} - Objeto com o estado inicial do jogo
   */
  const createInitialGameState = () => {
    return {
      // Array de jogadores (atualmente suporta apenas 1 jogador)
      players: [
        { 
          id: 1, 
          name: 'Jogador', // Nome padrão, será atualizado quando o jogo começar
          position: 0, // Posição no tabuleiro (0 = início)
          score: 0, // Pontuação total
          answers: [] // Array com as respostas dadas
        }
      ],
      gameFinished: false, // Flag que indica se o jogo foi finalizado
      completedTopics: [], // Array com os IDs dos tópicos de bullying estudados
      // Contadores de perfis identificados nas respostas do jogador
      profileCounts: {
        agressor: 0, // Respostas que indicam perfil de agressor
        vitima: 0, // Respostas que indicam perfil de vítima
        'vitima-agressora': 0, // Respostas que indicam perfil de vítima-agressora
        'vitima-agressora-ciclica': 0, // Respostas que indicam perfil de vítima-agressora cíclica (presa em ciclo de violência)
        espectador: 0, // Respostas que indicam perfil de espectador
        interventor: 0, // Respostas que indicam perfil de interventor positivo
      },
    };
  };

  // Estado global que armazena todos os dados do jogo
  const [gameData, setGameData] = useState(createInitialGameState());

  // Configuração dos itens do menu lateral
  // Cada item tem um id (usado para navegação), label (texto exibido) e icon (ícone do lucide-react)
  const menuItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'select', label: 'Tipos de Bullying', icon: List },
    { id: 'board', label: 'Tabuleiro', icon: GamepadIcon },
    { id: 'score', label: 'Score', icon: Trophy },
    { id: 'admin', label: 'Admin', icon: Shield }
  ];

  /**
   * Função para navegar entre páginas
   * @param {string} page - ID da página para navegar
   */
  const handleNavigate = (page) => {
    setCurrentPage(page);
    setMenuOpen(false); // Fecha o menu ao navegar
  };

  /**
   * Atualiza os dados do jogo de forma parcial (merge com estado anterior)
   * @param {Object} data - Objeto com as propriedades a serem atualizadas
   */
  const updateGameData = (data) => {
    setGameData(prev => ({ ...prev, ...data }));
  };

  /**
   * Reseta o jogo para o estado inicial
   * Volta para a página de início do jogo
   */
  const resetGame = () => {
    setGameData(createInitialGameState());
    setCurrentPage('start'); // Volta para a tela de início do jogo
  };

  return (
    <>
      {/* Componente Helmet para gerenciar metadados da página (título, descrição para SEO) */}
      <Helmet>
        <title>Jornada do Respeito - Jogo Educativo sobre Bullying</title>
        <meta name="description" content="Jogo educativo interativo para identificar e prevenir situações de bullying nas escolas. Aprenda sobre as causas, consequências e como combater o bullying." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        {/* Padrão de fundo decorativo (SVG inline) */}
        {/* opacity-10: muito transparente para não interferir no conteúdo */}
        {/* pointer-events-none: permite cliques passarem através */}
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Botão do menu hambúrguer (fixo no canto superior esquerdo) */}
        {/* Alterna entre ícone de menu (☰) e X quando aberto */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="fixed top-3 left-3 sm:top-6 sm:left-6 z-50 p-2 sm:p-3 rounded-full glass-effect hover:bg-white/20 transition-all shadow-lg"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>

        {/* Menu lateral (sidebar) */}
        {/* AnimatePresence permite animações de entrada/saída */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Overlay escuro que cobre a tela quando o menu está aberto */}
              {/* Ao clicar, fecha o menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              />
              {/* Painel do menu lateral */}
              {/* Animação de deslizar da esquerda */}
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'spring', damping: 25 }}
                className="fixed left-0 top-0 h-full w-72 sm:w-80 glass-effect z-50 shadow-2xl border-r border-white/20"
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-shadow bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                    Menu
                  </h2>
                  <nav className="space-y-3 sm:space-y-4">
                    {/* Renderiza cada item do menu */}
                    {menuItems.map((item) => {
                      const Icon = item.icon; // Componente de ícone do lucide-react
                      return (
                        <motion.button
                          key={item.id}
                          whileHover={{ scale: 1.05, x: 10 }} // Efeito hover: aumenta e move para direita
                          whileTap={{ scale: 0.95 }} // Efeito ao clicar: diminui levemente
                          onClick={() => handleNavigate(item.id)}
                          className={`w-full flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all ${
                            currentPage === item.id
                              ? 'bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg' // Página ativa: destaque com gradiente
                              : 'hover:bg-white/10' // Página inativa: hover sutil
                          }`}
                        >
                          <Icon size={20} className="sm:w-6 sm:h-6" />
                          <span className="text-base sm:text-lg font-semibold">{item.label}</span>
                        </motion.button>
                      );
                    })}
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Conteúdo principal da aplicação */}
        {/* AnimatePresence com mode="wait" garante que apenas uma página seja exibida por vez */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {/* Página inicial: apresentação do jogo */}
            {currentPage === 'home' && (
              <HomePage key="home" onNavigate={handleNavigate} />
            )}
            {/* Página de seleção: mostra os 20 tipos de bullying para estudo */}
            {currentPage === 'select' && (
              <SelectPage key="select" gameData={gameData} updateGameData={updateGameData} />
            )}
            {/* Página de início do jogo: coleta o nome do jogador */}
            {currentPage === 'start' && (
              <GameStart key="start" onStart={(name) => {
                // Atualiza o nome do jogador e navega para o tabuleiro
                updateGameData({ players: [{ ...gameData.players[0], name }] });
                handleNavigate('board');
              }} />
            )}
            {/* Página do tabuleiro: jogo principal */}
            {currentPage === 'board' && (
              <BoardPage key="board" gameData={gameData} updateGameData={updateGameData} onNavigate={handleNavigate} resetGame={resetGame} />
            )}
            {/* Página de pontuação: mostra resultados e diagnóstico */}
            {currentPage === 'score' && (
              <ScorePage key="score" gameData={gameData} onNavigate={handleNavigate} resetGame={resetGame} />
            )}
            {/* Página de login administrativo */}
            {currentPage === 'admin' && (
              <AdminLogin key="admin" onLogin={() => handleNavigate('admin-reports')} />
            )}
            {/* Página de relatórios administrativos */}
            {currentPage === 'admin-reports' && (
              <AdminReports key="admin-reports" onLogout={() => handleNavigate('admin')} />
            )}
          </AnimatePresence>
        </div>

        {/* Componente Toaster para exibir notificações/toasts */}
        <Toaster />
      </div>
    </>
  );
}

export default App;
