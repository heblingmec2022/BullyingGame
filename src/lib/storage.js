/**
 * storage.js - Utilitário de Armazenamento Local
 * 
 * Este módulo gerencia o armazenamento de relatórios do jogo usando localStorage do navegador.
 * 
 * IMPORTANTE: Em produção, este sistema deveria ser substituído por um banco de dados real
 * (como Supabase, Firebase, ou uma API backend) para persistência adequada e segurança.
 * 
 * Funcionalidades:
 * - Salvar relatórios de jogos finalizados
 * - Recuperar todos os relatórios salvos
 * - Deletar relatórios específicos
 * - Limpar todos os relatórios
 * - Exportar relatórios em diferentes formatos (JSON, CSV, PDF)
 */

// Chave usada no localStorage para armazenar os relatórios
const STORAGE_KEY = 'bullygame_reports';

/**
 * Salva um novo relatório no localStorage
 * @param {Object} report - Objeto do relatório a ser salvo
 */
export function saveReport(report) {
  // Verifica se está em ambiente de navegador (não SSR)
  if (typeof window === 'undefined') return;
  
  // Recupera todos os relatórios existentes
  const reports = getReports();
  // Adiciona o novo relatório
  reports.push(report);
  // Salva de volta no localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

/**
 * Recupera todos os relatórios salvos do localStorage
 * @returns {Array} - Array com todos os relatórios salvos
 */
export function getReports() {
  // Verifica se está em ambiente de navegador
  if (typeof window === 'undefined') return [];
  
  // Tenta recuperar os dados do localStorage
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  // Tenta fazer o parse do JSON, retorna array vazio em caso de erro
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Deleta um relatório específico pelo ID
 * @param {string|number} id - ID do relatório a ser deletado
 */
export function deleteReport(id) {
  if (typeof window === 'undefined') return;
  
  // Recupera todos os relatórios
  const reports = getReports();
  // Filtra removendo o relatório com o ID especificado
  const filtered = reports.filter(r => r.id !== id);
  // Salva a lista atualizada
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/**
 * Limpa todos os relatórios do localStorage
 */
export function clearReports() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Exporta um relatório para arquivo JSON
 * Cria um download automático do arquivo JSON com os dados do relatório
 * @param {Object} report - Objeto do relatório a ser exportado
 */
export function exportToJSON(report) {
  // Converte o relatório para string JSON formatada (com indentação de 2 espaços)
  const dataStr = JSON.stringify(report, null, 2);
  // Cria um Blob (objeto binário) com o conteúdo JSON
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  // Cria uma URL temporária para o blob
  const url = URL.createObjectURL(dataBlob);
  // Cria um elemento <a> para trigger do download
  const link = document.createElement('a');
  link.href = url;
  // Define o nome do arquivo: relatorio-bullying-[nome]-[data].json
  link.download = `relatorio-bullying-${report.playerName}-${report.date.split('T')[0]}.json`;
  // Adiciona ao DOM, clica, remove e limpa a URL
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // Libera memória
}

/**
 * Exporta um relatório para arquivo CSV
 * Formata os dados do relatório em formato CSV compatível com Excel
 * @param {Object} report - Objeto do relatório a ser exportado
 */
export function exportToCSV(report) {
  // Calcula o total de respostas (soma de todos os perfis)
  const total = Object.values(report.profileCounts).reduce((a, b) => a + b, 0);
  
  // Estrutura os dados em linhas CSV
  const csvRows = [
    ['Relatório Educativo - Jogo de Bullying'],
    [''],
    ['Nome do Jogador', report.playerName],
    ['Data', new Date(report.date).toLocaleString('pt-BR')],
    [''],
    ['Contagem de Perfis'],
    ['Perfil', 'Quantidade', 'Percentual (%)'],
    ['Agressor', report.profileCounts.agressor, report.percentages.agressor],
    ['Vítima', report.profileCounts.vitima, report.percentages.vitima],
    ['Vítima-Agressora', report.profileCounts['vitima-agressora'], report.percentages['vitima-agressora']],
    ['Vítima-Agressora', report.profileCounts['vitima-agressora-ciclica'], report.percentages['vitima-agressora-ciclica']],
    ['Espectador', report.profileCounts.espectador, report.percentages.espectador],
    ['Interventor Positivo', report.profileCounts.interventor, report.percentages.interventor],
    [''],
    ['Diagnóstico'],
    ['Perfil Dominante', report.diagnosis.perfilDominante],
    ['Análise', report.diagnosis.analise],
    [''],
    ['Dicas de Convivência Saudável'],
    ...report.diagnosis.dicas.map(dica => ['', dica]),
    [''],
    ['Recomendações'],
    ...report.diagnosis.recomendacoes.map(rec => ['', rec]),
  ];
  
  // Converte as linhas em string CSV (cada célula entre aspas, separadas por vírgula)
  const csvContent = csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  // Cria o blob com BOM UTF-8 (\ufeff) para garantir compatibilidade com Excel
  const dataBlob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `relatorio-bullying-${report.playerName}-${report.date.split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exporta um relatório para PDF (através da função de impressão do navegador)
 * Abre uma nova janela com o relatório formatado e aciona a impressão
 * O usuário pode salvar como PDF usando a opção "Salvar como PDF" na impressora
 * @param {Object} report - Objeto do relatório a ser exportado
 */
export function exportToPDF(report) {
  // Abre uma nova janela em branco
  const printWindow = window.open('', '_blank');
  if (!printWindow) return; // Se o popup foi bloqueado, cancela
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Relatório Educativo - ${report.playerName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #333;
          }
          h1 { color: #7c3aed; }
          h2 { color: #6366f1; margin-top: 30px; }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #7c3aed;
            color: white;
          }
          .section {
            margin: 30px 0;
            padding: 20px;
            background-color: #f9fafb;
            border-radius: 8px;
          }
          .dica, .recomendacao {
            margin: 10px 0;
            padding: 10px;
            background-color: white;
            border-left: 4px solid #10b981;
          }
          .recomendacao {
            border-left-color: #3b82f6;
          }
        </style>
      </head>
      <body>
        <h1>🎓 Relatório Educativo - Jogo de Bullying</h1>
        <p><strong>Nome do Jogador:</strong> ${report.playerName}</p>
        <p><strong>Data:</strong> ${new Date(report.date).toLocaleString('pt-BR')}</p>
        
        <div class="section">
          <h2>Contagem de Perfis</h2>
          <table>
            <tr>
              <th>Perfil</th>
              <th>Quantidade</th>
              <th>Percentual (%)</th>
            </tr>
            <tr><td>Agressor</td><td>${report.profileCounts.agressor}</td><td>${report.percentages.agressor}%</td></tr>
            <tr><td>Vítima</td><td>${report.profileCounts.vitima}</td><td>${report.percentages.vitima}%</td></tr>
            <tr><td>Vítima-Agressora</td><td>${report.profileCounts['vitima-agressora']}</td><td>${report.percentages['vitima-agressora']}%</td></tr>
            <tr><td>Vítima-Agressora</td><td>${report.profileCounts['vitima-agressora-ciclica']}</td><td>${report.percentages['vitima-agressora-ciclica']}%</td></tr>
            <tr><td>Espectador</td><td>${report.profileCounts.espectador}</td><td>${report.percentages.espectador}%</td></tr>
            <tr><td>Interventor Positivo</td><td>${report.profileCounts.interventor}</td><td>${report.percentages.interventor}%</td></tr>
          </table>
        </div>
        
        <div class="section">
          <h2>Diagnóstico</h2>
          <p><strong>Perfil Dominante:</strong> ${report.diagnosis.perfilDominante}</p>
          <p>${report.diagnosis.analise}</p>
        </div>
        
        <div class="section">
          <h2>💡 Dicas de Convivência Saudável</h2>
          ${report.diagnosis.dicas.map(dica => `<div class="dica">✓ ${dica}</div>`).join('')}
        </div>
        
        <div class="section">
          <h2>📚 Recomendações</h2>
          ${report.diagnosis.recomendacoes.map(rec => `<div class="recomendacao">→ ${rec}</div>`).join('')}
        </div>
      </body>
    </html>
  `);
  
  // Fecha o documento (necessário antes de imprimir)
  printWindow.document.close();
  // Aguarda um pouco para garantir que o conteúdo foi carregado, depois aciona a impressão
  setTimeout(() => {
    printWindow.print();
  }, 250);
}

