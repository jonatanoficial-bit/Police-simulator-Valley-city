/**
 * NPCSystem stores and manages Non-Player Characters (NPCs).
 * Each NPC has an id, name and dialogue identifier defined in the case file.
 */
class NPCSystem {
  constructor() {
    this.npcs = {};
  }

  /**
   * Load NPC definitions from the case file.
   * @param {Array} npcList
   */
  loadNPCs(npcList) {
    this.npcs = {};
    npcList.forEach((npc) => {
      this.npcs[npc.id] = npc;
    });
  }

  /**
   * Retrieve NPC definition by id.
   * @param {string} npcId
   */
  getNPC(npcId) {
    return this.npcs[npcId];
  }
}

export const npcSystem = new NPCSystem();