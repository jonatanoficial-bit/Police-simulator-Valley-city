import { eventBus } from './event_bus.js';
import { evidenceSystem } from './evidence_system.js';
import { caseManager } from './case_manager.js';
import { dialogueSystem } from './dialogue_system.js';
import { npcSystem } from './npc_system.js';
import { t } from './localization.js';

/**
 * UIManager handles all DOM manipulation and rendering of the game interface.
 * It listens to events emitted via the EventBus and updates the UI accordingly.
 */
class UIManager {
  constructor() {
    // DOM elements will be set during initialization
    this.sceneContainer = null;
    this.inventoryList = null;
    this.notesList = null;
    this.dialogueContainer = null;
    this.dialogueText = null;
    this.dialogueOptions = null;
    this.inventoryTitle = null;
    this.notesTitle = null;
    this.gameTitle = null;
    this.newGameButton = null;
    this.languageSelect = null;
    // Internal notes array
    this.notes = [];
    // Event listeners registration
    eventBus.on('caseIntro', (info) => this.showCaseIntro(info));
    eventBus.on('sceneChanged', (scene) => this.renderScene(scene));
    eventBus.on('evidenceCollected', (evidence) => this.addEvidenceToInventory(evidence));
    eventBus.on('evidenceAnalyzed', (evidence) => this.updateEvidenceAnalysis(evidence));
    eventBus.on('noteAdded', (noteKey) => this.addNote(noteKey));
    eventBus.on('dialogueShowLine', ({ speaker, text }) => this.showDialogueLine(text));
    eventBus.on('dialogueShowOptions', (options) => this.showDialogueOptions(options));
    eventBus.on('dialogueHide', () => this.hideDialogue());
    eventBus.on('caseSolved', ({ title }) => this.showCaseSolved(title));
  }

  /**
   * Initialize UI event listeners such as inventory clicks.
   */
  init() {
    // Now that DOM is ready, cache DOM elements
    this.sceneContainer = document.getElementById('scene-container');
    this.inventoryList = document.getElementById('inventory-list');
    this.notesList = document.getElementById('notes-list');
    this.dialogueContainer = document.getElementById('dialogue-container');
    this.dialogueText = document.getElementById('dialogue-text');
    this.dialogueOptions = document.getElementById('dialogue-options');
    this.inventoryTitle = document.getElementById('inventory-title');
    this.notesTitle = document.getElementById('notes-title');
    this.gameTitle = document.getElementById('game-title');
    this.newGameButton = document.getElementById('btn-new-game');
    this.languageSelect = document.getElementById('language-select');
    // Click on inventory items to show analysis result
    this.inventoryList.addEventListener('click', (ev) => {
      const itemId = ev.target.getAttribute('data-id');
      if (!itemId) return;
      const evidence = evidenceSystem.getCollected().find((e) => e.id === itemId);
      if (evidence && evidence.result) {
        alert(evidence.result);
      }
    });
    // Handler for language selection is set in main.js
  }

  /**
   * Update UI texts based on current language.
   */
  updateTexts() {
    this.gameTitle.textContent = t('GAME_TITLE');
    this.newGameButton.textContent = t('NEW_GAME');
    this.inventoryTitle.textContent = t('INVENTORY');
    this.notesTitle.textContent = t('NOTES');
    // Options for language select remain constant (language names), not translated
    // Update notes placeholder if empty
    if (this.notes.length === 0) {
      this.notesList.innerHTML = '<li>' + t('NOTES_PLACEHOLDER') + '</li>';
    }
    // Update inventory placeholder if empty
    if (evidenceSystem.getCollected().length === 0) {
      this.inventoryList.innerHTML = '<li>' + t('NO_EVIDENCE_YET') + '</li>';
    }
  }

  /**
   * Display case introduction message.
   * @param {object} info
   */
  showCaseIntro(info) {
    // For simplicity, show a dialogue-like overlay with case title and intro
    this.dialogueContainer.classList.remove('hidden');
    this.dialogueText.textContent = info.title + ' - ' + info.intro;
    this.dialogueOptions.innerHTML = '';
    const okBtn = document.createElement('button');
    okBtn.textContent = t('DIALOG_OK');
    okBtn.addEventListener('click', () => {
      this.hideDialogue();
    });
    this.dialogueOptions.appendChild(okBtn);
  }

  /**
   * Render a scene: set background and create interactable elements.
   * @param {object} scene
   */
  renderScene(scene) {
    // Clear existing interactables
    this.sceneContainer.innerHTML = '';
    // Set background image
    if (scene.background) {
      this.sceneContainer.style.backgroundImage = `url(${scene.background})`;
    } else {
      this.sceneContainer.style.backgroundImage = 'none';
    }
    // Create interactable markers
    scene.interactables.forEach((item) => {
      const marker = document.createElement('div');
      marker.classList.add('interactable');
      marker.setAttribute('data-id', item.id);
      marker.style.left = item.x + '%';
      marker.style.top = item.y + '%';
      marker.title = t(item.nameKey);
      marker.addEventListener('click', () => this.handleInteractable(item));
      this.sceneContainer.appendChild(marker);
    });
  }

  /**
   * Handle clicking on an interactable object in the scene.
   * @param {object} item
   */
  handleInteractable(item) {
    if (item.type === 'evidence') {
      evidenceSystem.collectEvidence(item.evidence);
    } else if (item.type === 'npc') {
      // Start dialogue with NPC
      const npc = npcSystem.getNPC(item.npcId);
      if (npc) {
        dialogueSystem.startDialogue(npc.dialogueId);
      }
    } else {
      // Other interactable types (future)
    }
  }

  /**
   * Add collected evidence to the inventory UI.
   * @param {object} evidence
   */
  addEvidenceToInventory(evidence) {
    // Remove placeholder text
    if (this.inventoryList.children.length === 1 && this.inventoryList.children[0].hasAttribute('data-placeholder')) {
      this.inventoryList.innerHTML = '';
    }
    const li = document.createElement('li');
    li.textContent = evidence.name;
    li.setAttribute('data-id', evidence.id);
    this.inventoryList.appendChild(li);
  }

  /**
   * Update analysis result for an evidence item (not displayed automatically here).
   * @param {object} evidence
   */
  updateEvidenceAnalysis(evidence) {
    // We could update UI here to indicate evidence is analyzed (e.g., add icon), but for simplicity we alert on click
  }

  /**
   * Add a note to the notes list.
   * @param {string} noteKey
   */
  addNote(noteKey) {
    this.notes.push(noteKey);
    // Remove placeholder if present
    if (this.notesList.children.length === 1 && this.notesList.children[0].hasAttribute('data-placeholder')) {
      this.notesList.innerHTML = '';
    }
    const li = document.createElement('li');
    li.textContent = t(noteKey);
    this.notesList.appendChild(li);
    // Emit to case manager via eventBus? Already done by caseManager
  }

  /**
   * Display a dialogue line from NPC
   * @param {string} text
   */
  showDialogueLine(text) {
    this.dialogueContainer.classList.remove('hidden');
    this.dialogueText.textContent = text;
    this.dialogueOptions.innerHTML = '';
  }

  /**
   * Display dialogue options for player to select.
   * @param {Array} options
   */
  showDialogueOptions(options) {
    this.dialogueOptions.innerHTML = '';
    options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.textContent = opt.text;
      btn.addEventListener('click', () => {
        dialogueSystem.handleOption(opt.action);
      });
      this.dialogueOptions.appendChild(btn);
    });
  }

  /**
   * Hide dialogue container
   */
  hideDialogue() {
    this.dialogueContainer.classList.add('hidden');
    this.dialogueText.textContent = '';
    this.dialogueOptions.innerHTML = '';
  }

  /**
   * Show a message when a case is solved.
   * @param {string} title
   */
  showCaseSolved(title) {
    this.dialogueContainer.classList.remove('hidden');
    this.dialogueText.textContent = t('CASE_COMPLETED') + ' (' + title + ')';
    this.dialogueOptions.innerHTML = '';
    const btn = document.createElement('button');
    btn.textContent = t('DIALOG_OK');
    btn.addEventListener('click', () => {
      this.hideDialogue();
      // Could reset game or proceed
    });
    this.dialogueOptions.appendChild(btn);
  }
}

export const uiManager = new UIManager();