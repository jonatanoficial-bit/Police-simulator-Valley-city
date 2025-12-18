import { eventBus } from './event_bus.js';
import { evidenceSystem } from './evidence_system.js';
import { npcSystem } from './npc_system.js';
import { timeManager } from './time_manager.js';
import { t } from './localization.js';
// Import case definitions statically so that the game can run from file:// without fetch restrictions
// Inlining case definitions here to avoid module import restrictions when running via file:// protocol.
const caseDefinitions = {
  case1: {
    id: 'case1',
    titleKey: 'CASE1_TITLE',
    introKey: 'CASE1_INTRO',
    initialScene: 'crime_scene',
    scenes: [
      {
        id: 'crime_scene',
        nameKey: 'SCENE_CRIME',
        background: 'assets/images/crime_scene.png',
        interactables: [
          {
            id: 'body',
            type: 'evidence',
            nameKey: 'BODY',
            x: 45,
            y: 65,
            evidence: {
              id: 'body_report',
              name: 'Relatório do Corpo',
              analysisResultKey: 'BODY_ANALYSIS_RESULT',
              analysisTime: 0
            }
          },
          {
            id: 'cash',
            type: 'evidence',
            nameKey: 'CASH_REGISTER',
            x: 70,
            y: 40,
            evidence: {
              id: 'cash_register',
              name: 'Caixa Registradora',
              analysisResultKey: 'CASH_ANALYSIS_RESULT',
              analysisTime: 0
            }
          },
          {
            id: 'witness1',
            type: 'npc',
            nameKey: 'WITNESS',
            x: 20,
            y: 80,
            npcId: 'witness'
          }
        ]
      }
    ],
    npcs: [
      {
        id: 'witness',
        nameKey: 'WITNESS',
        dialogueId: 'witness_dialogue'
      }
    ],
    dialogues: {
      witness_dialogue: [
        {
          speaker: 'npc',
          textKey: 'WITNESS_INTRO'
        },
        {
          options: [
            { textKey: 'ASK_SEE', action: 'see_response' },
            { textKey: 'ASK_ALIBI', action: 'alibi_response' },
            { textKey: 'THANK_YOU', action: 'end' }
          ]
        }
      ],
      see_response: [
        {
          speaker: 'npc',
          textKey: 'WITNESS_RESPONSE_SEE',
          noteKey: 'NOTE_WITNESS_SEE'
        },
        {
          options: [
            { textKey: 'ASK_ALIBI', action: 'alibi_response' },
            { textKey: 'THANK_YOU', action: 'end' }
          ]
        }
      ],
      alibi_response: [
        {
          speaker: 'npc',
          textKey: 'WITNESS_RESPONSE_ALIBI',
          noteKey: 'NOTE_WITNESS_ALIBI'
        },
        {
          options: [
            { textKey: 'ASK_SEE', action: 'see_response' },
            { textKey: 'THANK_YOU', action: 'end' }
          ]
        }
      ]
    }
  }
};

/**
 * CaseManager is responsible for loading case data, tracking progress
 * (evidence collected, notes taken), and determining when a case is solved.
 */
class CaseManager {
  constructor() {
    this.currentCase = null;
    this.evidenceGoal = 0;
    this.collectedCount = 0;
    this.notesCount = 0;
    // Listen for evidence and note events
    eventBus.on('evidenceCollected', (evidence) => {
      this.collectedCount += 1;
      this.checkCompletion();
    });
    eventBus.on('noteAdded', (noteKey) => {
      this.notesCount += 1;
      this.checkCompletion();
    });
  }

  /**
   * Load a case definition from its JSON file.
   * @param {string} caseId
   */
  async loadCase(caseId) {
    // Retrieve case data from pre-imported cases
    const caseData = caseDefinitions[caseId];
    if (!caseData) {
      throw new Error(`Caso não encontrado: ${caseId}`);
    }
    this.currentCase = caseData;
    this.collectedCount = 0;
    this.notesCount = 0;
    evidenceSystem.reset();
    timeManager.clearAll();
    // Count total evidence items
    this.evidenceGoal = 0;
    caseData.scenes.forEach((scene) => {
      scene.interactables.forEach((item) => {
        if (item.type === 'evidence') this.evidenceGoal += 1;
      });
    });
    // Load NPCs
    npcSystem.loadNPCs(caseData.npcs || []);
    eventBus.emit('caseLoaded', caseData);
  }

  /**
   * Get current case data.
   */
  getCurrentCase() {
    return this.currentCase;
  }

  /**
   * Start the loaded case by setting the initial scene and showing intro message.
   */
  start() {
    if (!this.currentCase) return;
    // Show intro via event bus
    eventBus.emit('caseIntro', { title: t(this.currentCase.titleKey), intro: t(this.currentCase.introKey) });
    // Load initial scene after a brief delay to allow reading intro; here immediate
    this.setScene(this.currentCase.initialScene);
  }

  /**
   * Retrieve a scene definition by id.
   * @param {string} sceneId
   */
  getScene(sceneId) {
    return this.currentCase.scenes.find((sc) => sc.id === sceneId);
  }

  /**
   * Set the current scene and notify UI to render.
   * @param {string} sceneId
   */
  setScene(sceneId) {
    const scene = this.getScene(sceneId);
    if (!scene) return;
    this.currentSceneId = sceneId;
    eventBus.emit('sceneChanged', scene);
  }

  /**
   * Check if case is solved based on collected evidence and notes.
   * For this prototype, criteria are simple: all evidence collected and at least 2 notes.
   */
  checkCompletion() {
    if (!this.currentCase) return;
    if (this.collectedCount >= this.evidenceGoal && this.notesCount >= 2) {
      eventBus.emit('caseSolved', { title: t(this.currentCase.titleKey) });
    }
  }
}

export const caseManager = new CaseManager();