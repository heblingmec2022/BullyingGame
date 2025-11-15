
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'; // Mude em produção!

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Verificar se já está autenticado
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      onLogin();
    }
  }, [onLogin]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authenticated', 'true');
      onLogin();
    } else {
      setError('Senha incorreta. Acesso negado.');
      setPassword('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-8 pt-20 sm:pt-24 pb-4"
    >
      <div className="glass-effect rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-md w-full border-2 border-white/20">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full mb-3 sm:mb-4">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 text-shadow">
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Área Administrativa
            </span>
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Acesso restrito para administradores
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-white/90 mb-2">
              Senha de Administrador
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 glass-effect border-2 border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-base sm:text-lg text-white placeholder-white/50 bg-white/5"
              placeholder="Digite a senha..."
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="glass-effect border-2 border-red-400/50 text-red-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm bg-red-500/10">
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <LogIn size={18} />
            Entrar
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="text-sm text-white/70 hover:text-yellow-300 transition-colors"
          >
            ← Voltar ao jogo
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminLogin;

