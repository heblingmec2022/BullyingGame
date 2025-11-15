/**
 * SelectPage.jsx - Página de Seleção dos Tipos de Bullying
 * 
 * Componente que exibe uma grade com os 20 tipos de bullying disponíveis para estudo.
 * Cada tipo pode ser clicado para ver detalhes educativos.
 * O componente rastreia quais tópicos foram estudados (completedTopics).
 * 
 * @param {Object} gameData - Dados do jogo (inclui completedTopics)
 * @param {Function} updateGameData - Função para atualizar os dados do jogo
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bullyingTypes } from '@/data/bullyingTypes';
import BullyingDetail from '@/components/BullyingDetail';

const SelectPage = ({ gameData, updateGameData }) => {
  // Estado que armazena o tipo de bullying selecionado para visualização detalhada
  const [selectedType, setSelectedType] = useState(null);

  // Acessa os tópicos completados de forma segura (com fallback para array vazio)
  // completedTopics é um array com os IDs dos tipos de bullying já estudados
  const completedTopics = gameData?.completedTopics || [];

  /**
   * Manipula o clique em um tipo de bullying
   * Abre a visualização detalhada e marca o tópico como estudado
   * @param {Object} type - Objeto do tipo de bullying clicado
   */
  const handleTypeClick = (type) => {
    setSelectedType(type); // Define o tipo selecionado para exibir detalhes
    
    // Se o tópico ainda não foi marcado como estudado, adiciona à lista
    if (!completedTopics.includes(type.id)) {
      updateGameData({
        completedTopics: [...completedTopics, type.id]
      });
    }
  };

  if (selectedType) {
    return (
      <BullyingDetail 
        type={selectedType} 
        onBack={() => setSelectedType(null)} 
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-3 sm:p-4 md:p-8 pt-20 sm:pt-24 pb-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 text-shadow">
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              20 Tipos de Bullying
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-2">
            Clique em cada tipo para aprender sobre causas, consequências e como prevenir! 🎓
          </p>
          <div className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
            <span className="glass-effect px-4 sm:px-6 py-2 sm:py-3 rounded-full inline-block">
              📖 Tópicos estudados: {completedTopics.length}/20
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {bullyingTypes.map((type, index) => {
            const isCompleted = completedTopics.includes(type.id);
            
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => handleTypeClick(type)}
                  className={`w-full h-full p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-2xl bg-gradient-to-br ${type.color} hover:shadow-3xl transition-all relative overflow-hidden group`}
                  variant="ghost"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all" />
                  
                  {isCompleted && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="text-green-300" size={28} />
                    </div>
                  )}

                  <div className="relative z-10 text-left space-y-2 sm:space-y-4">
                    <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-3">{type.icon}</div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-white/70 mb-1">
                        Tipo {type.id}
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-white text-shadow">
                        {type.title}
                      </h3>
                    </div>
                    <div className="text-white/90 text-xs sm:text-sm">
                      Clique para aprender mais →
                    </div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default SelectPage;
