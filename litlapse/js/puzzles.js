/**
 * litlapse · puzzles.js
 * --------------------------------------------------------------
 * Catálogo de eclipses diarios. Cada entrada describe un fragmento
 * literario y las tres palabras en elipsis a restaurar.
 *
 * Forma exacta requerida por el motor:
 *
 *   {
 *     id: number,
 *     fecha: "YYYY-MM-DD",
 *     autor: string,
 *     obra:  string,
 *     año:   string,
 *     textoOriginal: string,           // copia íntegra y prístina
 *     palabrasOcultas: [               // exactamente 3 entradas
 *       {
 *         indicePalabra:   number,     // 0-based dentro de textoOriginal.split(/\s+/)
 *         palabraCorrecta: string,     // ortografía canónica con tildes
 *         pistaDiccionario: string     // glosa para el botón de auxilio
 *       },
 *       ...
 *     ]
 *   }
 *
 * Reglas de indexado: tokenizar `textoOriginal` por espacios en blanco
 * conserva la puntuación adherida a cada palabra (p. ej. "caras,"),
 * pero el motor compara únicamente la raíz alfabética normalizada
 * contra `palabraCorrecta`. Eso permite mantener la puntuación
 * original en el render sin ensuciar la verificación.
 * --------------------------------------------------------------
 */
(function (global) {
  'use strict';

  const PUZZLES = Object.freeze([
    {
      id: 1,
      fecha: '2026-06-04',
      autor: 'Virginia Woolf',
      obra: 'Al faro',
      'año': '1927',
      textoOriginal:
        'La belleza del mundo tenía dos caras, una de alegría, otra de angustia, que cortaba el corazón en dos.',
      palabrasOcultas: [
        {
          indicePalabra: 1,
          palabraCorrecta: 'belleza',
          pistaDiccionario:
            'Propiedad de las cosas que hace amarlas, infundiendo deleite.'
        },
        {
          indicePalabra: 9,
          palabraCorrecta: 'alegría',
          pistaDiccionario:
            'Sentimiento grato y vivo que suele manifestarse con signos exteriores.'
        },
        {
          indicePalabra: 12,
          palabraCorrecta: 'angustia',
          pistaDiccionario:
            'Aflicción o sufrimiento desasosegado por temor a una desgracia.'
        }
      ]
    },
    {
      id: 2,
      fecha: '2026-06-05',
      autor: 'Gustavo Adolfo Bécquer',
      obra: 'Rima LIII',
      'año': '1871',
      textoOriginal:
        'Volverán las oscuras golondrinas en tu balcón sus nidos a colgar, y otra vez con el ala a sus cristales jugando llamarán.',
      palabrasOcultas: [
        {
          indicePalabra: 2,
          palabraCorrecta: 'oscuras',
          pistaDiccionario: 'Que carece de luz o de claridad.'
        },
        {
          indicePalabra: 8,
          palabraCorrecta: 'nidos',
          pistaDiccionario:
            'Construcción que las aves fabrican para poner sus huevos y criar a sus polluelos.'
        },
        {
          indicePalabra: 19,
          palabraCorrecta: 'cristales',
          pistaDiccionario:
            'Vidrio incoloro y transparente; lámina de vidrio en una ventana.'
        }
      ]
    }
  ]);

  /** Devuelve el puzzle de una fecha ISO o `null` si no existe. */
  function getPuzzleByDate(fechaISO) {
    return PUZZLES.find((p) => p.fecha === fechaISO) || null;
  }

  /** Devuelve el puzzle por su id numérico o `null`. */
  function getPuzzleById(id) {
    return PUZZLES.find((p) => p.id === id) || null;
  }

  /** Fecha local (no UTC) en formato YYYY-MM-DD para indexar el día. */
  function todayISO() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  /** El eclipse correspondiente al día local; cae al primero si no hay match. */
  function getTodaysPuzzle() {
    return getPuzzleByDate(todayISO()) || PUZZLES[0];
  }

  global.Litlapse = global.Litlapse || {};
  global.Litlapse.Puzzles = {
    all: PUZZLES,
    getPuzzleByDate,
    getPuzzleById,
    getTodaysPuzzle,
    todayISO
  };
})(typeof window !== 'undefined' ? window : globalThis);
