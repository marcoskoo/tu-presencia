// Dicionário português — deve corresponder exatamente à estrutura de `es` (Dict).
import type { Dict } from './es'

export const pt: Dict = {
  langName: 'Português',
  locale: 'pt-BR',

  common: {
    close: 'Fechar',
    closeDialog: 'Fechar a ferramenta e voltar',
    cancel: 'Cancelar',
    save: 'Salvar',
    saved: 'Salvo',
    remove: 'Excluir',
    download: 'Baixar',
    copy: 'Copiar',
    copied: 'Copiado',
    reset: 'Reiniciar',
    pause: 'Pausar',
    play: 'Reproduzir',
    stop: 'Parar',
    continue: 'Continuar',
    begin: 'Começar',
    finish: 'Concluído',
    minutes: 'minutos',
    min: 'min',
    sec: 's',
    back: 'Voltar',
    openGuide: 'Abrir o guia',
    practiceNow: 'Praticar agora',
    premium: 'Presença+',
    loading: 'Carregando…',
  },

  nav: {
    practices: 'Práticas',
    breathing: 'Respiração',
    meditations: 'Meditações',
    sanctuary: 'Santuário',
    topics: 'Temas',
    traditions: 'Tradições',
    community: 'Comunidade',
    premium: 'Presença+',
    breatheNow: 'Respirar agora',
    pause3: 'Pausa de 3 min',
    language: 'Idioma',
    languageShort: 'PT',
    installApp: 'Instalar o app',
    menuOpen: 'Abrir menu de navegação',
    themeLight: 'Ativar modo amanhecer',
    themeDark: 'Ativar modo noite',
    home: 'Presença AQUI e AGORA · início',
    brandTagline: 'espaço de consciência',
    mobileNav: 'Navegação móvel',
    mainNav: 'Navegação principal',
  },

  hero: {
    ariaLabel: 'Boas-vindas',
    badge: 'Espírito · Prática · Comunidade',
    titleA: 'A vida acontece',
    titleHere: 'AQUI',
    titleAnd: 'e',
    titleNow: 'AGORA',
    subtitle:
      'Um espaço aberto para compartilhar e cultivar a espiritualidade no dia a dia: meditação, prática da presença consciente e respiração consciente para voltar, instante a instante, ao único lugar onde a vida realmente acontece.',
    ctaPrimary: 'Respirar agora',
    ctaSecondary: 'Explorar as práticas',
    chips: [
      'Meditações guiadas',
      'Presença consciente',
      'Respiração',
      'Áudio com sinos',
      'Silêncio',
      'Gratidão',
    ],
    chipsLabel: 'Temas do espaço',
  },

  practices: {
    eyebrow: 'Os três portões',
    titleA: 'Caminhos para o',
    titleB: 'presente',
    description:
      'Não é preciso se recolher a uma montanha. Estas três práticas são cultivadas aqui, entre o café da manhã e o barulho do mundo, para lembrar o que você nunca deixou de ser.',
    discoverAll: 'Descobrir todos os temas',
    cards: [
      {
        title: 'Meditação',
        subtitle: '',
        description:
          'A arte de aquietar a mente e habitar o silêncio que você já é. Guias passo a passo para assentar a atenção, sem exigências nem pressa.',
        points: [
          'Postura e ancoragem corporal',
          'Atenção à respiração',
          'Retorno amável ao presente',
        ],
        quote: '«Aprenda a ficar quieto e descubra quem você é no silêncio.»',
      },
      {
        title: 'Presença consciente',
        subtitle: 'AQUI e AGORA',
        description:
          'Despertar do piloto automático. A prática de notar este instante enquanto acontece: os sons, o corpo, a vida como ela é.',
        points: [
          'Observação sem julgamento',
          'Desapego do ruído mental',
          'Presença no cotidiano',
        ],
        quote:
          '«O presente é o único tempo que existe. Todo o resto é lembrança ou imaginação.»',
      },
      {
        title: 'Respiração consciente',
        subtitle: '',
        description:
          'A ponte mais direta entre corpo e mente. Técnicas guiadas de respiração para acalmar, centrar e trazer você de volta para casa a qualquer momento.',
        points: [
          'Respiração quadrada',
          'Respiração coerente',
          'Sopro relaxante 4·7·8',
        ],
        quote:
          '«Para onde vai a respiração, vai a atenção. Para onde vai a atenção, vai a vida.»',
      },
    ],
  },

  breathing: {
    eyebrow: 'Prática guiada ao vivo',
    titleA: 'Respire',
    titleB: 'comigo',
    description:
      'Escolha uma técnica, sente-se confortavelmente e deixe o círculo guiar seu alento: quando cresce, inspire; quando se sustenta, retenha; quando retorna, expire.',
    chooseTechnique: 'Escolha uma técnica de respiração',
    startQuestion: 'Começamos?',
    pausedSession: 'Sessão em pausa',
    phaseLive: (phase: string, secs: number) => `${phase}, restam ${secs} segundos`,
    controls: {
      start: 'Começar',
      pause: 'Pausar a prática',
      begin: 'Começar a prática',
      restart: 'Reiniciar a sessão',
      soundOn: 'Ativar o sinal sonoro de fase',
      soundOff: 'Desativar o sinal sonoro de fase',
      paused: 'Pausar',
      goOn: 'Continuar',
    },
    soundHint:
      'O sininho toca a cada mudança de fase para guiar você de olhos fechados.',
    stats: {
      cycles: 'Ciclos completos',
      time: 'Tempo em prática',
      cycleOf: 'Ciclo de',
    },
    benefitsLabel: 'Benefícios da respiração consciente',
    benefits: [
      'Equilibra o ritmo do coração',
      'Reduz o estresse e a ansiedade',
      'Prepara um sono profundo',
      'Traz clareza e centrar',
    ],
    techniques: {
      caja: {
        name: 'Respiração quadrada',
        description:
          'Quatro fases iguais que desenham um quadrado com seu alento. Equilibra o sistema nervoso e afia a atenção. Ideal para o dia a dia.',
        phases: ['Inspire', 'Sustente', 'Expire', 'Pausa'],
      },
      coherente: {
        name: 'Respiração coerente',
        description:
          'Cinco respirações por minuto sincronizam coração e mente. A prática favorita para recuperar a calma em minutos.',
        phases: ['Inspire', 'Expire'],
      },
      relajante: {
        name: 'Respiração 4 · 7 · 8',
        description:
          'O sopro tranquilizante: inspire suave, sustente e expire longo. Perfeita para soltar tensões antes de dormir.',
        phases: ['Inspire', 'Sustente', 'Expire'],
      },
      ujjayi: {
        name: 'Ujjayi · Sopro oceano',
        description:
          'A «respiração vitoriosa» do yoga: uma leve constrição na garganta transforma seu alento no som das ondas. Acalma e concentra ao mesmo tempo.',
        phases: ['Inspire', 'Expire com ondas'],
      },
      suspiro: {
        name: 'Suspiro fisiológico',
        description:
          'A forma natural do corpo liberar estresse: duas inalações seguidas e uma exalação longa. O caminho mais rápido para a calma.',
        phases: ['Inspire', 'Inspire um pouco mais', 'Exalação longa'],
      },
      alternada: {
        name: 'Respiração alternada',
        description:
          'Alterne o ar entre as duas narinas para equilibrar corpo e mente. Um ciclo completo dura 28 segundos e abrange os dois lados.',
        phases: [
          'Inspire esq.',
          'Sustente',
          'Expire dir.',
          'Inspire dir.',
          'Sustente',
          'Expire esq.',
        ],
      },
      abeja: {
        name: 'Respiração da abelha',
        description:
          'Ao exalar com um suave zumbido, a vibração mascara o ruído da mente e prepara o descanso. Ideal no fim do dia.',
        phases: ['Inspire', 'Zumbir ao exalar'],
      },
    },
  },

  meditations: {
    eyebrow: 'Meditações guiadas com voz',
    titleA: 'Escute, respire,',
    titleB: 'volte',
    description:
      'Meditações guiadas com uma voz serena sobre melodias de tigelas e sinos tibetanos. A guia fala no teu idioma enquanto a música te acompanha de volta ao presente.',
    listLabel: 'Lista de meditações guiadas',
    tip: 'Dica: procura um lugar tranquilo, usa fones se puderes e deixa o celular em silêncio. Se preferires só a melodia, podes desligar a voz de guia no reprodutor.',
    sectionLabel: 'Meditações guiadas com áudio',
    guide: {
      enable: 'Ativar a voz de guia',
      disable: 'Desativar a voz de guia',
      unavailable:
        'O teu navegador não oferece voz para este idioma: a melodia seguirá sem guia.',
    },
    player: {
      position: 'Posição da meditação',
      rewind: 'Voltar dez segundos',
      forward: 'Avançar dez segundos',
      speed: (rate: number) =>
        `Velocidade de reprodução: ${rate} vezes. Toque para mudar`,
      pauseTitle: (title: string) => `Pausar «${title}»`,
      playTitle: (title: string) => `Reproduzir «${title}»`,
      pause: 'Pausar',
      play: 'Reproduzir',
    },
    bell: {
      title: 'Sino de presença',
      description:
        'Toque-o quando se surpreender longe do presente: deixe que sua ressonância traga você de volta, AQUI e AGORA. Deixe-o soar por completo, sem pressa de voltar a nada.',
      stop: 'Silenciar o sino de presença',
      play: 'Tocar o sino de presença',
    },
    items: {
      presencia: {
        title: 'Presença AQUI e AGORA',
        tag: 'Presença',
        duration: '≈ 5 min',
        description:
          'A prática essencial deste espaço: sons, corpo e respiração trazem você de volta, instante a instante, ao aqui e agora.',
      },
      escaneo: {
        title: 'Escaneamento corporal relaxante',
        tag: 'Relaxamento',
        duration: '≈ 5 min',
        description:
          'Uma melodia cálida e lenta para percorrer o corpo dos pés à cabeça e soltar tensões na quietude.',
      },
      dormir: {
        title: 'Calma profunda para dormir',
        tag: 'Descanso',
        duration: '≈ 4 min',
        description:
          'Prepara corpo e mente para um sono sereno. Ouça já na cama, com as luzes baixas e sem pressa.',
      },
      pausa: {
        title: 'Pausa de um minuto',
        tag: 'Num instante',
        duration: '≈ 1 min',
        description:
          'Um minuto para respirar e voltar. Perfeita entre tarefas, antes de uma reunião ou em qualquer pausa do dia.',
      },
      caminando: {
        title: 'Meditação caminhando',
        tag: 'Em movimento',
        duration: '≈ 9 min',
        description:
          'Uma melodia serena que acompanha seus passos e transforma o passeio em meditação em movimento.',
      },
      yogaNidra: {
        title: 'Yoga nidra · Relaxamento profundo',
        tag: 'Descanso profundo',
        duration: '≈ 9 min',
        description:
          'O sono yogue: deitado e com a mente desperta, deixe a melodia levá-lo a um descanso profundo.',
      },
      extendida: {
        title: 'Retiro breve · Presença estendida',
        tag: 'Silêncio',
        duration: '≈ 16 min',
        description:
          'Dezesseis minutos de presença essencial: melodia muito serena e longos silêncios. A prática insignia da Presença+.',
      },
    },
  },

  topics: {
    eyebrow: 'Biblioteca viva',
    titleA: 'Temas para',
    titleB: 'explorar',
    description:
      'Guias breves e profundos ao mesmo tempo: escolha um tema, abra-o com calma e leve-o para o seu dia. Cada guia inclui a prática passo a passo.',
    sectionLabel: 'Temas para explorar',
    stepsTitle: 'A prática, passo a passo',
    practiceBreathing: 'Praticar a respiração agora',
    items: {
      iniciar: {
        title: 'Meditação para começar',
        description:
          'Sua primeira meditação, explicada com calma: postura, âncora e a arte de voltar sem se julgar.',
        duration: '10 min',
        level: 'Iniciação',
        intro:
          'Meditar não é parar de pensar: é mudar a sua relação com os pensamentos. Nesta primeira prática você aprenderá a usar a respiração como âncora e a voltar a ela, repetidamente, com gentileza.',
        steps: [
          'Sente-se com as costas dignas, porém confortáveis, mãos sobre as coxas e olhos fechados ou em olhar suave.',
          'Leve a atenção à sensação natural da respiração no nariz ou no abdômen.',
          'Conte mentalmente cada exalação de 1 a 10 e recomece.',
          'Quando a mente for embora —e ela irá—, note sem julgamento e volte ao 1. Esse retorno É a prática.',
        ],
        closing:
          'Feche com três respirações profundas e abra os olhos devagar. Você já deu o primeiro passo.',
      },
      presente: {
        title: 'A arte de habitar o presente',
        description:
          'Micropráticas de presença consciente para despertar do piloto automático no meio do dia.',
        duration: '5 min',
        level: 'Todo dia',
        intro:
          'A presença consciente não exige almofada nem templo: treina-se na fila do mercado, ao lavar a louça, numa conversa. AQUI e AGORA é um músculo que se fortalece com pequenos gestos.',
        steps: [
          'Pare um instante e pergunte-se: «Estou aqui, ou estou nos meus pensamentos?»',
          'Nomeie em silêncio três coisas que percebe com os sentidos agora: um som, uma textura, uma cor.',
          'Sinta o peso do corpo contra a cadeira ou o chão. Deixe a gravidade sustentá-lo.',
          'Observe seu estado emocional sem mudá-lo: «há calma», «há pressa», «há cansaço».',
        ],
        closing:
          'Repita este ciclo várias vezes ao dia. Cada despertar dura segundos; a soma deles transforma sua vida.',
      },
      cuadrada: {
        title: 'Respiração quadrada passo a passo',
        description:
          'A técnica 4·4·4·4 que SEALs da marinha e monges usam para se centrar em segundos.',
        duration: '5 min',
        level: 'Todos os níveis',
        intro:
          'A respiração quadrada desenha quatro lados iguais com seu alento. Sua regularidade envia ao sistema nervoso uma mensagem clara: «estamos a salvo, podemos descansar».',
        steps: [
          'Exale todo o ar pela boca, preparando o espaço.',
          'Inspire pelo nariz contando até 4, enchendo o abdômen primeiro.',
          'Sustente o ar contando até 4, com garganta e ombros relaxados.',
          'Exale suave pelo nariz contando até 4 e sustente o vazio por outros 4. Repita 8 ciclos.',
        ],
        closing:
          'Se sentir tontura, encurte as fases para 3·3·3·3. Você pode praticá-la aqui mesmo com nosso círculo guia.',
      },
      caminando: {
        title: 'Meditação caminhando',
        description:
          'Cada passo, um milagre. Transforme um passeio de quinze minutos em meditação em movimento.',
        duration: '15 min',
        level: 'Intermediário',
        intro:
          'Caminhar pode ser um deslocamento ou um templo. A diferença está na atenção. Esta prática, querida pela tradição zen, convida você a chegar a cada passo com todo o seu ser.',
        steps: [
          'Caminhe mais devagar que o habitual, como se não tivesse destino.',
          'Sinta o ciclo completo do passo: calcanhar, planta, dedos, impulsão.',
          'Sincronize um passo com meia inalação e o seguinte com meia exalação.',
          'Abra os sentidos: vento na pele, aromas, pássaros. O mundo também medita com você.',
        ],
        closing:
          'Ao terminar, pare um momento e agradeça aos seus pés por levá-lo, presentes, até aqui.',
      },
      observador: {
        title: 'O observador silencioso',
        description:
          'Descubra a testemunha que existe atrás dos seus pensamentos: a quietude que tudo contempla.',
        duration: '12 min',
        level: 'Intermediário',
        intro:
          'Você pode observar seus pensamentos porque não é seus pensamentos. Atrás do ruído mental há uma presença quieta que olha: essa é a sua morada mais profunda. Esta prática aproxima você dela.',
        steps: [
          'Feche os olhos e deixe os pensamentos fluírem como nuvens no céu.',
          'Não os siga nem os rejeite: apenas note. «Lá vai uma lembrança», «lá vai uma lista de tarefas».',
          'Pergunte-se com suavidade: «quem é o que observa?» e descanse nessa abertura.',
          'Permaneça no silêncio entre pensamentos, ainda que dure um instante. Ali está você.',
        ],
        closing:
          'O observador não se alcança com esforço, mas com quietude. Volte a esta prática quando o mundo pedir demais.',
      },
      gratitud: {
        title: 'Gratidão e coração aberto',
        description:
          'A prática que reeduca o coração para notar o que já está bem, aqui e agora.',
        duration: '8 min',
        level: 'Todos os níveis',
        intro:
          'A mente é treinada para detectar o que falta. A gratidão a reeduca para celebrar o que há. Não é otimismo ingênuo: é uma forma honesta de olhar a abundância deste instante.',
        steps: [
          'Coloque uma mão no peito e sinta o batimento que o acompanha desde antes de nascer.',
          'Nomeie três graças: algo simples de hoje, alguém que o sustenta, algo em você que aprecia.',
          'A cada agradecimento, inspire e sinta um calor se expandir no peito.',
          'Termine dirigindo um desejo sincero de bem-estar a alguém que você ama.',
        ],
        closing:
          'A gratidão praticada diariamente transforma o ordinário em suficiente. Esse é o milagre silencioso.',
      },
    },
  },

  quotes: {
    eyebrow: 'Vozes que iluminam',
    sectionLabel: 'Citações que inspiram presença',
    carouselLabel: 'Carrossel de citações espirituais',
    prev: 'Citação anterior',
    next: 'Próxima citação',
    selectLabel: 'Selecionar citação',
    goTo: (i: number, author: string) => `Ir para a citação ${i + 1}: ${author}`,
    dailyTitle: 'Sua frase de hoje',
    dailyHint: 'Leve a frase do dia como imagem, para o celular ou para compartilhar.',
    dailyButton: 'Baixar a frase de hoje',
    generating: 'Criando sua imagem…',
    dailyCaption: 'frase do dia',
    list: [
      {
        text: 'A vida está disponível apenas no momento presente.',
        author: 'Thich Nhat Hanh',
        role: 'Mestre zen e poeta da paz',
      },
      {
        text: 'Perceba profundamente que o momento presente é tudo o que você tem. Faça do agora o foco principal da sua vida.',
        author: 'Eckhart Tolle',
        role: 'Autor de «O poder do agora»',
      },
      {
        text: 'A natureza não tem pressa, e ainda assim tudo se realiza.',
        author: 'Lao Tsé',
        role: 'Tao Te Ching',
      },
      {
        text: 'Ontem eu era inteligente, queria mudar o mundo. Hoje sou sábio, estou mudando a mim mesmo.',
        author: 'Rumi',
        role: 'Poeta sufi',
      },
      {
        text: 'Sua própria autorrealização é o maior serviço que você pode prestar ao mundo.',
        author: 'Ramana Maharshi',
        role: 'Sábio de Arunachala',
      },
      {
        text: 'A paz é este momento sem julgamento. É tão simples assim? Sim, é tão simples assim.',
        author: 'Byron Katie',
        role: 'Autora de «Amar o que é»',
      },
      {
        text: 'Entre o estímulo e a resposta há um espaço. Nesse espaço está nosso poder de escolher.',
        author: 'Viktor Frankl',
        role: 'Psiquiatra e escritor',
      },
      {
        text: 'O silêncio é a linguagem de Deus; todo o resto é má tradução.',
        author: 'Rumi',
        role: 'Poeta sufi',
      },
      {
        text: 'Você não pode deter as ondas, mas pode aprender a surfá-las.',
        author: 'Jon Kabat-Zinn',
        role: 'Criador do programa MBSR',
      },
      {
        text: 'Quando você percebe que nada falta, o mundo inteiro lhe pertence.',
        author: 'Lao Tsé',
        role: 'Tao Te Ching',
      },
      {
        text: 'O presente não é um ponto no tempo: é uma porta para a eternidade.',
        author: 'Anthony de Mello',
        role: 'Mestre jesuíta e escritor',
      },
      {
        text: 'Respire. Você está em casa.',
        author: 'Thich Nhat Hanh',
        role: 'Mestre zen e poeta da paz',
      },
    ],
  },

  traditions: {
    eyebrow: 'Um rio, muitas margens',
    titleA: 'Sabedorias contemplativas do',
    titleB: 'mundo',
    description:
      'A presença não tem dono. Cada tradição guardou, em sua própria língua, um caminho para o aqui e agora. Escolha uma margem e beba da sua água.',
    explore: 'Explorar a tradição',
    items: {
      budista: {
        name: 'Budismo',
        essence:
          'Atenção plena e compaixão: observar a mente com bondade até que ela se aquiete sozinha.',
        practices: [
          {
            name: 'Anapanasati · Atenção à respiração',
            description:
              'O Buda ensinou a ancorar a mente na sensação do alento. A prática mais direta de volta ao corpo.',
            tool: 'breathing',
          },
          {
            name: 'Meditação caminhando',
            description:
              'Cada passo, um lugar de chegada. A melodia completa espera por você no santuário.',
            tool: 'walking',
          },
          {
            name: 'Metta · Bondade amorosa',
            description:
              'Desejar o bem, primeiro a você, depois a todos os seres. Um coração treinado na gentileza.',
            tool: 'meditations',
          },
        ],
      },
      cristiana: {
        name: 'Cristianismo contemplativo',
        essence:
          'O silêncio como oração: descansar na presença que sustenta todas as coisas.',
        practices: [
          {
            name: 'Oração centrante',
            description:
              'Uma palavra sagrada e o retorno amável a ela: consentir à presença no silêncio.',
            tool: 'timer',
          },
          {
            name: 'Lectio divina',
            description:
              'Ler um texto sagrado devagar, mastigando-o até que ele leia você.',
            tool: 'topics',
          },
          {
            name: 'O exame ignaciano',
            description:
              'Repassar o dia buscando onde esteve o bem, e agradecer. Gratidão aplicada.',
            tool: 'gratitude',
          },
        ],
      },
      sufi: {
        name: 'Sufismo',
        essence:
          'O anseio do coração e a lembrança contínua: perder-se de vista para encontrar-se.',
        practices: [
          {
            name: 'Dhikr · A lembrança',
            description:
              'Repetir os nomes do sagrado até que o coração desperte do esquecimento.',
            tool: 'mantra',
          },
          {
            name: 'Sama · A escuta',
            description:
              'A música e o giro dos dervixes: escutar até que o pensamento se assente.',
            tool: 'sounds',
          },
          {
            name: 'A poesia de Rumi',
            description:
              'Ler um verso e permanecer nele, como uma abelha numa flor. Cada poema, uma prática.',
            tool: 'quotes',
          },
        ],
      },
      vedanta: {
        name: 'Vedanta',
        essence:
          'A pergunta «quem sou eu?» como lanterna: buscar o buscador até descobrir que nunca faltou.',
        practices: [
          {
            name: 'Autoindagação',
            description:
              'Ramana Maharshi resumia assim: pergunte «quem sou?» e volte a atenção à sua fonte.',
            tool: 'meditations',
          },
          {
            name: 'Mantra e japa',
            description:
              'Repetir um som sagrado com um mala de 108 contas. Você o encontrará no santuário.',
            tool: 'mantra',
          },
          {
            name: 'Yoga nidra',
            description:
              'O descanso profundo da tradição tântrica, com a consciência desperta.',
            tool: 'nidra',
          },
        ],
      },
      taoista: {
        name: 'Taoísmo',
        essence:
          'Wu wei: não forçar. Fluir com o curso das coisas como flui a água, macia e poderosa.',
        practices: [
          {
            name: 'Qigong de pé',
            description:
              'Quietude ereta, respiração lenta e mãos que flutuam: cultivar o alento com suavidade.',
            tool: 'breathing',
          },
          {
            name: 'Caminhar sem destino',
            description:
              'Como no Zhuangzi: passear sem propósito, deixando que o caminho ensine.',
            tool: 'walking',
          },
          {
            name: 'O sorriso interior',
            description:
              'Dirigir um sorriso suave a cada parte do corpo. Simplicidade que cura.',
            tool: 'nidra',
          },
        ],
      },
      abierta: {
        name: 'Sem afiliação',
        essence:
          'Presença nua, sem rótulos: qualquer tradição, nenhuma em particular. Apenas este instante.',
        practices: [
          {
            name: 'Pausa de três minutos',
            description:
              'Respirar, calar, voltar. A prática mínima e completa para o dia a dia.',
            tool: 'pause',
          },
          {
            name: 'Diário de gratidão',
            description:
              'Três linhas honestas toda noite. A mente se reeduca celebrando o que há.',
            tool: 'gratitude',
          },
          {
            name: 'Escuta profunda de sons',
            description:
              'Misture chuva, rio e tigelas, e descanse na escuta. Sem técnica, sem esforço.',
            tool: 'sounds',
          },
        ],
      },
    },
  },

  sanctuary: {
    eyebrow: 'Sua caixa de ferramentas contemplativas',
    titleA: 'O',
    titleB: 'santuário',
    description:
      'Dez práticas interativas para acompanhá-lo em qualquer momento do dia: diálogo contemplativo com IA, temporizador, sons, malas, oráculo e mais. Tudo acontece no seu navegador, no seu ritmo.',
    open: (name: string) => `Abrir ${name}`,
    sectionLabel: 'Santuário de prática',
    companion: {
      name: 'Diálogo com o silêncio',
      short: 'Partilha como estás e recebe companhia contemplativa (IA).',
    },
    timer: {
      name: 'Temporizador de meditação',
      short: 'Silêncio com sinos no início, no fim e entre etapas.',
    },
    sounds: {
      name: 'Mixer de sons',
      short: 'Chuva, rio, floresta, tigelas e vento: crie seu ambiente.',
    },
    walking: {
      name: 'Meditação caminhando',
      short: 'Melodia serena para praticar em movimento.',
    },
    nidra: {
      name: 'Yoga nidra',
      short: 'Relaxamento profundo com melodia, deitado e desperto.',
    },
    mantra: {
      name: 'Mantras e mala digital',
      short: 'Contas de 108 com vibração e drone de Om.',
    },
    gratitude: {
      name: 'Diário de gratidão',
      short: 'Uma pergunta por dia, guardada só para você.',
    },
    oracle: {
      name: 'Oráculo contemplativo',
      short: 'Uma carta, uma mensagem e uma microprática.',
    },
    analytics: {
      name: 'Sua prática em números',
      short: 'Minutos, sessões e práticas favoritas.',
    },
    reminders: {
      name: 'Lembrete de presença',
      short: 'Um sino gentil na hora que você escolher.',
    },
  },

  timer: {
    durations: 'Duração',
    custom: 'Personalizada',
    customMinutes: 'Minutos (1–90)',
    interval: 'Sinos intermediários',
    intervalNone: 'Sem sinos',
    everyMin: (n: number) => `A cada ${n} min`,
    prepare: 'Prepare-se…',
    running: 'Meditando',
    remaining: 'Tempo restante',
    finished: 'A meditação terminou',
    finishedHint: 'Tome três respirações antes de voltar à tela.',
    start: 'Começar a meditar',
    stop: 'Terminar antes',
    stopped: 'Sessão salva no seu registro de prática',
    premiumLock: 'Sessões de mais de 30 minutos fazem parte da Presença+',
    upgrade: 'Ver Presença+',
    logged: (min: number) => `${min} min de meditação adicionados ao seu registro`,
    prepLabel: 'Preparação',
    minutesUnit: 'min',
  },

  sounds: {
    title: 'Mixer de sons',
    hint: 'Toque várias camadas ao mesmo tempo e ajuste o volume. Os sons são gerados no seu navegador: sem downloads, em loop infinito.',
    master: 'Volume geral',
    activeLayers: (n: number) =>
      n === 0
        ? 'Nenhuma camada ativa'
        : n === 1
          ? '1 camada ativa'
          : `${n} camadas ativas`,
    stopAll: 'Silenciar tudo',
    autoStop: 'Desligar após',
    timerOff: 'Sem limite',
    logged: (min: number) => `${min} min de escuta adicionados ao seu registro`,
    layerVolume: (name: string) => `Volume de ${name}`,
    layers: {
      lluvia: 'Chuva',
      rio: 'Rio',
      bosque: 'Floresta',
      cuencos: 'Tigelas',
      viento: 'Vento',
    },
  },

  walking: {
    title: 'Meditação caminhando',
    intro:
      'Coloque os fones, escolha um lugar tranquilo e seguro, e deixe a melodia acompanhá-lo enquanto caminha.',
    audioMode: 'Melodia completa',
    bellMode: 'Só sinos',
    bellEvery: 'Sino a cada',
    whileWalking: 'Enquanto você caminha',
    steps: [
      'Caminhe mais devagar que o habitual, como se não tivesse destino.',
      'Sinta o ciclo do passo: calcanhar, planta, dedos, impulsão.',
      'Sincronize o alento com o passo: dois passos para inspirar, dois para expirar.',
      'Abra os sentidos: vento, aromas, sons. O mundo caminha com você.',
    ],
    playGuide: 'Ouvir a melodia',
    pauseGuide: 'Pausar a melodia',
  },

  nidra: {
    title: 'Yoga nidra',
    intro:
      'Deite-se de costas, braços afastados do corpo e palmas para cima. Feche os olhos e deixe que o chão o sustente.',
    tips: [
      'Abrigue-se: a temperatura cai durante o relaxamento profundo.',
      'Não lute contra o sono: se adormecer, você também está descansando.',
      'Formule uma intenção breve antes de começar: você a repetirá durante a prática.',
    ],
    listen: 'Ouvir a melodia completa',
    pause: 'Pausar a melodia',
  },

  mantra: {
    title: 'Mala digital',
    round: 'Rodada',
    of: 'de 108',
    count: 'Conta',
    beadHint: 'Toque na conta grande (ou pressione a barra de espaço) a cada repetição do mantra.',
    restart: 'Reiniciar a rodada',
    omToggle: 'Drone de Om',
    omHint: 'Um tom suave sustenta sua prática enquanto você repete.',
    vibration: 'Vibração',
    chooseMantra: 'Escolha seu mantra',
    meaning: 'significado',
    mantras: {
      om: { name: 'Om', text: 'ॐ Om', meaning: 'O som primordial do universo' },
      mani: {
        name: 'Om Mani Padme Hum',
        text: 'ॐ मणि पद्मे हूँ',
        meaning: 'A joia no lótus: compaixão e sabedoria juntas',
      },
      soham: { name: 'So’Ham', text: 'सोऽहम् So’Ham', meaning: 'Eu sou Aquilo' },
      maranatha: {
        name: 'Maranatha',
        text: 'Maranatha',
        meaning: 'Vem, Senhor · oração dos padres do deserto',
      },
      la: {
        name: 'La ilaha illa Allah',
        text: 'لا إله إلا الله',
        meaning: 'Não há deus senão Deus · dhikr sufi',
      },
    },
    roundComplete: 'Rodada completa: 108 repetições',
    logged: (rounds: number) =>
      `${rounds} ${rounds === 1 ? 'rodada' : 'rodadas'} de japa adicionadas ao seu registro`,
  },

  gratitude: {
    title: 'Diário de gratidão',
    promptLabel: 'A pergunta de hoje',
    writeHere: 'Escreva do coração…',
    save: 'Salvar no diário',
    savedToast: 'Sua gratidão ficou guardada. Só você a lê.',
    emptyToast: 'Escreva algumas palavras primeiro, ainda que poucas.',
    listTitle: 'Entradas anteriores',
    empty: 'Seu diário está em branco. Toda noite, três linhas bastam.',
    deleteOne: 'Excluir esta entrada',
    confirmDelete: 'Excluir esta entrada? Esta ação não pode ser desfeita.',
    privateNote: 'Suas palavras ficam salvas apenas neste dispositivo. Ninguém mais as vê.',
    prompts: [
      'Que pequeno presente você recebeu hoje sem pedir?',
      'Que parte do seu corpo o sustentou hoje e merece um obrigado?',
      'Que momento de hoje trouxe você, ainda que por um segundo, ao presente?',
      'Quem cruzou seu caminho hoje e deixou algo bom atrás?',
      'Que coisa simples —um sabor, um aroma, uma luz— alegrou seu dia?',
      'O que você tem hoje que o seu eu de um ano atrás agradeceria?',
      'O que em você mesmo você quer agradecer esta noite?',
    ],
  },

  oracle: {
    title: 'Oráculo contemplativo',
    subtitle: 'Respire uma vez, formule sua pergunta em silêncio… e escolha uma carta.',
    drawDaily: 'A carta do dia',
    drawAnother: 'Tirar outra carta',
    shuffling: 'Embaralhando…',
    flip: 'Virar a carta',
    yourCard: 'Sua carta',
    messageTitle: 'A mensagem',
    practiceTitle: 'A microprática',
    copy: 'Copiar mensagem',
    copied: 'Mensagem copiada. Compartilhe com quem precisar.',
    sameDayNote: 'Esta é a sua carta de hoje: volte amanhã para uma nova.',
    dailyLabel: 'carta do dia',
    cards: [
      {
        name: 'A Montanha',
        message:
          'Nem tudo que pesa sobre você é seu. A montanha não se move quando as nuvens passam: observe a nuvem, seja a montanha.',
        practice: 'Nomeie em voz baixa uma preocupação e observe como ela muda ao ser olhada.',
      },
      {
        name: 'O Rio',
        message:
          'O rio nunca discute com a pedra: a contorna com paciência. O que hoje o retarda, amanhã o esculpe.',
        practice: 'Faça uma coisa do seu dia sem pressa, no ritmo da água.',
      },
      {
        name: 'A Semente',
        message:
          'Algo em você está debaixo da terra e ainda não se vê. Não desenterre a semente para conferir se cresce.',
        practice: 'Escreva uma intenção pequena e guarde-a sem reler por uma semana.',
      },
      {
        name: 'O Sino',
        message:
          'O som chega e vai; a escuta permanece. Não se apegue ao momento belo: apegue-se ao espaço que o contém.',
        practice: 'Escute um som até que desapareça por completo.',
      },
      {
        name: 'A Nuvem',
        message:
          'Seu humor também é clima, não céu. Vai passar. E você, que o vê passar, ficará.',
        practice: 'Diga em silêncio «isto também é passageiro», três vezes, com suavidade.',
      },
      {
        name: 'A Lua',
        message:
          'Nem tudo se vê com luz direta. O que você ilumina de frente o ofusca; o que acompanha de lado, fala com você.',
        practice: 'Olhe um problema do seu dia por um ângulo, sem atacá-lo de frente.',
      },
      {
        name: 'O Espelho',
        message:
          'O que mais o incomoda no outro costuma morar na sua própria casa. O espelho não julga: mostra.',
        practice: 'Nomeie sem culpa algo que o irritou hoje e pergunte: onde mora em mim?',
      },
      {
        name: 'A Raiz',
        message:
          'Você pode se dobrar na tempestade se estiver bem enraizado. A profundidade não se vê: sente-se quando sopra o vento.',
        practice: 'Sente-se um minuto sentindo o contato dos pés com o chão.',
      },
      {
        name: 'O Fogo',
        message:
          'Há paixões que queimam e paixões que iluminam. O mesmo fogo que destrói aquece a casa se for cuidado.',
        practice: 'Canalize hoje uma energia intensa em algo concreto e pequeno.',
      },
      {
        name: 'A Porta',
        message:
          'Você está batendo numa porta entreaberta. Às vezes o que chama de «bloqueio» só pede que a empurre devagar.',
        practice: 'Dê um passo mínimo rumo ao que você adia: uma mensagem, uma linha.',
      },
      {
        name: 'O Ninho',
        message:
          'Cuidar do seu espaço não é fraqueza: é preparar o lugar onde algo vai nascer. O pássaro tece antes de voar.',
        practice: 'Organize hoje um cantinho da sua casa, por menor que seja.',
      },
      {
        name: 'A Bússola',
        message:
          'Você não sabe o caminho, mas sabe o norte. Quando a mente pedir mapas completos, dê a direção e um passo.',
        practice: 'Defina numa frase o seu norte desta semana e considere suficiente.',
      },
      {
        name: 'A Chuva',
        message:
          'O que hoje se demora está regando você. Há tempos lentos que não são perdas: são semeadura.',
        practice: 'Dedique hoje quinze minutos sem produto a algo que o nutre.',
      },
      {
        name: 'A Aurora',
        message:
          'A escuridão não se combate: espera-se acordado. Nenhuma noite venceu ainda um amanhecer.',
        practice: 'Identifique uma pequena luz do seu dia e agradeça por escrito.',
      },
      {
        name: 'O Ensō',
        message:
          'O círculo zen se desenha num único traço, com a imperfeição incluída. Seu dia também é arte, mesmo que não saia perfeito.',
        practice: 'Faça algo hoje deliberadamente imperfeito e aprove mesmo assim.',
      },
      {
        name: 'A Maré',
        message:
          'Ninguém detém a maré discutindo com ela. Há forças grandes que só se navegam: reme ou descanse, mas não brigue com o mar.',
        practice: 'Escolha hoje uma batalha que não vai lutar, e fique em paz com isso.',
      },
      {
        name: 'A Vela',
        message:
          'Uma vela não ilumina o quarto inteiro: ilumina o suficiente. Sua tarefa não é ver todo o caminho, mas o próximo passo.',
        practice: 'Reduza a lista do dia ao que cabe sob esta luz: uma única coisa.',
      },
      {
        name: 'O Bambu',
        message:
          'O bambu passa anos criando raízes antes de crescer de repente. O invisível também avança.',
        practice: 'Faça hoje uma ação que só dará fruto com o tempo, e confie.',
      },
    ],
  },

  analytics: {
    title: 'Sua prática em números',
    weekMinutes: 'Minutos esta semana',
    totalSessions: 'Sessões totais',
    streakDays: 'Dias seguidos',
    favorite: 'Prática mais frequente',
    last14: 'Últimos 14 dias',
    byPractice: 'Por prática',
    sessionsShort: (n: number) => (n === 1 ? '1 sessão' : `${n} sessões`),
    minutesShort: (n: number) => `${n} min`,
    empty: 'Ainda não há práticas registradas',
    emptyHint:
      'Toda vez que você medita, respira ou usa uma ferramenta do santuário, ela é somada aqui automaticamente.',
    clear: 'Apagar meu registro',
    confirmClear: 'Apagar todo o registro de prática? Esta ação não pode ser desfeita.',
    types: {
      meditation: 'Meditação com melodia',
      timer: 'Meditação em silêncio',
      breathing: 'Respiração consciente',
      walking: 'Meditação caminhando',
      nidra: 'Yoga nidra',
      mantra: 'Mantra e japa',
      sounds: 'Escuta de sons',
      pause: 'Pausa de 3 minutos',
      gratitude: 'Diário de gratidão',
      oracle: 'Oráculo',
    },
  },

  reminders: {
    title: 'Lembrete de presença',
    description:
      'Escolha uma hora e o sino lembrará, com suavidade, de voltar ao presente.',
    timeLabel: 'Hora do lembrete',
    enable: 'Ativar lembrete',
    enabled: 'Lembrete ativo',
    disabled: 'Lembrete desligado',
    askPermission: 'Permitir notificações',
    granted: 'Notificações permitidas',
    denied: 'Notificações bloqueadas',
    deniedHint: 'Ative-as nas configurações do navegador se quiser recebê-las.',
    test: 'Testar o sino',
    note: 'O lembrete toca enquanto esta página ou o app instalado estiverem abertos. Notificações em segundo plano chegam em breve.',
    body: 'É o seu momento de presença. Uma respiração basta.',
    notifyTitle: 'Presença AQUI e AGORA',
    saved: 'Lembrete salvo',
  },

  premium: {
    eyebrow: 'Apoie e aprofunde',
    titleA: 'Presença',
    titleB: '+',
    description:
      'Tudo o que é essencial no santuário é e continuará grátis. A Presença+ acrescenta o que é profundo e sustenta este espaço sem anúncios.',
    freeName: 'Círculo aberto',
    freePrice: 'Grátis',
    freeDesc: 'Tudo o que é essencial para começar e sustentar uma prática.',
    freeFeatures: [
      '7 melodias de meditação',
      'Respiração guiada com 7 técnicas',
      'Temporizador de até 30 minutos',
      'Mala digital, diário, oráculo e sons',
      'Carta semanal de presença',
    ],
    freeCta: 'Você já desfruta',
    plusName: 'Presença+',
    plusPrice: 'US$ 4,99 / mês',
    plusDesc: 'Para quem quer ir mais fundo, com calma.',
    plusFeatures: [
      'Retiro de presença estendida · 16 min',
      'Temporizador de até 90 minutos',
      'Novas meditações todo mês',
      'Cenários de som exclusivos',
      'Você sustenta um espaço sem anúncios nem ruído',
    ],
    plusCta: 'Entrar na Presença+',
    processing: 'Abrindo o pagamento seguro…',
    demoTitle: 'Modo demo',
    demoHint:
      'O pagamento com Stripe ainda não está configurado. Você pode ativar o modo demo para experimentar a Presença+ por completo.',
    demoCta: 'Ativar demo da Presença+',
    demoActive: 'Presença+ ativa (demo)',
    demoOff: 'Desativar demo',
    activated: 'Bem-vindo à Presença+. Obrigado por sustentar este espaço.',
    deactivated: 'Modo demo desativado',
    error: 'Não foi possível iniciar o pagamento',
    errorHint: 'Verifique sua conexão e tente novamente.',
    activeBadge: 'Presença+ ativa',
    successToast: 'Obrigado! Sua assinatura está ativa.',
  },

  pause: {
    title: 'Pausa de 3 minutos',
    phase1: 'Respire',
    phase1Desc: 'Siga o círculo: cresce, inspire; retorna, expire.',
    phase2: 'Silêncio',
    phase2Desc: 'Nada a fazer. Apenas estar.',
    phase3: 'Volte',
    phase3Desc: 'Mova os dedos, abra os olhos, alongue.',
    skip: 'Pular fase',
    exit: 'Sair da pausa',
    done: 'A pausa terminou',
    doneHint: 'Três respirações e de volta ao mundo, um pouco mais desperto.',
    logged: 'Pausa de 3 minutos adicionada ao seu registro',
    ariaDialog: 'Pausa de três minutos em andamento',
  },

  pwa: {
    install: 'Instalar o app',
    installHint: 'Funciona offline e longe do ruído das abas.',
    installed: 'App instalado',
    unavailable: 'Seu navegador ainda não permite instalá-lo',
  },

  reflections: {
    eyebrow: 'Comunidade desperta',
    titleA: 'Compartilhe sua',
    titleB: 'reflexão',
    description:
      'O que a prática lhe ensinou? Que momento de presença você lembra? Deixe suas palavras aqui: alguém que caminha despertando precisa delas.',
    sectionLabel: 'Reflexões da comunidade',
    formTitle: 'Sua voz no círculo',
    formHint: 'Compartilha-se com respeito, sem julgamentos nem conselhos.',
    nameLabel: 'Nome',
    optional: '(opcional)',
    namePlaceholder: 'Como você se chama?',
    textLabel: 'Sua reflexão',
    textPlaceholder: 'Hoje, na pausa da respiração, notei que…',
    send: 'Compartilhar minha reflexão',
    sending: 'Enviando com calma…',
    wallTitle: 'Vozes recentes',
    refresh: 'Atualizar as reflexões',
    empty: 'Ainda não há vozes. Seja a primeira a deixar uma marca neste círculo.',
    toasts: {
      loadError: 'Não foi possível carregar as reflexões',
      loadErrorHint: 'Tente novamente em alguns instantes.',
      empty: 'Sua reflexão está vazia',
      emptyHint: 'Escreva algumas palavras do coração antes de enviar.',
      sent: 'Obrigado por compartilhar',
      sentHint: 'Sua reflexão já faz parte deste círculo de consciência.',
      sendError: 'Não foi possível enviar sua reflexão',
      sendErrorHint: 'Verifique sua conexão e tente novamente.',
    },
  },

  newsletter: {
    sectionLabel: 'Junte-se ao círculo de consciência',
    eyebrow: 'Uma carta semanal',
    title: 'Junte-se ao círculo de consciência',
    description:
      'Toda semana compartilhamos uma prática, uma reflexão e um motivo para voltar ao presente. Sem ruído, sem pressa: apenas presença na sua caixa de entrada.',
    placeholder: 'seu-email@exemplo.com',
    emailLabel: 'Seu e-mail',
    cta: 'Entrar no círculo',
    sending: 'Entrando…',
    calm: 'Respeitamos sua calma: você pode sair do círculo quando quiser.',
    toastOk: 'Bem-vindo ao círculo',
    toastError: 'Não concluímos sua assinatura',
    toastErrorHint: 'Insira um e-mail válido e tente novamente.',
  },

  palette: {
    trigger: 'Abrir a busca da página (Ctrl·⌘ + K)',
    label: 'Paleta de comandos',
    placeholder: 'Do que você precisa agora? Digite «meditar», «dormir», «idioma»…',
    noResults: 'Sem resultados. Tente outra palavra.',
    groups: {
      navigate: 'Ir para',
      meditate: 'Ouvir uma melodia',
      actions: 'Ações rápidas',
      language: 'Mudar idioma',
    },
    home: 'Início',
    play: (title: string) => `Ouvir «${title}»`,
  },

  companion: {
    greeting:
      'Olá. Estou aqui, contigo neste instante. Conta-me o que te traz hoje: podes partilhar como te sentes, o que procuras, ou simplesmente saudar o silêncio.',
    placeholder: 'Escreve com calma o que quiseres partilhar…',
    send: 'Enviar ao silêncio',
    thinking: 'O silêncio está a ouvir…',
    error: 'O diálogo não pôde continuar neste momento.',
    retry: 'Tenta novamente dentro de um momento',
    listen: 'Ouvir',
    stopVoice: 'Parar voz',
    voiceToggle: 'Ler as respostas em voz alta',
    voiceUnavailable: 'O teu navegador não oferece voz para este idioma.',
    disclaimer:
      'Um espaço de acompanhamento contemplativo com IA. Não substitui ajuda profissional: se estás a atravessar uma crise, procura apoio de confiança.',
    suggestions: [
      'A minha mente não aquietá',
      'Preciso de calma antes de dormir',
      'Como começo a meditar?',
      'Sinto-me sobrecarregado pelo dia',
    ],
  },

  notFound: {
    title: 'Esta página também é impermanente',
    message:
      'O que procuravas já não está aqui — ou talvez nunca tenha estado. Respira: tudo o que precisas continua AQUI.',
    back: 'Voltar ao presente',
    breathe: 'Fazer uma pausa de 3 minutos',
  },

  footer: {
    explore: 'Explorar',
    practicesCol: 'Práticas',
    tagline: 'espaço de consciência',
    about:
      'Um espaço aberto para compartilhar práticas de meditação, presença consciente e respiração. A vida acontece agora: o resto, apenas lembramos.',
    links: {
      practices: 'Práticas',
      breathing: 'Respiração guiada',
      meditations: 'Meditações com áudio',
      sanctuary: 'Santuário de prática',
      traditions: 'Tradições',
      topics: 'Temas',
      community: 'Comunidade',
    },
    practiceLinks: {
      start: 'Meditação para começar',
      presence: 'Presença consciente',
      square: 'Respiração quadrada',
      sleep: 'Calma profunda para dormir',
      pause: 'Pausa de um minuto',
      walking: 'Meditação caminhando',
    },
    copyright: '© 2026 Presença AQUI e AGORA · Um espaço para compartilhar espiritualidade',
    madeWith: 'Feito com',
    andPresence: 'e presença',
  },
}
