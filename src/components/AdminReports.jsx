
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileJson, FileText, FileSpreadsheet, Trash2, LogOut, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getReports, deleteReport, exportToJSON, exportToCSV, exportToPDF } from '@/lib/storage';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminReports = ({ onLogout }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedReports, setExpandedReports] = useState(new Set());

  const toggleReport = (id) => {
    const newExpanded = new Set(expandedReports);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedReports(newExpanded);
  };

  useEffect(() => {
    // Verificar autenticação
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth !== 'true') {
      onLogout();
      return;
    }

    loadReports();
  }, [onLogout]);

  const loadReports = () => {
    setLoading(true);
    const allReports = getReports();
    // Ordenar por data (mais recente primeiro)
    allReports.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setReports(allReports);
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    onLogout();
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir este relatório?')) {
      deleteReport(id);
      loadReports();
    }
  };

  const handleExportJSON = (report) => {
    exportToJSON(report);
  };

  const handleExportCSV = (report) => {
    exportToCSV(report);
  };

  const handleExportPDF = (report) => {
    exportToPDF(report);
  };

  const handleExportAllJSON = () => {
    const dataStr = JSON.stringify(reports, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-relatorios-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8 pt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white">Carregando relatórios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-8 pt-20 sm:pt-24 pb-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 text-shadow">
                <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  📊 Relatórios do Sistema
                </span>
              </h1>
              <p className="text-white/90 text-sm sm:text-base">
                Total de relatórios: <span className="font-semibold text-yellow-300">{reports.length}</span>
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                onClick={loadReports}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Atualizar</span>
              </Button>
              <Button
                onClick={handleLogout}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Estatísticas Gerais */}
        {reports.length > 0 && (
          <div className="glass-effect rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-white/20">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 text-shadow">
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                📊 Estatísticas Gerais
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 mb-4 sm:mb-6">
              {['agressor', 'vitima', 'vitima-agressora', 'vitima-agressora-ciclica', 'espectador', 'interventor'].map((profile) => {
                const total = reports.reduce((sum, r) => sum + (r.profileCounts[profile] || 0), 0);
                const avg = reports.length > 0 ? (total / reports.length).toFixed(1) : '0';
                const labels = {
                  agressor: 'Agressor',
                  vitima: 'Vítima',
                  'vitima-agressora': 'Vítima-Agressora',
                  'vitima-agressora-ciclica': 'Vítima-Agressora',
                  espectador: 'Espectador',
                  interventor: 'Interventor',
                };
                return (
                  <div key={profile} className="glass-effect p-2 sm:p-4 rounded-lg border border-white/10">
                    <div className="text-xs sm:text-sm text-white/80">{labels[profile]}</div>
                    <div className="text-xl sm:text-2xl font-bold text-yellow-300">{avg}</div>
                    <div className="text-xs text-white/60 hidden sm:block">média por jogo</div>
                  </div>
                );
              })}
            </div>
            
            {/* Gráfico de distribuição geral */}
            <div className="mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white text-shadow">Distribuição de Perfis (Todos os Jogos)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  {
                    name: 'Agressor',
                    total: reports.reduce((sum, r) => sum + (r.profileCounts.agressor || 0), 0),
                  },
                  {
                    name: 'Vítima',
                    total: reports.reduce((sum, r) => sum + (r.profileCounts.vitima || 0), 0),
                  },
                  {
                    name: 'Vítima-Agressora',
                    total: reports.reduce((sum, r) => sum + (r.profileCounts['vitima-agressora'] || 0), 0),
                  },
                  {
                    name: 'Vítima-Agressora',
                    total: reports.reduce((sum, r) => sum + (r.profileCounts['vitima-agressora-ciclica'] || 0), 0),
                  },
                  {
                    name: 'Espectador',
                    total: reports.reduce((sum, r) => sum + (r.profileCounts.espectador || 0), 0),
                  },
                  {
                    name: 'Interventor',
                    total: reports.reduce((sum, r) => sum + (r.profileCounts.interventor || 0), 0),
                  },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#7c3aed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Botão para exportar todos */}
        {reports.length > 0 && (
          <div className="glass-effect rounded-xl shadow-lg p-3 sm:p-4 mb-4 sm:mb-6 border-2 border-white/20">
            <Button
              onClick={handleExportAllJSON}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Exportar Todos os Relatórios (JSON)</span>
              <span className="sm:hidden">Exportar Todos</span>
            </Button>
          </div>
        )}

        {/* Lista de Relatórios */}
        {reports.length === 0 ? (
          <div className="glass-effect rounded-xl shadow-lg p-8 sm:p-12 text-center border-2 border-white/20">
            <p className="text-base sm:text-xl text-white/90 mb-3 sm:mb-4">Nenhum relatório encontrado</p>
            <p className="text-white/70 text-sm sm:text-base">Os relatórios aparecerão aqui quando os jogadores completarem o jogo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {reports.map((report) => {
              const isExpanded = expandedReports.has(report.id);
              const total = Object.values(report.profileCounts).reduce((a, b) => a + b, 0);
              
              const chartData = [
                { name: 'Agressor', value: report.profileCounts.agressor || 0, percentage: parseFloat(report.percentages.agressor || 0) },
                { name: 'Vítima', value: report.profileCounts.vitima || 0, percentage: parseFloat(report.percentages.vitima || 0) },
                { name: 'Vítima-Agressora', value: report.profileCounts['vitima-agressora'] || 0, percentage: parseFloat(report.percentages['vitima-agressora'] || 0) },
                { name: 'Vítima-Agressora', value: report.profileCounts['vitima-agressora-ciclica'] || 0, percentage: parseFloat(report.percentages['vitima-agressora-ciclica'] || 0) },
                { name: 'Espectador', value: report.profileCounts.espectador || 0, percentage: parseFloat(report.percentages.espectador || 0) },
                { name: 'Interventor', value: report.profileCounts.interventor || 0, percentage: parseFloat(report.percentages.interventor || 0) },
              ];
              
              const COLORS = ['#EF4444', '#F59E0B', '#EAB308', '#F97316', '#6B7280', '#10B981'];
              
              return (
                <div key={report.id} className="glass-effect rounded-xl shadow-lg p-4 sm:p-6 border-2 border-white/20">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-3 sm:gap-0 mb-3 sm:mb-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 text-shadow truncate">
                        {report.playerName}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70">
                        {new Date(report.date).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => toggleReport(report.id)}
                        className="p-2 text-yellow-300 hover:bg-white/10 rounded-full transition-all glass-effect border border-white/10"
                        title={isExpanded ? "Recolher detalhes" : "Expandir detalhes"}
                      >
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                      <button
                        onClick={() => handleDelete(report.id)}
                        className="p-2 text-red-300 hover:bg-red-500/20 rounded-full transition-all glass-effect border border-white/10"
                        title="Excluir relatório"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Resumo Compacto */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="glass-effect p-2 sm:p-3 rounded-lg border border-white/10 bg-red-500/10">
                      <div className="text-xs sm:text-sm text-white/80">Agressor</div>
                      <div className="text-sm sm:text-lg font-bold text-red-300">
                        {report.profileCounts.agressor || 0} ({report.percentages.agressor || 0}%)
                      </div>
                    </div>
                    <div className="glass-effect p-2 sm:p-3 rounded-lg border border-white/10 bg-orange-500/10">
                      <div className="text-xs sm:text-sm text-white/80">Vítima</div>
                      <div className="text-sm sm:text-lg font-bold text-orange-300">
                        {report.profileCounts.vitima || 0} ({report.percentages.vitima || 0}%)
                      </div>
                    </div>
                    <div className="glass-effect p-2 sm:p-3 rounded-lg border border-white/10 bg-yellow-500/10">
                      <div className="text-xs sm:text-sm text-white/80">Vítima-Agressora</div>
                      <div className="text-sm sm:text-lg font-bold text-yellow-300">
                        {report.profileCounts['vitima-agressora'] || 0} ({report.percentages['vitima-agressora'] || 0}%)
                      </div>
                    </div>
                    <div className="glass-effect p-2 sm:p-3 rounded-lg border border-white/10 bg-orange-600/10">
                      <div className="text-xs sm:text-sm text-white/80">Vítima-Agressora</div>
                      <div className="text-sm sm:text-lg font-bold text-orange-400">
                        {report.profileCounts['vitima-agressora-ciclica'] || 0} ({report.percentages['vitima-agressora-ciclica'] || 0}%)
                      </div>
                    </div>
                    <div className="glass-effect p-2 sm:p-3 rounded-lg border border-white/10 bg-gray-500/10">
                      <div className="text-xs sm:text-sm text-white/80">Espectador</div>
                      <div className="text-sm sm:text-lg font-bold text-gray-300">
                        {report.profileCounts.espectador || 0} ({report.percentages.espectador || 0}%)
                      </div>
                    </div>
                    <div className="glass-effect p-2 sm:p-3 rounded-lg border border-white/10 bg-green-500/10">
                      <div className="text-xs sm:text-sm text-white/80">Interventor</div>
                      <div className="text-sm sm:text-lg font-bold text-green-300">
                        {report.profileCounts.interventor || 0} ({report.percentages.interventor || 0}%)
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 sm:mb-4">
                    <div className="text-xs sm:text-sm text-white/80 mb-1">Perfil Dominante:</div>
                    <div className="font-semibold text-yellow-300 text-sm sm:text-lg">{report.diagnosis?.perfilDominante || 'Não identificado'}</div>
                  </div>

                  {/* Detalhes Expandidos */}
                  {isExpanded && (
                    <div className="border-t-2 border-white/20 pt-4 sm:pt-6 mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                      {/* Gráficos */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {/* Gráfico de Barras */}
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white text-shadow">Distribuição de Perfis</h4>
                          <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="value" fill="#7c3aed" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Gráfico de Pizza */}
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white text-shadow">Percentual de Perfis</h4>
                          <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Análise Completa */}
                      {report.diagnosis && (
                        <div className="glass-effect rounded-lg p-4 sm:p-6 border border-white/10">
                          <h4 className="text-base sm:text-lg font-semibold mb-3 text-white text-shadow">📋 Análise Completa</h4>
                          <p className="text-white/90 leading-relaxed mb-4 text-sm sm:text-base">{report.diagnosis.analise}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                            <div>
                              <h5 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">💡 Dicas de Convivência Saudável</h5>
                              <ul className="space-y-2">
                                {report.diagnosis.dicas?.map((dica, idx) => (
                                  <li key={idx} className="text-xs sm:text-sm text-white/90 flex items-start">
                                    <span className="mr-2 flex-shrink-0">✓</span>
                                    <span>{dica}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-blue-300 mb-2 text-sm sm:text-base">📚 Recomendações</h5>
                              <ul className="space-y-2">
                                {report.diagnosis.recomendacoes?.map((rec, idx) => (
                                  <li key={idx} className="text-xs sm:text-sm text-white/90 flex items-start">
                                    <span className="mr-2 flex-shrink-0">→</span>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Estatísticas Detalhadas */}
                      <div className="glass-effect rounded-lg p-3 sm:p-4 border border-white/10">
                        <h4 className="text-base sm:text-lg font-semibold mb-3 text-white text-shadow">📊 Estatísticas Detalhadas</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                          <div>
                            <span className="text-white/80">Total de Respostas:</span>
                            <span className="font-bold text-yellow-300 ml-2">{total}</span>
                          </div>
                          <div>
                            <span className="text-white/80">Perfil Mais Escolhido:</span>
                            <span className="font-bold text-yellow-300 ml-2">{report.diagnosis?.perfilDominante || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-white/80">Data do Jogo:</span>
                            <span className="font-bold text-yellow-300 ml-2">
                              {new Date(report.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Botões de Exportação */}
                  <div className="flex gap-2 flex-wrap mt-3 sm:mt-4">
                    <Button
                      onClick={() => handleExportJSON(report)}
                      className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full shadow-lg transition-all text-xs sm:text-sm flex-1 sm:flex-none"
                    >
                      <FileJson size={14} />
                      JSON
                    </Button>
                    <Button
                      onClick={() => handleExportCSV(report)}
                      className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full shadow-lg transition-all text-xs sm:text-sm flex-1 sm:flex-none"
                    >
                      <FileSpreadsheet size={14} />
                      CSV
                    </Button>
                    <Button
                      onClick={() => handleExportPDF(report)}
                      className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full shadow-lg transition-all text-xs sm:text-sm flex-1 sm:flex-none"
                    >
                      <FileText size={14} />
                      PDF
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReports;

