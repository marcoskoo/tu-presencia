// English dictionary — must match the structure of `es` (Dict type).
import type { Dict } from './es'

export const en: Dict = {
  langName: 'English',
  locale: 'en-US',

  common: {
    close: 'Close',
    closeDialog: 'Close the tool and go back',
    cancel: 'Cancel',
    save: 'Save',
    saved: 'Saved',
    remove: 'Delete',
    download: 'Download',
    copy: 'Copy',
    copied: 'Copied',
    reset: 'Reset',
    pause: 'Pause',
    play: 'Play',
    stop: 'Stop',
    continue: 'Continue',
    begin: 'Begin',
    finish: 'Done',
    minutes: 'minutes',
    min: 'min',
    sec: 's',
    back: 'Back',
    openGuide: 'Open the guide',
    practiceNow: 'Practice now',
    audioEs: 'Audio in Spanish',
    premium: 'Presence+',
    loading: 'Loading…',
  },

  nav: {
    practices: 'Practices',
    breathing: 'Breathing',
    meditations: 'Meditations',
    sanctuary: 'Sanctuary',
    topics: 'Topics',
    traditions: 'Traditions',
    community: 'Community',
    premium: 'Presence+',
    breatheNow: 'Breathe now',
    pause3: '3-min pause',
    language: 'Language',
    languageShort: 'EN',
    installApp: 'Install the app',
    menuOpen: 'Open navigation menu',
    themeLight: 'Switch to sunrise mode',
    themeDark: 'Switch to night mode',
    home: 'Presence HERE and NOW · home',
    brandTagline: 'a space for awareness',
    mobileNav: 'Mobile navigation',
    mainNav: 'Main navigation',
  },

  hero: {
    ariaLabel: 'Welcome',
    badge: 'Spirit · Practice · Community',
    titleA: 'Life happens',
    titleHere: 'HERE',
    titleAnd: 'and',
    titleNow: 'NOW',
    subtitle:
      'An open space to share and cultivate spirituality in daily life: meditation, conscious presence and mindful breathing to return, instant by instant, to the only place where life is actually happening.',
    ctaPrimary: 'Breathe now',
    ctaSecondary: 'Explore the practices',
    chips: [
      'Meditation melodies',
      'Conscious presence',
      'Breathing',
      'Audio with bells',
      'Silence',
      'Gratitude',
    ],
    chipsLabel: 'Topics of the space',
  },

  practices: {
    eyebrow: 'The three gates',
    titleA: 'Paths into the',
    titleB: 'present',
    description:
      'No need to retreat to a mountain. These three practices are cultivated right here, between morning coffee and the noise of the world, to remember what you never stopped being.',
    discoverAll: 'Discover all the topics',
    cards: [
      {
        title: 'Meditation',
        subtitle: '',
        description:
          'The art of quieting the mind and inhabiting the silence you already are. Step-by-step guides to settle attention, without demands or hurry.',
        points: [
          'Posture and bodily anchor',
          'Attention on the breath',
          'A gentle return to the present',
        ],
        quote: '«Learn to be still and discover who you are in silence.»',
      },
      {
        title: 'Conscious presence',
        subtitle: 'HERE and NOW',
        description:
          'Waking up from autopilot. The practice of noticing this instant as it happens: the sounds, the body, life exactly as it is.',
        points: [
          'Observation without judgment',
          'Release from mental noise',
          'Presence in the everyday',
        ],
        quote:
          '«The present is the only time there is. Everything else is memory or imagination.»',
      },
      {
        title: 'Mindful breathing',
        subtitle: '',
        description:
          'The most direct bridge between body and mind. Guided breathing techniques to calm you, center you and bring you back home at any moment.',
        points: [
          'Box breathing',
          'Coherent breathing',
          'Relaxing 4·7·8 breath',
        ],
        quote:
          '«Where the breath goes, attention goes. Where attention goes, life goes.»',
      },
    ],
  },

  breathing: {
    eyebrow: 'Live guided practice',
    titleA: 'Breathe',
    titleB: 'with me',
    description:
      'Choose a technique, sit comfortably and let the circle guide your breath: as it grows, inhale; as it holds, retain; as it returns, exhale.',
    chooseTechnique: 'Choose a breathing technique',
    startQuestion: 'Shall we begin?',
    pausedSession: 'Session paused',
    phaseLive: (phase: string, secs: number) => `${phase}, ${secs} seconds left`,
    controls: {
      start: 'Begin',
      pause: 'Pause the practice',
      begin: 'Begin the practice',
      restart: 'Restart the session',
      soundOn: 'Turn on the phase chime',
      soundOff: 'Turn off the phase chime',
      paused: 'Pause',
      goOn: 'Continue',
    },
    soundHint: 'The little bell rings at each phase change to guide you with eyes closed.',
    stats: {
      cycles: 'Complete cycles',
      time: 'Time in practice',
      cycleOf: 'Cycle of',
    },
    benefitsLabel: 'Benefits of mindful breathing',
    benefits: [
      'Balances your heart rhythm',
      'Reduces stress and anxiety',
      'Prepares deep sleep',
      'Brings clarity and centeredness',
    ],
    techniques: {
      caja: {
        name: 'Box breathing',
        description:
          'Four equal phases drawing a square with your breath. It balances the nervous system and sharpens attention. Ideal for daily life.',
        phases: ['Inhale', 'Hold', 'Exhale', 'Pause'],
      },
      coherente: {
        name: 'Coherent breathing',
        description:
          'Five breaths per minute synchronize heart and mind. The favorite practice to recover calm within minutes.',
        phases: ['Inhale', 'Exhale'],
      },
      relajante: {
        name: '4 · 7 · 8 breathing',
        description:
          'The tranquilizing breath: inhale softly, hold, exhale long. Perfect for releasing tension before sleep.',
        phases: ['Inhale', 'Hold', 'Exhale'],
      },
      ujjayi: {
        name: 'Ujjayi · Ocean breath',
        description:
          'The “victorious breath” of yoga: a slight throat constriction turns your breath into the sound of waves. Calming and focusing at once.',
        phases: ['Inhale', 'Exhale with waves'],
      },
      suspiro: {
        name: 'Physiological sigh',
        description:
          'The body’s natural way to release stress: two stacked inhales and one long exhale. The fastest route to calm.',
        phases: ['Inhale', 'Inhale a bit more', 'Long exhale'],
      },
      alternada: {
        name: 'Alternate nostril breathing',
        description:
          'Alternate the air between nostrils to balance body and mind. A full cycle takes 28 seconds and covers both sides.',
        phases: [
          'Inhale left',
          'Hold',
          'Exhale right',
          'Inhale right',
          'Hold',
          'Exhale left',
        ],
      },
      abeja: {
        name: 'Bee breath',
        description:
          'Exhaling with a soft hum, the vibration masks the noise of the mind and prepares you for rest. Ideal at the end of the day.',
        phases: ['Inhale', 'Hum as you exhale'],
      },
    },
  },

  meditations: {
    eyebrow: 'Meditation melodies with audio',
    titleA: 'Listen, breathe,',
    titleB: 'return',
    description:
      'Serene meditation melodies with Tibetan bowls and bells. Choose one, put on your headphones and let the music walk you back to the present.',
    listLabel: 'List of meditation melodies',
    tip: 'Tip: find a quiet place, use headphones if you can, and silence your phone. This is your time.',
    sectionLabel: 'Meditation melodies with audio',
    player: {
      position: 'Meditation position',
      rewind: 'Rewind ten seconds',
      forward: 'Forward ten seconds',
      speed: (rate: number) =>
        `Playback speed: ${rate} times. Press to change`,
      pauseTitle: (title: string) => `Pause “${title}”`,
      playTitle: (title: string) => `Play “${title}”`,
      pause: 'Pause',
      play: 'Play',
    },
    bell: {
      title: 'Bell of presence',
      description:
        'Ring it whenever you catch yourself far from the present: let its resonance carry you back, HERE and NOW. Let it ring fully, in no hurry to return to anything.',
      stop: 'Silence the bell of presence',
      play: 'Ring the bell of presence',
    },
    items: {
      presencia: {
        title: 'Presence HERE and NOW',
        tag: 'Presence',
        duration: '≈ 5 min',
        description:
          'The essential practice of this space: sounds, body and breath bring you back, instant by instant, to the here and now.',
      },
      escaneo: {
        title: 'Relaxing body scan',
        tag: 'Relaxation',
        duration: '≈ 5 min',
        description:
          'A warm, slow melody to travel through the body from feet to head and release tension in stillness.',
      },
      dormir: {
        title: 'Deep calm for sleep',
        tag: 'Rest',
        duration: '≈ 4 min',
        description:
          'Prepares body and mind for serene sleep. Play it already in bed, lights low and in no hurry.',
      },
      pausa: {
        title: 'One-minute pause',
        tag: 'In an instant',
        duration: '≈ 1 min',
        description:
          'One minute to breathe and return. Perfect between tasks, before a meeting, or in any pause of the day.',
      },
      caminando: {
        title: 'Walking meditation',
        tag: 'In movement',
        duration: '≈ 9 min',
        description:
          'A serene melody that accompanies your steps and turns the walk into meditation in motion.',
      },
      yogaNidra: {
        title: 'Yoga nidra · Deep relaxation',
        tag: 'Deep rest',
        duration: '≈ 9 min',
        description:
          'Yogic sleep: lying down with the mind awake, let the melody carry you into deep rest.',
      },
      extendida: {
        title: 'Brief retreat · Extended presence',
        tag: 'Silence',
        duration: '≈ 16 min',
        description:
          'Sixteen minutes of essential presence: a very serene melody and long silences. The flagship practice of Presence+.',
      },
    },
  },

  topics: {
    eyebrow: 'A living library',
    titleA: 'Topics to',
    titleB: 'explore',
    description:
      'Brief yet deep guides: choose a topic, open it calmly and carry it into your day. Each guide includes the step-by-step practice.',
    sectionLabel: 'Topics to explore',
    stepsTitle: 'The practice, step by step',
    practiceBreathing: 'Practice breathing now',
    items: {
      iniciar: {
        title: 'Meditation for beginners',
        description:
          'Your first meditation, calmly explained: posture, anchor and the art of returning without judging yourself.',
        duration: '10 min',
        level: 'Beginner',
        intro:
          'Meditating is not stopping thought: it is changing your relationship with thoughts. In this first practice you will learn to use the breath as an anchor and to return to it, again and again, with kindness.',
        steps: [
          'Sit with a dignified but comfortable back, hands on your thighs, eyes closed or in a soft gaze.',
          'Bring attention to the natural sensation of breathing in your nose or abdomen.',
          'Mentally count each exhale from 1 to 10 and start again.',
          'When the mind wanders —and it will—, notice without judgment and return to 1. That return IS the practice.',
        ],
        closing:
          'Close with three deep breaths and open your eyes slowly. You have already taken the first step.',
      },
      presente: {
        title: 'The art of inhabiting the present',
        description:
          'Micro-practices of conscious presence to wake from autopilot in the middle of the day.',
        duration: '5 min',
        level: 'Everyday',
        intro:
          'Conscious presence needs no cushion or temple: it is trained in the supermarket line, while washing dishes, in a conversation. HERE and NOW is a muscle strengthened by small gestures.',
        steps: [
          'Stop for an instant and ask yourself: “Am I here, or am I in my thoughts?”',
          'Silently name three things you perceive with your senses right now: a sound, a texture, a color.',
          'Feel the weight of your body against the chair or the floor. Let gravity hold you.',
          'Observe your emotional state without changing it: “there is calm”, “there is hurry”, “there is tiredness”.',
        ],
        closing:
          'Repeat this cycle several times a day. Each awakening lasts seconds; their sum transforms your life.',
      },
      cuadrada: {
        title: 'Box breathing, step by step',
        description:
          'The 4·4·4·4 technique used by Navy SEALs and monks alike to center themselves in seconds.',
        duration: '5 min',
        level: 'All levels',
        intro:
          'Box breathing draws four equal sides with your breath. Its regularity sends the nervous system a clear message: “we are safe, we can rest.”',
        steps: [
          'Exhale all the air through your mouth, preparing the space.',
          'Inhale through the nose counting to 4, filling the belly first.',
          'Hold the air counting to 4, with throat and shoulders relaxed.',
          'Exhale gently through the nose counting to 4 and hold the emptiness for another 4. Repeat 8 cycles.',
        ],
        closing:
          'If you feel dizzy, shorten the phases to 3·3·3·3. You can practice it right here with our guiding circle.',
      },
      caminando: {
        title: 'Walking meditation',
        description:
          'Every step, a miracle. Turn a fifteen-minute walk into meditation in motion.',
        duration: '15 min',
        level: 'Intermediate',
        intro:
          'Walking can be a commute or a temple. The difference is attention. This practice, cherished by the Zen tradition, invites you to arrive at each step with your whole being.',
        steps: [
          'Walk slower than usual, as if you had no destination.',
          'Feel the full cycle of the step: heel, sole, toes, lift-off.',
          'Sync one step with half an inhalation and the next with half an exhalation.',
          'Open the senses: wind on the skin, scents, birds. The world is meditating with you too.',
        ],
        closing:
          'At the end, stop for a moment and thank your feet for carrying you, present, all the way here.',
      },
      observador: {
        title: 'The silent witness',
        description:
          'Discover the witness behind your thoughts: the stillness that contemplates it all.',
        duration: '12 min',
        level: 'Intermediate',
        intro:
          'You can observe your thoughts because you are not your thoughts. Behind mental noise there is a quiet presence that watches: that is your deepest home. This practice brings you closer to it.',
        steps: [
          'Close your eyes and let thoughts drift like clouds in the sky.',
          'Don’t follow them or reject them: just notice. “There goes a memory”, “there goes a to-do list”.',
          'Ask yourself gently: “who is the one observing?” and rest in that openness.',
          'Stay in the silence between thoughts, even if it lasts an instant. That is where you are.',
        ],
        closing:
          'The witness is not reached through effort, but through stillness. Return to this practice when the world asks too much.',
      },
      gratitud: {
        title: 'Gratitude and an open heart',
        description:
          'The practice that re-educates the heart to notice what is already well, here and now.',
        duration: '8 min',
        level: 'All levels',
        intro:
          'The mind is trained to detect what is missing. Gratitude re-educates it to celebrate what is there. It is not naïve optimism: it is an honest way of looking at the abundance of this instant.',
        steps: [
          'Place a hand on your chest and feel the heartbeat that has accompanied you since before you were born.',
          'Name three graces: something simple from today, someone who holds you, something about yourself you appreciate.',
          'With each thank-you, inhale and feel a warmth expanding in your chest.',
          'Finish by directing a sincere wish of well-being toward someone you love.',
        ],
        closing:
          'Gratitude practiced daily turns the ordinary into enough. That is the silent miracle.',
      },
    },
  },

  quotes: {
    eyebrow: 'Voices that illuminate',
    sectionLabel: 'Quotes that inspire presence',
    carouselLabel: 'Carousel of spiritual quotes',
    prev: 'Previous quote',
    next: 'Next quote',
    selectLabel: 'Select quote',
    goTo: (i: number, author: string) => `Go to quote ${i + 1}: ${author}`,
    dailyTitle: 'Your phrase for today',
    dailyHint: 'Take the phrase of the day as an image, for your phone or to share.',
    dailyButton: 'Download today’s phrase',
    generating: 'Creating your image…',
    dailyCaption: 'phrase of the day',
    list: [
      {
        text: 'Life is available only in the present moment.',
        author: 'Thich Nhat Hanh',
        role: 'Zen master and poet of peace',
      },
      {
        text: 'Realize deeply that the present moment is all you ever have. Make the Now the primary focus of your life.',
        author: 'Eckhart Tolle',
        role: 'Author of “The Power of Now”',
      },
      {
        text: 'Nature does not hurry, yet everything is accomplished.',
        author: 'Lao Tzu',
        role: 'Tao Te Ching',
      },
      {
        text: 'Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.',
        author: 'Rumi',
        role: 'Sufi poet',
      },
      {
        text: 'Your own Self-realization is the greatest service you can render the world.',
        author: 'Ramana Maharshi',
        role: 'Sage of Arunachala',
      },
      {
        text: 'Peace is this moment without judgment. Is it that simple? Yes, it is that simple.',
        author: 'Byron Katie',
        role: 'Author of “Loving What Is”',
      },
      {
        text: 'Between stimulus and response there is a space. In that space is our power to choose.',
        author: 'Viktor Frankl',
        role: 'Psychiatrist and writer',
      },
      {
        text: 'Silence is the language of God; all else is poor translation.',
        author: 'Rumi',
        role: 'Sufi poet',
      },
      {
        text: 'You can’t stop the waves, but you can learn to surf.',
        author: 'Jon Kabat-Zinn',
        role: 'Creator of the MBSR program',
      },
      {
        text: 'When you realize nothing is lacking, the whole world belongs to you.',
        author: 'Lao Tzu',
        role: 'Tao Te Ching',
      },
      {
        text: 'The present is not a point in time: it is a door into eternity.',
        author: 'Anthony de Mello',
        role: 'Jesuit priest and writer',
      },
      {
        text: 'Breathe. You are home.',
        author: 'Thich Nhat Hanh',
        role: 'Zen master and poet of peace',
      },
    ],
  },

  traditions: {
    eyebrow: 'One river, many shores',
    titleA: 'Contemplative wisdoms of the',
    titleB: 'world',
    description:
      'Presence has no owner. Each tradition has kept, in its own language, a path into the here and now. Choose a shore and drink from its water.',
    explore: 'Explore the tradition',
    items: {
      budista: {
        name: 'Buddhism',
        essence:
          'Mindfulness and compassion: observing the mind kindly until it quiets on its own.',
        practices: [
          {
            name: 'Anapanasati · Mindfulness of breath',
            description:
              'The Buddha taught to anchor the mind in the sensation of breath. The most direct practice of returning to the body.',
            tool: 'breathing',
          },
          {
            name: 'Walking meditation',
            description:
              'Every step, a place of arrival. The complete melody awaits you in the sanctuary.',
            tool: 'walking',
          },
          {
            name: 'Metta · Loving-kindness',
            description:
              'Wishing well, first to yourself, then to all beings. A heart trained in kindness.',
            tool: 'meditations',
          },
        ],
      },
      cristiana: {
        name: 'Contemplative Christianity',
        essence: 'Silence as prayer: resting in the presence that holds all things.',
        practices: [
          {
            name: 'Centering prayer',
            description:
              'A sacred word and a gentle return to it: consenting to presence in silence.',
            tool: 'timer',
          },
          {
            name: 'Lectio divina',
            description:
              'Reading a sacred text slowly, chewing it until it reads you.',
            tool: 'topics',
          },
          {
            name: 'The Ignatian examen',
            description:
              'Reviewing the day to find where the good was, and giving thanks. Gratitude applied.',
            tool: 'gratitude',
          },
        ],
      },
      sufi: {
        name: 'Sufism',
        essence:
          'The heart’s longing and continuous remembrance: losing sight of yourself to find yourself.',
        practices: [
          {
            name: 'Dhikr · The remembrance',
            description:
              'Repeating the names of the sacred until the heart awakens from forgetting.',
            tool: 'mantra',
          },
          {
            name: 'Sama · The listening',
            description:
              'The music and whirling of the dervishes: listening until thought settles.',
            tool: 'sounds',
          },
          {
            name: 'The poetry of Rumi',
            description:
              'Read one verse and stay with it, like a bee on a flower. Every poem, a practice.',
            tool: 'quotes',
          },
        ],
      },
      vedanta: {
        name: 'Vedanta',
        essence:
          'The question “who am I?” as a lantern: seeking the seeker until you discover you were never missing.',
        practices: [
          {
            name: 'Self-inquiry',
            description:
              'Ramana Maharshi summed it up: ask “who am I?” and turn attention back to its source.',
            tool: 'meditations',
          },
          {
            name: 'Mantra and japa',
            description:
              'Repeating a sacred sound with a 108-bead mala. You will find it in the sanctuary.',
            tool: 'mantra',
          },
          {
            name: 'Yoga nidra',
            description:
              'The deep rest of the tantric tradition, with awareness fully awake.',
            tool: 'nidra',
          },
        ],
      },
      taoista: {
        name: 'Taoism',
        essence:
          'Wu wei: not forcing. Flowing with the course of things as water flows, soft and powerful.',
        practices: [
          {
            name: 'Standing qigong',
            description:
              'Upright stillness, slow breathing and floating hands: cultivating the breath gently.',
            tool: 'breathing',
          },
          {
            name: 'Walking without destination',
            description:
              'As in the Zhuangzi: strolling without purpose, letting the path teach.',
            tool: 'walking',
          },
          {
            name: 'The inner smile',
            description:
              'Directing a soft smile to every part of the body. Simplicity that heals.',
            tool: 'nidra',
          },
        ],
      },
      abierta: {
        name: 'Non-denominational',
        essence:
          'Naked presence, without labels: any tradition, none in particular. Just this instant.',
        practices: [
          {
            name: 'Three-minute pause',
            description:
              'Breathe, be silent, return. The minimal and complete practice for daily life.',
            tool: 'pause',
          },
          {
            name: 'Gratitude journal',
            description:
              'Three honest lines every night. The mind re-educates itself by celebrating what is.',
            tool: 'gratitude',
          },
          {
            name: 'Deep listening to sounds',
            description:
              'Mix rain, river and singing bowls, and rest in listening. No technique, no effort.',
            tool: 'sounds',
          },
        ],
      },
    },
  },

  sanctuary: {
    eyebrow: 'Your contemplative toolbox',
    titleA: 'The',
    titleB: 'sanctuary',
    description:
      'Ten interactive practices to accompany you at any moment of the day: contemplative dialogue with AI, timer, sounds, malas, oracle and more. Everything happens in your browser, at your own pace.',
    open: (name: string) => `Open ${name}`,
    sectionLabel: 'Practice sanctuary',
    companion: {
      name: 'Dialogue with the silence',
      short: 'Share how you are and receive contemplative company (AI).',
    },
    timer: {
      name: 'Meditation timer',
      short: 'Silence with bells at the start, the end and in between.',
    },
    sounds: {
      name: 'Sound mixer',
      short: 'Rain, river, forest, bowls and wind: create your ambience.',
    },
    walking: {
      name: 'Walking meditation',
      short: 'Serene melody to practice in motion.',
    },
    nidra: {
      name: 'Yoga nidra',
      short: 'Deep relaxation with melody, lying down and awake.',
    },
    mantra: {
      name: 'Mantras and digital mala',
      short: '108 beads with vibration and an Om drone.',
    },
    gratitude: {
      name: 'Gratitude journal',
      short: 'One question a day, saved just for you.',
    },
    oracle: {
      name: 'Contemplative oracle',
      short: 'A card, a message and a micro-practice.',
    },
    analytics: {
      name: 'Your practice in numbers',
      short: 'Minutes, sessions and favorite practices.',
    },
    reminders: {
      name: 'Presence reminder',
      short: 'A gentle bell at the hour you choose.',
    },
  },

  timer: {
    durations: 'Duration',
    custom: 'Custom',
    customMinutes: 'Minutes (1–90)',
    interval: 'Interval bells',
    intervalNone: 'No bells',
    everyMin: (n: number) => `Every ${n} min`,
    prepare: 'Get ready…',
    running: 'Meditating',
    remaining: 'Time remaining',
    finished: 'The meditation has ended',
    finishedHint: 'Take three breaths before going back to the screen.',
    start: 'Begin meditating',
    stop: 'End early',
    stopped: 'Session saved to your practice log',
    premiumLock: 'Sessions longer than 30 minutes are part of Presence+',
    upgrade: 'See Presence+',
    logged: (min: number) => `${min} min of meditation added to your log`,
    prepLabel: 'Preparation',
    minutesUnit: 'min',
  },

  sounds: {
    title: 'Sound mixer',
    hint: 'Tap several layers at once and adjust their volume. The sounds are generated in your browser: no downloads, infinite loop.',
    master: 'Master volume',
    activeLayers: (n: number) =>
      n === 0 ? 'No active layers' : n === 1 ? '1 active layer' : `${n} active layers`,
    stopAll: 'Silence all',
    autoStop: 'Turn off after',
    timerOff: 'No limit',
    logged: (min: number) => `${min} min of listening added to your log`,
    layerVolume: (name: string) => `${name} volume`,
    layers: {
      lluvia: 'Rain',
      rio: 'River',
      bosque: 'Forest',
      cuencos: 'Bowls',
      viento: 'Wind',
    },
  },

  walking: {
    title: 'Walking meditation',
    intro:
      'Put on your headphones, choose a quiet and safe place, and let the melody accompany you as you walk.',
    audioMode: 'Full melody',
    bellMode: 'Bells only',
    bellEvery: 'Bell every',
    whileWalking: 'While you walk',
    steps: [
      'Walk slower than usual, as if you had no destination.',
      'Feel the cycle of the step: heel, sole, toes, lift-off.',
      'Sync breath with step: two steps to inhale, two to exhale.',
      'Open the senses: wind, scents, sounds. The world walks with you.',
    ],
    playGuide: 'Play the melody',
    pauseGuide: 'Pause the melody',
  },

  nidra: {
    title: 'Yoga nidra',
    intro:
      'Lie on your back, arms away from your body, palms up. Close your eyes and let the floor hold you.',
    tips: [
      'Keep warm: body temperature drops during deep relaxation.',
      'Don’t fight sleep: if you drift off, you are resting too.',
      'Set a short intention before starting: you will repeat it during the practice.',
    ],
    listen: 'Listen to the full melody',
    pause: 'Pause the melody',
  },

  mantra: {
    title: 'Digital mala',
    round: 'Round',
    of: 'of 108',
    count: 'Bead',
    beadHint: 'Tap the big bead (or press the space bar) with each repetition of the mantra.',
    restart: 'Restart the round',
    omToggle: 'Om drone',
    omHint: 'A soft tone holds your practice while you repeat.',
    vibration: 'Vibration',
    chooseMantra: 'Choose your mantra',
    meaning: 'meaning',
    mantras: {
      om: { name: 'Om', text: 'ॐ Om', meaning: 'The primordial sound of the universe' },
      mani: {
        name: 'Om Mani Padme Hum',
        text: 'ॐ मणि पद्मे हूँ',
        meaning: 'The jewel in the lotus: compassion and wisdom together',
      },
      soham: { name: 'So’Ham', text: 'सोऽहम् So’Ham', meaning: 'I am That' },
      maranatha: {
        name: 'Maranatha',
        text: 'Maranatha',
        meaning: 'Come, Lord · prayer of the desert fathers',
      },
      la: {
        name: 'La ilaha illa Allah',
        text: 'لا إله إلا الله',
        meaning: 'There is no god but God · Sufi dhikr',
      },
    },
    roundComplete: 'Round complete: 108 repetitions',
    logged: (rounds: number) =>
      `${rounds} ${rounds === 1 ? 'round' : 'rounds'} of japa added to your log`,
  },

  gratitude: {
    title: 'Gratitude journal',
    promptLabel: 'Today’s question',
    writeHere: 'Write from the heart…',
    save: 'Save to the journal',
    savedToast: 'Your gratitude is saved. Only you read it.',
    emptyToast: 'Write a few words first, even if they are few.',
    listTitle: 'Previous entries',
    empty: 'Your journal is blank. Three lines each night are enough.',
    deleteOne: 'Delete this entry',
    confirmDelete: 'Delete this entry? This action cannot be undone.',
    privateNote: 'Your words are stored only on this device. Nobody else sees them.',
    prompts: [
      'What small gift did you receive today without asking?',
      'What part of your body held you today and deserves a thank-you?',
      'What moment today brought you, even for a second, into the present?',
      'Who crossed your path today and left something good behind?',
      'What simple thing —a taste, a scent, a light— brightened your day?',
      'What do you have today that your self from a year ago would be grateful for?',
      'What about yourself do you want to thank tonight?',
    ],
  },

  oracle: {
    title: 'Contemplative oracle',
    subtitle: 'Breathe once, silently ask your question… and choose a card.',
    drawDaily: 'The card of the day',
    drawAnother: 'Draw another card',
    shuffling: 'Shuffling…',
    flip: 'Flip the card',
    yourCard: 'Your card',
    messageTitle: 'The message',
    practiceTitle: 'The micro-practice',
    copy: 'Copy message',
    copied: 'Message copied. Share it with whoever needs it.',
    sameDayNote: 'This is your card for today: come back tomorrow for a new one.',
    dailyLabel: 'card of the day',
    cards: [
      {
        name: 'The Mountain',
        message:
          'Not everything that weighs on you is yours. The mountain does not move when clouds pass: watch the cloud, be the mountain.',
        practice: 'Name a worry out loud and watch how it changes as you look at it.',
      },
      {
        name: 'The River',
        message:
          'The river never argues with the stone: it surrounds it with patience. What slows you down today will carve you tomorrow.',
        practice: 'Do one thing today without hurrying, at the pace of water.',
      },
      {
        name: 'The Seed',
        message:
          'Something in you is underground and cannot be seen yet. Do not dig up the seed to check whether it grows.',
        practice: 'Write a small intention and keep it without rereading it for a week.',
      },
      {
        name: 'The Bell',
        message:
          'Sound comes and goes; listening remains. Do not cling to the beautiful moment: cling to the space that contains it.',
        practice: 'Listen to one sound until it disappears completely.',
      },
      {
        name: 'The Cloud',
        message:
          'Your mood is also weather, not sky. It will pass. And you, who watch it pass, will remain.',
        practice: 'Say silently “this too shall pass”, three times, gently.',
      },
      {
        name: 'The Moon',
        message:
          'Not everything is seen under direct light. What you illuminate head-on blinds you; what you accompany from the side speaks to you.',
        practice: 'Look at a problem of your day from an angle, without attacking it head-on.',
      },
      {
        name: 'The Mirror',
        message:
          'What bothers you most about others usually lives in your own house. The mirror does not judge: it shows.',
        practice: 'Name, without guilt, something that irritated you today and ask: where does it live in me?',
      },
      {
        name: 'The Root',
        message:
          'You can bend in the storm if you are well rooted. Depth is not seen: it is felt when the wind blows.',
        practice: 'Sit for one minute feeling the contact of your feet with the floor.',
      },
      {
        name: 'The Fire',
        message:
          'There are passions that burn and passions that illuminate. The same fire that destroys heats the house if tended.',
        practice: 'Channel an intense energy today into something concrete and small.',
      },
      {
        name: 'The Door',
        message:
          'You are knocking on a half-open door. Sometimes what you call a “block” only asks to be pushed slowly.',
        practice: 'Take a minimal step toward what you postpone: a message, one line.',
      },
      {
        name: 'The Nest',
        message:
          'Caring for your space is not weakness: it prepares the place where something will be born. The bird weaves before flying.',
        practice: 'Tidy one corner of your home today, however tiny.',
      },
      {
        name: 'The Compass',
        message:
          'You do not know the way, but you know the north. When the mind demands complete maps, give it a direction and one step.',
        practice: 'Define your north for this week in one sentence and let that be enough.',
      },
      {
        name: 'The Rain',
        message:
          'What is delayed today is watering you. There are slow times that are not losses: they are sowing.',
        practice: 'Give fifteen unproductive minutes to something that nourishes you.',
      },
      {
        name: 'The Dawn',
        message:
          'Darkness is not fought: it is waited out awake. No night has yet beaten a sunrise.',
        practice: 'Identify one small light of your day and thank it in writing.',
      },
      {
        name: 'The Ensō',
        message:
          'The Zen circle is drawn in a single stroke, imperfection included. Your day is art too, even if it is not perfect.',
        practice: 'Do something today deliberately imperfect and enjoy it anyway.',
      },
      {
        name: 'The Tide',
        message:
          'No one stops the tide by arguing with it. There are great forces that can only be sailed: row or rest, but do not fight the sea.',
        practice: 'Choose one battle you will not fight today, and be at peace with it.',
      },
      {
        name: 'The Candle',
        message:
          'A candle does not light the whole room: it lights just enough. Your task is not to see the whole path, but the next step.',
        practice: 'Reduce today’s list to what fits under this light: a single thing.',
      },
      {
        name: 'The Bamboo',
        message:
          'Bamboo spends years growing roots before shooting up. The invisible also advances.',
        practice: 'Do one action today that will only bear fruit in time, and trust.',
      },
    ],
  },

  analytics: {
    title: 'Your practice in numbers',
    weekMinutes: 'Minutes this week',
    totalSessions: 'Total sessions',
    streakDays: 'Days in a row',
    favorite: 'Most frequent practice',
    last14: 'Last 14 days',
    byPractice: 'By practice',
    sessionsShort: (n: number) => (n === 1 ? '1 session' : `${n} sessions`),
    minutesShort: (n: number) => `${n} min`,
    empty: 'No practice logged yet',
    emptyHint:
      'Every time you meditate, breathe or use a sanctuary tool, it is added here automatically.',
    clear: 'Clear my log',
    confirmClear: 'Clear the whole practice log? This action cannot be undone.',
    types: {
      meditation: 'Meditation with melody',
      timer: 'Silent meditation',
      breathing: 'Mindful breathing',
      walking: 'Walking meditation',
      nidra: 'Yoga nidra',
      mantra: 'Mantra and japa',
      sounds: 'Sound listening',
      pause: '3-minute pause',
      gratitude: 'Gratitude journal',
      oracle: 'Oracle',
    },
  },

  reminders: {
    title: 'Presence reminder',
    description: 'Choose a time and the bell will gently remind you to return to the present.',
    timeLabel: 'Reminder time',
    enable: 'Enable reminder',
    enabled: 'Reminder active',
    disabled: 'Reminder off',
    askPermission: 'Allow notifications',
    granted: 'Notifications allowed',
    denied: 'Notifications blocked',
    deniedHint: 'Enable them in your browser settings if you want to receive them.',
    test: 'Test the bell',
    note: 'The reminder rings while this page or the installed app is open. Background notifications are coming soon.',
    body: 'It is your moment of presence. One breath is enough.',
    notifyTitle: 'Presence HERE and NOW',
    saved: 'Reminder saved',
  },

  premium: {
    eyebrow: 'Support and deepen',
    titleA: 'Presence',
    titleB: '+',
    description:
      'Everything essential in the sanctuary is and will remain free. Presence+ adds depth and sustains this space without ads.',
    freeName: 'Open circle',
    freePrice: 'Free',
    freeDesc: 'Everything essential to start and sustain a practice.',
    freeFeatures: [
      '7 meditation melodies',
      'Guided breathing with 7 techniques',
      'Timer up to 30 minutes',
      'Digital mala, journal, oracle and sounds',
      'Weekly letter of presence',
    ],
    freeCta: 'Already enjoying it',
    plusName: 'Presence+',
    plusPrice: 'US$ 4.99 / month',
    plusDesc: 'For those who want to go deeper, calmly.',
    plusFeatures: [
      'Extended presence retreat · 16 min',
      'Timer up to 90 minutes',
      'New meditations every month',
      'Exclusive soundscapes',
      'You sustain a space without ads or noise',
    ],
    plusCta: 'Join Presence+',
    processing: 'Opening secure checkout…',
    demoTitle: 'Demo mode',
    demoHint:
      'Stripe payment is not configured yet. You can activate demo mode to try Presence+ in full.',
    demoCta: 'Activate Presence+ demo',
    demoActive: 'Presence+ active (demo)',
    demoOff: 'Deactivate demo',
    activated: 'Welcome to Presence+. Thank you for sustaining this space.',
    deactivated: 'Demo mode deactivated',
    error: 'Could not start the payment',
    errorHint: 'Check your connection and try again.',
    activeBadge: 'Presence+ active',
    successToast: 'Thank you! Your membership is active.',
  },

  pause: {
    title: '3-minute pause',
    phase1: 'Breathe',
    phase1Desc: 'Follow the circle: as it grows, inhale; as it returns, exhale.',
    phase2: 'Silence',
    phase2Desc: 'Nothing to do. Just be.',
    phase3: 'Return',
    phase3Desc: 'Move your fingers, open your eyes, stretch.',
    skip: 'Skip phase',
    exit: 'Leave the pause',
    done: 'The pause has ended',
    doneHint: 'Three breaths and back to the world, a little more awake.',
    logged: '3-minute pause added to your log',
    ariaDialog: 'Three-minute pause in progress',
  },

  pwa: {
    install: 'Install the app',
    installHint: 'Works offline and away from tab noise.',
    installed: 'App installed',
    unavailable: 'Your browser does not allow installing it yet',
  },

  reflections: {
    eyebrow: 'Awake community',
    titleA: 'Share your',
    titleB: 'reflection',
    description:
      'What has practice taught you? What moment of presence do you remember? Leave your words here: someone walking the awakening needs them.',
    sectionLabel: 'Community reflections',
    formTitle: 'Your voice in the circle',
    formHint: 'Shared with respect, without judgment or advice.',
    nameLabel: 'Name',
    optional: '(optional)',
    namePlaceholder: 'What is your name?',
    textLabel: 'Your reflection',
    textPlaceholder: 'Today, in the pause of the breath, I noticed that…',
    send: 'Share my reflection',
    sending: 'Sending with calm…',
    wallTitle: 'Recent voices',
    refresh: 'Refresh the reflections',
    empty: 'No voices yet. Be the first to leave a mark in this circle.',
    toasts: {
      loadError: 'The reflections could not be loaded',
      loadErrorHint: 'Try again in a few moments.',
      empty: 'Your reflection is empty',
      emptyHint: 'Write a few words from the heart before sending.',
      sent: 'Thank you for sharing',
      sentHint: 'Your reflection is now part of this circle of awareness.',
      sendError: 'Your reflection could not be sent',
      sendErrorHint: 'Check your connection and try again.',
    },
  },

  newsletter: {
    sectionLabel: 'Join the circle of awareness',
    eyebrow: 'A weekly letter',
    title: 'Join the circle of awareness',
    description:
      'Every week we share a practice, a reflection and a reason to return to the present. No noise, no hurry: just presence in your inbox.',
    placeholder: 'your-email@example.com',
    emailLabel: 'Your email address',
    cta: 'Join the circle',
    sending: 'Joining…',
    calm: 'We respect your calm: you can leave the circle whenever you wish.',
    toastOk: 'Welcome to the circle',
    toastError: 'We could not complete your subscription',
    toastErrorHint: 'Enter a valid email and try again.',
  },

  palette: {
    trigger: 'Open page search (Ctrl·⌘ + K)',
    label: 'Command palette',
    placeholder: 'What do you need right now? Type “meditate”, “sleep”, “language”…',
    noResults: 'No results. Try another word.',
    groups: {
      navigate: 'Go to',
      meditate: 'Listen to a melody',
      actions: 'Quick actions',
      language: 'Change language',
    },
    home: 'Home',
    play: (title: string) => `Listen to “${title}”`,
  },

  companion: {
    greeting:
      'Hello. Here I am, with you in this instant. Tell me what brings you today: you can share how you feel, what you are looking for, or simply greet the silence.',
    placeholder: 'Write calmly whatever you wish to share…',
    send: 'Send to the silence',
    thinking: 'The silence is listening…',
    error: 'The dialogue could not continue right now.',
    retry: 'Try again in a little while',
    disclaimer:
      'A contemplative companionship space powered by AI. It does not replace professional help: if you are going through a crisis, please seek support you can trust.',
    suggestions: [
      'My mind will not quiet down',
      'I need calm before sleep',
      'How do I start meditating?',
      'I feel overwhelmed by the day',
    ],
  },

  notFound: {
    title: 'This page is impermanent too',
    message:
      'What you were looking for is no longer here — or perhaps it never was. Breathe: everything you need is still HERE.',
    back: 'Return to the present',
    breathe: 'Take a 3-minute pause',
  },

  footer: {
    explore: 'Explore',
    practicesCol: 'Practices',
    tagline: 'a space for awareness',
    about:
      'An open space to share practices of meditation, conscious presence and breathing. Life happens now: the rest, we only remember.',
    links: {
      practices: 'Practices',
      breathing: 'Guided breathing',
      meditations: 'Meditations with audio',
      sanctuary: 'Practice sanctuary',
      traditions: 'Traditions',
      topics: 'Topics',
      community: 'Community',
    },
    practiceLinks: {
      start: 'Meditation for beginners',
      presence: 'Conscious presence',
      square: 'Box breathing',
      sleep: 'Deep calm for sleep',
      pause: 'One-minute pause',
      walking: 'Walking meditation',
    },
    copyright: '© 2026 Presence HERE and NOW · A space to share spirituality',
    madeWith: 'Made with',
    andPresence: 'and presence',
  },
}
