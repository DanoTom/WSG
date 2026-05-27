// =====================================================
//  EL CRIMEN DEL DÍA — Datos de escenarios
//  7 crímenes que rotan por día
// =====================================================

const CRIMES = [

  // ── ESCENARIO 0 ──────────────────────────────────────
  {
    id: 0,
    title: "Muerte en la Villa Roja",
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
        instruction: "Los peritos hallaron esta nota en el estudio de la víctima.\nEs un cifrado César con desplazamiento +3.\nDescifrálo para revelar la pista:",
        encoded: "GHXGDV",
        answer: "DEUDAS",
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
    setting: "La noche de inauguración del restaurante más exclusivo de la ciudad...",
    description: "El célebre chef Mathieu Blanc cayó muerto ante sus comensales. La causa: un choque anafiláctico. Alguien sabía exactamente qué ingrediente mezclar en su plato.",
    victim: {
      name: "Mathieu Blanc",
      age: 48,
      role: "Chef ejecutivo y propietario",
      detail: "Murió en la cocina tras probar su propio plato estrella. Tenía alergia severa al maní, información que solo el equipo íntimo conocía."
    },
    suspects: [
      { name: "Valentina Cruz",   role: "Sous-chef",           detail: "32 años. Lleva 6 años esperando ser ascendida a chef principal. Aplicó tres veces.", emoji: "👩‍🍳" },
      { name: "Rodrigo Salinas",  role: "Crítico gastronómico", detail: "55 años. Tenía una guerra pública con Mathieu desde que destruyó su anterior restaurante.", emoji: "🧐" },
      { name: "Carmen López",     role: "Dueña del local",     detail: "60 años. Perdería el restaurante si Mathieu se iba; tenía seguros de vida a su nombre.", emoji: "👩‍💼" },
      { name: "Luigi Ferrante",   role: "Proveedor",           detail: "44 años. Mathieu descubrió que vendía ingredientes vencidos y amenazó con denunciarlo.", emoji: "🚚" }
    ],
    culprit: 0,
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
        instruction: "Una nota cifrada fue hallada entre las recetas del chef.\nCifrado César con desplazamiento +3.\nDescifrálo:",
        encoded: "DOHUJLD",
        answer: "ALERGIA",
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
    setting: "En las salas silenciosas del Museo de Arte Moderno, pasada la medianoche...",
    description: "La directora del museo Claudia Reich fue encontrada sin vida entre las obras de arte. La causa: un golpe en la cabeza. Pero lo más inquietante es lo que descubrió antes de morir.",
    victim: {
      name: "Claudia Reich",
      age: 55,
      role: "Directora del Museo de Arte Moderno",
      detail: "Hallada al pie de la sala de exhibición principal. Tenía en su mano un trozo de lienzo... de una pintura falsa."
    },
    suspects: [
      { name: "Antonio Vidal",  role: "Curador jefe",         detail: "50 años. Tenía acceso a todas las obras y conocía el valor de cada una.", emoji: "🎨" },
      { name: "Nadia Sanz",     role: "Restauradora",         detail: "38 años. Experta en técnicas de falsificación artística. Conocida en el submundo del arte.", emoji: "🖼️" },
      { name: "Tomás Gutiérrez",role: "Guardia nocturno",     detail: "45 años. Descubierto durmiendo en su turno tres veces. Desesperado por dinero.", emoji: "🔦" },
      { name: "Hugo Rivas",     role: "Coleccionista privado", detail: "62 años. Intentó comprar varias obras que el museo se negó a vender.", emoji: "💼" }
    ],
    culprit: 0,
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
        words: ["CUADRO", "ROBO", "FRAUDE", "MUSEO", "SUBASTA", "FIRMA"],
        clue: "Las firmas de los artistas en los cuadros originales eran las que más valían en el mercado negro."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        instruction: "La directora había dejado una nota cifrada en su agenda.\nCifrado César con desplazamiento +3.\nDescifrálo:",
        encoded: "URER",
        answer: "ROBO",
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
      { name: "Fernando Pizarro",role: "Rival empresarial",    detail: "48 años. El contrato que Sebastián iba a firmar lo arruinaría a él. Viajaba en el mismo tren.", emoji: "😤" },
      { name: "Marina Costa",    role: "Auxiliar de viaje",    detail: "29 años. Sirvió la última copa al empresario. No tiene coartada sólida.", emoji: "🚂" },
      { name: "Jorge Fuentes",   role: "Revisor",              detail: "58 años. Tiene antecedentes penales sellados. Conocía el vagón mejor que nadie.", emoji: "🎫" }
    ],
    culprit: 1,
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
        instruction: "Un telegrama interceptado en la estación de origen.\nCifrado César con desplazamiento +3.\nDescifrálo:",
        encoded: "ULYDO",
        answer: "RIVAL",
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
          { text: "Pizarro estaba en el vagón equivocado a la hora en que ocurrió el crimen", correct: false },
          { text: "Pizarro mentió sobre su destino y fue visto caminar hacia el camarote de la víctima", correct: false },
          { text: "Pizarro fue visto dirigiéndose al camarote de la víctima cuando afirmó ir al suyo", correct: true }
        ],
        explanation: "El testimonio sitúa a Fernando Pizarro moviéndose hacia el camarote de Ortiz mientras mentía sobre su destino. Eso lo ubica en la escena en el momento preciso."
      }
    ]
  },

  // ── ESCENARIO 4 ──────────────────────────────────────
  {
    id: 4,
    title: "La Hacienda del Silencio",
    setting: "En los campos silenciosos de la hacienda más antigua de la provincia...",
    description: "Don Aurelio Montoya, patriarca de 78 años, apareció muerto en su estudio. Tenía entre sus manos documentos contables que alguien desesperadamente hubiera querido destruir.",
    victim: {
      name: "Don Aurelio Montoya",
      age: 78,
      role: "Terrateniente y patriarca de la familia",
      detail: "Encontrado en su estudio con documentos financieros en las manos. Causa de muerte: paro cardíaco inducido. Los documentos mostraban irregularidades graves."
    },
    suspects: [
      { name: "Isabela Montoya", role: "Hija única",              detail: "45 años. Heredaría la hacienda. Tiene conflictos con el padre desde hace años.", emoji: "👩" },
      { name: "Cruz Ramírez",    role: "Administrador",           detail: "52 años. Maneja las cuentas de la hacienda hace 20 años. Acceso total a los fondos.", emoji: "📊" },
      { name: "León Aguilar",    role: "Vecino y rival de tierras",detail: "60 años. Tiene disputa legal por los límites del territorio desde hace décadas.", emoji: "🤠" },
      { name: "Héctor Blanco",   role: "Abogado de la familia",   detail: "55 años. Redactó el testamento. Sabe exactamente qué hereda cada uno.", emoji: "⚖️" }
    ],
    culprit: 1,
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
        words: ["HACIENDA", "FONDOS", "TIERRA", "ROBO", "HERENCIA", "CONTADOR"],
        clue: "El administrador era el único con acceso diario a los fondos durante todos esos años."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        instruction: "Una nota cifrada hallada dentro del libro de cuentas.\nCifrado César con desplazamiento +3.\nDescifrálo:",
        encoded: "IRQGRV",
        answer: "FONDOS",
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
        words: ["FARO", "BARCO", "TRAFICO", "MARINA", "SECRETO", "NOCHE"],
        clue: "El inspector naval era la única autoridad que podía encubrir el tráfico ilegal de barcos."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        instruction: "Un mensaje hallado en el diario del farero, escrito días antes de su muerte.\nCifrado César con desplazamiento +3.\nDescifrálo:",
        encoded: "WUDILFR",
        answer: "TRAFICO",
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
      { name: "Dr. Alejandro Prado", role: "Académico y experto",     detail: "55 años. Máxima autoridad en manuscritos medievales. Tasó la obra en más de 2 millones.", emoji: "🎓" },
      { name: "Simón Castro",        role: "Anticuario",              detail: "48 años. Tiene conexiones con compradores privados internacionales. Visitó la semana anterior.", emoji: "🏺" },
      { name: "Vera Molina",         role: "Periodista de cultura",   detail: "35 años. Investigaba una nota sobre objetos robados de museos. Buscaba fuentes internas.", emoji: "📰" }
    ],
    culprit: 1,
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
        words: ["LIBRO", "ARCHIVO", "ROBO", "FIRMA", "SECRETO", "ERUDITO"],
        clue: "Solo un erudito podía falsificar el manuscrito con suficiente calidad para engañar al propio bibliotecario durante meses."
      },
      {
        type: "cipher",
        title: "Mensaje Cifrado",
        instruction: "El bibliotecario dejó una nota cifrada entre las páginas del catálogo.\nCifrado César con desplazamiento +3.\nDescifrálo:",
        encoded: "PDQXVFULWR",
        answer: "MANUSCRITO",
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
  }

]; // fin CRIMES


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
