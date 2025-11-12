
export const bullyingTypes = [
  {
    id: 1,
    title: 'Bullying Verbal',
    icon: '💬',
    color: 'from-red-500 to-pink-500',
    causes: [
      'Insegurança pessoal do agressor',
      'Falta de empatia e educação emocional',
      'Influência de comportamentos familiares agressivos',
      'Necessidade de se sentir superior aos outros'
    ],
    consequences: [
      'Baixa autoestima da vítima',
      'Ansiedade e depressão',
      'Isolamento social',
      'Queda no desempenho escolar',
      'Traumas psicológicos duradouros'
    ],
    prevention: [
      'Promover cultura de respeito e empatia na escola',
      'Ensinar comunicação não-violenta',
      'Criar canais seguros de denúncia',
      'Realizar workshops sobre inteligência emocional',
      'Envolver pais e responsáveis na educação sobre respeito'
    ]
  },
  {
    id: 2,
    title: 'Bullying Físico',
    icon: '👊',
    color: 'from-orange-500 to-red-600',
    causes: [
      'Exposição à violência em casa ou na mídia',
      'Falta de supervisão adequada',
      'Problemas de controle de impulsos',
      'Busca por poder e dominação'
    ],
    consequences: [
      'Lesões físicas e dor',
      'Medo constante de ir à escola',
      'Trauma físico e psicológico',
      'Desenvolvimento de comportamento agressivo como defesa',
      'Problemas de saúde mental a longo prazo'
    ],
    prevention: [
      'Implementar políticas de tolerância zero à violência',
      'Aumentar supervisão em áreas comuns',
      'Ensinar resolução pacífica de conflitos',
      'Oferecer apoio psicológico para agressores e vítimas',
      'Criar programas de mediação entre pares'
    ]
  },
  {
    id: 3,
    title: 'Cyberbullying',
    icon: '📱',
    color: 'from-blue-500 to-purple-600',
    causes: [
      'Anonimato e distância física da internet',
      'Falta de educação digital',
      'Ausência de supervisão parental online',
      'Facilidade de disseminação de conteúdo'
    ],
    consequences: [
      'Exposição pública e humilhação',
      'Invasão de privacidade',
      'Dificuldade em escapar do bullying (24/7)',
      'Risco de automutilação ou suicídio',
      'Danos permanentes à reputação online'
    ],
    prevention: [
      'Educar sobre cidadania digital responsável',
      'Ensinar a proteger informações pessoais',
      'Monitorar atividades online de forma equilibrada',
      'Criar protocolos de resposta rápida a incidentes',
      'Promover uso consciente das redes sociais'
    ]
  },
  {
    id: 4,
    title: 'Exclusão Social',
    icon: '🚫',
    color: 'from-green-500 to-teal-600',
    causes: [
      'Competição por status social',
      'Formação de grupos excludentes',
      'Falta de habilidades sociais',
      'Pressão para se conformar a padrões'
    ],
    consequences: [
      'Isolamento e solidão profunda',
      'Perda de amizades e conexões sociais',
      'Sentimento de rejeição e não-pertencimento',
      'Dificuldade em confiar nas pessoas',
      'Impacto negativo no desenvolvimento social'
    ],
    prevention: [
      'Promover atividades inclusivas',
      'Ensinar sobre diversidade e aceitação',
      'Criar grupos de apoio entre estudantes',
      'Desenvolver habilidades de empatia',
      'Valorizar a individualidade de cada aluno'
    ]
  },
  {
    id: 5,
    title: 'Assédio Moral',
    icon: '🧠',
    color: 'from-purple-500 to-indigo-600',
    causes: [
      'Manipulação e controle emocional',
      'Desejo de poder psicológico sobre outros',
      'Falta de consciência sobre o impacto emocional',
      'Comportamentos aprendidos de manipulação'
    ],
    consequences: [
      'Ansiedade crônica e estresse',
      'Depressão severa',
      'Perda de confiança em si mesmo',
      'Dificuldade em tomar decisões',
      'Desenvolvimento de transtornos mentais'
    ],
    prevention: [
      'Fortalecer a autoestima dos alunos',
      'Ensinar a reconhecer manipulação emocional',
      'Oferecer suporte psicológico acessível',
      'Criar ambiente escolar acolhedor',
      'Treinar professores para identificar sinais'
    ]
  },
  {
    id: 6,
    title: 'Difamação',
    icon: '📢',
    color: 'from-yellow-500 to-orange-600',
    causes: [
      'Inveja e competitividade negativa',
      'Desejo de prejudicar a reputação alheia',
      'Falta de ética e valores morais',
      'Busca por atenção e popularidade'
    ],
    consequences: [
      'Danos à reputação e imagem pessoal',
      'Perda de oportunidades sociais e acadêmicas',
      'Vergonha e humilhação pública',
      'Dificuldade em reconstruir confiança',
      'Impacto duradouro na vida social'
    ],
    prevention: [
      'Ensinar sobre responsabilidade nas palavras',
      'Promover cultura de verdade e honestidade',
      'Criar consequências claras para difamação',
      'Educar sobre impacto de rumores e fofocas',
      'Incentivar verificação de informações'
    ]
  },
  {
    id: 7,
    title: 'Roubo',
    icon: '💰',
    color: 'from-pink-500 to-red-600',
    causes: [
      'Diferenças socioeconômicas',
      'Falta de respeito pela propriedade alheia',
      'Desejo de humilhar através de perdas materiais',
      'Ausência de consequências para furtos'
    ],
    consequences: [
      'Perda de pertences pessoais valiosos',
      'Sentimento de insegurança constante',
      'Estresse financeiro para a família',
      'Medo de levar objetos à escola',
      'Impacto na participação escolar'
    ],
    prevention: [
      'Implementar sistema de segurança de pertences',
      'Educar sobre respeito à propriedade',
      'Criar políticas de restituição',
      'Promover valores de honestidade',
      'Oferecer armários seguros para alunos'
    ]
  },
  {
    id: 8,
    title: 'Dano à Propriedade',
    icon: '🔨',
    color: 'from-emerald-500 to-green-600',
    causes: [
      'Raiva e desejo de vingança',
      'Falta de controle emocional',
      'Ausência de empatia',
      'Influência de comportamento destrutivo'
    ],
    consequences: [
      'Perda de objetos importantes',
      'Custos financeiros para reparação',
      'Sentimento de violação e desrespeito',
      'Medo de trazer pertences pessoais',
      'Clima de insegurança na escola'
    ],
    prevention: [
      'Ensinar respeito pela propriedade alheia',
      'Implementar consequências claras',
      'Promover resolução pacífica de conflitos',
      'Oferecer canais para expressar frustração',
      'Criar ambiente de responsabilidade coletiva'
    ]
  },
  {
    id: 9,
    title: 'Intimidação',
    icon: '😠',
    color: 'from-cyan-500 to-blue-600',
    causes: [
      'Busca por poder e controle',
      'Insegurança mascarada por agressividade',
      'Falta de habilidades sociais positivas',
      'Exposição a modelos de comportamento intimidador'
    ],
    consequences: [
      'Medo constante e ansiedade',
      'Evitação de situações sociais',
      'Impacto no desempenho acadêmico',
      'Desenvolvimento de fobias',
      'Trauma psicológico duradouro'
    ],
    prevention: [
      'Criar ambiente escolar seguro',
      'Ensinar assertividade sem agressividade',
      'Implementar políticas anti-intimidação',
      'Oferecer apoio a vítimas e agressores',
      'Promover cultura de respeito mútuo'
    ]
  },
  {
    id: 10,
    title: 'Humilhação Pública',
    icon: '😳',
    color: 'from-indigo-500 to-purple-600',
    causes: [
      'Desejo de entretenimento às custas de outros',
      'Falta de empatia e sensibilidade',
      'Busca por aprovação social',
      'Normalização de comportamento humilhante'
    ],
    consequences: [
      'Vergonha profunda e constrangimento',
      'Trauma social duradouro',
      'Evitação de participação em atividades',
      'Baixa autoestima severa',
      'Risco de isolamento social'
    ],
    prevention: [
      'Ensinar sobre dignidade humana',
      'Criar cultura de respeito e privacidade',
      'Implementar consequências para humilhação',
      'Promover empatia e compaixão',
      'Oferecer suporte psicológico às vítimas'
    ]
  },
  {
    id: 11,
    title: 'Bullying por Aparência',
    icon: '👤',
    color: 'from-rose-500 to-pink-600',
    causes: [
      'Padrões de beleza irreais da mídia',
      'Pressão social para se conformar',
      'Falta de aceitação da diversidade física',
      'Insegurança projetada nos outros'
    ],
    consequences: [
      'Transtornos alimentares',
      'Baixa autoestima e autoimagem negativa',
      'Ansiedade social severa',
      'Depressão relacionada à aparência',
      'Comportamentos autodestrutivos'
    ],
    prevention: [
      'Promover aceitação corporal positiva',
      'Desconstruir padrões de beleza tóxicos',
      'Valorizar qualidades além da aparência',
      'Criar campanhas de autoaceitação',
      'Oferecer apoio psicológico especializado'
    ]
  },
  {
    id: 12,
    title: 'Bullying por Orientação Sexual',
    icon: '🏳️‍🌈',
    color: 'from-violet-500 to-fuchsia-600',
    causes: [
      'Preconceito e falta de educação sobre diversidade',
      'Influência de valores discriminatórios',
      'Medo do diferente',
      'Ausência de políticas inclusivas'
    ],
    consequences: [
      'Trauma relacionado à identidade',
      'Risco elevado de depressão e suicídio',
      'Isolamento social profundo',
      'Dificuldade em aceitar a própria identidade',
      'Impacto na saúde mental a longo prazo'
    ],
    prevention: [
      'Implementar educação sobre diversidade sexual',
      'Criar políticas de tolerância zero',
      'Promover ambiente inclusivo e seguro',
      'Oferecer grupos de apoio',
      'Treinar educadores sobre inclusão LGBTQIA+'
    ]
  },
  {
    id: 13,
    title: 'Bullying por Religião',
    icon: '🕊️',
    color: 'from-amber-500 to-yellow-600',
    causes: [
      'Intolerância religiosa',
      'Falta de educação sobre diversidade de crenças',
      'Preconceitos culturais enraizados',
      'Ausência de diálogo inter-religioso'
    ],
    consequences: [
      'Discriminação e marginalização',
      'Conflito interno sobre identidade religiosa',
      'Sentimento de não-pertencimento',
      'Trauma relacionado à fé',
      'Isolamento da comunidade escolar'
    ],
    prevention: [
      'Promover educação sobre diversidade religiosa',
      'Criar espaços de diálogo respeitoso',
      'Implementar políticas de liberdade religiosa',
      'Celebrar diferentes tradições culturais',
      'Ensinar sobre respeito às crenças alheias'
    ]
  },
  {
    id: 14,
    title: 'Bullying por Deficiência',
    icon: '♿',
    color: 'from-sky-500 to-blue-600',
    causes: [
      'Falta de educação sobre inclusão',
      'Preconceito contra pessoas com deficiência',
      'Ausência de empatia',
      'Infraestrutura não inclusiva'
    ],
    consequences: [
      'Exclusão de atividades escolares',
      'Baixa autoestima e autoconfiança',
      'Impacto no desenvolvimento pessoal',
      'Sentimento de inferioridade',
      'Barreiras adicionais à inclusão'
    ],
    prevention: [
      'Implementar educação inclusiva',
      'Adaptar infraestrutura para acessibilidade',
      'Promover convivência e respeito',
      'Criar programas de sensibilização',
      'Valorizar capacidades individuais'
    ]
  },
  {
    id: 15,
    title: 'Bullying por Etnia',
    icon: '🌍',
    color: 'from-lime-500 to-green-600',
    causes: [
      'Racismo e preconceito étnico',
      'Falta de educação antirracista',
      'Estereótipos negativos',
      'Discriminação sistêmica'
    ],
    consequences: [
      'Trauma racial profundo',
      'Impacto na formação da identidade',
      'Sentimento de inferioridade',
      'Exclusão social e acadêmica',
      'Perpetuação de desigualdades'
    ],
    prevention: [
      'Implementar educação antirracista',
      'Celebrar diversidade étnica e cultural',
      'Criar políticas de igualdade racial',
      'Promover representatividade',
      'Punir severamente atos racistas'
    ]
  },
  {
    id: 16,
    title: 'Bullying por Classe Social',
    icon: '💎',
    color: 'from-teal-500 to-cyan-600',
    causes: [
      'Desigualdade socioeconômica',
      'Preconceito de classe',
      'Valorização excessiva de bens materiais',
      'Falta de educação sobre equidade'
    ],
    consequences: [
      'Vergonha da própria condição social',
      'Exclusão de atividades por questões financeiras',
      'Baixa autoestima',
      'Sentimento de inferioridade',
      'Impacto no desempenho acadêmico'
    ],
    prevention: [
      'Promover igualdade e respeito',
      'Evitar atividades que excluam por questões financeiras',
      'Educar sobre valor humano além do material',
      'Criar ambiente inclusivo',
      'Oferecer apoio a estudantes em vulnerabilidade'
    ]
  },
  {
    id: 17,
    title: 'Bullying por Gênero',
    icon: '⚧️',
    color: 'from-fuchsia-500 to-pink-600',
    causes: [
      'Machismo e sexismo',
      'Estereótipos de gênero rígidos',
      'Falta de educação sobre igualdade de gênero',
      'Cultura patriarcal'
    ],
    consequences: [
      'Limitação de oportunidades',
      'Trauma relacionado à identidade de gênero',
      'Baixa autoestima',
      'Perpetuação de desigualdades',
      'Impacto na saúde mental'
    ],
    prevention: [
      'Implementar educação sobre igualdade de gênero',
      'Desconstruir estereótipos',
      'Criar ambiente de respeito mútuo',
      'Promover representatividade',
      'Oferecer suporte a vítimas'
    ]
  },
  {
    id: 18,
    title: 'Bullying por Peso',
    icon: '⚖️',
    color: 'from-orange-500 to-red-600',
    causes: [
      'Padrões corporais irreais',
      'Gordofobia e preconceito',
      'Falta de educação sobre diversidade corporal',
      'Influência da mídia'
    ],
    consequences: [
      'Transtornos alimentares graves',
      'Baixa autoestima severa',
      'Depressão e ansiedade',
      'Isolamento social',
      'Comportamentos autodestrutivos'
    ],
    prevention: [
      'Promover aceitação corporal',
      'Educar sobre saúde além do peso',
      'Desconstruir padrões tóxicos',
      'Criar ambiente de respeito',
      'Oferecer apoio psicológico'
    ]
  },
  {
    id: 19,
    title: 'Bullying por Desempenho Acadêmico',
    icon: '📚',
    color: 'from-blue-500 to-indigo-600',
    causes: [
      'Competitividade excessiva',
      'Pressão por resultados',
      'Falta de valorização de diferentes habilidades',
      'Comparações constantes'
    ],
    consequences: [
      'Ansiedade de desempenho',
      'Medo de falhar',
      'Baixa autoestima acadêmica',
      'Evasão escolar',
      'Impacto na saúde mental'
    ],
    prevention: [
      'Valorizar diferentes tipos de inteligência',
      'Promover aprendizado colaborativo',
      'Reduzir competitividade tóxica',
      'Oferecer apoio pedagógico',
      'Celebrar esforço além de resultados'
    ]
  },
  {
    id: 20,
    title: 'Bullying por Preferências Pessoais',
    icon: '🎨',
    color: 'from-purple-500 to-pink-600',
    causes: [
      'Intolerância à diversidade',
      'Pressão para conformidade',
      'Falta de respeito por individualidade',
      'Julgamento de gostos e interesses'
    ],
    consequences: [
      'Repressão da própria identidade',
      'Medo de expressar preferências',
      'Baixa autoestima',
      'Isolamento social',
      'Perda de autenticidade'
    ],
    prevention: [
      'Promover respeito à individualidade',
      'Celebrar diversidade de interesses',
      'Criar ambiente de aceitação',
      'Educar sobre tolerância',
      'Valorizar autenticidade'
    ]
  }
];
