/*
 * Simple localization module.
 * Holds dictionaries of translated strings and provides helper functions
 * to retrieve texts in the current selected language.
 */

const dictionaries = {
  'pt-BR': {
    GAME_TITLE: 'Simulador de Detetive de Valley City',
    NEW_GAME: 'Novo Jogo',
    INVENTORY: 'Inventário',
    NOTES: 'Notas',
    START_PROMPT: 'Clique em "Novo Jogo" para começar uma investigação.',
    CASE_INTRO: 'Um crime ocorreu em Valley City. Você foi designado para investigar.',
    DIALOG_OK: 'Ok',
    // Evidence and notes
    EVIDENCE_COLLECTED: 'Evidência coletada',
    NOTE_ADDED: 'Nota adicionada',
    // Sample case specific strings
    CASE1_TITLE: 'Roubo na Mercearia',
    CASE1_INTRO: 'Houve um roubo seguido de homicídio em uma mercearia local. Vá até a cena do crime para começar.',
    SCENE_CRIME: 'Cena do Crime',
    SCENE_OFFICE: 'Delegacia',
    SCENE_INTERROGATION: 'Sala de Interrogatório',
    BODY: 'Corpo',
    CASH_REGISTER: 'Caixa Registradora',
    WITNESS: 'Testemunha',
    SUSPECT: 'Suspeito',
    // Dialogue keys
    WITNESS_INTRO: 'Eu estava aqui quando aconteceu. Vi alguém fugir!',
    ASK_ALIBI: 'Onde você estava quando ocorreu o crime?',
    ASK_SEE: 'Você viu alguma coisa?',
    THANK_YOU: 'Obrigado pela informação.',
    WITNESS_RESPONSE_ALIBI: 'Eu estava repondo as prateleiras no fundo da loja.',
    WITNESS_RESPONSE_SEE: 'Eu vi um homem de casaco preto correndo para o beco.',
    // Note entry keys
    NOTE_WITNESS_SEE: 'Testemunha viu um homem de casaco preto fugindo.',
    NOTE_WITNESS_ALIBI: 'Testemunha estava repondo prateleiras no fundo da loja.',
    CASE_COMPLETED: 'Caso resolvido!',
    CASE_FAILED: 'Caso falhou.',
    NO_EVIDENCE_YET: 'Nenhuma evidência coletada ainda.',
    NOTES_PLACEHOLDER: 'Nenhuma nota por enquanto.'
    ,BODY_ANALYSIS_RESULT: 'O corpo pertence ao dono da mercearia. Hora da morte aproximadamente 2 horas atrás.'
    ,CASH_ANALYSIS_RESULT: 'A caixa está vazia. Dinheiro foi levado e algumas impressões digitais foram encontradas.'
  },
  'en-US': {
    GAME_TITLE: 'Valley City Detective Simulator',
    NEW_GAME: 'New Game',
    INVENTORY: 'Inventory',
    NOTES: 'Notes',
    START_PROMPT: 'Click "New Game" to start an investigation.',
    CASE_INTRO: 'A crime has occurred in Valley City. You have been assigned to investigate.',
    DIALOG_OK: 'Ok',
    EVIDENCE_COLLECTED: 'Evidence collected',
    NOTE_ADDED: 'Note added',
    CASE1_TITLE: 'Corner Store Robbery',
    CASE1_INTRO: 'There has been a robbery followed by homicide at a local store. Go to the crime scene to begin.',
    SCENE_CRIME: 'Crime Scene',
    SCENE_OFFICE: 'Police Station',
    SCENE_INTERROGATION: 'Interrogation Room',
    BODY: 'Body',
    CASH_REGISTER: 'Cash Register',
    WITNESS: 'Witness',
    SUSPECT: 'Suspect',
    WITNESS_INTRO: 'I was here when it happened. I saw someone running!',
    ASK_ALIBI: 'Where were you when the crime happened?',
    ASK_SEE: 'Did you see anything?',
    THANK_YOU: 'Thank you for the information.',
    WITNESS_RESPONSE_ALIBI: 'I was restocking shelves in the back of the shop.',
    WITNESS_RESPONSE_SEE: 'I saw a man in a black coat running into the alley.',
    NOTE_WITNESS_SEE: 'Witness saw a man in a black coat fleeing.',
    NOTE_WITNESS_ALIBI: 'Witness was restocking shelves in the back.',
    CASE_COMPLETED: 'Case solved!',
    CASE_FAILED: 'Case failed.',
    NO_EVIDENCE_YET: 'No evidence collected yet.',
    NOTES_PLACEHOLDER: 'No notes so far.'
    ,BODY_ANALYSIS_RESULT: 'The body belongs to the shop owner. Time of death approximately 2 hours ago.'
    ,CASH_ANALYSIS_RESULT: 'The register is empty. Money was taken and some fingerprints were found.'
  },
  'es-ES': {
    GAME_TITLE: 'Simulador de Detective de Valley City',
    NEW_GAME: 'Nuevo Juego',
    INVENTORY: 'Inventario',
    NOTES: 'Notas',
    START_PROMPT: 'Haz clic en "Nuevo Juego" para comenzar una investigación.',
    CASE_INTRO: 'Se ha cometido un crimen en Valley City. Se te asignó para investigar.',
    DIALOG_OK: 'Ok',
    EVIDENCE_COLLECTED: 'Evidencia recogida',
    NOTE_ADDED: 'Nota añadida',
    CASE1_TITLE: 'Robo en la Tienda',
    CASE1_INTRO: 'Ha habido un robo seguido de homicidio en una tienda local. Ve a la escena del crimen para empezar.',
    SCENE_CRIME: 'Escena del Crimen',
    SCENE_OFFICE: 'Comisaría',
    SCENE_INTERROGATION: 'Sala de Interrogatorio',
    BODY: 'Cuerpo',
    CASH_REGISTER: 'Caja registradora',
    WITNESS: 'Testigo',
    SUSPECT: 'Sospechoso',
    WITNESS_INTRO: 'Estaba aquí cuando sucedió. ¡Vi a alguien correr!',
    ASK_ALIBI: '¿Dónde estabas cuando sucedió el crimen?',
    ASK_SEE: '¿Viste algo?',
    THANK_YOU: 'Gracias por la información.',
    WITNESS_RESPONSE_ALIBI: 'Estaba reponiendo estantes en el fondo de la tienda.',
    WITNESS_RESPONSE_SEE: 'Vi a un hombre con un abrigo negro corriendo hacia el callejón.',
    NOTE_WITNESS_SEE: 'El testigo vio a un hombre con abrigo negro huyendo.',
    NOTE_WITNESS_ALIBI: 'El testigo estaba reponiendo estantes en la parte trasera.',
    CASE_COMPLETED: '¡Caso resuelto!',
    CASE_FAILED: 'Caso fallido.',
    NO_EVIDENCE_YET: 'Aún no se ha recogido evidencia.',
    NOTES_PLACEHOLDER: 'Sin notas por ahora.'
    ,BODY_ANALYSIS_RESULT: 'El cuerpo pertenece al dueño de la tienda. Hora de la muerte aproximadamente hace 2 horas.'
    ,CASH_ANALYSIS_RESULT: 'La caja está vacía. Se llevaron el dinero y se encontraron algunas huellas digitales.'
  }
};

let currentLanguage = 'pt-BR';

/**
 * Change the current language.
 * @param {string} lang
 */
export function setLanguage(lang) {
  if (dictionaries[lang]) {
    currentLanguage = lang;
  }
}

/**
 * Retrieve the translation for a given key.
 * Falls back to the key itself if no translation found.
 * @param {string} key
 * @param {string} fallback
 */
export function t(key, fallback = '') {
  const dict = dictionaries[currentLanguage] || {};
  return dict[key] || fallback || key;
}

/**
 * Get the currently selected language.
 */
export function getCurrentLanguage() {
  return currentLanguage;
}

/**
 * Export dictionaries for external use (e.g., for building cases).
 */
export const locales = dictionaries;