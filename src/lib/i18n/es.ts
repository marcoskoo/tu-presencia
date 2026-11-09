// Diccionario español — fuente de verdad de la interfaz.
// Estructura: typeof es define el tipo Dict que en.ts y pt.ts deben satisfacer.

export const es = {
  langName: 'Español',
  locale: 'es-ES',

  common: {
    close: 'Cerrar',
    closeDialog: 'Cerrar la herramienta y volver',
    cancel: 'Cancelar',
    save: 'Guardar',
    saved: 'Guardado',
    remove: 'Eliminar',
    download: 'Descargar',
    copy: 'Copiar',
    copied: 'Copiado',
    reset: 'Reiniciar',
    pause: 'Pausar',
    play: 'Reproducir',
    stop: 'Detener',
    continue: 'Continuar',
    begin: 'Comenzar',
    finish: 'Terminado',
    minutes: 'minutos',
    min: 'min',
    sec: 's',
    back: 'Volver',
    openGuide: 'Abrir la guía',
    practiceNow: 'Practicar ahora',
    audioEs: 'Audio en español',
    premium: 'Presencia+',
    loading: 'Cargando…',
  },

  nav: {
    practices: 'Prácticas',
    breathing: 'Respiración',
    meditations: 'Meditaciones',
    sanctuary: 'Santuario',
    topics: 'Temas',
    traditions: 'Tradiciones',
    community: 'Comunidad',
    premium: 'Presencia+',
    breatheNow: 'Respirar ahora',
    pause3: 'Pausa de 3 min',
    language: 'Idioma',
    languageShort: 'ES',
    installApp: 'Instalar la app',
    menuOpen: 'Abrir menú de navegación',
    themeLight: 'Activar modo amanecer',
    themeDark: 'Activar modo noche',
    home: 'Presencia AQUÍ y AHORA · inicio',
    brandTagline: 'espacio de consciencia',
    mobileNav: 'Navegación móvil',
    mainNav: 'Navegación principal',
  },

  hero: {
    ariaLabel: 'Bienvenida',
    badge: 'Espíritu · Práctica · Comunidad',
    titleA: 'La vida sucede',
    titleHere: 'AQUÍ',
    titleAnd: 'y',
    titleNow: 'AHORA',
    subtitle:
      'Un espacio abierto para compartir y cultivar la espiritualidad en el día a día: meditación, práctica de la presencia consciente y respiración consciente para volver, instante a instante, al único lugar donde la vida realmente sucede.',
    ctaPrimary: 'Respirar ahora',
    ctaSecondary: 'Explorar las prácticas',
    chips: [
      'Meditación guiada',
      'Presencia consciente',
      'Respiración',
      'Audio con campanas',
      'Silencio',
      'Gratitud',
    ],
    chipsLabel: 'Temas del espacio',
  },

  practices: {
    eyebrow: 'Las tres puertas',
    titleA: 'Caminos hacia el',
    titleB: 'presente',
    description:
      'No hace falta retirarse a una montaña. Estas tres prácticas se cultivan aquí, entre el café de la mañana y el ruido del mundo, para recordar lo que nunca dejaste de ser.',
    discoverAll: 'Descubrir todos los temas',
    cards: [
      {
        title: 'Meditación',
        subtitle: '',
        description:
          'El arte de aquietar la mente y habitar el silencio que ya eres. Guías paso a paso para asentar la atención, sin exigencias ni prisa.',
        points: [
          'Postura y anclaje corporal',
          'Atención a la respiración',
          'Amable retorno al presente',
        ],
        quote: '«Aprende a estar quieto y descubre quién eres en el silencio.»',
      },
      {
        title: 'Presencia consciente',
        subtitle: 'AQUÍ y AHORA',
        description:
          'Despertar del piloto automático. La práctica de notar este instante mientras sucede: los sonidos, el cuerpo, la vida tal como es.',
        points: [
          'Observación sin juicio',
          'Desapego del ruido mental',
          'Presencia en lo cotidiano',
        ],
        quote:
          '«El presente es el único tiempo que existe. Todo lo demás es recuerdo o imaginación.»',
      },
      {
        title: 'Respiración consciente',
        subtitle: '',
        description:
          'El puente más directo entre cuerpo y mente. Técnicas guiadas de respiración para calmarte, centrarte y volver a casa en cualquier momento.',
        points: [
          'Respiración cuadrada',
          'Respiración coherente',
          'Soplo relajante 4·7·8',
        ],
        quote:
          '«Donde va la respiración, va la atención. Donde va la atención, va la vida.»',
      },
    ],
  },

  breathing: {
    eyebrow: 'Práctica guiada en vivo',
    titleA: 'Respira',
    titleB: 'conmigo',
    description:
      'Elige una técnica, siéntate cómodamente y deja que el círculo guíe tu aliento: cuando crece, inhala; cuando se sostiene, retén; cuando regresa, exhala.',
    chooseTechnique: 'Elige una técnica de respiración',
    startQuestion: '¿Empezamos?',
    pausedSession: 'Sesión en pausa',
    phaseLive: (phase: string, secs: number) => `${phase}, quedan ${secs} segundos`,
    controls: {
      start: 'Comenzar',
      pause: 'Pausar la práctica',
      begin: 'Comenzar la práctica',
      restart: 'Reiniciar la sesión',
      soundOn: 'Activar la señal sonora de fase',
      soundOff: 'Desactivar la señal sonora de fase',
      paused: 'Pausar',
      goOn: 'Continuar',
    },
    soundHint:
      'La campanita suena al cambiar de fase para guiarte con los ojos cerrados.',
    stats: {
      cycles: 'Ciclos completos',
      time: 'Tiempo en práctica',
      cycleOf: 'Ciclo de',
    },
    benefitsLabel: 'Beneficios de la respiración consciente',
    benefits: [
      'Equilibra el ritmo del corazón',
      'Reduce el estrés y la ansiedad',
      'Prepara un sueño profundo',
      'Aporta claridad y centrado',
    ],
    techniques: {
      caja: {
        name: 'Respiración cuadrada',
        description:
          'Cuatro fases iguales que dibujan un cuadrado con tu aliento. Equilibra el sistema nervioso y afina la atención. Ideal para el día a día.',
        phases: ['Inhala', 'Sostén', 'Exhala', 'Pausa'],
      },
      coherente: {
        name: 'Respiración coherente',
        description:
          'Cinco respiraciones por minuto sincronizan corazón y mente. La práctica favorita para recuperar la calma en minutos.',
        phases: ['Inhala', 'Exhala'],
      },
      relajante: {
        name: 'Respiración 4 · 7 · 8',
        description:
          'El soplo tranquilizante: inhala suave, sostén y exhala largo. Perfecta para soltar tensiones antes de dormir.',
        phases: ['Inhala', 'Sostén', 'Exhala'],
      },
      ujjayi: {
        name: 'Ujjayi · Aliento océano',
        description:
          'La «respiración victoriosa» del yoga: una leve constricción en la garganta convierte tu aliento en el sonido de las olas. Calma y concentra a la vez.',
        phases: ['Inhala', 'Exhala con olas'],
      },
      suspiro: {
        name: 'Suspiro fisiológico',
        description:
          'La forma en que el cuerpo libera estrés de manera natural: dos inhalaciones seguidas y una exhalación larga. La vía más rápida hacia la calma.',
        phases: ['Inhala', 'Inhala un poco más', 'Exhala largo'],
      },
      alternada: {
        name: 'Respiración alternada',
        description:
          'Alterna el aire entre las dos fosas nasales para equilibrar cuerpo y mente. Un ciclo completo dura 28 segundos y abarca ambos lados.',
        phases: [
          'Inhala izq.',
          'Sostén',
          'Exhala der.',
          'Inhala der.',
          'Sostén',
          'Exhala izq.',
        ],
      },
      abeja: {
        name: 'Respiración de la abeja',
        description:
          'Al exhalar con un suave zumbido, la vibración enmascara el ruido de la mente y prepara el descanso. Ideal al final del día.',
        phases: ['Inhala', 'Zumba al exhalar'],
      },
    },
  },

  meditations: {
    eyebrow: 'Meditaciones guiadas con audio',
    titleA: 'Escucha, respira,',
    titleB: 'regresa',
    description:
      'Meditaciones guiadas con voz suave y campanas tibetanas. Elige una, ponte los auriculares y deja que la voz te acompañe de vuelta al presente.',
    listLabel: 'Lista de meditaciones guiadas',
    tip: 'Consejo: busca un lugar tranquilo, usa auriculares si puedes y deja el móvil en silencio. Este es tu momento.',
    sectionLabel: 'Meditaciones guiadas con audio',
    player: {
      position: 'Posición de la meditación',
      rewind: 'Retroceder diez segundos',
      forward: 'Avanzar diez segundos',
      speed: (rate: number) =>
        `Velocidad de reproducción: ${rate} veces. Pulsar para cambiar`,
      pauseTitle: (title: string) => `Pausar «${title}»`,
      playTitle: (title: string) => `Reproducir «${title}»`,
      pause: 'Pausar',
      play: 'Reproducir',
    },
    bell: {
      title: 'Campana de presencia',
      description:
        'Tócala cuando te sorprendas lejos del presente: deja que su resonancia te traiga de vuelta, AQUÍ y AHORA. Deja que suene completa, sin prisa por volver a nada.',
      stop: 'Silenciar la campana de presencia',
      play: 'Tocar la campana de presencia',
    },
    items: {
      presencia: {
        title: 'Presencia AQUÍ y AHORA',
        tag: 'Presencia',
        duration: '≈ 5 min',
        description:
          'La práctica esencial de este espacio: sonidos, cuerpo y respiración te devuelven, instante a instante, al aquí y ahora.',
      },
      escaneo: {
        title: 'Escaneo corporal relajante',
        tag: 'Relajación',
        duration: '≈ 5 min',
        description:
          'Un recorrido amable por todo el cuerpo, de los pies a la cabeza, para soltar tensiones y descansar en la quietud.',
      },
      dormir: {
        title: 'Calma profunda para dormir',
        tag: 'Descanso',
        duration: '≈ 4 min',
        description:
          'Prepara el cuerpo y la mente para un sueño sereno. Ponla ya en la cama, con las luces bajas y sin prisa.',
      },
      pausa: {
        title: 'Pausa de un minuto',
        tag: 'Al instante',
        duration: '≈ 1 min',
        description:
          'Un minuto para respirar y volver. Perfecta entre tareas, antes de una reunión o en cualquier pausa del día.',
      },
      caminando: {
        title: 'Meditación caminando',
        tag: 'En movimiento',
        duration: '≈ 9 min',
        description:
          'Una guía para escuchar mientras caminas: pasos, aliento y sentidos convertidos en meditación en movimiento.',
      },
      yogaNidra: {
        title: 'Yoga nidra · Relajación profunda',
        tag: 'Descanso profundo',
        duration: '≈ 9 min',
        description:
          'El sueño yoguico: tumbado y con la mente despierta, recorre el cuerpo entero y descansa como pocas veces.',
      },
      extendida: {
        title: 'Retiro breve · Presencia extendida',
        tag: 'Silencio',
        duration: '≈ 16 min',
        description:
          'Veinte minutos de presencia esencial con largos silencios: la práctica insignia de Presencia+.',
      },
    },
  },

  topics: {
    eyebrow: 'Biblioteca viva',
    titleA: 'Temas para',
    titleB: 'explorar',
    description:
      'Guías breves y profundas a la vez: elige un tema, ábrelo con calma y llévalo a tu día. Cada guía incluye la práctica paso a paso.',
    sectionLabel: 'Temas para explorar',
    stepsTitle: 'La práctica, paso a paso',
    practiceBreathing: 'Practicar la respiración ahora',
    items: {
      iniciar: {
        title: 'Meditación para comenzar',
        description:
          'Tu primera meditación, explicada con calma: postura, ancla y el arte de volver sin juzgarte.',
        duration: '10 min',
        level: 'Iniciación',
        intro:
          'Meditar no es dejar de pensar: es cambiar tu relación con los pensamientos. En esta primera práctica aprenderás a usar la respiración como ancla y a volver a ella, una y otra vez, con amabilidad.',
        steps: [
          'Siéntate con la espalda digna pero cómoda, manos sobre los muslos y ojos cerrados o en mirada suave.',
          'Lleva la atención a la sensación natural de la respiración en la nariz o el abdomen.',
          'Cuenta mentalmente cada exhalación del 1 al 10 y vuelve a empezar.',
          'Cuando la mente se vaya —y se irá—, nótalo sin juicio y regresa al 1. Ese retorno ES la práctica.',
        ],
        closing:
          'Cierra con tres respiraciones profundas y abre los ojos lentamente. Ya has dado el primer paso.',
      },
      presente: {
        title: 'El arte de habitar el presente',
        description:
          'Microprácticas de presencia consciente para despertar del piloto automático en pleno día.',
        duration: '5 min',
        level: 'Todos los días',
        intro:
          'La presencia consciente no requiere cojín ni templo: se entrena en la fila del supermercado, al lavar los platos, en una conversación. AQUÍ y AHORA es un músculo que se fortalece con pequeños gestos.',
        steps: [
          'Detente un instante y pregúntate: «¿Estoy aquí, o estoy en mis pensamientos?».',
          'Nombra en silencio tres cosas que percibes con los sentidos ahora mismo: un sonido, una textura, un color.',
          'Siente el peso de tu cuerpo contra la silla o el suelo. Deja que la gravedad te sostenga.',
          'Observa tu estado emocional sin cambiarlo: «hay calma», «hay prisa», «hay cansancio».',
        ],
        closing:
          'Repite este ciclo varias veces al día. Cada despertar dura segundos; su suma transforma tu vida.',
      },
      cuadrada: {
        title: 'Respiración cuadrada paso a paso',
        description:
          'La técnica 4·4·4·4 que usan Navy SEALs y monjes por igual para centrarse en segundos.',
        duration: '5 min',
        level: 'Todos los niveles',
        intro:
          'La respiración cuadrada dibuja cuatro lados iguales con tu aliento. Su regularidad envía al sistema nervioso un mensaje claro: «estamos a salvo, podemos descansar».',
        steps: [
          'Exhala todo el aire por la boca, preparando el espacio.',
          'Inhala por la nariz contando hasta 4, llenando el vientre primero.',
          'Sostén el aire contando hasta 4, con garganta y hombros relajados.',
          'Exhala suave por la nariz contando hasta 4 y sostén el vacío otros 4. Repite 8 ciclos.',
        ],
        closing:
          'Si te marea, acorta las fases a 3·3·3·3. Puedes practicarla aquí mismo con nuestro círculo guía.',
      },
      caminando: {
        title: 'Meditación caminando',
        description:
          'Cada paso, un milagro. Convierte un paseo de quince minutos en meditación en movimiento.',
        duration: '15 min',
        level: 'Intermedio',
        intro:
          'Caminar puede ser un traslado o un templo. La diferencia está en la atención. Esta práctica, querida por la tradición zen, te invita a llegar a cada paso con todo tu ser.',
        steps: [
          'Camina más lento de lo habitual, como si no tuvieras destino.',
          'Siente el ciclo completo del paso: talón, planta, dedos, despegue.',
          'Sincroniza un paso con media inhalación y el siguiente con media exhalación.',
          'Abre los sentidos: viento en la piel, aromas, pájaros. El mundo también está meditando contigo.',
        ],
        closing:
          'Al terminar, detente un momento y agradece a tus pies por llevarte, presentes, hasta aquí.',
      },
      observador: {
        title: 'El observador silencioso',
        description:
          'Descubre al testigo que hay detrás de tus pensamientos: la quietud que todo lo contempla.',
        duration: '12 min',
        level: 'Intermedio',
        intro:
          'Puedes observar tus pensamientos porque no eres tus pensamientos. Detrás del ruido mental hay una presencia quieta que mira: ese es tu hogar más profundo. Esta práctica te acerca a él.',
        steps: [
          'Cierra los ojos y deja que los pensamientos fluyan como nubes en el cielo.',
          'No los sigas ni los rechaces: solo nótalos. «Ahí va un recuerdo», «ahí va una lista de tareas».',
          'Pregúntate con suavidad: «¿quién es el que observa?» y descansa en esa apertura.',
          'Permanece en el silencio entre pensamientos, aunque dure un instante. Ahí estás tú.',
        ],
        closing:
          'El observador no se alcanza con esfuerzo, sino con quietud. Vuelve a esta práctica cuando el mundo pida demasiado.',
      },
      gratitud: {
        title: 'Gratitud y corazón abierto',
        description:
          'La práctica que reeduca el corazón para notar lo que ya está bien, aquí y ahora.',
        duration: '8 min',
        level: 'Todos los niveles',
        intro:
          'La mente está entrenada para detectar lo que falta. La gratitud la reeduca para celebrar lo que hay. No es optimismo ingenuo: es una forma honesta de mirar la abundancia de este instante.',
        steps: [
          'Lleva una mano al pecho y siente el latido que te acompaña desde antes de nacer.',
          'Nombra tres gracias: algo sencillo de hoy, alguien que te sostiene, algo de ti que aprecias.',
          'Con cada agradecimiento, inhala y siente cómo se expande una calidez en el pecho.',
          'Termina dirigiendo un deseo sincero de bienestar hacia alguien que quieres.',
        ],
        closing:
          'La gratitud practicada a diario convierte lo ordinario en suficiente. Ese es el milagro silencioso.',
      },
    },
  },

  quotes: {
    eyebrow: 'Voces que iluminan',
    sectionLabel: 'Citas que inspiran presencia',
    carouselLabel: 'Carrusel de citas espirituales',
    prev: 'Cita anterior',
    next: 'Cita siguiente',
    selectLabel: 'Seleccionar cita',
    goTo: (i: number, author: string) => `Ir a la cita ${i + 1}: ${author}`,
    dailyTitle: 'Tu frase de hoy',
    dailyHint:
      'Llévate la frase del día como imagen, para el móvil o para compartir.',
    dailyButton: 'Descargar la frase de hoy',
    generating: 'Creando tu imagen…',
    dailyCaption: 'frase del día',
    list: [
      {
        text: 'La vida está disponible solo en el momento presente.',
        author: 'Thich Nhat Hanh',
        role: 'Maestro zen y poeta de la paz',
      },
      {
        text: 'Date cuenta profundamente de que el momento presente es lo único que tienes. Haz del ahora el foco principal de tu vida.',
        author: 'Eckhart Tolle',
        role: 'Autor de «El poder del ahora»',
      },
      {
        text: 'La naturaleza no tiene prisa, y sin embargo todo se realiza.',
        author: 'Lao Tse',
        role: 'Tao Te Ching',
      },
      {
        text: 'Ayer era inteligente, quería cambiar el mundo. Hoy soy sabio, me estoy cambiando a mí mismo.',
        author: 'Rumi',
        role: 'Poeta sufí',
      },
      {
        text: 'Tu propia autorrealización es el mayor servicio que puedes prestar al mundo.',
        author: 'Ramana Maharshi',
        role: 'Sabio de Arunachala',
      },
      {
        text: 'La paz es este momento sin juicio. ¿Es tan simple? Sí, es tan simple.',
        author: 'Byron Katie',
        role: 'Autora de «Amar lo que es»',
      },
      {
        text: 'Entre el estímulo y la respuesta hay un espacio. En ese espacio está nuestro poder de elegir.',
        author: 'Viktor Frankl',
        role: 'Psiquiatra y escritor',
      },
      {
        text: 'El silencio es el lenguaje de Dios; todo lo demás es mala traducción.',
        author: 'Rumi',
        role: 'Poeta sufí',
      },
      {
        text: 'No puedes detener las olas, pero puedes aprender a surfear.',
        author: 'Jon Kabat-Zinn',
        role: 'Creador del programa MBSR',
      },
      {
        text: 'Cuando te das cuenta de que nada falta, el mundo entero te pertenece.',
        author: 'Lao Tse',
        role: 'Tao Te Ching',
      },
      {
        text: 'El presente no es un punto en el tiempo: es una puerta a la eternidad.',
        author: 'Anthony de Mello',
        role: 'Maestro jesuita y escritor',
      },
      {
        text: 'Respira. Estás en casa.',
        author: 'Thich Nhat Hanh',
        role: 'Maestro zen y poeta de la paz',
      },
    ],
  },

  traditions: {
    eyebrow: 'Un río, muchas orillas',
    titleA: 'Sabidurías contemplativas del',
    titleB: 'mundo',
    description:
      'La presencia no tiene dueño. Cada tradición ha guardado, con su propia lengua, una senda hacia el aquí y ahora. Elige una orilla y bebe de su agua.',
    explore: 'Explorar la tradición',
    items: {
      budista: {
        name: 'Budismo',
        essence:
          'Atención plena y compasión: observar la mente con bondad hasta que se aquieta sola.',
        practices: [
          {
            name: 'Anapanasati · Atención a la respiración',
            description:
              'El Buda enseñó a anclar la mente en la sensación del aliento. La práctica más directa de vuelta al cuerpo.',
            tool: 'breathing',
          },
          {
            name: 'Meditación caminando',
            description:
              'Cada paso, un lugar de llegada. La guía completa de audio te espera en el santuario.',
            tool: 'walking',
          },
          {
            name: 'Metta · Bondad amorosa',
            description:
              'Desear el bien, primero a ti, luego a todos los seres. Un corazón entrenado en la amabilidad.',
            tool: 'meditations',
          },
        ],
      },
      cristiana: {
        name: 'Cristianismo contemplativo',
        essence:
          'El silencio como oración: descansar en la presencia que sostiene todas las cosas.',
        practices: [
          {
            name: 'Oración centrante',
            description:
              'Una palabra sagrada y el regreso amable a ella: consentir a la presencia en el silencio.',
            tool: 'timer',
          },
          {
            name: 'Lectio divina',
            description:
              'Leer un texto sagrado despacio, masticándolo hasta que él te lee a ti.',
            tool: 'topics',
          },
          {
            name: 'El examen ignaciano',
            description:
              'Repasar el día buscando dónde estuvo lo bueno, y dar gracias. Gratitud aplicada.',
            tool: 'gratitude',
          },
        ],
      },
      sufi: {
        name: 'Sufismo',
        essence:
          'El anhelo del corazón y el recuerdo continuo: perderte de vista para encontrarte.',
        practices: [
          {
            name: 'Dhikr · El recuerdo',
            description:
              'Repetir los nombres de lo sagrado hasta que el corazón despierte del olvido.',
            tool: 'mantra',
          },
          {
            name: 'Sama · La escucha',
            description:
              'La música y el giro de los derviches: escuchar hasta que el pensamiento se asiente.',
            tool: 'sounds',
          },
          {
            name: 'La poesía de Rumi',
            description:
              'Leer un verso y quedarse en él, como una abeja en una flor. Cada poema, una práctica.',
            tool: 'quotes',
          },
        ],
      },
      vedanta: {
        name: 'Vedanta',
        essence:
          'La pregunta «¿quién soy yo?» como linterna: buscar al buscador hasta descubrir que nunca faltaste.',
        practices: [
          {
            name: 'Autoindagación',
            description:
              'Ramana Maharshi la resumía así: pregunta «¿quién soy?» y vuelve la atención a la fuente.',
            tool: 'meditations',
          },
          {
            name: 'Mantra y japa',
            description:
              'Repetir un sonido sagrado con un mala de 108 cuentas. Lo encontrarás en el santuario.',
            tool: 'mantra',
          },
          {
            name: 'Yoga nidra',
            description:
              'El descanso profundo de la tradición tántrica, con la conciencia despierta.',
            tool: 'nidra',
          },
        ],
      },
      taoista: {
        name: 'Taoísmo',
        essence:
          'Wu wei: no forzar. Fluir con el curso de las cosas como fluye el agua, blanda y poderosa.',
        practices: [
          {
            name: 'Qigong de pie',
            description:
              'Quietud erguida, respiración lenta y manos que flotan: cultivar el aliento con suavidad.',
            tool: 'breathing',
          },
          {
            name: 'Caminar sin destino',
            description:
              'Como en el Zhuangzi: pasear sin propósito, dejando que el camino enseñe.',
            tool: 'walking',
          },
          {
            name: 'La sonrisa interior',
            description:
              'Dirigir una sonrisa suave a cada parte del cuerpo. Simplicidad que sana.',
            tool: 'nidra',
          },
        ],
      },
      abierta: {
        name: 'Sin afiliación',
        essence:
          'Presencia desnuda, sin etiquetas: cualquier tradición, ninguna en particular. Solo este instante.',
        practices: [
          {
            name: 'Pausa de tres minutos',
            description:
              'Respirar, callar, volver. La práctica mínima y completa para el día a día.',
            tool: 'pause',
          },
          {
            name: 'Diario de gratitud',
            description:
              'Tres líneas honestas cada noche. La mente se reeduca celebrando lo que hay.',
            tool: 'gratitude',
          },
          {
            name: 'Escucha profunda de sonidos',
            description:
              'Mezcla lluvia, río y cuencos, y descansa en la escucha. Sin técnica, sin esfuerzo.',
            tool: 'sounds',
          },
        ],
      },
    },
  },

  sanctuary: {
    eyebrow: 'Tu caja de herramientas contemplativas',
    titleA: 'El',
    titleB: 'santuario',
    description:
      'Nueve prácticas interactivas para acompañarte en cualquier momento del día: temporizador, sonidos, malas, oráculo y más. Todo sucede en tu navegador, a tu ritmo.',
    open: (name: string) => `Abrir ${name}`,
    sectionLabel: 'Santuario de práctica',
    timer: {
      name: 'Temporizador de meditación',
      short: 'Silencio con campanas al principio, al final y entre tiempos.',
    },
    sounds: {
      name: 'Mezclador de sonidos',
      short: 'Lluvia, río, bosque, cuencos y viento: crea tu ambiente.',
    },
    walking: {
      name: 'Meditación caminando',
      short: 'Guía de audio para practicar en movimiento.',
    },
    nidra: {
      name: 'Yoga nidra',
      short: 'Relajación profunda guiada, tumbado y despierto.',
    },
    mantra: {
      name: 'Mantras y mala digital',
      short: 'Cuentas de 108 con vibración y drone de Om.',
    },
    gratitude: {
      name: 'Diario de gratitud',
      short: 'Una pregunta al día, guardada solo para ti.',
    },
    oracle: {
      name: 'Oráculo contemplativo',
      short: 'Una carta, un mensaje y una micropráctica.',
    },
    analytics: {
      name: 'Tu práctica en cifras',
      short: 'Minutos, sesiones y prácticas favoritas.',
    },
    reminders: {
      name: 'Recordatorio de presencia',
      short: 'Una campana amable a la hora que elijas.',
    },
  },

  timer: {
    durations: 'Duración',
    custom: 'Personalizada',
    customMinutes: 'Minutos (1–90)',
    interval: 'Campanas intermedias',
    intervalNone: 'Sin campanas',
    everyMin: (n: number) => `Cada ${n} min`,
    prepare: 'Prepárate…',
    running: 'Meditando',
    remaining: 'Tiempo restante',
    finished: 'La meditación ha terminado',
    finishedHint: 'Tómate tres respiraciones antes de volver a la pantalla.',
    start: 'Comenzar a meditar',
    stop: 'Terminar antes',
    stopped: 'Sesión guardada en tu registro de práctica',
    premiumLock: 'Las sesiones de más de 30 minutos son parte de Presencia+',
    upgrade: 'Ver Presencia+',
    logged: (min: number) => `Añadidos ${min} min de meditación a tu registro`,
    prepLabel: 'Preparación',
    minutesUnit: 'min',
  },

  sounds: {
    title: 'Mezclador de sonidos',
    hint: 'Toca varias capas a la vez y ajusta su volumen. Los sonidos se generan en tu navegador: sin descargas, en bucle infinito.',
    master: 'Volumen general',
    activeLayers: (n: number) =>
      n === 0
        ? 'Ninguna capa activa'
        : n === 1
          ? '1 capa activa'
          : `${n} capas activas`,
    stopAll: 'Silenciar todo',
    autoStop: 'Apagar solo',
    timerOff: 'Sin límite',
    logged: (min: number) => `${min} min de escucha añadidos a tu registro`,
    layerVolume: (name: string) => `Volumen de ${name}`,
    layers: {
      lluvia: 'Lluvia',
      rio: 'Río',
      bosque: 'Bosque',
      cuencos: 'Cuencos',
      viento: 'Viento',
    },
  },

  walking: {
    title: 'Meditación caminando',
    intro:
      'Ponte los auriculares, elige un lugar tranquilo y seguro, y deja que la voz te acompañe mientras caminas.',
    audioMode: 'Guía de audio completa',
    bellMode: 'Solo campanas',
    bellEvery: 'Campana cada',
    whileWalking: 'Mientras caminas',
    steps: [
      'Camina más lento de lo habitual, como si no tuvieras destino.',
      'Siente el ciclo del paso: talón, planta, dedos, despegue.',
      'Sincroniza el aliento con el paso: dos pasos para inhalar, dos para exhalar.',
      'Abre los sentidos: viento, aromas, sonidos. El mundo camina contigo.',
    ],
    playGuide: 'Escuchar la guía',
    pauseGuide: 'Pausar la guía',
  },

  nidra: {
    title: 'Yoga nidra',
    intro:
      'Acuéstate de espaldas, brazos separados del cuerpo y palmas hacia arriba. Cierra los ojos y deja que el suelo te sostenga.',
    tips: [
      'Abrígate: la temperatura baja durante la relajación profunda.',
      'No luchas contra el sueño: si llegas a dormirte, también descansas.',
      'Formula una intención breve antes de empezar: la repetirás durante la práctica.',
    ],
    listen: 'Escuchar la guía completa',
    pause: 'Pausar la guía',
  },

  mantra: {
    title: 'Mala digital',
    round: 'Ronda',
    of: 'de 108',
    count: 'Cuenta',
    beadHint: 'Toca la cuenta grande (o pulsa la barra espaciadora) con cada repetición del mantra.',
    restart: 'Reiniciar la ronda',
    omToggle: 'Drone de Om',
    omHint: 'Un tono suave sostiene tu práctica mientras repites.',
    vibration: 'Vibración',
    chooseMantra: 'Elige tu mantra',
    meaning: 'significado',
    mantras: {
      om: { name: 'Om', text: 'ॐ Om', meaning: 'El sonido primordial del universo' },
      mani: {
        name: 'Om Mani Padme Hum',
        text: 'ॐ मणि पद्मे हूँ',
        meaning: 'La joya en el loto: compasión y sabiduría juntas',
      },
      soham: { name: 'So’Ham', text: 'सोऽहम् So’Ham', meaning: 'Yo soy Aquello' },
      maranatha: {
        name: 'Maranatha',
        text: 'Maranatha',
        meaning: 'Ven, Señor · oración de los padres del desierto',
      },
      la: {
        name: 'La ilaha illa Allah',
        text: 'لا إله إلا الله',
        meaning: 'No hay dios sino Dios · dhikr sufí',
      },
    },
    roundComplete: 'Ronda completa: 108 repeticiones',
    logged: (rounds: number) =>
      `${rounds} ${rounds === 1 ? 'ronda' : 'rondas'} de japa añadidas a tu registro`,
  },

  gratitude: {
    title: 'Diario de gratitud',
    promptLabel: 'La pregunta de hoy',
    writeHere: 'Escribe desde el corazón…',
    save: 'Guardar en el diario',
    savedToast: 'Tu gratitud quedó guardada. Solo tú la lees.',
    emptyToast: 'Escribe unas palabras primero, aunque sean pocas.',
    listTitle: 'Entradas anteriores',
    empty: 'Tu diario está en blanco. Cada noche, tres líneas bastan.',
    deleteOne: 'Eliminar esta entrada',
    confirmDelete: '¿Eliminar esta entrada? Esta acción no se puede deshacer.',
    privateNote: 'Tus palabras se guardan solo en este dispositivo. Nadie más las ve.',
    prompts: [
      '¿Qué pequeño regalo recibiste hoy sin pedirlo?',
      '¿Qué parte de tu cuerpo te sostuvo hoy y merece un gracias?',
      '¿Qué momento de hoy te trajo, aunque sea un segundo, al presente?',
      '¿Quién cruzó tu camino hoy y dejó algo bueno detrás?',
      '¿Qué cosa sencilla —un sabor, un olor, una luz— te alegró el día?',
      '¿Qué tienes hoy que tu yo de hace un año agradecería?',
      '¿Qué de ti mismo quieres agradecer esta noche?',
    ],
  },

  oracle: {
    title: 'Oráculo contemplativo',
    subtitle: 'Respira una vez, formula tu pregunta en silencio… y elige una carta.',
    drawDaily: 'La carta del día',
    drawAnother: 'Robar otra carta',
    shuffling: 'Barajando…',
    flip: 'Voltear la carta',
    yourCard: 'Tu carta',
    messageTitle: 'El mensaje',
    practiceTitle: 'La micropráctica',
    copy: 'Copiar mensaje',
    copied: 'Mensaje copiado. Compártelo con quien lo necesite.',
    sameDayNote: 'Esta es tu carta de hoy: vuelve mañana para una nueva.',
    dailyLabel: 'carta del día',
    cards: [
      {
        name: 'La Montaña',
        message:
          'No todo lo que te pesa es tuyo. La montaña no se mueve cuando las nubes pasan: observa la nube, sé la montaña.',
        practice: 'Nombra en voz baja una preocupación y observa cómo cambia al mirarla.',
      },
      {
        name: 'El Río',
        message:
          'El río nunca discute con la piedra: la rodea con paciencia. Lo que hoy te frena, mañana te talla.',
        practice: 'Haz una cosa de tu día sin apresurarte, al ritmo del agua.',
      },
      {
        name: 'La Semilla',
        message:
          'Algo en ti está bajo tierra y aún no se ve. No desentierres la semilla para comprobar si crece.',
        practice: 'Escribe una intención pequeña y guárdala sin releerla en una semana.',
      },
      {
        name: 'La Campana',
        message:
          'El sonido llega y se va; la escucha permanece. No te aferres al momento hermoso: aférrate al espacio que lo contiene.',
        practice: 'Escucha un sonido hasta que desaparezca por completo.',
      },
      {
        name: 'La Nube',
        message:
          'Tu estado de ánimo también es clima, no cielo. Pasará. Y tú, que lo miras pasar, te quedarás.',
        practice: 'Di en silencio «esto también es pasajero», tres veces, con suavidad.',
      },
      {
        name: 'La Luna',
        message:
          'No todo se ve con luz directa. Lo que iluminas de frente te deslumbra; lo que acompañas de lado, te habla.',
        practice: 'Mira un problema de tu día desde un costado, sin atacarlo de frente.',
      },
      {
        name: 'El Espejo',
        message:
          'Lo que más te molesta del otro suele vivir en tu propia casa. El espejo no juzga: muestra.',
        practice: 'Nombra sin culpa algo que te irritó hoy y pregúntate: ¿dónde vive en mí?',
      },
      {
        name: 'La Raíz',
        message:
          'Puedes doblarte en la tormenta si estás bien enraizado. La profundidad no se ve: se siente cuando sopla el viento.',
        practice: 'Siéntate un minuto sintiendo el contacto de los pies con el suelo.',
      },
      {
        name: 'El Fuego',
        message:
          'Hay pasiones que queman y pasiones que iluminan. El mismo fuego que destruye, calienta la casa si se cuida.',
        practice: 'Canaliza hoy una energía intensa en algo concreto y pequeño.',
      },
      {
        name: 'La Puerta',
        message:
          'Estás llamando a una puerta entreabierta. A veces lo que llamas «bloqueo» solo pide que la empujes despacio.',
        practice: 'Da un paso mínimo hacia eso que pospones: un mensaje, una línea.',
      },
      {
        name: 'El Nido',
        message:
          'Cuidar tu espacio no es debilidad: es preparar el lugar donde algo va a nacer. El pájaro teje antes de volar.',
        practice: 'Ordena hoy un rincón de tu casa, aunque sea diminuto.',
      },
      {
        name: 'La Brújula',
        message:
          'No sabes el camino, pero sabes el norte. Cuando la mente pida mapas completos, dale la dirección y un paso.',
        practice: 'Define en una frase tu norte de esta semana y dalo por suficiente.',
      },
      {
        name: 'La Lluvia',
        message:
          'Lo que hoy se demora te está regando. Hay tiempos lentos que no son pérdidas: son siembra.',
        practice: 'Concede hoy quince minutos sin producto a algo que te nutre.',
      },
      {
        name: 'El Alba',
        message:
          'La oscuridad no se combate: se espera despierto. Ninguna noche ha ganado todavía a un amanecer.',
        practice: 'Identifica una pequeña luz de tu día y agradécela por escrito.',
      },
      {
        name: 'El Ensō',
        message:
          'El círculo zen se dibuja de un solo trazo, con la imperfección incluida. Tu día también es arte aunque no salga perfecto.',
        practice: 'Haz algo hoy deliberadamente imperfecto y disfrútalo igual.',
      },
      {
        name: 'La Marea',
        message:
          'Nadie detiene la marea discutiéndole. Hay fuerzas grandes que solo se navegan: rema o descansa, pero no peles con el mar.',
        practice: 'Elige hoy una batalla que no vas a pelear, y hazlo en paz.',
      },
      {
        name: 'La Vela',
        message:
          'Una vela no ilumina la habitación entera: ilumina justo lo necesario. Tu tarea no es ver todo el camino, sino el siguiente paso.',
        practice: 'Reduce tu lista del día a lo que cabe bajo esta luz: una sola cosa.',
      },
      {
        name: 'El Bambú',
        message:
          'El bambú pasa años haciendo raíces antes de crecer de golpe. Lo invisible también avanza.',
        practice: 'Haz hoy una acción que solo dará fruto con el tiempo, y confía.',
      },
    ],
  },

  analytics: {
    title: 'Tu práctica en cifras',
    weekMinutes: 'Minutos esta semana',
    totalSessions: 'Sesiones totales',
    streakDays: 'Días seguidos',
    favorite: 'Práctica más frecuente',
    last14: 'Últimos 14 días',
    byPractice: 'Por práctica',
    sessionsShort: (n: number) => (n === 1 ? '1 sesión' : `${n} sesiones`),
    minutesShort: (n: number) => `${n} min`,
    empty: 'Aún no hay prácticas registradas',
    emptyHint:
      'Cada vez que meditas, respiras o usas una herramienta del santuario, se suma aquí automáticamente.',
    clear: 'Borrar mi registro',
    confirmClear: '¿Borrar todo el registro de práctica? Esta acción no se puede deshacer.',
    types: {
      meditation: 'Meditación guiada',
      timer: 'Silencio con temporizador',
      breathing: 'Respiración consciente',
      walking: 'Meditación caminando',
      nidra: 'Yoga nidra',
      mantra: 'Mantra y japa',
      sounds: 'Escucha de sonidos',
      pause: 'Pausa de 3 minutos',
      gratitude: 'Diario de gratitud',
      oracle: 'Oráculo',
    },
  },

  reminders: {
    title: 'Recordatorio de presencia',
    description:
      'Elige una hora y la campana te recordará, con suavidad, volver al presente.',
    timeLabel: 'Hora del recordatorio',
    enable: 'Activar recordatorio',
    enabled: 'Recordatorio activo',
    disabled: 'Recordatorio apagado',
    askPermission: 'Permitir notificaciones',
    granted: 'Notificaciones permitidas',
    denied: 'Notificaciones bloqueadas',
    deniedHint: 'Actívalas en los ajustes de tu navegador si quieres recibirlas.',
    test: 'Probar la campana',
    note: 'El recordatorio suena mientras esta página o la app instalada estén abiertas. Las notificaciones en segundo plano llegarán próximamente.',
    body: 'Es tu momento de presencia. Una respiración basta.',
    notifyTitle: 'Presencia AQUÍ y AHORA',
    saved: 'Recordatorio guardado',
  },

  premium: {
    eyebrow: 'Apoya y profundiza',
    titleA: 'Presencia',
    titleB: '+',
    description:
      'Todo lo esencial del santuario es y será gratis. Presencia+ agrega lo profundo y sostiene este espacio sin anuncios.',
    freeName: 'Círculo abierto',
    freePrice: 'Gratis',
    freeDesc: 'Todo lo esencial para empezar y sostener una práctica.',
    freeFeatures: [
      '7 meditaciones guiadas con audio',
      'Respiración guiada con 7 técnicas',
      'Temporizador de hasta 30 minutos',
      'Mala digital, diario, oráculo y sonidos',
      'Carta semanal de presencia',
    ],
    freeCta: 'Ya lo disfrutas',
    plusName: 'Presencia+',
    plusPrice: '4,99 US$ / mes',
    plusDesc: 'Para quien quiere ir más hondo, con calma.',
    plusFeatures: [
      'Retiro de presencia extendida · 16 min',
      'Temporizador de hasta 90 minutos',
      'Nuevas meditaciones cada mes',
      'Escenarios de sonido exclusivos',
      'Apoyas un espacio sin anuncios ni ruido',
    ],
    plusCta: 'Unirme a Presencia+',
    processing: 'Abriendo el pago seguro…',
    demoTitle: 'Modo demo',
    demoHint:
      'El pago con Stripe aún no está configurado. Puedes activar el modo demo para probar Presencia+ al completo.',
    demoCta: 'Activar demo de Presencia+',
    demoActive: 'Presencia+ activo (demo)',
    demoOff: 'Desactivar demo',
    activated: 'Bienvenido a Presencia+. Gracias por sostener este espacio.',
    deactivated: 'Modo demo desactivado',
    error: 'No se pudo iniciar el pago',
    errorHint: 'Comprueba tu conexión e inténtalo otra vez.',
    activeBadge: 'Presencia+ activo',
    successToast: '¡Gracias! Tu membresía está activa.',
  },

  pause: {
    title: 'Pausa de 3 minutos',
    phase1: 'Respira',
    phase1Desc: 'Sigue el círculo: crece, inhala; vuelve, exhala.',
    phase2: 'Silencio',
    phase2Desc: 'Nada que hacer. Solo estar.',
    phase3: 'Vuelve',
    phase3Desc: 'Mueve los dedos, abre los ojos, estira.',
    skip: 'Saltar fase',
    exit: 'Salir de la pausa',
    done: 'La pausa terminó',
    doneHint: 'Tres respiraciones y de vuelta al mundo, un poco más despierto.',
    logged: 'Pausa de 3 minutos añadida a tu registro',
    ariaDialog: 'Pausa de tres minutos en curso',
  },

  pwa: {
    install: 'Instalar la app',
    installHint: 'Funciona sin conexión y sin ruido de pestañas.',
    installed: 'App instalada',
    unavailable: 'Tu navegador no permite instalarla todavía',
  },

  reflections: {
    eyebrow: 'Comunidad despierta',
    titleA: 'Comparte tu',
    titleB: 'reflexión',
    description:
      '¿Qué te ha enseñado la práctica? ¿Qué momento de presencia recuerdas? Deja tus palabras aquí: alguien que camina despertando las necesita.',
    sectionLabel: 'Reflexiones de la comunidad',
    formTitle: 'Tu voz en el círculo',
    formHint: 'Se comparte con respeto, sin juicios ni consejos.',
    nameLabel: 'Nombre',
    optional: '(opcional)',
    namePlaceholder: '¿Cómo te llamas?',
    textLabel: 'Tu reflexión',
    textPlaceholder: 'Hoy, en la pausa de la respiración, noté que…',
    send: 'Compartir mi reflexión',
    sending: 'Enviando con calma…',
    wallTitle: 'Voces recientes',
    refresh: 'Actualizar las reflexiones',
    empty: 'Todavía no hay voces. Sé la primera en dejar una huella en este círculo.',
    toasts: {
      loadError: 'No se pudieron cargar las reflexiones',
      loadErrorHint: 'Inténtalo de nuevo en unos instantes.',
      empty: 'Tu reflexión está vacía',
      emptyHint: 'Escribe unas palabras desde el corazón antes de enviar.',
      sent: 'Gracias por compartir',
      sentHint: 'Tu reflexión ya forma parte de este círculo de consciencia.',
      sendError: 'No se pudo enviar tu reflexión',
      sendErrorHint: 'Comprueba tu conexión e inténtalo de nuevo.',
    },
  },

  newsletter: {
    sectionLabel: 'Únete al círculo de consciencia',
    eyebrow: 'Una carta semanal',
    title: 'Únete al círculo de consciencia',
    description:
      'Cada semana compartimos una práctica, una reflexión y un motivo para volver al presente. Sin ruido, sin prisa: solo presencia en tu bandeja de entrada.',
    placeholder: 'tu-correo@ejemplo.com',
    emailLabel: 'Tu correo electrónico',
    cta: 'Unirme al círculo',
    sending: 'Uniendo…',
    calm: 'Respetamos tu calma: puedes salir del círculo cuando quieras.',
    toastOk: 'Bienvenido al círculo',
    toastError: 'No pudimos completar tu suscripción',
    toastErrorHint: 'Introduce un correo válido e inténtalo de nuevo.',
  },

  footer: {
    explore: 'Explorar',
    practicesCol: 'Prácticas',
    tagline: 'espacio de consciencia',
    about:
      'Un espacio abierto para compartir prácticas de meditación, presencia consciente y respiración. La vida sucede ahora: el resto, solo lo recordamos.',
    links: {
      practices: 'Prácticas',
      breathing: 'Respiración guiada',
      meditations: 'Meditaciones con audio',
      sanctuary: 'Santuario de práctica',
      traditions: 'Tradiciones',
      topics: 'Temas',
      community: 'Comunidad',
    },
    practiceLinks: {
      start: 'Meditación para comenzar',
      presence: 'Presencia consciente',
      square: 'Respiración cuadrada',
      sleep: 'Calma profunda para dormir',
      pause: 'Pausa de un minuto',
      walking: 'Meditación caminando',
    },
    copyright: '© 2026 Presencia AQUÍ y AHORA · Un espacio para compartir espiritualidad',
    madeWith: 'Hecho con',
    andPresence: 'y presencia',
  },
}

export type Dict = typeof es
