
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap } from 'lucide-react';
import { getBullyingTypeName, getBullyingTypeIcon } from '@/utils/gameUtils';

const QuestionModal = ({ question, onAnswer }) => {
  const [selectedAlternative, setSelectedAlternative] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelectAlternative = (alternative) => {
    setSelectedAlternative(alternative);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    if (selectedAlternative) {
      onAnswer(selectedAlternative.perfil);
    }
  };

  const getBullyingTypeColor = (type) => {
    const colors = {
      fisico: 'bg-red-100 border-red-500 text-red-800',
      verbal: 'bg-orange-100 border-orange-500 text-orange-800',
      relacional: 'bg-purple-100 border-purple-500 text-purple-800',
      virtual: 'bg-blue-100 border-blue-500 text-blue-800',
      preconceito: 'bg-red-200 border-red-600 text-red-900',
    };
    return colors[type] || 'bg-gray-100';
  };

  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border-2 border-white/20"
      >
        {/* Header com decoração escolar */}
        <div className="sticky top-0 glass-effect border-b-2 border-white/20 p-3 sm:p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="text-2xl sm:text-3xl flex-shrink-0">{getBullyingTypeIcon(question.tipoBullying)}</div>
            <div className="min-w-0">
              <div className="text-xs opacity-90 text-white/70">Tipo de Bullying</div>
              <div className="text-sm sm:text-lg font-bold text-white truncate">{getBullyingTypeName(question.tipoBullying)}</div>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl flex-shrink-0 ml-2">📚</div>
        </div>

        <div className="p-3 sm:p-4 md:p-6">
          {/* Título da situação */}
          <div className="mb-4 sm:mb-6 glass-effect rounded-xl p-3 sm:p-4 border border-white/10">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="text-2xl sm:text-4xl flex-shrink-0">💭</div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-xl font-bold text-white mb-2 flex items-center gap-2 text-shadow">
                  <BookOpen size={20} className="text-yellow-300 flex-shrink-0" />
                  Situação
                </h2>
                <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
                  {question.situacao}
                </p>
              </div>
            </div>
          </div>

          {!showFeedback ? (
            <div className="space-y-2 sm:space-y-3">
              <div className="text-xs sm:text-sm font-semibold text-white/90 mb-2 sm:mb-3 flex items-center gap-2">
                <GraduationCap size={16} />
                Escolha uma alternativa:
              </div>
              {question.alternativas.map((alt) => (
                <button
                  key={alt.id}
                  onClick={() => handleSelectAlternative(alt)}
                  className="w-full text-left p-3 sm:p-4 glass-effect border-2 border-white/20 rounded-lg sm:rounded-xl hover:border-yellow-400 hover:bg-white/10 transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="font-bold text-yellow-300 text-base sm:text-xl glass-effect rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-white/20 flex-shrink-0">
                      {alt.id.toUpperCase()}
                    </span>
                    <span className="text-white/90 text-sm sm:text-base flex-1">{alt.texto}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`p-6 rounded-xl border-2 shadow-lg ${
                  selectedAlternative?.correta
                    ? 'glass-effect border-green-400/50 bg-green-500/10'
                    : 'glass-effect border-red-400/50 bg-red-500/10'
                }`}
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">
                    {selectedAlternative?.correta ? '✅' : '❌'}
                  </span>
                  <div>
                    <span className="font-bold text-xl block text-white text-shadow">
                      {selectedAlternative?.correta
                        ? 'Resposta Correta!'
                        : 'Resposta Incorreta'}
                    </span>
                    <span className="text-sm text-white/80">
                      {selectedAlternative?.correta
                        ? 'Parabéns! Você escolheu a melhor ação.'
                        : 'Vamos aprender com essa situação.'}
                    </span>
                  </div>
                </div>
                
                <div className="glass-effect rounded-lg p-4 mt-4 border border-white/10">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-2xl">💡</span>
                    <strong className="text-white">Explicação:</strong>
                  </div>
                  <p className="text-white/90 leading-relaxed">
                    {selectedAlternative?.explicacao}
                  </p>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full hover:from-pink-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg"
              >
                <span>🎮</span>
                Continuar Jogo
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuestionModal;
