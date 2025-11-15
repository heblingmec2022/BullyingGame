/**
 * main.jsx - Ponto de Entrada da Aplicação
 * 
 * Este arquivo é o primeiro a ser executado quando a aplicação React é carregada.
 * Ele renderiza o componente App dentro do elemento root do HTML.
 * 
 * Fluxo de inicialização:
 * 1. Importa React e ReactDOM
 * 2. Importa o componente principal App
 * 3. Importa os estilos globais (index.css)
 * 4. Cria a raiz React e renderiza o App
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

// Cria a raiz React e renderiza o componente App
// O elemento 'root' está definido no index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
