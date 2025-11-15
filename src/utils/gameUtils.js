/**
 * gameUtils.js - Utilitários do Jogo
 * 
 * Este arquivo contém funções auxiliares utilizadas no jogo do tabuleiro.
 * Inclui funções para gerenciar perguntas, dados, tabuleiro e tipos de bullying.
 */

import bullyingQuestions from '@/data/bullying-questions.json';

/**
 * Retorna uma pergunta aleatória do banco de dados
 * Evita repetir perguntas já utilizadas na sessão atual
 * @param {Array<number>} usedQuestions - Array com os IDs das perguntas já usadas
 * @returns {Object} - Objeto da pergunta selecionada
 */
export function getRandomQuestion(usedQuestions = []) {
  // Filtra perguntas que ainda não foram usadas
  const availableQuestions = bullyingQuestions.filter(
    (q) => !usedQuestions.includes(q.id)
  );

  // Se todas as perguntas foram usadas, reseta e retorna uma aleatória
  if (availableQuestions.length === 0) {
    return bullyingQuestions[Math.floor(Math.random() * bullyingQuestions.length)];
  }

  // Seleciona uma pergunta aleatória das disponíveis
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
}

/**
 * Simula o lançamento de um dado de 6 faces
 * @returns {number} - Valor entre 1 e 6
 */
export function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

/**
 * Gera as células do tabuleiro em um padrão de cobra (snake pattern)
 * O tabuleiro tem 50 casas (5 linhas x 10 colunas)
 * Cada tipo de bullying aparece 10 vezes distribuído aleatoriamente
 * 
 * Padrão visual:
 * 1 → 2 → 3 → ... → 10
 * 20 ← 19 ← 18 ← ... ← 11
 * 21 → 22 → 23 → ... → 30
 * ...
 * 
 * @returns {Array<Object>} - Array de objetos representando cada célula do tabuleiro
 */
export function generateBoardCells() {
  const cells = [];
  
  // Distribuição: 10 casas de cada tipo para totalizar 50 casas
  const distribution = [
    ...Array(10).fill('fisico'),      // 10 casas de bullying físico
    ...Array(10).fill('verbal'),      // 10 casas de bullying verbal
    ...Array(10).fill('relacional'),  // 10 casas de bullying relacional
    ...Array(10).fill('virtual'),     // 10 casas de bullying virtual
    ...Array(10).fill('preconceito'), // 10 casas de preconceito
  ];

  // Embaralha a distribuição usando algoritmo Fisher-Yates
  for (let i = distribution.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [distribution[i], distribution[j]] = [distribution[j], distribution[i]];
  }

  // Configurações do grid do tabuleiro
  const rows = 5;        // 5 linhas
  const cols = 10;       // 10 colunas
  const cellSize = 90;   // Tamanho de cada célula em pixels
  const spacing = 18;    // Espaçamento entre células
  const startX = 40;     // Posição X inicial
  const startY = 40;     // Posição Y inicial
  
  let cellNumber = 1;    // Contador do número da casa
  
  // Cria o grid em padrão de cobra (snake pattern)
  for (let row = 0; row < rows; row++) {
    // Linhas pares: esquerda para direita
    // Linhas ímpares: direita para esquerda
    const leftToRight = row % 2 === 0;
    
    if (leftToRight) {
      // Linha da esquerda para direita
      for (let col = 0; col < cols; col++) {
        const x = startX + col * (cellSize + spacing);
        const y = startY + row * (cellSize + spacing);
        
        cells.push({
          number: cellNumber,                    // Número da casa (1-50)
          type: distribution[cellNumber - 1],     // Tipo de bullying desta casa
          x,                                     // Posição X no canvas
          y,                                     // Posição Y no canvas
        });
        cellNumber++;
      }
    } else {
      // Linha da direita para esquerda (padrão de cobra)
      for (let col = cols - 1; col >= 0; col--) {
        const x = startX + col * (cellSize + spacing);
        const y = startY + row * (cellSize + spacing);
        
        cells.push({
          number: cellNumber,
          type: distribution[cellNumber - 1],
          x,
          y,
        });
        cellNumber++;
      }
    }
  }

  return cells;
}

/**
 * Retorna a cor hexadecimal associada a cada tipo de bullying
 * Usado para estilizar as casas do tabuleiro
 * @param {string} type - Tipo de bullying ('fisico', 'verbal', 'relacional', 'virtual', 'preconceito')
 * @returns {string} - Código hexadecimal da cor
 */
export function getBullyingTypeColor(type) {
  const colors = {
    fisico: '#EF4444',      // Vermelho (red-500)
    verbal: '#F59E0B',      // Laranja (orange-500)
    relacional: '#8B5CF6',  // Roxo (purple-500)
    virtual: '#3B82F6',    // Azul (blue-500)
    preconceito: '#DC2626', // Vermelho escuro (red-600) - diferenciado do físico
  };
  return colors[type] || '#6B7280'; // Cinza como fallback
}

/**
 * Retorna o nome completo de cada tipo de bullying
 * @param {string} type - Tipo de bullying
 * @returns {string} - Nome completo formatado
 */
export function getBullyingTypeName(type) {
  const names = {
    fisico: 'Físico e Material',
    verbal: 'Verbal e Psicológico',
    relacional: 'Social/Relacional',
    virtual: 'Virtual',
    preconceito: 'Preconceito e Discriminação',
  };
  return names[type] || type; // Retorna o próprio tipo se não encontrar
}

/**
 * Retorna o emoji/ícone associado a cada tipo de bullying
 * @param {string} type - Tipo de bullying
 * @returns {string} - Emoji representativo
 */
export function getBullyingTypeIcon(type) {
  const icons = {
    fisico: '👊',      // Punho para bullying físico
    verbal: '💬',     // Balão de fala para bullying verbal
    relacional: '👥',  // Pessoas para bullying relacional
    virtual: '💻',    // Computador para bullying virtual
    preconceito: '🚫', // Proibido para preconceito
  };
  return icons[type] || '❓'; // Interrogação como fallback
}

