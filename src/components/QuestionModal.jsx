
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QuestionModal = ({ question, onAnswer, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (option) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);

    // Automatically proceed after showing the result for a bit
    setTimeout(() => {
        onAnswer(option.correct);
    }, 2000);
  };

  const handleContinue = () => {
    // This button is now only a fallback, main logic is automatic
    onAnswer(selectedOption.correct);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-3xl p-8 max-w-2xl w-full shadow-2xl border-2 border-white/20 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-black text-white">
            ❓ Pergunta Desafio!
          </h2>
        </div>

        <div className="mb-8">
          <p className="text-xl text-white/90 leading-relaxed">
            {question.question}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option;
            const showCorrect = showResult && option.correct;
            const showWrong = showResult && isSelected && !option.correct;

            return (
              <motion.button
                key={index}
                whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                onClick={() => handleOptionClick(option)}
                disabled={showResult}
                className={`
                  w-full p-6 rounded-2xl text-left transition-all border-2 cursor-pointer
                  ${!showResult ? 'hover:bg-white/10 border-white/20' : 'cursor-default'}
                  ${showCorrect ? 'bg-green-500/30 border-green-400' : ''}
                  ${showWrong ? 'bg-red-500/30 border-red-400' : ''}
                  ${isSelected && !showResult ? 'bg-white/20 border-white/40' : ''}
                  ${!isSelected && !showResult ? 'bg-white/5 border-white/10' : ''}
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold
                    ${showCorrect ? 'bg-green-500' : showWrong ? 'bg-red-500' : 'bg-white/20'}
                  `}>
                    {showCorrect ? <CheckCircle size={20} /> : showWrong ? <XCircle size={20} /> : String.fromCharCode(65 + index)}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-white font-medium">
                      {option.text}
                    </p>
                    {showResult && isSelected && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-3 text-sm ${option.correct ? 'text-green-200' : 'text-red-200'}`}
                      >
                        {option.explanation}
                      </motion.p>
                    )}
                     {showResult && !isSelected && option.correct && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 text-sm text-green-200"
                      >
                        Esta era a resposta correta.
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-white/70">Avançando em breve...</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default QuestionModal;
