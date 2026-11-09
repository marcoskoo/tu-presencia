// Guiones de meditaciones guiadas en español.
// Cada segmento: { text, pause } donde pause = segundos de silencio tras el segmento.

const MEDITATIONS = [
  {
    id: 'presencia',
    title: 'Presencia AQUÍ y AHORA',
    file: 'meditacion-presencia.mp3',
    introBell: true,
    segments: [
      { text: 'Bienvenida, y bienvenido, a este espacio de presencia. Siéntate cómodamente, con la espalda digna pero relajada… y deja que tus ojos se cierren con suavidad.', pause: 7 },
      { text: 'No necesitas hacer nada especial. Simplemente, date cuenta de que estás aquí. Ahora. Este momento es el único que existe.', pause: 9 },
      { text: 'Escucha los sonidos a tu alrededor. Sin nombrarlos, sin rechazarlos. Déjalos pasar, como nubes cruzando el cielo.', pause: 10 },
      { text: 'Siente el peso de tu cuerpo, apoyado en la silla, en el suelo. La tierra te sostiene. Puedes soltar el esfuerzo.', pause: 10 },
      { text: 'Ahora, lleva la atención a tu respiración. No la cambies. Solo obsérvala: el aire entra… y el aire sale.', pause: 12 },
      { text: 'Fresco al entrar. Tibio al salir. Aquí no hay prisa. Todo lo demás puede esperar.', pause: 10 },
      { text: 'Cuando aparezca un pensamiento, y aparecerá, nótalo con amabilidad… y vuelve, suavemente, a la respiración.', pause: 12 },
      { text: 'Volver, una y otra vez. Ese retorno es la práctica. Cada vuelta es un pequeño despertar.', pause: 12 },
      { text: 'Aquí. Ahora. Descansa en este instante. La vida no está en otro lugar: está aquí, respirando contigo.', pause: 15 },
      { text: 'Toma un aire profundo… y déjalo ir despacio. Cuando estés listo, abre los ojos con suavidad.', pause: 6 },
      { text: 'Gracias por practicar. Lleva esta presencia contigo, al resto de tu día.', pause: 4 },
    ],
  },
  {
    id: 'escaneo',
    title: 'Escaneo corporal relajante',
    file: 'meditacion-escaneo.mp3',
    introBell: true,
    segments: [
      { text: 'Ponte cómodo, cierra los ojos… y respira hondo un par de veces, preparando el cuerpo para soltar.', pause: 6 },
      { text: 'Lleva la atención a los pies. Dedos, plantas, talones. Nota el contacto, la temperatura… y deja que se relajen.', pause: 8 },
      { text: 'Sube hacia los tobillos y las pantorrillas. Si hay tensión, no la pelees. Solo obsérvala, y permite que se ablande.', pause: 8 },
      { text: 'Rodillas, muslos, caderas. Pesados, tranquilos, apoyados en la tierra.', pause: 8 },
      { text: 'Ahora el vientre. Es el lugar donde habita la respiración. Déjalo expandirse, sin forzar nada.', pause: 8 },
      { text: 'Siente la espalda, vértebra a vértebra, desde la base hasta los hombros. Si sostiene carga, deja que la baje hacia el suelo.', pause: 8 },
      { text: 'Hombros… cuello… mandíbula. Aquí se esconde tanto del día. Suelta la mandíbula, separa un poco los dientes, relaja la lengua.', pause: 8 },
      { text: 'Ojos, frente, cuero cabelludo. Suave, liso, en calma.', pause: 8 },
      { text: 'Ahora siente el cuerpo entero, como una sola pieza que respira. Nada que arreglar. Todo está bien.', pause: 12 },
      { text: 'Respira profundo… estira suavemente si tu cuerpo lo pide… y abre los ojos, volviendo con presencia.', pause: 5 },
      { text: 'Tu cuerpo te ha acompañado todo el día. Gracias por escucharlo.', pause: 4 },
    ],
  },
  {
    id: 'dormir',
    title: 'Calma profunda para dormir',
    file: 'meditacion-dormir.mp3',
    introBell: true,
    segments: [
      { text: 'Acuéstate, y deja que tu cuerpo se hunda en el colchón. Esta noche no hay nada que resolver. Solo descansar.', pause: 8 },
      { text: 'Respira lento. Al inhalar, cuenta hasta cuatro. Al exhalar, cuenta hasta seis. El aire hace el trabajo; tú solo acompañas.', pause: 10 },
      { text: 'Con cada exhalación, siente cómo el cuerpo se vuelve más pesado, más tibio, más quieto.', pause: 10 },
      { text: 'Los pensamientos del día pueden pasar. No los sigas. Se apagarán solos, como luces que se van apagando poco a poco.', pause: 12 },
      { text: 'Recuerda tres cosas buenas del día, por pequeñas que sean. Un sabor, una palabra, un gesto. Deja que el corazón las guarde.', pause: 12 },
      { text: 'No hay prisa por dormir. Descansar ya es suficiente. Respira… y suelta.', pause: 14 },
      { text: 'El día termina. Tú también puedes terminar. Mañana, la vida te esperará despierta, aquí y ahora.', pause: 12 },
      { text: 'Que tengas un sueño sereno.', pause: 6 },
    ],
  },
  {
    id: 'pausa',
    title: 'Pausa de un minuto',
    file: 'meditacion-pausa.mp3',
    introBell: false,
    segments: [
      { text: 'Detente. Suelta lo que tengas en las manos… y cierra los ojos un momento.', pause: 4 },
      { text: 'Inhala despacio, contando hasta cuatro… y exhala, contando hasta seis.', pause: 4 },
      { text: 'Otra vez. El aire entra… el aire sale. Aquí no hay más tarea que esta.', pause: 5 },
      { text: 'Escucha un sonido cualquiera de la habitación. Vuelve al presente a través de él.', pause: 5 },
      { text: 'Ya está. Un minuto de presencia. Continúa tu día, un poco más despierto.', pause: 3 },
    ],
  },
]

module.exports = { MEDITATIONS }
