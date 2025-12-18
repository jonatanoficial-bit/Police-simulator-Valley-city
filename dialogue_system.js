import { eventBus } from './event_bus.js';
import { caseManager } from './case_manager.js';
import { t } from './localization.js';

/**
 * DialogueSystem handles conversational flows with NPCs.
 * Dialogues are defined in the case file under the "dialogues" section.
 */
class DialogueSystem {
  constructor() {
    this.active = false;
    this.currentDialogueId = null;
    this.currentIndex = 0;
  }

  /**
   * Start a dialogue sequence with a given dialogue ID.
   * @param {string} dialogueId
   */
  startDialogue(dialogueId) {
    const dialogues = caseManager.getCurrentCase().dialogues;
    if (!dialogues || !dialogues[dialogueId]) {
      console.warn('Dialogue not found:', dialogueId);
      return;
    }
    this.active = true;
    this.currentDialogueId = dialogueId;
    this.currentIndex = 0;
    // Signal UI that dialogue has started
    this.processCurrentNode();
  }

  /**
   * Process the current node of the dialogue and emit events to UI.
   */
  processCurrentNode() {
    if (!this.active) return;
    const dialogues = caseManager.getCurrentCase().dialogues;
    const sequence = dialogues[this.currentDialogueId];
    if (!sequence || this.currentIndex >= sequence.length) {
      // End of dialogue
      this.endDialogue();
      return;
    }
    const node = sequence[this.currentIndex];
    if (node.speaker === 'npc') {
      // Show NPC dialogue line
      const text = t(node.textKey);
      // If this node has a note to add, emit event
      if (node.noteKey) {
        eventBus.emit('noteAdded', node.noteKey);
      }
      eventBus.emit('dialogueShowLine', { speaker: 'npc', text });
      // Advance to next node after showing line; options or next line come after
      this.currentIndex += 1;
      // Check if next node is options or another NPC line
      const nextNode = sequence[this.currentIndex];
      if (nextNode && nextNode.options) {
        // Show options after a short delay (immediate in this prototype)
        const options = nextNode.options.map((opt) => {
          return {
            text: t(opt.textKey),
            action: opt.action
          };
        });
        eventBus.emit('dialogueShowOptions', options);
      } else {
        // No options, process next automatically
        this.processCurrentNode();
      }
    } else if (node.options) {
      // Show options
      const options = node.options.map((opt) => ({ text: t(opt.textKey), action: opt.action }));
      eventBus.emit('dialogueShowOptions', options);
    }
  }

  /**
   * Handle selection of a dialogue option.
   * @param {string} action
   */
  handleOption(action) {
    if (!this.active) return;
    if (action === 'end') {
      this.endDialogue();
      return;
    }
    // Start new dialogue sequence based on action
    this.currentDialogueId = action;
    this.currentIndex = 0;
    this.processCurrentNode();
  }

  /**
   * End the current dialogue.
   */
  endDialogue() {
    if (!this.active) return;
    this.active = false;
    this.currentDialogueId = null;
    this.currentIndex = 0;
    eventBus.emit('dialogueHide');
  }
}

export const dialogueSystem = new DialogueSystem();