// =====================================================
//  EL CRIMEN DEL DÍA — Datos de escenarios
//  14 crímenes que rotan por día
// =====================================================

const CRIMES = [

  // ── ESCENARIO 0 ──────────────────────────────────────
  {
    id: 0,
    title: "Muerte en la Villa Roja",
    difficulty: 1,
    setting: "Una noche de tormenta en una villa costera del sur...",
    description: "La señora Beatriz Alvarado, viuda y dueña de la Villa Roja, fue hallada muerta al pie del acantilado. Oficialmente: una caída accidental. Pero los indicios cuentan otra historia.",
    victim: {
      name: "Beatriz Alvarado",
      age: 70,
      role: "Viuda, heredera de la fortuna Alvarado",
      detail: "Hallada al pie del acantilado al amanecer. La autopsia reveló trazas de sedantes en su sangre."
    },
    suspects: [
      { name: "Marco Alvarado",   role: "Hijo único",          detail: "42 años. Arrastra deudas de juego millonarias. Heredaría todo.", emoji: "🕵️" },
      { name: "Carmen Delgado",   role: "Secretaria personal",  detail: "35 años. Conoce todos los secretos de la familia hace 10 años.", emoji: "👩‍💼" },
      { name: "Rafael Herrera",   role: "Jardinero",            detail: "55 años. Despedido la semana pasada. Conoce los accesos al acantilado.", emoji: "👨‍🌾" },
      { name: "Dra. Inés Morales",role: "Médica de familia",    detail: "45 años. Era quien recetaba los medicamentos de la señora.", emoji: "👩‍⚕️" }
    ],
    culprit: 0,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Invisible al ojo pero letal al cuerpo.\nMe mezclan en copas y en platos.\nLos alquimistas me creaban en secreto.\nPuedo adormecer... o matar.\n¿Qué soy?",
        hint: "Se usa para matar silenciosamente, mezclado en una bebida.",
        answers: ["VENENO", "TOXICO", "TÓXICO", "TOXINA", "VENENOS"],
        primaryAnswer: "VENENO",
        clue: "La autopsia confirmó: sedantes mezclados en el vino de la víctima esa misma noche."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["VENENO", "HERENCIA", "DEUDAS", "VILLA", "SOBRINO", "COPA"],
        clue: "El único con motivo económico real era quien dependía de la herencia para saldar sus deudas."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "Los peritos hallaron esta nota en el estudio de la víctima.",
        answer: "DEUDAS",
        shift: 3,
        hint: "Describe la razón financiera del asesino. Empieza con D.",
        clue: "Las deudas del sospechoso superan los tres millones. El banco iba a ejecutar su casa esa semana."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "Ama de llaves Dolores García declaró:\n\n\"La noche del martes, pasada la medianoche, escuché pasos pesados en el corredor que lleva al jardín del acantilado. La habitación de la señora Beatriz estaba cerrada. A la mañana siguiente, encontré los zapatos de jardín del señor Marco llenos de barro, aunque él insistió que no había salido de su cuarto en toda la noche. También noté que la copa del salón tenía un sedimento extraño en el fondo.\"",
        question: "¿Qué indicio del testimonio señala más directamente al culpable?",
        options: [
          { text: "La copa con sedimento extraño y los zapatos lodosos de Marco", correct: true },
          { text: "Los pasos a medianoche, que podrían ser de cualquier persona de la casa", correct: false },
          { text: "La habitación cerrada de la señora, que era su costumbre habitual", correct: false },
          { text: "Que el ama de llaves no vio a nadie directamente esa noche", correct: false }
        ],
        explanation: "La copa con sedimento ubica la preparación del veneno, y los zapatos lodosos colocan a Marco en el jardín del acantilado en el momento del crimen."
      }
    ]
  },

  // ── ESCENARIO 1 ──────────────────────────────────────
  {
    id: 1,
    title: "El Banquete de las Mentiras",
    difficulty: 2,
    setting: "La noche de inauguración del restaurante más exclusivo de la ciudad...",
    description: "El célebre chef Mathieu Blanc cayó muerto ante sus comensales. La causa: un choque anafiláctico. Alguien sabía exactamente qué ingrediente mezclar en su plato.",
    victim: {
      name: "Mathieu Blanc",
      age: 48,
      role: "Chef ejecutivo y propietario",
      detail: "Murió en la cocina tras probar su propio plato estrella. Tenía alergia severa al maní, información que solo el equipo íntimo conocía."
    },
    suspects: [
      { name: "Rodrigo Salinas",  role: "Crítico gastronómico", detail: "55 años. Tenía una guerra pública con Mathieu desde que destruyó su anterior restaurante.", emoji: "🧐" },
      { name: "Valentina Cruz",   role: "Sous-chef",           detail: "32 años. Lleva 6 años esperando ser ascendida a chef principal. Aplicó tres veces.", emoji: "👩‍🍳" },
      { name: "Carmen López",     role: "Dueña del local",     detail: "60 años. Perdería el restaurante si Mathieu se iba; tenía seguros de vida a su nombre.", emoji: "👩‍💼" },
      { name: "Luigi Ferrante",   role: "Proveedor",           detail: "44 años. Mathieu descubrió que vendía ingredientes vencidos y amenazó con denunciarlo.", emoji: "🚚" }
    ],
    culprit: 1,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Soy una traición silenciosa del propio cuerpo.\nMe activa un ingrediente que para otros es inofensivo.\nEn segundos puedo matar a quien me desconoce.\nLos chefs deben conocerme para protegerse.\n¿Qué soy?",
        hint: "Reacción del sistema inmunológico ante ciertos alimentos.",
        answers: ["ALERGIA", "ALERGENO", "ALÉRGENO", "ANAFILAXIA", "REACCION"],
        primaryAnswer: "ALERGIA",
        clue: "El chef tenía alergia severa al maní. Solo quienes cocinaban junto a él lo sabían con certeza."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["COCINA", "ALERGIA", "MANI", "RECETA", "AMBICION", "RIVAL"],
        clue: "La ambición puede ser tan letal como cualquier veneno en manos equivocadas."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "Una nota cifrada fue hallada entre las recetas del chef.",
        answer: "ALERGIA",
        shift: 5,
        hint: "Lo que mató al chef. Empieza con A, siete letras.",
        clue: "Valentina Cruz tenía acceso exclusivo a todas las fichas médicas del personal de cocina."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "El ayudante de cocina Tomás Ruiz declaró:\n\n\"Esa noche, Valentina preparó personalmente la salsa del plato estrella, algo inusual ya que normalmente lo hace el jefe. Cuando le pregunté, dijo que quería que 'todo saliera perfecto'. Más tarde vi que abrió un frasco de aceite que normalmente no usamos. También sé que hace tres días Valentina llamó a una agencia de búsqueda de trabajo para chefs principales.\"",
        question: "¿Qué elemento del testimonio resulta más incriminatorio?",
        options: [
          { text: "Valentina llamó a agencias de trabajo para chefs principales tres días antes", correct: false },
          { text: "Preparó personalmente la salsa y usó un frasco de aceite inusual", correct: true },
          { text: "Dijo que quería que 'todo saliera perfecto' esa noche", correct: false },
          { text: "Tomás no sabe con certeza qué contenía ese frasco de aceite", correct: false }
        ],
        explanation: "Preparar personalmente la salsa y usar un ingrediente no habitual la ubica como quien tuvo oportunidad de agregar el aceite de maní que mató al chef."
      }
    ]
  },

  // ── ESCENARIO 2 ──────────────────────────────────────
  {
    id: 2,
    title: "El Museo en la Oscuridad",
    difficulty: 3,
    setting: "En las salas silenciosas del Museo de Arte Moderno, pasada la medianoche...",
    description: "La directora del museo Claudia Reich fue encontrada sin vida entre las obras de arte. La causa: un golpe en la cabeza. Pero lo más inquietante es lo que descubrió antes de morir.",
    victim: {
      name: "Claudia Reich",
      age: 55,
      role: "Directora del Museo de Arte Moderno",
      detail: "Hallada al pie de la sala de exhibición principal. Tenía en su mano un trozo de lienzo... de una pintura falsa."
    },
    suspects: [
      { name: "Nadia Sanz",      role: "Restauradora",         detail: "38 años. Experta en técnicas de falsificación artística. Conocida en el submundo del arte.", emoji: "🖼️" },
      { name: "Tomás Gutiérrez", role: "Guardia nocturno",     detail: "45 años. Descubierto durmiendo en su turno tres veces. Desesperado por dinero.", emoji: "🔦" },
      { name: "Antonio Vidal",   role: "Curador jefe",         detail: "50 años. Tenía acceso a todas las obras y conocía el valor de cada una.", emoji: "🎨" },
      { name: "Hugo Rivas",      role: "Coleccionista privado", detail: "62 años. Intentó comprar varias obras que el museo se negó a vender.", emoji: "💼" }
    ],
    culprit: 2,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Imito lo genuino a la perfección.\nEn las galerías de arte soy la pesadilla del experto.\nSoy la mentira que parece verdad.\nSi me descubren, valen millones los originales que reemplacé.\n¿Qué soy?",
        hint: "Lo que hace quien copia una obra de arte para vender el original.",
        answers: ["FRAUDE", "FALSIFICACION", "FALSIFICACIÓN", "COPIA", "REPLICA", "RÉPLICA", "IMITACION"],
        primaryAnswer: "FRAUDE",
        clue: "Varias obras del museo eran copias perfectas. Los originales fueron vendidos en subastas privadas."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["CUADRO", "PINTURA", "FRAUDE", "MUSEO", "SUBASTA", "FIRMA"],
        clue: "Las firmas de los artistas en los cuadros originales eran las que más valían en el mercado negro."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "La directora había dejado una nota cifrada en su agenda.",
        answer: "ROBO",
        shift: 7,
        hint: "Lo que estaba ocurriendo sistemáticamente en el museo. Cuatro letras.",
        clue: "La directora había descubierto el esquema: cuatro obras ya habían sido robadas y reemplazadas por falsificaciones."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "El técnico de seguridad Ramiro Vega declaró:\n\n\"Las cámaras de la sala principal fueron 'apagadas por mantenimiento' esa noche, algo que solo puede autorizar el curador Antonio Vidal. Revisando los registros, encontré que en los últimos seis meses, cada vez que una obra salía para 'restauración interna', Antonio era quien firmaba la orden. Nadia Sanz, la restauradora, también firmaba el retorno, pero las fechas no siempre coincidían con el calendario oficial.\"",
        question: "¿Qué elemento del testimonio implica más directamente a alguien en el robo?",
        options: [
          { text: "Antonio Vidal tenía autoridad exclusiva para apagar las cámaras de seguridad", correct: true },
          { text: "Las fechas en los registros de restauración no siempre coincidían", correct: false },
          { text: "Nadia Sanz firmaba el retorno de las obras enviadas a restauración", correct: false },
          { text: "El técnico revisó los registros después del crimen", correct: false }
        ],
        explanation: "Quien apaga las cámaras y autoriza el movimiento de las obras controla el crimen. Antonio tenía esa autoridad exclusiva y la usó estratégicamente."
      }
    ]
  },

  // ── ESCENARIO 3 ──────────────────────────────────────
  {
    id: 3,
    title: "Tren Nocturno a Ningún Lugar",
    difficulty: 1,
    setting: "A bordo del expreso nocturno Buenos Aires–Mendoza, en el vagón privado...",
    description: "El empresario Sebastián Ortiz fue hallado muerto en su camarote privado a mitad del viaje. Las puertas estaban cerradas por dentro. Nadie bajó del tren. El asesino sigue a bordo.",
    victim: {
      name: "Sebastián Ortiz",
      age: 52,
      role: "Magnate empresarial",
      detail: "Encontrado sin vida en su camarote. Causa de muerte: envenenamiento. Viajaba solo para cerrar un contrato multimillonario."
    },
    suspects: [
      { name: "Lucía Torres",    role: "Secretaria ejecutiva", detail: "34 años. Conocía todos los movimientos de Sebastián. Acababa de ser excluida del bonus anual.", emoji: "💼" },
      { name: "Marina Costa",    role: "Auxiliar de viaje",    detail: "29 años. Sirvió la última copa al empresario. No tiene coartada sólida.", emoji: "🚂" },
      { name: "Jorge Fuentes",   role: "Revisor",              detail: "58 años. Tiene antecedentes penales sellados. Conocía el vagón mejor que nadie.", emoji: "🎫" },
      { name: "Fernando Pizarro",role: "Rival empresarial",    detail: "48 años. El contrato que Sebastián iba a firmar lo arruinaría a él. Viajaba en el mismo tren.", emoji: "😤" }
    ],
    culprit: 3,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Los abogados me redactan y los empresarios me firman.\nPuedo valer millones o quebrar fortunas.\nCuando alguien quiere impedirme, todo puede pasar.\nSoy la razón del viaje.\n¿Qué soy?",
        hint: "Documento legal que sella acuerdos comerciales.",
        answers: ["CONTRATO", "ACUERDO", "NEGOCIO", "TRATO", "CONVENIO"],
        primaryAnswer: "CONTRATO",
        clue: "Sebastián viajaba para firmar un contrato que desplazaría definitivamente a su rival del mercado."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["TREN", "RIVAL", "NEGOCIO", "MOTIVO", "TRAICION", "ALIBI"],
        clue: "El rival tenía el único motivo real: el contrato lo arruinaría si se firmaba."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "Un telegrama interceptado en la estación de origen.",
        answer: "RIVAL",
        shift: 2,
        hint: "Quien más perdía si Sebastián firmaba ese contrato. Cinco letras.",
        clue: "Fernando Pizarro compró su pasaje apenas 4 horas después de que Sebastián reservara el suyo."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "La auxiliar Marina Costa declaró:\n\n\"Esa noche serví el último whisky al señor Ortiz alrededor de las 23:15. Cuando pasé por el corredor a las 23:45, vi al señor Pizarro salir del vagón restaurante hacia los camarotes privados. Le pregunté si necesitaba algo y me dijo que iba a su camarote, pero su camarote está en el vagón siguiente, no en el de la víctima. A la mañana siguiente supe que el señor Ortiz había muerto.\"",
        question: "¿Qué elemento del testimonio sitúa al sospechoso en la escena del crimen?",
        options: [
          { text: "Marina fue la última en ver con vida al señor Ortiz esa noche", correct: false },
          { text: "El señor Ortiz pudo haber sido envenenado por el whisky que sirvió Marina", correct: false },
          { text: "Pizarro tenía antecedentes financieros que lo convertían en sospechoso", correct: false },
          { text: "Pizarro mintió sobre su destino y fue visto avanzando hacia el camarote de la víctima", correct: true }
        ],
        explanation: "El testimonio sitúa a Fernando Pizarro moviéndose hacia el camarote de Ortiz mientras mentía sobre su destino. Eso lo ubica en la escena en el momento preciso."
      }
    ]
  },

  // ── ESCENARIO 4 ──────────────────────────────────────
  {
    id: 4,
    title: "La Hacienda del Silencio",
    difficulty: 1,
    setting: "En los campos silenciosos de la hacienda más antigua de la provincia...",
    description: "Don Aurelio Montoya, patriarca de 78 años, apareció muerto en su estudio. Tenía entre sus manos documentos contables que alguien desesperadamente hubiera querido destruir.",
    victim: {
      name: "Don Aurelio Montoya",
      age: 78,
      role: "Terrateniente y patriarca de la familia",
      detail: "Encontrado en su estudio con documentos financieros en las manos. Causa de muerte: paro cardíaco inducido. Los documentos mostraban irregularidades graves."
    },
    suspects: [
      { name: "Cruz Ramírez",    role: "Administrador",           detail: "52 años. Maneja las cuentas de la hacienda hace 20 años. Acceso total a los fondos.", emoji: "📊" },
      { name: "Isabela Montoya", role: "Hija única",              detail: "45 años. Heredaría la hacienda. Tiene conflictos con el padre desde hace años.", emoji: "👩" },
      { name: "León Aguilar",    role: "Vecino y rival de tierras",detail: "60 años. Tiene disputa legal por los límites del territorio desde hace décadas.", emoji: "🤠" },
      { name: "Héctor Blanco",   role: "Abogado de la familia",   detail: "55 años. Redactó el testamento. Sabe exactamente qué hereda cada uno.", emoji: "⚖️" }
    ],
    culprit: 0,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Vivo escondido en los libros de contabilidad.\nCuando el jefe no mira, me muevo en silencio.\nSoy el dinero que desaparece sin dejar rastro visible.\nLos auditores son mi peor pesadilla.\n¿Qué soy?",
        hint: "Robo sistemático de fondos por parte de alguien de confianza.",
        answers: ["FRAUDE", "ROBO", "MALVERSACION", "MALVERSACIÓN", "HURTO", "CORRUPCION", "DESFALCO"],
        primaryAnswer: "FRAUDE",
        clue: "Los documentos que sostenía la víctima revelaban un faltante de 4 millones en los últimos tres años."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["HACIENDA", "FONDOS", "TIERRA", "HURTO", "HERENCIA", "CONTADOR"],
        clue: "El administrador era el único con acceso diario a los fondos durante todos esos años."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "Una nota cifrada hallada dentro del libro de cuentas.",
        answer: "FONDOS",
        shift: 4,
        hint: "Lo que desaparecía sistemáticamente de la hacienda. Seis letras.",
        clue: "Cruz Ramírez transfirió los fondos a cuentas en el exterior usando el nombre de proveedores ficticios."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "La contadora externa Patricia Suárez declaró:\n\n\"Tres semanas antes de su muerte, Don Aurelio me pidió revisar las cuentas de los últimos cinco años de manera confidencial, sin avisarle al administrador Cruz. Encontré transferencias irregulares por casi cuatro millones a cuentas de empresas que no figuran como proveedores reales. Cuando le presenté el informe a Don Aurelio, me pidió discreción absoluta. También me contó que Cruz había solicitado retiro voluntario justo esa semana, algo inusual dado que llevan 20 años juntos.\"",
        question: "¿Qué combinación de hechos implica más directamente a Cruz?",
        options: [
          { text: "Don Aurelio pidió la auditoría en secreto, sin avisarle a Cruz", correct: false },
          { text: "Cruz solicitó retiro voluntario justo cuando se descubrían las irregularidades", correct: true },
          { text: "Las empresas proveedoras no existían en los registros oficiales", correct: false },
          { text: "Patricia Suárez fue contratada externamente para la revisión", correct: false }
        ],
        explanation: "La sincronía perfecta entre el descubrimiento de las irregularidades y la solicitud de retiro de Cruz revela que sabía que estaba por ser descubierto. La huida es la prueba más directa."
      }
    ]
  },

  // ── ESCENARIO 5 ──────────────────────────────────────
  {
    id: 5,
    title: "El Faro del Fin del Mundo",
    difficulty: 1,
    setting: "En una isla remota azotada por el viento, donde el faro guía a los barcos...",
    description: "El farero Mateo Solís apareció muerto al pie de la torre. Un accidente, dijeron. Pero Mateo había enviado una carta esa misma tarde con una sola palabra: 'peligro'.",
    victim: {
      name: "Mateo Solís",
      age: 60,
      role: "Farero, 30 años en el cargo",
      detail: "Caída desde la plataforma superior del faro. La carta que envió antes de morir nunca llegó a destino: fue interceptada."
    },
    suspects: [
      { name: "Concha Villanueva",  role: "Pescadora local",      detail: "50 años. Conoce las rutas costeras mejor que nadie. Encontró el cuerpo.", emoji: "🎣" },
      { name: "Ricardo Espinoza",   role: "Inspector naval",      detail: "45 años. Realizaba inspecciones mensuales al faro. Última visita: el día del crimen.", emoji: "⚓" },
      { name: "Camille Dubois",     role: "Turista francesa",     detail: "30 años. Llegó a la isla tres días antes. Tiene una cámara con fotos que no mostró a la policía.", emoji: "📷" },
      { name: "Pedro Nava",         role: "El Tiburón (contrabandista)", detail: "55 años. Conocido por usar rutas costeras ilegales. Estuvo en la isla esa semana.", emoji: "🦈" }
    ],
    culprit: 1,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Giro en la oscuridad y guío a los marineros.\nPero la noche en que todo cambió,\nfui testigo silencioso de un crimen.\nSoy la torre que vigila el mar.\n¿Qué soy?",
        hint: "Estructura costera que emite luz para guiar a los barcos.",
        answers: ["FARO", "FARO MARITIMO", "FARO MARÍTIMO", "TORRE"],
        primaryAnswer: "FARO",
        clue: "Mateo registraba en su diario cada barco que pasaba. Esos registros desaparecieron tras su muerte."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["FARO", "BARCO", "TRAFICO", "MARINA", "CARTA", "NOCHE"],
        clue: "El inspector naval era la única autoridad que podía encubrir el tráfico ilegal de barcos."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "Un mensaje hallado en el diario del farero, escrito días antes de su muerte.",
        answer: "TRAFICO",
        shift: 6,
        hint: "Actividad ilegal que Mateo había descubierto en las rutas marítimas. Siete letras.",
        clue: "El farero había registrado quince barcos sin documentación en los últimos dos meses, todos con el visto bueno del inspector Espinoza."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "La turista Camille Dubois declaró (tras ser presionada):\n\n\"El día que murió el farero, yo estaba fotografiando la costa desde las rocas. A través del teleobjetivo vi a un hombre uniformado —de marina— subir al faro alrededor de las 18:00. Nadie más entró. A las 18:40 escuché un grito y luego silencio. El hombre salió solo a las 19:15 con una caja bajo el brazo. Reconocí la cara en el periódico al día siguiente cuando vi la noticia. Por eso no quería hablar.\"",
        question: "¿Por qué el testimonio de Camille es tan decisivo para el caso?",
        options: [
          { text: "Porque confirma que nadie más entró al faro en ese período de tiempo", correct: false },
          { text: "Porque la cámara de Camille puede identificar definitivamente al responsable", correct: false },
          { text: "Porque Camille es testigo ocular que ubica al inspector en el faro en el momento exacto de la muerte", correct: true },
          { text: "Porque el hombre uniformado salió con una caja, lo que prueba el robo", correct: false }
        ],
        explanation: "Un testigo ocular que ubica al sospechoso en el lugar exacto del crimen en el momento exacto es la prueba más directa. La caja sugiere que llevó los diarios del farero."
      }
    ]
  },

  // ── ESCENARIO 6 ──────────────────────────────────────
  {
    id: 6,
    title: "La Biblioteca Prohibida",
    difficulty: 3,
    setting: "En los sótanos de la biblioteca más antigua de la ciudad, entre siglos de historia...",
    description: "El bibliotecario Ernesto Vidal, 82 años, fue encontrado muerto entre los estantes de libros raros. Había descubierto que un manuscrito único del siglo XV había sido robado y reemplazado por una copia.",
    victim: {
      name: "Ernesto Vidal",
      age: 82,
      role: "Bibliotecario jefe, 50 años en la institución",
      detail: "Encontrado entre los estantes con un ejemplar falso en las manos. Sufría del corazón, pero los análisis mostraron que fue ayudado a morir."
    },
    suspects: [
      { name: "Dra. Carla Nieto",    role: "Estudiante de doctorado", detail: "28 años. Investiga el manuscrito robado para su tesis. Acceso frecuente a la sala restringida.", emoji: "📚" },
      { name: "Simón Castro",        role: "Anticuario",              detail: "48 años. Tiene conexiones con compradores privados internacionales. Visitó la semana anterior.", emoji: "🏺" },
      { name: "Dr. Alejandro Prado", role: "Académico y experto",     detail: "55 años. Máxima autoridad en manuscritos medievales. Tasó la obra en más de 2 millones.", emoji: "🎓" },
      { name: "Vera Molina",         role: "Periodista de cultura",   detail: "35 años. Investigaba una nota sobre objetos robados de museos. Buscaba fuentes internas.", emoji: "📰" }
    ],
    culprit: 2,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Fui escrito a mano hace siglos en pergamino.\nSoy único en el mundo: no existe otro igual.\nLos museos me exhiben, los coleccionistas me codician.\nLos ladrones matarían por poseerme.\n¿Qué soy?",
        hint: "Documento histórico escrito a mano, de valor incalculable.",
        answers: ["MANUSCRITO", "PERGAMINO", "CODICE", "CÓDICE", "DOCUMENTO", "LIBRO ANTIGUO"],
        primaryAnswer: "MANUSCRITO",
        clue: "El manuscrito del siglo XV valía más de dos millones. El Dr. Prado era el único que podía venderlo sin levantar sospechas."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["LIBRO", "ARCHIVO", "ENGANO", "FIRMA", "COPIA", "ERUDITO"],
        clue: "Solo un erudito podía falsificar el manuscrito con suficiente calidad para engañar al propio bibliotecario durante meses."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "El bibliotecario dejó una nota cifrada entre las páginas del catálogo.",
        answer: "MANUSCRITO",
        shift: 8,
        hint: "La obra que fue robada y reemplazada. Diez letras.",
        clue: "El Dr. Prado era el tasador oficial. Fue él quien declaró que la copia era auténtica hace seis meses, lo que frenó toda investigación."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "La estudiante Carla Nieto declaró:\n\n\"Hace tres meses, el Dr. Prado vino a examinar el manuscrito para una publicación académica. Estuvo solo con la obra casi dos horas, algo inusual. Cuando me acerqué, vi que tenía equipos de fotografía de alta resolución que nunca antes había traído. Ernesto estaba incómodo pero no quiso confrontarlo porque Prado es una eminencia. Además, la semana pasada vi al Dr. Prado reunido con Simón Castro —el anticuario— en un café, aunque Prado dice que no lo conoce.\"",
        question: "¿Qué elemento del testimonio compromete más directamente al Dr. Prado?",
        options: [
          { text: "Estuvo dos horas solo con el manuscrito con equipos inusuales y luego lo vieron con el anticuario", correct: true },
          { text: "El Dr. Prado es una eminencia y Ernesto no quiso confrontarlo", correct: false },
          { text: "Carla sospecha de él porque investiga el mismo manuscrito para su tesis", correct: false },
          { text: "Simón Castro, el anticuario, también tenía conexiones internacionales", correct: false }
        ],
        explanation: "El acceso sin supervisión con equipo de digitalización + la reunión negada con el anticuario que podría vender la pieza forman una cadena de circunstancias que apuntan directamente al Dr. Prado."
      }
    ]
  },

  // ── ESCENARIO 7 ──────────────────────────────────────
  {
    id: 7,
    title: "La Ópera Maldita",
    difficulty: 2,
    setting: "Noche de estreno en el Teatro Imperial. La función debía consagrarla; en cambio, la enterró.",
    description: "La soprano Aurora Vivaldi cayó muerta en medio de su aria final. La copa de agua que bebió durante el segundo acto contenía un veneno de acción retardada. Alguien sabía exactamente cuándo actuaría.",
    victim: {
      name: "Aurora Vivaldi",
      age: 42,
      role: "Soprano principal, estrella del Teatro Imperial",
      detail: "Murió ante un teatro lleno en plena aria final. La autopsia confirmó envenenamiento por una sustancia rara, accesible solo en entornos especializados."
    },
    suspects: [
      { name: "Claudia Fontana",   role: "Soprano suplente",       detail: "35 años. Hace seis años espera el papel principal. Aurora la humilló públicamente la semana anterior.", emoji: "🎭" },
      { name: "Maestro Caprio",    role: "Director musical",       detail: "60 años. Tuvo un romance con Aurora que terminó muy mal. Ella amenazó con destruir su carrera.", emoji: "🎼" },
      { name: "Vincent Marlow",    role: "Crítico musical inglés", detail: "50 años. Aurora lo demandó por difamación y ganó. Asistió al estreno con un pase de prensa.", emoji: "🎩" },
      { name: "Esteban Rojas",     role: "Tramoyista",             detail: "45 años. Acceso total al camerino. Despedido por Aurora hace dos semanas tras una discusión.", emoji: "🔧" }
    ],
    culprit: 0,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Quemo por dentro al que no recibe lo que merece.\nMe escondo detrás de una sonrisa cordial.\nEn camerinos y bastidores soy moneda corriente.\nMato más carreras que cualquier crítica.\n¿Qué soy?",
        hint: "Sentimiento que aparece cuando alguien tiene lo que vos querés.",
        answers: ["ENVIDIA", "CELOS", "RENCOR", "RESENTIMIENTO"],
        primaryAnswer: "ENVIDIA",
        clue: "El móvil más antiguo del mundo: la envidia profesional. Alguien quería el papel principal a cualquier precio."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["ARIA", "TENOR", "CORO", "BAILE", "COPA", "TELON"],
        clue: "La copa que bebió en escena fue cambiada por otra entre el primer y segundo acto."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "Una nota anónima fue hallada en el camerino de la víctima esa misma tarde.",
        answer: "ENVIDIA",
        shift: 4,
        hint: "El móvil del crimen. Siete letras, empieza con E.",
        clue: "Claudia Fontana llevaba seis años esperando. Esa noche era su última oportunidad antes de que la reemplazaran por una soprano más joven."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "La vestuarista Adela Ponce declaró:\n\n\"Entre el primer y segundo acto, la rutina es que yo prepare el agua de la señora Aurora y la deje en su mesa. Esa noche, cuando volví con el segundo vestido, vi a Claudia salir del camerino. Le pregunté qué hacía ahí y me dijo que solo había venido a desearle suerte. Cuando entré, noté que la copa estaba un poco más llena de lo normal, pero no le di importancia. Claudia es asistente del director y a veces entra a coordinar las salidas.\"",
        question: "¿Qué detalle del testimonio compromete más a la sospechosa?",
        options: [
          { text: "Claudia es asistente del director y entra al camerino con frecuencia", correct: false },
          { text: "Claudia estuvo sola en el camerino justo antes del acto fatal y la copa quedó alterada", correct: true },
          { text: "Adela debería haber revisado la copa antes de dejar la habitación", correct: false },
          { text: "La rutina del vestuario era predecible y conocida por todos", correct: false }
        ],
        explanation: "El acceso solitario al camerino en el intervalo crítico, combinado con la alteración visible de la copa, ubica a Claudia con la oportunidad exacta para envenenarla."
      }
    ]
  },

  // ── ESCENARIO 8 ──────────────────────────────────────
  {
    id: 8,
    title: "El Laboratorio Secreto",
    difficulty: 3,
    setting: "Madrugada en el Instituto de Biotecnología Avanzada. Los sensores se apagaron 47 minutos.",
    description: "El Dr. Ezequiel Tarso fue hallado muerto en su laboratorio, junto a la nevera de muestras vacía. La fórmula del proyecto Helios —su trabajo de 12 años— desapareció con él.",
    victim: {
      name: "Dr. Ezequiel Tarso",
      age: 58,
      role: "Científico jefe del proyecto Helios",
      detail: "Encontrado a las 5:40 AM por el personal de limpieza. Causa de muerte: inyección letal de un sedante propio del laboratorio. Las muestras del proyecto Helios desaparecieron."
    },
    suspects: [
      { name: "Mariana Sosa",     role: "Asistente principal",   detail: "29 años. Trabajó 7 años con Tarso. Él presentaba el trabajo de ella como propio. Tenía las llaves del laboratorio.", emoji: "👩‍🔬" },
      { name: "Dr. Konrad Heyer", role: "Competidor académico",  detail: "62 años. Su instituto rival quedaría sin financiación si Helios se publicaba. Estuvo en la conferencia esa noche.", emoji: "👨‍⚕️" },
      { name: "Pablo Mendez",     role: "Becario reciente",      detail: "24 años. Tres meses en el equipo. Coartada: estaba estudiando, pero solo. Ningún testigo.", emoji: "👨‍🎓" },
      { name: "Olga Petrova",     role: "Visitante extranjera",  detail: "44 años. Se presentó como inversora hace dos semanas. La inteligencia industrial la tiene fichada.", emoji: "🕴️" }
    ],
    culprit: 3,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Soy invisible pero estoy en todas las guerras modernas.\nLas empresas pelean por mí más que por petróleo.\nMe roban con sonrisas, no con armas.\nFórmulas, planos, secretos... soy lo que valgo más que el oro.\n¿Qué soy?",
        hint: "Conocimiento confidencial que las empresas protegen con todo.",
        answers: ["ESPIONAJE", "SECRETO", "PROPIEDAD INTELECTUAL", "INFORMACION", "DATOS"],
        primaryAnswer: "ESPIONAJE",
        clue: "El proyecto Helios valía cientos de millones para cualquier potencia extranjera. Era el blanco perfecto del espionaje industrial."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["FORMULA", "MUESTRA", "ESPIA", "AGENTE", "PATENTE", "CODIGO"],
        clue: "Solo alguien externo al instituto tenía la motivación para robar la fórmula y huir antes del amanecer."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "Un mensaje hallado en el teléfono descartable del laboratorio, codificado en clave.",
        answer: "ESPIONAJE",
        shift: 5,
        hint: "Lo que estaba pasando en el instituto desde hacía meses. Nueve letras.",
        clue: "Los sensores de seguridad fueron desactivados de forma profesional. Solo un agente entrenado podría hacerlo."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "El guardia de seguridad Renato Vázquez declaró:\n\n\"A las 23:40 firmé el ingreso de la 'inversora' Olga Petrova, acompañada por el Dr. Tarso. Era inusual a esa hora pero él insistió. A las 0:32 los sensores del laboratorio se apagaron. Yo asumí mantenimiento, como siempre. A las 1:19 vi a Olga salir sola por la puerta trasera, cargando un maletín térmico que no traía al entrar. Cuando le pregunté, dijo que era una muestra que le había regalado el doctor. Esa fue la última vez que alguien lo vio con vida.\"",
        question: "¿Qué elemento del testimonio resulta más concluyente?",
        options: [
          { text: "Olga entró al instituto en horario nocturno con permiso del propio Tarso", correct: false },
          { text: "Los sensores se apagaron durante 47 minutos sin explicación oficial", correct: false },
          { text: "Olga salió sola por la puerta trasera con un maletín que no tenía al entrar", correct: true },
          { text: "El guardia firmó el ingreso como si fuera una visita autorizada normal", correct: false }
        ],
        explanation: "Salir sola, por una puerta secundaria, con un maletín térmico (típico para conservar muestras biológicas) que no traía al entrar, es la cadena de hechos que confirma el robo y la huida."
      }
    ]
  },

  // ── ESCENARIO 9 ──────────────────────────────────────
  {
    id: 9,
    title: "La Casa de Apuestas",
    difficulty: 2,
    setting: "Casino Eldorado, sala VIP. Después del cierre, las cámaras quedaron 'apagadas por mantenimiento'.",
    description: "Don Vito Salvatore, dueño del casino más grande de la ciudad, fue encontrado muerto en su oficina privada. La caja fuerte estaba abierta y vacía. Solo cuatro personas conocían la combinación.",
    victim: {
      name: "Don Vito Salvatore",
      age: 65,
      role: "Dueño del Casino Eldorado",
      detail: "Hallado en su oficina con un disparo a quemarropa. La caja fuerte —que contenía la recaudación de la semana y documentos comprometedores— estaba abierta y vacía."
    },
    suspects: [
      { name: "Lola Reyes",          role: "Croupier estrella",       detail: "32 años. Se rumoreaba que era amante de Don Vito. Conocía las rutinas y horarios de la sala VIP.", emoji: "🎰" },
      { name: "Maximiliano Borges",  role: "Jugador profesional",     detail: "40 años. Debía al casino más de dos millones. Don Vito había amenazado con cobrarlo 'al estilo viejo'.", emoji: "🃏" },
      { name: "Sofía Salvatore",     role: "Hermana y exsocia",       detail: "50 años. Lo demandó hace años por la herencia familiar. Acaba de regresar a la ciudad sin previo aviso.", emoji: "👩‍💼" },
      { name: "Aníbal Quintero",     role: "Contador del casino",     detail: "55 años. Acceso total a las cuentas. Don Vito lo investigaba por presunto desvío de fondos.", emoji: "💰" }
    ],
    culprit: 2,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Soy lo que une y lo que destruye a las familias.\nSe pelea por mí en los tribunales por generaciones.\nLa muerte de uno me convierte en la fortuna de otro.\nLos hermanos me han matado por mí muchas veces.\n¿Qué soy?",
        hint: "Lo que recibe alguien cuando un familiar fallece.",
        answers: ["HERENCIA", "TESTAMENTO", "LEGADO", "PATRIMONIO"],
        primaryAnswer: "HERENCIA",
        clue: "La herencia familiar de los Salvatore nunca quedó resuelta. La muerte de Don Vito reabrió todo."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["CASINO", "FICHA", "CAJA", "DISPARO", "HERMANA", "RUTA"],
        clue: "La hermana llegó esa misma tarde sin avisar. Su nombre todavía figuraba en algunos documentos antiguos del casino."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "Un mensaje hallado en la agenda personal de Don Vito, escrito una semana antes.",
        answer: "HERMANA",
        shift: 6,
        hint: "Quién regresó después de años para reclamar lo suyo. Siete letras.",
        clue: "Sofía nunca dejó de tener acceso a la combinación de la caja. La heredó del padre, junto con Vito."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "El gerente nocturno Carlo Beltrán declaró:\n\n\"Esa tarde llegó Sofía sin avisar y exigió hablar con su hermano a solas. La discusión se escuchó desde el pasillo: gritos sobre 'la mitad que me corresponde' y 'la combinación nunca cambió'. Don Vito la echó. Cuatro horas más tarde, las cámaras de la sala VIP se 'apagaron por mantenimiento' —orden firmada por alguien que se hizo pasar por el contador. Sofía conocía esa cláusula del protocolo, aprendida cuando aún era socia. Su auto fue visto saliendo del estacionamiento a las 23:45.\"",
        question: "¿Qué combinación de hechos compromete más directamente a la sospechosa?",
        options: [
          { text: "La discusión a gritos sobre la mitad del casino y la combinación que 'nunca cambió'", correct: false },
          { text: "El conocimiento del protocolo de cámaras y su auto en el lugar a la hora del crimen", correct: true },
          { text: "La aparición sorpresiva en la ciudad después de años de ausencia", correct: false },
          { text: "Que figuraba como socia en documentos antiguos del casino", correct: false }
        ],
        explanation: "Conocer el protocolo interno + estar físicamente en el lugar a la hora del crimen + tener acceso histórico a la combinación forman la triada perfecta: motivo, medio y oportunidad."
      }
    ]
  },

  // ── ESCENARIO 10 ─────────────────────────────────────
  {
    id: 10,
    title: "El Yate Naufragado",
    difficulty: 2,
    setting: "Yate 'Sirena' anclado en bahía de Acapulco. Fiesta privada de medianoche.",
    description: "El magnate Alessandro Bertoli fue encontrado ahogado en la cabina principal del yate. Detalle inquietante: sus ropas estaban completamente secas. Alguien quería que pareciera un accidente.",
    victim: {
      name: "Alessandro Bertoli",
      age: 70,
      role: "Magnate naviero, propietario de la flota Bertoli",
      detail: "Hallado al amanecer en su cabina. Causa real: asfixia por inmersión, pero su ropa estaba seca. Fue ahogado en la bañera y luego trasladado a la cama."
    },
    suspects: [
      { name: "Bianca Reali",      role: "Esposa joven (3 años)",    detail: "32 años. Prenup brutal: si Alessandro moría antes de los 5 años de matrimonio, ella heredaba todo.", emoji: "💎" },
      { name: "Capitán Marchetti", role: "Capitán del yate",         detail: "55 años. 30 años al servicio. Recién degradado por Alessandro. Conocía cada centímetro del barco.", emoji: "⚓" },
      { name: "Dr. Gabriel Sterling", role: "Abogado personal",       detail: "58 años. Sabía de cambios secretos al testamento que estaban por firmarse. Habría perdido influencia.", emoji: "⚖️" },
      { name: "Helena Forte",      role: "Periodista de sociedad",   detail: "38 años. Invitada de último momento. Investigaba un fraude relacionado con la flota Bertoli.", emoji: "📺" }
    ],
    culprit: 0,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Soy el documento que los enamorados firman sin leer.\nMe diseñan abogados desconfiados.\nMido el amor en cifras y plazos.\nSi alguien muere antes de tiempo, yo cambio todo.\n¿Qué soy?",
        hint: "Acuerdo prenupcial entre cónyuges.",
        answers: ["PRENUP", "PRENUPCIAL", "ACUERDO PRENUPCIAL", "CONTRATO", "CAPITULACIONES"],
        primaryAnswer: "PRENUPCIAL",
        clue: "El prenup tenía una cláusula brutal: si Alessandro moría antes de cinco años de casados, Bianca heredaba todo. Faltaban dos semanas para cumplir tres años."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["YATE", "BANERA", "ESPOSA", "BODA", "FORTUNA", "OCEANO"],
        clue: "La bañera de la cabina principal era la única lo bastante profunda para ahogar a alguien. Y solo ella tenía acceso directo desde el camarote conyugal."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "Mensaje de texto borrado, recuperado del teléfono de la víctima días antes.",
        answer: "PRENUP",
        shift: 2,
        hint: "El documento que determinaba quién heredaría todo. Seis letras.",
        clue: "Alessandro había contactado a su abogado tres días antes para anular el prenup. La firma estaba programada para el lunes siguiente."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "La camarera personal Lupita Cárdenas declaró:\n\n\"A las 2:15 AM serví un té al señor Alessandro en la cabina principal, donde estaba con la señora Bianca. Ella me dijo que ya podía retirarme y que ellos se acostarían. A las 3:40 escuché ruido de agua corriendo en la bañera durante mucho tiempo —algo extraño a esa hora. A las 4:05 vi a la señora Bianca salir descalza de la cabina hacia el camarote de huéspedes, con el camisón mojado en las puntas. No le di importancia hasta el desayuno, cuando supe lo ocurrido. Y otro detalle: la cama del señor estaba hecha al revés, como si alguien lo hubiera acomodado.\"",
        question: "¿Qué detalle es más decisivo para señalar a la sospechosa?",
        options: [
          { text: "El ruido prolongado de agua en la bañera a las 3:40 de la madrugada", correct: false },
          { text: "Bianca pidió que la camarera se retirara, dejándolos sin testigos", correct: false },
          { text: "El camisón mojado, los desplazamientos nocturnos y la cama acomodada al revés", correct: true },
          { text: "Bianca durmió en el camarote de huéspedes esa noche en lugar del conyugal", correct: false }
        ],
        explanation: "El camisón mojado prueba que estuvo cerca del agua a la hora del ahogamiento. La cama acomodada al revés revela el traslado del cuerpo desde la bañera para simular muerte natural en la cama."
      }
    ]
  },

  // ── ESCENARIO 11 ─────────────────────────────────────
  {
    id: 11,
    title: "La Mansión Embrujada",
    difficulty: 3,
    setting: "Mansión victoriana en las afueras. Sesión espiritista a la medianoche, 13 invitados.",
    description: "El anfitrión Sebastián Quevedo fue hallado muerto en la mesa redonda al encenderse las luces. La médium afirmaba estar 'canalizando' a la madre fallecida del muerto. Nadie vio nada.",
    victim: {
      name: "Sebastián Quevedo",
      age: 68,
      role: "Heredero excéntrico de la fortuna Quevedo",
      detail: "Hallado muerto en plena sesión espiritista, durante el apagón ritual. Apuñalado con un abrecartas de plata que reposaba siempre sobre su escritorio. Sin signos de lucha."
    },
    suspects: [
      { name: "Madame Esmeralda", role: "Médium contratada",          detail: "50 años. Había predicho la muerte en sesiones anteriores. Cobra fortunas y conoce todos los secretos familiares.", emoji: "🔮" },
      { name: "Tomás Quevedo",    role: "Primo lejano",               detail: "45 años. Aparecía recién agregado al testamento. Sebastián lo presentó la semana anterior. Nadie sabía bien quién era.", emoji: "👤" },
      { name: "Onésimo Brun",     role: "Mayordomo de toda la vida",  detail: "70 años. 40 años al servicio. Conocía cada rincón de la mansión. Estuvo encendiendo velas durante el ritual.", emoji: "🎩" },
      { name: "Aurelia Vargas",   role: "Invitada misteriosa",        detail: "38 años. Nadie la conocía bien. Llegó sola con una invitación firmada por Sebastián. Estaba sentada junto a él.", emoji: "🕵️‍♀️" }
    ],
    culprit: 1,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Soy el documento que se lee cuando alguien ya no escucha.\nReparto fortunas, separo familias, creo odios eternos.\nUna firma puede convertirme en arma de venganza.\nNadie discute mi palabra final.\n¿Qué soy?",
        hint: "Documento legal que dispone los bienes después de la muerte.",
        answers: ["TESTAMENTO", "HERENCIA", "LEGADO", "VOLUNTAD"],
        primaryAnswer: "TESTAMENTO",
        clue: "El testamento de Sebastián fue modificado dos semanas antes. Un nombre se agregó: el de un primo del que nadie sabía nada."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["MEDIUM", "VELA", "PRIMO", "PLATA", "RITUAL", "PACTO"],
        clue: "El primo recién llegado tenía la motivación más reciente y más fuerte de todos: una herencia entera, recién prometida."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "Nota oculta en el reverso de la invitación que Sebastián envió a Aurelia esa semana.",
        answer: "TESTAMENTO",
        shift: 7,
        hint: "Lo que Sebastián acababa de modificar. Diez letras.",
        clue: "Tomás supo del cambio del testamento. Sabía que cualquier nueva modificación lo dejaría afuera. Tenía que actuar esa misma noche."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "Madame Esmeralda declaró:\n\n\"Durante el ritual, apagamos las luces y todos nos tomamos de las manos. Sebastián estaba a mi izquierda; Tomás, a la izquierda de Sebastián. Durante el apagón, sentí que la mano izquierda de Sebastián se soltaba de Tomás, pero no le di importancia: es común que los participantes se muevan. Cuando volvió la luz, Sebastián estaba caído sobre la mesa. La sangre todavía manaba. El abrecartas era el de su escritorio: no estaba en la sala antes del ritual. Alguien lo trajo. Y Tomás —recién agregado al testamento dos semanas antes— era el que estaba más cerca.\"",
        question: "¿Qué hecho del testimonio resulta más decisivo?",
        options: [
          { text: "Madame Esmeralda sintió que la mano izquierda de Sebastián se soltaba durante el apagón", correct: false },
          { text: "El abrecartas no estaba en la sala antes del ritual: alguien lo trajo deliberadamente", correct: false },
          { text: "Tomás estaba en posición directa, recién favorecido por el testamento, y la mano que cortó el contacto era la que lo unía a él", correct: true },
          { text: "Madame Esmeralda no avisó del extraño movimiento durante la sesión", correct: false }
        ],
        explanation: "La oportunidad física (mano que se suelta junto a él), el motivo recién creado (testamento modificado dos semanas antes) y el arma traída desde el escritorio del propio Sebastián apuntan inequívocamente a Tomás."
      }
    ]
  },

  // ── ESCENARIO 12 ─────────────────────────────────────
  {
    id: 12,
    title: "El Estadio Vacío",
    difficulty: 2,
    setting: "Vestuarios del Estadio Centenario, dos horas después del clásico. Las gradas, desiertas.",
    description: "El director técnico Héctor 'El Profesor' Sandoval fue hallado muerto en las duchas del vestuario, dos horas después del partido. La causa: golpe contundente con el ladrillo de un trofeo. Iba a renunciar al día siguiente y publicar todo.",
    victim: {
      name: "Héctor 'El Profesor' Sandoval",
      age: 60,
      role: "Director técnico del Club Centenario",
      detail: "Encontrado en las duchas dos horas después del clásico. Había anunciado a sus íntimos que renunciaría al día siguiente y publicaría un libro con nombres y cifras. Murió por un golpe contundente."
    },
    suspects: [
      { name: "Diego Russo",      role: "Capitán del equipo",         detail: "30 años. El DT iba a borrarlo del equipo titular por bajo rendimiento y filtraciones a la prensa.", emoji: "⚽" },
      { name: "Aldo Pizarro",     role: "Árbitro del clásico",        detail: "50 años. Cobró un penal inexistente que selló el partido. Visto discutiendo con el DT al salir del campo.", emoji: "🟨" },
      { name: "Augusto Petersen", role: "Presidente del club",        detail: "60 años. El libro del DT iba a destapar años de coimas, transferencias truchas y vínculos oscuros. Su carrera terminaría.", emoji: "🏛️" },
      { name: "Felipe Aroza",     role: "Kinesiólogo del plantel",    detail: "40 años. Acceso permanente al vestuario y a los suplementos. Despedido por el DT semanas atrás.", emoji: "💪" }
    ],
    culprit: 2,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Soy el oxígeno de la corrupción.\nViajo en sobres cerrados, en cuentas ocultas, en favores que se cobran.\nLas dirigencias me adoran, las prensas me persiguen.\nCuando me destapan, las cabezas ruedan.\n¿Qué soy?",
        hint: "Manejo financiero ilícito en organizaciones deportivas.",
        answers: ["COIMA", "SOBORNO", "CORRUPCION", "COIMAS", "COIMERO"],
        primaryAnswer: "CORRUPCION",
        clue: "El libro del DT iba a destapar diez años de manejos turbios en el club. Alguien con todo que perder no podía permitirlo."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["GOL", "PENAL", "LIBRO", "DESPIDO", "CLASICO", "DUCHA"],
        clue: "El presidente del club no podía dejar que ese libro se publicara. Era su última oportunidad de silenciarlo."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "Mensaje cifrado hallado en el teléfono del DT, enviado horas antes del partido.",
        answer: "CORRUPCION",
        shift: 4,
        hint: "Lo que el libro estaba a punto de destapar. Diez letras.",
        clue: "Petersen sabía que la publicación lo enviaría directo a la cárcel. Su única salida era silenciar al DT antes de que llegara a la editorial el lunes."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "El utilero Don Mario Cordone declaró:\n\n\"Después del partido, los jugadores se ducharon y se fueron rápido por la derrota. A las 23:15 quedaban solo el DT, el presidente Petersen y yo, organizando los uniformes. Petersen dijo que quería hablar con el Profesor 'de hombre a hombre' y me pidió retirarme. Cerraron la puerta del vestuario. Yo no me fui del todo: escuché gritos por unos minutos y luego silencio. Más tarde vi salir a Petersen solo, sin el saco que llevaba al entrar, con las manos limpias pero la corbata torcida. Cuando volví al vestuario, encontré al Profesor en la ducha y el trofeo Apertura roto a su lado.\"",
        question: "¿Qué elemento del testimonio implica más directamente al sospechoso?",
        options: [
          { text: "Petersen pidió hablar a solas con el DT y cerraron la puerta del vestuario", correct: false },
          { text: "Salió sin el saco que llevaba, lo que sugiere que se deshizo de ropa manchada", correct: true },
          { text: "Los gritos cesaron repentinamente, indicando una resolución violenta", correct: false },
          { text: "El trofeo Apertura fue usado como arma, lo que es simbólicamente relevante", correct: false }
        ],
        explanation: "Salir sin el saco que llevaba al entrar es la prueba más concreta de evidencia material: significa que se deshizo de ropa con manchas de sangre. Combinado con ser el último que estuvo a solas con el DT, lo ubica indiscutiblemente en el crimen."
      }
    ]
  },

  // ── ESCENARIO 13 ─────────────────────────────────────
  {
    id: 13,
    title: "El Convento del Silencio",
    difficulty: 2,
    setting: "Convento de Santa Inés, antes del oficio del alba. Una vela quedó encendida en la capilla.",
    description: "La Madre Superiora Sor Magdalena Ortiz fue hallada muerta al pie del altar de la capilla. Acababa de descubrir que faltaban donaciones por años. Esa misma noche iba a denunciar todo al obispado.",
    victim: {
      name: "Sor Magdalena Ortiz",
      age: 75,
      role: "Madre Superiora del Convento de Santa Inés",
      detail: "Hallada al amanecer junto al altar de la capilla. Estrangulada con su propio rosario. Tenía en sus manos un libro de cuentas con anotaciones de su puño y letra: cifras que no cuadraban desde hacía años."
    },
    suspects: [
      { name: "Sor Beatriz Núñez", role: "Novicia rebelde",       detail: "24 años. Iba a ser expulsada por cuestionar abiertamente las reglas. Llevaba tres meses interna a la fuerza.", emoji: "👼" },
      { name: "Inés Vega",         role: "Doncella del convento", detail: "35 años. Cocinaba y limpiaba todas las dependencias. Conocía cada recoveco del edificio.", emoji: "🌾" },
      { name: "Sr. Casas",         role: "Donante anónimo",       detail: "60 años. Aportaba sumas grandes y siempre en efectivo. Visitaba al capellán una vez al mes en privado.", emoji: "💼" },
      { name: "Padre Anselmo Cruz",role: "Capellán del convento",  detail: "55 años. Manejaba personalmente las cuentas de donaciones desde hacía 12 años. Sin auditorías externas.", emoji: "✝️" }
    ],
    culprit: 3,
    challenges: [
      {
        type: "riddle",
        title: "Adivinanza del Detective",
        instruction: "Resolvé esta adivinanza para descubrir la primera pista:",
        riddle: "Llego en sobres cerrados, en alcancías, en gestos generosos.\nDios me bendice, los hombres me reciben.\nA veces me usan para lo que debo; otras, para lo que no.\nFui creada para el bien pero el dinero soy.\n¿Qué soy?",
        hint: "Dinero que se entrega a una causa religiosa o benéfica.",
        answers: ["DONACION", "LIMOSNA", "OFRENDA", "CARIDAD", "DIEZMO"],
        primaryAnswer: "DONACION",
        clue: "Las donaciones del convento se administraban sin controles externos. Año tras año, las cifras del libro y las del banco no coincidían."
      },
      {
        type: "wordsearch",
        title: "Sopa de Letras",
        instruction: "Encontrá las 6 palabras ocultas relacionadas con el crimen. Presioná y deslizá para seleccionar.",
        words: ["MONJA", "ALTAR", "ORO", "ROSARIO", "VOTO", "PECADO"],
        clue: "Solo el capellán tenía firma en las cuentas bancarias del convento. La Madre Superiora confiaba ciegamente en él."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        context: "Nota cifrada hallada dentro del libro de horas de la Madre Superiora.",
        answer: "DONACION",
        shift: 3,
        hint: "Aquello que desaparecía sin dejar registro. Ocho letras.",
        clue: "El Padre Anselmo había desviado donaciones por más de una década. La inminente denuncia al obispado era la sentencia de su vida sacerdotal y de su libertad."
      },
      {
        type: "testimony",
        title: "Testimonio Clave",
        instruction: "Leé el testimonio y elegí el indicio más incriminatorio:",
        text: "La doncella Inés Vega declaró:\n\n\"Anoche, después de Completas, escuché a la Madre llamar al Padre Anselmo a la capilla 'para hablar de cuentas que no pueden esperar al obispado'. Él entró a las 22:30 y salió a las 23:10. La Madre nunca volvió a su celda. Esta mañana, al limpiar la sacristía, encontré la sotana del Padre con el cuello manchado de algo oscuro, y faltaba el dobladillo donde él suele atar el cordón. El rosario con que la Madre fue estrangulada tenía un cordón nuevo, no el original.\"",
        question: "¿Qué elemento del testimonio resulta más concluyente?",
        options: [
          { text: "La Madre llamó al Padre a hablar 'de cuentas que no pueden esperar al obispado'", correct: false },
          { text: "El Padre fue la última persona que estuvo a solas con la Madre antes de su muerte", correct: false },
          { text: "La sotana manchada y el dobladillo faltante, idéntico al cordón con que la estrangularon", correct: true },
          { text: "El Padre estuvo cuarenta minutos en la capilla, tiempo suficiente para el crimen", correct: false }
        ],
        explanation: "La mancha en la sotana es evidencia biológica directa. El dobladillo faltante coincidiendo con el cordón asesino es la pieza física que ata al Padre Anselmo al instrumento del crimen sin lugar a duda."
      }
    ]
  }

]; // fin CRIMES


// =====================================================
//  VARIANTES DE CULPABLE — Rejugabilidad
//  Cada escenario tiene 1+ culpables alternativos pre-escritos.
//  El mismo método de asesinato se mantiene; cambian QUIÉN y POR QUÉ,
//  junto con las pistas que apuntan al culpable (riddle/sopa/cifrado/testimonio).
//  La adivinanza (método) NO cambia: el crimen ocurrió igual, varía el autor.
// =====================================================

const CRIME_VARIANTS = {

  // ── #0 Muerte en la Villa Roja → Dra. Inés Morales (médica) ──
  0: [{
    culprit: 3,
    riddleClue: "La autopsia confirmó sedantes en el vino. Solo quien manejaba sus medicamentos conocía la dosis exacta que resultaba letal.",
    wsClue: "Quien controlaba los sedantes de la señora podía calcular al miligramo cuánto bastaba para matar sin levantar sospechas.",
    cipher: { answer: "RECETA", shift: 5, hint: "Lo que la doctora controlaba y manipulaba. Seis letras.", clue: "La Dra. Morales había cambiado la receta de la señora dos semanas antes, reemplazando su sedante habitual por uno mucho más potente." },
    testimony: {
      text: "El ama de llaves Dolores García declaró:\n\n\"La doctora Morales vino esa tarde, fuera de su día habitual de visita. Se ofreció a preparar ella misma el vino de la noche de la señora, algo que jamás hacía. Noté que el frasco de sedantes sobre la mesa de luz había sido reemplazado: las pastillas eran de otro color. Cuando se lo comenté, me dijo que era 'la misma fórmula, otro laboratorio'. Días antes, la señora me había confiado que pensaba cambiar de médico porque ya no confiaba en ella.\"",
      question: "¿Qué indicio del testimonio señala más directamente a la culpable?",
      options: [
        { text: "La doctora preparó personalmente el vino y reemplazó el frasco de sedantes por pastillas distintas", correct: true },
        { text: "La señora pensaba cambiar de médico porque ya no confiaba en ella", correct: false },
        { text: "La doctora visitó la villa fuera de su día habitual de visita", correct: false },
        { text: "El ama de llaves no examinó las pastillas de cerca", correct: false }
      ],
      explanation: "Preparar el vino y sustituir los sedantes por pastillas de otra fórmula le dio el control absoluto sobre la dosis. La doctora era la única que sabía exactamente cuánto sedante resultaba mortal."
    }
  }],

  // ── #1 El Banquete de las Mentiras → Carmen López (dueña) ──
  1: [{
    culprit: 2,
    riddleClue: "El chef tenía alergia severa al maní. Pero alguien más allá de la cocina conocía su historia clínica: quien firmó su seguro de vida.",
    wsClue: "La dueña perdería el restaurante si Mathieu se iba. Su muerte, en cambio, activaba pólizas millonarias a nombre del local.",
    cipher: { answer: "SEGURO", shift: 3, hint: "Lo que Carmen cobraría con la muerte del chef. Seis letras.", clue: "Carmen había contratado un seguro de 'persona clave' sobre Mathieu dos meses antes, con el restaurante como único beneficiario." },
    testimony: {
      text: "El maître Tomás Ruiz declaró:\n\n\"La señora Carmen recibió personalmente una entrega especial de aceites esa tarde, algo que nunca hace: de eso se encarga la cocina. Como dueña, guardaba las fichas médicas de todo el personal, incluida la alergia del chef. Dos meses atrás le había hecho firmar a Mathieu una póliza enorme con el local como beneficiario. Esa noche la vi entrar a la cocina justo antes del servicio del plato estrella, con la excusa de 'felicitar al equipo'.\"",
      question: "¿Qué combinación de hechos compromete más a la sospechosa?",
      options: [
        { text: "Recibió la entrega de aceites y entró a la cocina justo antes del plato fatal, conociendo la alergia del chef por su ficha médica", correct: true },
        { text: "Mathieu firmó una póliza de persona clave dos meses antes de morir", correct: false },
        { text: "Como dueña, Carmen guardaba las fichas médicas de todo el personal", correct: false },
        { text: "Entró a la cocina con la excusa de felicitar al equipo", correct: false }
      ],
      explanation: "Manejar la entrega del aceite (el arma), conocer la alergia por la ficha médica (el conocimiento) y estar en la cocina en el momento exacto (la oportunidad) reúnen los tres elementos del crimen en Carmen."
    }
  }],

  // ── #2 El Museo en la Oscuridad → Nadia Sanz (restauradora) ──
  2: [{
    culprit: 0,
    riddleClue: "Varias obras eran copias perfectas. Solo una mano experta en técnicas de falsificación podía pintarlas con tal precisión.",
    wsClue: "Las copias eran tan buenas que solo una restauradora con técnica de falsificadora podía haberlas creado y hecho pasar por originales.",
    cipher: { answer: "COPIA", shift: 4, hint: "Lo que Nadia pintaba para reemplazar los originales. Cinco letras.", clue: "Nadia dominaba el envejecido artificial de lienzos. Las falsificaciones que reemplazaron a los originales salieron de su propio taller." },
    testimony: {
      text: "El técnico de seguridad Ramiro Vega declaró:\n\n\"Nadia se quedaba sola en el taller de restauración hasta la madrugada, varias veces por semana, con obras que oficialmente ya habían sido 'devueltas'. Encontré en su taller lienzos envejecidos artificialmente y pigmentos de fórmulas antiguas que no se usan en restauración normal. La noche del crimen, su tarjeta registró acceso a la bóveda a las 0:15, pero ella declaró haberse ido a las 22:00. La directora la había citado esa tarde 'para revisar discrepancias en el taller'.\"",
      question: "¿Qué elemento implica más directamente a la restauradora?",
      options: [
        { text: "Su tarjeta registró acceso a la bóveda a las 0:15, contradiciendo su coartada de haberse ido a las 22:00", correct: true },
        { text: "Tenía lienzos envejecidos y pigmentos antiguos en su taller", correct: false },
        { text: "Se quedaba sola hasta la madrugada con obras ya 'devueltas'", correct: false },
        { text: "La directora la había citado para revisar discrepancias", correct: false }
      ],
      explanation: "La contradicción entre su coartada y el registro de acceso a la bóveda a las 0:15 la ubica en la escena en el momento del crimen. Los materiales de falsificación explican el móvil."
    }
  }],

  // ── #3 Tren Nocturno a Ningún Lugar → Lucía Torres (secretaria) ──
  3: [{
    culprit: 0,
    riddleClue: "Sebastián viajaba a firmar el contrato. Su secretaria conocía cada detalle del negocio... y que él pensaba dejarla afuera del reparto.",
    wsClue: "Quien conocía cada movimiento del empresario y acababa de ser excluida del bonus tenía motivo y acceso por igual.",
    cipher: { answer: "TRAICION", shift: 3, hint: "Lo que la secretaria cometió contra su jefe. Ocho letras.", clue: "Lucía venía filtrando los términos del contrato a la competencia. Sebastián lo había descubierto y planeaba despedirla al llegar a Mendoza." },
    testimony: {
      text: "La auxiliar Marina Costa declaró:\n\n\"La señorita Lucía no figuraba en la lista de pasajeros, pero subió en la última estación con una llave de servicio del camarote del señor Ortiz: dijo que él se la había dado 'para los papeles'. Yo serví el whisky, pero fue ella quien insistió en llevárselo personalmente esa noche. Más temprano los escuché discutir: él le decía que 'después de Mendoza ya no la necesitaba'. A la mañana siguiente, la llave de servicio había desaparecido.\"",
      question: "¿Qué detalle del testimonio resulta más incriminatorio?",
      options: [
        { text: "Tenía una llave del camarote e insistió en llevarle personalmente la bebida la noche del crimen", correct: true },
        { text: "Subió al tren sin figurar en la lista de pasajeros", correct: false },
        { text: "Discutieron porque él ya no la necesitaría después de Mendoza", correct: false },
        { text: "La llave de servicio desapareció a la mañana siguiente", correct: false }
      ],
      explanation: "Tener acceso al camarote por la llave y ser quien manipuló y entregó la bebida envenenada le dio el medio y la oportunidad. El despido inminente aporta el motivo."
    }
  }],

  // ── #4 La Hacienda del Silencio → Héctor Blanco (abogado) ──
  4: [{
    culprit: 3,
    riddleClue: "Los documentos revelaban un faltante millonario. Pero alguien con conocimiento legal había alterado también el testamento para beneficiarse.",
    wsClue: "El abogado redactó cada documento de la hacienda. Sabía mejor que nadie qué cláusula cambiar y cómo ocultar el rastro.",
    cipher: { answer: "TESTAMENTO", shift: 4, hint: "El documento que el abogado manipuló en secreto. Diez letras.", clue: "Héctor Blanco se había nombrado albacea con honorarios desproporcionados, modificando el testamento sin consentimiento de Don Aurelio." },
    testimony: {
      text: "La contadora externa Patricia Suárez declaró:\n\n\"Las transferencias irregulares no solo pasaban por el administrador: cada una llevaba el aval legal del doctor Blanco, el abogado de la familia. Don Aurelio me confesó que había descubierto que Blanco modificó el testamento sin su consentimiento, agregándose como albacea con honorarios enormes. Iba a firmar un testamento nuevo el lunes. Blanco lo visitó la noche del domingo y se fue pasada la medianoche. El testamento nuevo nunca llegó a firmarse.\"",
      question: "¿Qué hecho del testimonio compromete más al abogado?",
      options: [
        { text: "Avaló legalmente las transferencias fraudulentas y la muerte ocurrió justo antes de firmarse el testamento que lo excluía", correct: true },
        { text: "Don Aurelio descubrió que Blanco había modificado el testamento sin su consentimiento", correct: false },
        { text: "Blanco visitó la hacienda la noche del domingo y se fue pasada la medianoche", correct: false },
        { text: "Blanco se había nombrado albacea con honorarios desproporcionados", correct: false }
      ],
      explanation: "El aval legal de cada transferencia fraudulenta lo hace cómplice del desfalco, y la muerte oportuna justo antes de la firma del nuevo testamento le da el motivo más urgente: si Aurelio firmaba, perdía todo y enfrentaba la cárcel."
    }
  }],

  // ── #5 El Faro del Fin del Mundo → Pedro Nava 'El Tiburón' (contrabandista) ──
  5: [{
    culprit: 3,
    riddleClue: "Mateo registraba cada barco que pasaba. Sus registros condenaban directamente al contrabandista que usaba esas rutas en la oscuridad.",
    wsClue: "El contrabandista era quien más perdía si los registros del farero llegaban a las autoridades. Tenía que hacerlos desaparecer.",
    cipher: { answer: "CONTRABANDO", shift: 6, hint: "La actividad de Pedro Nava en las rutas costeras. Once letras.", clue: "El farero había documentado quince incursiones nocturnas de la lancha sin matrícula del Tiburón en los últimos dos meses." },
    testimony: {
      text: "La turista Camille Dubois declaró (tras ser presionada):\n\n\"Esa tarde fotografié la costa. Una lancha sin matrícula ancló en la cala oculta al pie del faro alrededor de las 17:30. Un hombre corpulento, con tatuajes en los brazos, subió por el sendero hacia la torre. A las 18:40 oí un grito. El hombre bajó deprisa a las 19:00, arrojó unos cuadernos al mar y partió en la lancha. Reconocí su cara: es el que llaman 'el Tiburón'. Vi su lancha entrar y salir de esa cala varias veces esa semana.\"",
      question: "¿Por qué el testimonio señala al contrabandista?",
      options: [
        { text: "Lo ubica subiendo al faro al momento de la muerte y arrojando al mar los cuadernos de registro", correct: true },
        { text: "Su lancha sin matrícula entraba y salía de la cala oculta toda la semana", correct: false },
        { text: "Es un hombre corpulento con tatuajes, fácil de reconocer", correct: false },
        { text: "Camille tardó en hablar por miedo a represalias", correct: false }
      ],
      explanation: "Verlo subir al faro en el momento exacto de la muerte y deshacerse de los cuadernos de registro —la única prueba de su contrabando— une oportunidad y móvil de forma directa."
    }
  }],

  // ── #6 La Biblioteca Prohibida → Simón Castro (anticuario) ──
  6: [{
    culprit: 1,
    riddleClue: "El manuscrito valía millones en el mercado negro. Solo un anticuario con compradores internacionales podía colocarlo sin dejar rastro.",
    wsClue: "Quien tenía la red de compradores privados podía convertir el manuscrito robado en una fortuna imposible de rastrear.",
    cipher: { answer: "COMPRADOR", shift: 5, hint: "Lo que Simón conseguía para el manuscrito robado. Nueve letras.", clue: "Simón ya tenía un comprador internacional esperando la pieza. Solo le faltaba sacarla de la biblioteca sin testigos." },
    testimony: {
      text: "La estudiante Carla Nieto declaró:\n\n\"Simón Castro, el anticuario, visitó la biblioteca cuatro veces el último mes, siempre preguntando por el manuscrito del siglo XV 'para un cliente internacional'. Ernesto se negó y le pidió que no volviera. La noche de su muerte, el portero vio a Simón salir del sótano con un tubo de transporte de documentos bajo el abrigo, pese a que no estaba autorizado a bajar. Días antes, Ernesto me dijo que había recibido una oferta anónima de dos millones por la obra... y que la voz le sonó conocida.\"",
      question: "¿Qué elemento compromete más al anticuario?",
      options: [
        { text: "El portero lo vio salir del sótano restringido con un tubo para transportar documentos la noche de la muerte", correct: true },
        { text: "Visitó la biblioteca cuatro veces preguntando por el manuscrito", correct: false },
        { text: "Ernesto recibió una oferta anónima cuya voz le sonó conocida", correct: false },
        { text: "Ernesto le había pedido a Simón que no volviera", correct: false }
      ],
      explanation: "Salir del sótano restringido —al que no tenía acceso— con un tubo para transportar documentos, la misma noche de la muerte, lo ubica con la obra robada en mano en la escena del crimen."
    }
  }],

  // ── #7 La Ópera Maldita → Maestro Caprio (director musical) ──
  7: [{
    culprit: 1,
    riddleClue: "El rencor de un amor terminado. Ella amenazaba con destruir su carrera; él decidió silenciarla antes de que lo hiciera.",
    wsClue: "Quien tuvo acceso a la dosis y un romance que terminó en amenazas guardaba rencor suficiente para todo.",
    cipher: { answer: "VENGANZA", shift: 4, hint: "El móvil del director despechado. Ocho letras.", clue: "Aurora amenazaba con revelar el romance y arruinar al maestro Caprio. Su muerte en escena era una venganza fríamente calculada." },
    testimony: {
      text: "La vestuarista Adela Ponce declaró:\n\n\"El maestro Caprio entró al camerino de Aurora durante el primer entreacto, cosa que no acostumbra. Discutían en voz baja; alcancé a oír a Aurora decir 'si no me das el rol, cuento todo'. Él salió pálido. Como director, era el único que sabía con precisión de segundos cuándo llegaría el aria final: el veneno era de acción retardada y había que calcular el momento exacto. Cuando preparé el agua, la copa estaba en su lugar, pero el maestro había estado solo en el pasillo del camerino minutos antes.\"",
      question: "¿Qué detalle compromete más al maestro?",
      options: [
        { text: "Como director conocía al segundo el momento del aria final —justo lo que requería el veneno retardado— y estuvo solo junto al camerino", correct: true },
        { text: "Discutió con Aurora, que amenazaba con 'contar todo' si no le daba el rol", correct: false },
        { text: "Entró al camerino durante el entreacto, algo que no acostumbraba", correct: false },
        { text: "Salió pálido después de la discusión", correct: false }
      ],
      explanation: "El veneno de acción retardada exigía calcular con precisión el momento del aria. Solo el director, batuta en mano, dominaba ese tiempo exacto. Sumado a su acceso y al móvil de la amenaza, lo señala con claridad."
    }
  }],

  // ── #8 El Laboratorio Secreto → Mariana Sosa (asistente) ──
  8: [{
    culprit: 0,
    riddleClue: "El proyecto Helios valía cientos de millones. Pero alguien lo consideraba suyo por derecho: la mente real detrás del trabajo que Tarso firmaba.",
    wsClue: "Quien tenía las llaves del laboratorio y años de trabajo robado tenía motivo y acceso sin necesidad de forzar nada.",
    cipher: { answer: "AUTORIA", shift: 5, hint: "Lo que Tarso le robaba a Mariana durante años. Siete letras.", clue: "Tarso presentaba el trabajo de Mariana como propio. El premio internacional, otra vez, llevaría solo el nombre de él." },
    testimony: {
      text: "El guardia de seguridad Renato Vázquez declaró:\n\n\"Esa noche Mariana no firmó salida: tiene llaves propias y entra y sale sin registrarse, con autorización del propio Tarso. Los sensores no fueron forzados desde afuera: se apagaron desde la consola interna del laboratorio, que requiere una clave que solo el doctor y su asistente conocían. El sedante usado era del propio inventario del laboratorio. A las 2:00 la vi salir con su mochila habitual y una carpeta gruesa abrazada contra el pecho. Dos días antes los había oído gritar: ella le reclamaba que el premio llevaría solo el nombre de él.\"",
      question: "¿Qué elemento implica más directamente a la asistente?",
      options: [
        { text: "Los sensores se apagaron desde la consola interna con una clave que solo ella y Tarso conocían, y usó el sedante del propio laboratorio", correct: true },
        { text: "No firmó salida porque tiene llaves propias y entra sin registrarse", correct: false },
        { text: "Salió a las 2:00 con una carpeta gruesa abrazada contra el pecho", correct: false },
        { text: "Le reclamaba a gritos que el premio llevaría solo el nombre de él", correct: false }
      ],
      explanation: "Apagar los sensores desde la consola interna exigía una clave que solo Tarso y Mariana poseían. Combinado con el uso del sedante del propio laboratorio, revela un crimen cometido desde adentro, no por un agente externo."
    }
  }],

  // ── #9 La Casa de Apuestas → Lola Reyes (croupier) ──
  9: [{
    culprit: 0,
    riddleClue: "La herencia no era solo de sangre. Don Vito había prometido parte de su fortuna a alguien muy cercano... y luego se arrepintió.",
    wsClue: "Quien fue prometida parte de la fortuna y conocía las rutinas de la sala VIP tenía motivo y acceso por igual.",
    cipher: { answer: "AMANTE", shift: 6, hint: "Lo que era Lola para Don Vito, en secreto. Seis letras.", clue: "Don Vito había prometido incluir a Lola en su testamento. Esa semana ordenó a su escribano 'sacar a alguien' de los papeles." },
    testimony: {
      text: "El gerente nocturno Carlo Beltrán declaró:\n\n\"Lola se quedó después del cierre, algo habitual desde que se rumoreaba su relación con Don Vito. Esa semana, él le había dicho a su escribano que quería 'sacar a alguien del testamento'. En el cesto de su oficina apareció después un codicilo roto con el nombre de Lola. Ella conocía la combinación de la caja: lo había visto abrirla decenas de veces. Las cámaras se apagaron con el protocolo interno que ella aprendió en años de sala VIP. Su tarjeta marcó salida recién a las 0:10.\"",
      question: "¿Qué combinación de hechos compromete más a la sospechosa?",
      options: [
        { text: "El codicilo roto que la quitaba del testamento, su conocimiento de la combinación y del protocolo de cámaras, y su salida a las 0:10", correct: true },
        { text: "Se quedó después del cierre, como era habitual en ella", correct: false },
        { text: "Se rumoreaba que era amante de Don Vito desde hacía tiempo", correct: false },
        { text: "Había visto abrir la caja fuerte decenas de veces", correct: false }
      ],
      explanation: "El codicilo roto le da el móvil urgente —estaba por perder la herencia prometida—; conocer la combinación y el protocolo de cámaras le da el medio; y su salida tardía, la oportunidad."
    }
  }],

  // ── #10 El Yate Naufragado → Dr. Gabriel Sterling (abogado) ──
  10: [{
    culprit: 2,
    riddleClue: "El abogado había redactado ese prenup y se beneficiaba de él. Si Alessandro lo anulaba el lunes, perdía el control sobre toda la fortuna.",
    wsClue: "Quien manejaba los documentos legales y perdía su influencia con los cambios del lunes tenía un motivo desesperado.",
    cipher: { answer: "TESTAMENTO", shift: 2, hint: "El documento que Sterling no quería que se firmara. Diez letras.", clue: "Alessandro iba a firmar un nuevo testamento el lunes que apartaba a Sterling de la administración de su fortuna y exponía sus manejos." },
    testimony: {
      text: "La camarera personal Lupita Cárdenas declaró:\n\n\"El doctor Sterling no estaba invitado a quedarse a dormir, pero esa noche no bajó del yate: lo vi en la cubierta cerca de la cabina principal pasada la 1:00, con un maletín de documentos. A las 3:40 oí correr el agua de la bañera mucho tiempo. A la mañana siguiente, la caja fuerte de la cabina estaba abierta y faltaban carpetas legales que el señor guardaba ahí. El doctor desembarcó muy temprano, antes que nadie, con su maletín más abultado que la noche anterior.\"",
      question: "¿Qué detalle resulta más decisivo contra el abogado?",
      options: [
        { text: "Permaneció junto a la cabina y a la mañana faltaban carpetas legales de la caja fuerte, mientras él desembarcaba con el maletín más cargado", correct: true },
        { text: "No estaba invitado a quedarse a dormir esa noche", correct: false },
        { text: "Se oyó correr el agua de la bañera durante mucho tiempo a las 3:40", correct: false },
        { text: "Llevaba un maletín de documentos en la cubierta", correct: false }
      ],
      explanation: "Su permanencia junto a la cabina, la desaparición de las carpetas legales de la caja fuerte y el maletín más cargado al desembarcar revelan que mató para apoderarse de los documentos que lo incriminaban antes de la firma del lunes."
    }
  }],

  // ── #11 La Mansión Embrujada → Onésimo Brun (mayordomo) ──
  11: [{
    culprit: 2,
    riddleClue: "El testamento modificado no solo agregó un nombre: borró otro. Cuarenta años de servicio quedaron, de golpe, en nada.",
    wsClue: "Quien encendía las velas se movía libre en la oscuridad y conocía cada rincón de la mansión como nadie.",
    cipher: { answer: "LEGADO", shift: 7, hint: "Lo que el mayordomo perdió tras 40 años de servicio. Seis letras.", clue: "El nuevo testamento eliminó la pensión vitalicia que Sebastián le había prometido a Onésimo. Cuatro décadas de lealtad, borradas de un plumazo." },
    testimony: {
      text: "Madame Esmeralda declaró:\n\n\"Durante el ritual apagamos las luces y el círculo se tomó de las manos. Pero Onésimo, el mayordomo, no formaba parte del círculo: se movía en silencio encendiendo y apagando velas, como le habían indicado. En la oscuridad, sus pasos se acercaron a la cabecera donde estaba Sebastián. El abrecartas provenía del escritorio del señor, una habitación cerrada con llave a la que solo el mayordomo tenía acceso permanente. Cuando volvió la luz, Onésimo ya estaba en su rincón, demasiado quieto, con las manos detrás de la espalda.\"",
      question: "¿Qué hecho del testimonio resulta más decisivo?",
      options: [
        { text: "Era el único que se movía libremente en la oscuridad y el único con acceso al escritorio de donde salió el arma", correct: true },
        { text: "Sus pasos se acercaron a la cabecera donde estaba Sebastián", correct: false },
        { text: "Cuando volvió la luz estaba demasiado quieto, con las manos tras la espalda", correct: false },
        { text: "No formaba parte del círculo tomado de las manos", correct: false }
      ],
      explanation: "Mientras todos se sujetaban las manos a oscuras, solo Onésimo podía moverse. Y solo él tenía acceso al escritorio cerrado de donde provino el abrecartas. Movilidad y acceso al arma lo señalan inequívocamente."
    }
  }],

  // ── #12 El Estadio Vacío → Diego Russo (capitán) ──
  12: [{
    culprit: 0,
    riddleClue: "El libro no solo apuntaba a la dirigencia. Nombraba jugadores que vendían partidos. Uno de ellos no podía permitir que se publicara.",
    wsClue: "Quien iba a ser borrado del equipo y además aparecía nombrado en el libro tenía un doble motivo para silenciar al Profesor.",
    cipher: { answer: "ARREGLO", shift: 4, hint: "Lo que el libro probaría sobre Diego: partidos vendidos. Siete letras.", clue: "El capítulo cinco del libro detallaba los partidos que Diego había arreglado con apostadores. Su carrera y su libertad pendían de que ese libro nunca saliera." },
    testimony: {
      text: "El utilero Don Mario Cordone declaró:\n\n\"Los jugadores se fueron rápido tras la derrota, pero Diego volvió al vestuario 'a buscar su reloj' cerca de las 23:00, cuando creía que ya no quedaba nadie. Yo estaba en el depósito contiguo. Escuché al Profesor decirle que no solo lo borraba del equipo, sino que su nombre 'estaba en el capítulo cinco'. Hubo un golpe seco y silencio. Diego salió apurado con la campera puesta al revés y una toalla envuelta en la mano derecha. El trofeo Apertura apareció roto junto al cuerpo, en las duchas.\"",
      question: "¿Qué elemento implica más directamente al capitán?",
      options: [
        { text: "Volvió a escondidas cuando creía que no quedaba nadie, discutió por estar 'en el capítulo cinco' y salió cubriéndose la mano con una toalla", correct: true },
        { text: "El Profesor iba a borrarlo del equipo titular", correct: false },
        { text: "Su nombre aparecía en el libro que el DT iba a publicar", correct: false },
        { text: "Salió con la campera puesta al revés", correct: false }
      ],
      explanation: "Regresar a escondidas, la confrontación por aparecer en el libro y salir cubriéndose la mano con una toalla —ocultando sangre o una lesión— lo ubican como autor del golpe mortal. El doble móvil refuerza la conclusión."
    }
  }],

  // ── #13 El Convento del Silencio → Sr. Casas (donante anónimo) ──
  13: [{
    culprit: 2,
    riddleClue: "Las donaciones en efectivo del Sr. Casas no eran caridad: eran dinero que necesitaba limpiar. La denuncia al obispado lo expondría todo.",
    wsClue: "El donante anónimo entregaba sumas en efectivo que la denuncia convertiría en prueba de un delito mucho mayor.",
    cipher: { answer: "LAVADO", shift: 3, hint: "Lo que Casas hacía con su dinero a través del convento. Seis letras.", clue: "Casas usaba las donaciones del convento para lavar dinero de origen ilícito. La auditoría de la Madre estaba a punto de destapar el esquema completo." },
    testimony: {
      text: "La doncella Inés Vega declaró:\n\n\"El Sr. Casas vino esa noche, fuera de su visita mensual habitual. No entró por la puerta principal sino por el portón lateral del huerto, que casi nadie usa pero que él conocía de sus visitas al capellán. Lo vi cruzar hacia la capilla cerca de las 22:40. La Madre había dicho que su denuncia 'mencionaría también a los benefactores cuyo dinero no tenía origen claro'. A la mañana encontré, junto al altar, un pañuelo fino con las iniciales 'R.C.' manchado, y huellas de barro del huerto que llegaban hasta el reclinatorio.\"",
      question: "¿Qué elemento resulta más concluyente contra el donante?",
      options: [
        { text: "El pañuelo con sus iniciales junto al altar y el rastro de barro del portón lateral que solo él usaba, llegando hasta la escena", correct: true },
        { text: "Vino esa noche fuera de su visita mensual habitual", correct: false },
        { text: "La denuncia mencionaría a los benefactores de dinero sin origen claro", correct: false },
        { text: "Entró por el portón lateral del huerto en vez de la puerta principal", correct: false }
      ],
      explanation: "El pañuelo con sus iniciales en la escena es evidencia material directa, y el rastro de barro del portón que solo él usaba traza su camino exacto hasta el altar. El móvil: la denuncia expondría el lavado de su dinero."
    }
  }],

};


// ─── Helpers de datos ────────────────────────────────────────────────────────

function getDayNumber() {
  // Número de días desde el epoch UTC — mismo en todo el mundo para la misma fecha
  const now = new Date();
  const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.floor(utcMidnight / 86400000);
}

function getTodaysCrime() {
  const dayNum = getDayNumber();
  return CRIMES[dayNum % CRIMES.length];
}

function formatDate() {
  const now = new Date();
  return now.toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
