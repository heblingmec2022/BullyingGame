
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertCircle, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BullyingDetail = ({ type, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onBack}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-3xl p-8 max-w-4xl w-full shadow-2xl border-2 border-white/20 max-h-[90vh] overflow-y-auto"
      >
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 bg-white/10 hover:bg-white/20 text-white"
        >
          <ArrowLeft className="mr-2" size={20} />
          Voltar
        </Button>

        <div className="text-center mb-8">
          <div className="text-8xl mb-4">{type.icon}</div>
          <h1 className={`text-5xl font-black mb-4 bg-gradient-to-r ${type.color} bg-clip-text text-transparent`}>
            {type.title}
          </h1>
        </div>

        <div className="space-y-8">
          {/* Causas */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-red-500/20 rounded-2xl p-6 border-2 border-red-400/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-red-300" size={32} />
              <h2 className="text-3xl font-bold text-white">Possíveis Causas</h2>
            </div>
            <ul className="space-y-3">
              {type.causes.map((cause, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 text-white/90 text-lg"
                >
                  <span className="text-red-300 font-bold mt-1">•</span>
                  <span>{cause}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Consequências */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-orange-500/20 rounded-2xl p-6 border-2 border-orange-400/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="text-orange-300" size={32} />
              <h2 className="text-3xl font-bold text-white">Consequências</h2>
            </div>
            <ul className="space-y-3">
              {type.consequences.map((consequence, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 text-white/90 text-lg"
                >
                  <span className="text-orange-300 font-bold mt-1">•</span>
                  <span>{consequence}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Prevenção */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-green-500/20 rounded-2xl p-6 border-2 border-green-400/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-green-300" size={32} />
              <h2 className="text-3xl font-bold text-white">Como Prevenir</h2>
            </div>
            <ul className="space-y-3">
              {type.prevention.map((prevention, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 text-white/90 text-lg"
                >
                  <span className="text-green-300 font-bold mt-1">✓</span>
                  <span>{prevention}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <Button
            onClick={onBack}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-6 rounded-full shadow-xl"
          >
            Continuar
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BullyingDetail;
