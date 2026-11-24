export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  whatsappTopic: string;
}

export const WORKSHOP_INFO = {
  name: 'HL Pneus',
  tagline: 'Precisão mecânica em cada quilômetro.',
  subheadline:
    'Pneus, alinhamento 3D e mecânica automotiva completa em Juiz de Fora, Varginha, Pouso Alegre e Divinópolis.',
  address: 'Av. Cel. Vidal, 1788 - São Dimas, Juiz de Fora - MG, 36080-080',
  shortAddress: 'Av. Cel. Vidal, 1788 · São Dimas, Juiz de Fora',
  phoneDisplay: '(32) 98707-6447',
  phoneDigits: '5532987076447',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Av.+Cel.+Vidal,+1788+-+S%C3%A3o+Dimas,+Juiz+de+Fora+-+MG,+36080-080',
  logoSrc: '/assets/aistudio/Captura_de_tela_2026-11-23_235935_87136af4.png',
  images: {
    hero: '/assets/hlpneus/hero-slide.jpg',
    alignment: '/assets/hlpneus/alinhamento-3d.jpg',
    tires: '/assets/hlpneus/pneus2.webp',
    brakes: '/assets/hlpneus/amortecedores.jpg',
    about: '/src/assets/images/sobre_equipe_oficina_1795489315452.jpg',
  },
} as const;

export interface PromotionItem {
  id: string;
  number: string;
  title: string;
  highlightPrice: string;
  details: string;
  validity: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  whatsappMessage: string;
}

export const PROMOTIONS: PromotionItem[] = [
  {
    id: 'pneus-novos',
    number: '01.',
    title: 'Pneus Novos',
    highlightPrice: 'A partir de R$ 195',
    details: 'Cobrimos a oferta da concorrência*. Consulte a medida para o seu veículo.',
    validity: 'Black November · Válido até 30/11/2026',
    imageSrc: '/assets/hlpneus/promo-1.jpeg',
    imageAlt: 'Promoção Black November HL Pneus: Pneus novos a partir de R$ 195',
    imageWidth: 1288,
    imageHeight: 1600,
    whatsappMessage:
      'Olá, HL Pneus! Vi a promoção Black November de Pneus Novos a partir de R$ 195 e quero consultar a medida do meu carro.',
  },
  {
    id: 'troca-de-oleo',
    number: '02.',
    title: 'Super Troca de Óleo',
    highlightPrice: 'A partir de R$ 159',
    details: 'Inclui 4 litros de óleo (5W30 ou 15W40) + filtro de óleo.',
    validity: 'Black November · Enquanto durarem os estoques',
    imageSrc: '/assets/hlpneus/promo-2.jpeg',
    imageAlt: 'Promoção Black November HL Pneus: Super Troca de Óleo 4L mais filtro a partir de R$ 159',
    imageWidth: 1288,
    imageHeight: 1600,
    whatsappMessage:
      'Olá, HL Pneus! Quero aproveitar a promoção Black November da Super Troca de Óleo (4L + filtro a partir de R$ 159).',
  },
  {
    id: 'pastilha-de-freio',
    number: '03.',
    title: 'Pastilha de Freio Instalada',
    highlightPrice: 'A partir de R$ 99',
    details: 'Pastilha de freio já instalada. Cobrimos a oferta da concorrência*.',
    validity: 'Black November · *Oferta comprovada',
    imageSrc: '/assets/hlpneus/promo-3.jpeg',
    imageAlt: 'Promoção Black November HL Pneus: Pastilha de freio já instalada a partir de R$ 99',
    imageWidth: 1080,
    imageHeight: 1350,
    whatsappMessage:
      'Olá, HL Pneus! Tenho interesse na promoção de Pastilha de Freio já instalada a partir de R$ 99.',
  },
  {
    id: 'revisao-automotiva',
    number: '04.',
    title: 'Revisão Automotiva Completa',
    highlightPrice: 'Condição Especial',
    details: 'Óleos em geral, motor, filtros, injeção, freios, correias, embreagem e suspensão.',
    validity: 'Black November · Cobrimos a oferta da concorrência*',
    imageSrc: '/assets/hlpneus/promo-4.jpeg',
    imageAlt: 'Promoção Black November HL Pneus: Revisão Automotiva completa',
    imageWidth: 1288,
    imageHeight: 1600,
    whatsappMessage:
      'Olá, HL Pneus! Gostaria de agendar uma Revisão Automotiva na condição Black November.',
  },
  {
    id: 'kit-embreagem',
    number: '05.',
    title: 'Kit Embreagem',
    highlightPrice: 'Preço de Fábrica',
    details: 'Kit embreagem com condição especial de fábrica para reposição completa.',
    validity: 'Black November · *Oferta comprovada',
    imageSrc: '/assets/hlpneus/promo-5.jpeg',
    imageAlt: 'Promoção Black November HL Pneus: Kit Embreagem preço de fábrica',
    imageWidth: 1288,
    imageHeight: 1600,
    whatsappMessage:
      'Olá, HL Pneus! Quero consultar o valor do Kit Embreagem com preço de fábrica para o meu veículo.',
  },
];

export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMsg =
    'Olá, equipe HL Pneus! Gostaria de solicitar um orçamento para o meu veículo.';
  const text = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${WORKSHOP_INFO.phoneDigits}?text=${text}`;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'alinhamento-3d',
    number: '01.',
    title: 'Alinhamento 3D e Balanceamento',
    summary:
      'Geometria computadorizada por leitura óptica para estabilidade direcional e desgaste uniforme dos pneus.',
    deliverables: [
      'Correção de cambagem, cáster e convergência',
      'Balanceamento computadorizado em rodas de ferro e liga leve',
      'Leitura e ajuste conforme especificações da montadora',
    ],
    whatsappTopic: 'Alinhamento 3D e Balanceamento',
  },
  {
    id: 'pneus-montagem',
    number: '02.',
    title: 'Pneus e Montagem Técnica',
    summary:
      'Orientação técnica para escolha da medida correta, montagem sem danos à roda e calibragem precisa.',
    deliverables: [
      'Montagem e desmontagem automatizada para aros variados',
      'Substituição de válvulas e verificação de estanqueidade',
      'Rodízio programado para maior vida útil da banda de rodagem',
    ],
    whatsappTopic: 'Pneus e Montagem Técnica',
  },
  {
    id: 'suspensao',
    number: '03.',
    title: 'Suspensão e Amortecedores',
    summary:
      'Inspeção completa de folgas, buchas, pivôs, bandejas e amortecedores para conforto e firmeza na direção.',
    deliverables: [
      'Troca de amortecedores, molas, kits e batentes',
      'Substituição de terminais de direção, axiais e bieletas',
      'Eliminação de ruídos e instabilidade em pisos irregulares',
    ],
    whatsappTopic: 'Suspensão e Amortecedores',
  },
  {
    id: 'freios',
    number: '04.',
    title: 'Sistema de Freios',
    summary:
      'Revisão rigorosa de pastilhas, discos, pinças e fluido hidráulico para frenagens seguras em qualquer condição.',
    deliverables: [
      'Substituição de pastilhas, lonas, discos e tambores',
      'Sangria e troca do fluido de freio com especificação DOT correta',
      'Inspeção de flexíveis, cilindros e sensores de ABS',
    ],
    whatsappTopic: 'Sistema de Freios',
  },
  {
    id: 'oleo-filtros',
    number: '05.',
    title: 'Troca de Óleo e Filtros',
    summary:
      'Lubrificantes na viscosidade exata do fabricante com substituição sincronizada dos filtros essenciais do motor.',
    deliverables: [
      'Óleos sintéticos, semissintéticos e minerais homologados',
      'Troca de filtro de óleo, ar, combustível e cabine',
      'Inspeção visual de níveis e possíveis vazamentos',
    ],
    whatsappTopic: 'Troca de Óleo e Filtros',
  },
  {
    id: 'diagnostico',
    number: '06.',
    title: 'Diagnóstico Eletrônico',
    summary:
      'Leitura de módulos por scanner automotivo para identificar falhas de injeção, ignição e sensores com exatidão.',
    deliverables: [
      'Varredura eletrônica de códigos de falha e parâmetros em tempo real',
      'Teste de bateria, alternador e sistema de carga',
      'Revisão preventiva antes de viagens ou inspeções',
    ],
    whatsappTopic: 'Diagnóstico Eletrônico',
  },
];

export const OPERATIONAL_STATS = [
  {
    value: '06',
    label: 'Especialidades Integradas',
    detail: 'Do conjunto roda-pneu à eletrônica embarcada em um só lugar.',
  },
  {
    value: '3D',
    label: 'Geometria Óptica',
    detail: 'Calibração direcional milimétrica seguindo parâmetros de fábrica.',
  },
  {
    value: '100%',
    label: 'Diagnóstico Transparente',
    detail: 'Peças e serviços detalhados antes de qualquer execução.',
  },
  {
    value: '07',
    label: 'Unidades em MG',
    detail: 'Juiz de Fora, Varginha, Pouso Alegre e Divinópolis.',
  },
] as const;

export interface BranchUnit {
  id: string;
  number: string;
  name: string;
  street: string;
  district: string;
  cityState: string;
  reference?: string;
  region: 'juiz-de-fora' | 'minas-gerais';
  fullAddress: string;
  mapsUrl: string;
  corridorLabel: string;
  mapAngleDeg: number;
}

export const BRANCH_UNITS: BranchUnit[] = [
  {
    id: 'sao-dimas',
    number: '01.',
    name: 'São Dimas',
    street: 'Avenida Cel. Vidal, 1792',
    district: 'São Dimas',
    cityState: 'Juiz de Fora – MG',
    reference: 'Próximo à Rodoviária',
    region: 'juiz-de-fora',
    fullAddress: 'Avenida Cel. Vidal, 1792 – São Dimas, Juiz de Fora – MG',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Avenida+Cel.+Vidal,+1792+-+S%C3%A3o+Dimas,+Juiz+de+Fora+-+MG',
    corridorLabel: 'AV. CEL. VIDAL',
    mapAngleDeg: -22,
  },
  {
    id: 'sao-matheus',
    number: '02.',
    name: 'São Mateus',
    street: 'Avenida Presidente Itamar Franco, 2270',
    district: 'São Mateus',
    cityState: 'Juiz de Fora – MG',
    reference: 'Próximo ao Teatro Solar',
    region: 'juiz-de-fora',
    fullAddress: 'Avenida Presidente Itamar Franco, 2270 – São Mateus, Juiz de Fora – MG',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Avenida+Presidente+Itamar+Franco,+2270+-+S%C3%A3o+Mateus,+Juiz+de+Fora+-+MG',
    corridorLabel: 'AV. PRES. ITAMAR FRANCO',
    mapAngleDeg: -15,
  },
  {
    id: 'centro-jf',
    number: '03.',
    name: 'Centro',
    street: 'Avenida Brasil, 3051',
    district: 'Centro',
    cityState: 'Juiz de Fora – MG',
    reference: 'Após o Corpo de Bombeiros',
    region: 'juiz-de-fora',
    fullAddress: 'Avenida Brasil, 3051 – Centro, Juiz de Fora – MG',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Avenida+Brasil,+3051+-+Centro,+Juiz+de+Fora+-+MG',
    corridorLabel: 'AV. BRASIL',
    mapAngleDeg: -26,
  },
  {
    id: 'graminha',
    number: '04.',
    name: 'Graminha',
    street: 'Av. Barão do Rio Branco, 5001 · CEP 36026-900',
    district: 'Graminha',
    cityState: 'Juiz de Fora – MG',
    reference: 'Dentro do Carrefour',
    region: 'juiz-de-fora',
    fullAddress: 'Av. Barão do Rio Branco, 5001 – Graminha, Juiz de Fora – MG, 36026-900',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Av.+Bar%C3%A3o+do+Rio+Branco,+5001+-+Graminha,+Juiz+de+Fora+-+MG,+36026-900',
    corridorLabel: 'AV. BARÃO DO RIO BRANCO',
    mapAngleDeg: -18,
  },
  {
    id: 'varginha',
    number: '05.',
    name: 'Varginha',
    street: 'Avenida Princesa do Sul, 44',
    district: 'Jardim Andere',
    cityState: 'Varginha – MG',
    region: 'minas-gerais',
    fullAddress: 'Avenida Princesa do Sul, 44 – Jardim Andere, Varginha – MG',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Avenida+Princesa+do+Sul,+44+-+Jardim+Andere,+Varginha+-+MG',
    corridorLabel: 'AV. PRINCESA DO SUL',
    mapAngleDeg: -20,
  },
  {
    id: 'pouso-alegre',
    number: '06.',
    name: 'Pouso Alegre',
    street: 'Avenida Antônio Mariosa, 2.150',
    district: 'Centro',
    cityState: 'Pouso Alegre – MG',
    region: 'minas-gerais',
    fullAddress: 'Avenida Antônio Mariosa, 2.150 – Centro, Pouso Alegre – MG',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Avenida+Ant%C3%B4nio+Mariosa,+2150+-+Centro,+Pouso+Alegre+-+MG',
    corridorLabel: 'AV. ANTÔNIO MARIOSA',
    mapAngleDeg: -14,
  },
  {
    id: 'divinopolis',
    number: '07.',
    name: 'Divinópolis',
    street: 'Rua Piauí, 170',
    district: 'Vila Belo Horizonte',
    cityState: 'Divinópolis – MG',
    region: 'minas-gerais',
    fullAddress: 'Rua Piauí, 170 – Vila Belo Horizonte, Divinópolis – MG',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Rua+Piau%C3%AD,+170+-+Vila+Belo+Horizonte,+Divin%C3%B3polis+-+MG',
    corridorLabel: 'RUA PIAUÍ',
    mapAngleDeg: -24,
  },
];

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'quando-trocar-pneus',
    number: '01.',
    question: 'Como saber a hora certa de trocar os pneus?',
    answer:
      'Observe o indicador TWI nos sulcos da banda de rodagem: quando a borracha atingir o limite legal de 1,6 mm, ou se houver bolhas, cortes laterais, ressecamento ou desgaste irregular nos ombros, o pneu deve ser substituído imediatamente.',
  },
  {
    id: 'alinhamento-apos-troca',
    number: '02.',
    question: 'É obrigatório fazer alinhamento 3D e balanceamento ao trocar pneus?',
    answer:
      'Sim. O balanceamento elimina vibrações no volante em velocidade e preserva rolamentos e suspensão. Já o alinhamento 3D garante que os pneus novos rodem no ângulo especificado pela montadora, evitando desgaste prematuro logo nos primeiros quilômetros.',
  },
  {
    id: 'rodizio-calibragem',
    number: '03.',
    question: 'Com que frequência devo fazer rodízio e calibragem?',
    answer:
      'A calibragem deve ser conferida a cada 15 dias — ou antes de pegar estrada — sempre com os pneus frios, seguindo a pressão indicada no manual ou na coluna da porta. O rodízio é recomendado preventivamente conforme o padrão de desgaste entre os eixos dianteiro e traseiro.',
  },
  {
    id: 'revisao-preventiva',
    number: '04.',
    question: 'O que é verificado em uma revisão preventiva completa?',
    answer:
      'A revisão analisa itens essenciais de segurança e desempenho: óleo e filtros, nível e estado do fluido de freio, pastilhas e discos, componentes da suspensão, sistema de arrefecimento, bateria, correias e leitura eletrônica por scanner.',
  },
  {
    id: 'sinais-suspensao-freios',
    number: '05.',
    question: 'Quais sinais indicam problema na suspensão ou nos freios?',
    answer:
      'Volante puxando para um lado, batidas secas ao passar em irregularidades, trepidação ao frear, chiado metálico nas rodas ou aumento na distância de frenagem são alertas claros para inspeção imediata no elevador.',
  },
  {
    id: 'orcamento-medida-pneu',
    number: '06.',
    question: 'Como solicitar orçamento de pneus ou revisão pelo WhatsApp?',
    answer:
      'Basta informar o modelo e ano do veículo e, no caso de pneus, a medida gravada na lateral (por exemplo, 205/55 R16). Nossa equipe verifica disponibilidade e passa as opções diretamente pelo WhatsApp.',
  },
];

