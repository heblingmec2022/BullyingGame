
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bullyingTypes } from '@/data/bullyingTypes';
import BullyingDetail from '@/components/BullyingDetail';

const SelectPage = ({ gameData, updateGameData }) => {
  const [selectedType, setSelectedType] = useState(null);

  // Safely access completedTopics with a fallback to an empty array
  const completedTopics = gameData?.completedTopics || [];

  const handleTypeClick = (type) => {
    setSelectedType(type);
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
      className="min-h-screen p-4 md:p-8 pt-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-shadow">
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              20 Tipos de Bullying
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Clique em cada tipo para aprender sobre causas, consequências e como prevenir! 🎓
          </p>
          <div className="mt-4 text-lg">
            <span className="glass-effect px-6 py-3 rounded-full inline-block">
              📖 Tópicos estudados: {completedTopics.length}/20
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className={`w-full h-full p-6 rounded-2xl shadow-2xl bg-gradient-to-br ${type.color} hover:shadow-3xl transition-all relative overflow-hidden group`}
                  variant="ghost"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all" />
                  
                  {isCompleted && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="text-green-300" size={28} />
                    </div>
                  )}

                  <div className="relative z-10 text-left space-y-4">
                    <div className="text-6xl mb-3">{type.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-white/70 mb-1">
                        Tipo {type.id}
                      </div>
                      <h3 className="text-xl font-black text-white text-shadow">
                        {type.title}
                      </h3>
                    </div>
                    <div className="text-white/90 text-sm">
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
