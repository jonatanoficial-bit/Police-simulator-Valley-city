import { eventBus } from './event_bus.js';
import { t } from './localization.js';
import { timeManager } from './time_manager.js';

/**
 * EvidenceSystem manages collection and analysis of evidences within a case.
 * It stores collected evidence items and triggers events when new evidence
 * is acquired or when analysis is complete.
 */
class EvidenceSystem {
  constructor() {
    this.reset();
  }

  /**
   * Reset evidence state for a new case.
   */
  reset() {
    this.collected = [];
  }

  /**
   * Collect an evidence item if not already collected.
   * @param {object} evidenceDef - Definition of the evidence from the case file.
   */
  collectEvidence(evidenceDef) {
    // Check if this evidence has already been collected
    if (this.collected.find((ev) => ev.id === evidenceDef.id)) {
      return;
    }
    // Add to collected list
    const evidenceItem = {
      id: evidenceDef.id,
      name: evidenceDef.name,
      analysisResultKey: evidenceDef.analysisResultKey,
      analysisTime: evidenceDef.analysisTime || 0,
      analyzed: false,
      result: null
    };
    this.collected.push(evidenceItem);
    // Emit event for UI and case manager
    eventBus.emit('evidenceCollected', evidenceItem);
    // Start analysis if needed
    this.analyzeEvidence(evidenceItem);
  }

  /**
   * Analyze an evidence item. If analysisTime > 0, schedule delayed result.
   * @param {object} evidence
   */
  analyzeEvidence(evidence) {
    const completeAnalysis = () => {
      evidence.analyzed = true;
      evidence.result = t(evidence.analysisResultKey);
      // Emit event to update UI with analysis result if necessary
      eventBus.emit('evidenceAnalyzed', evidence);
    };
    if (evidence.analysisTime && evidence.analysisTime > 0) {
      // Convert analysisTime (hours) to milliseconds; for demonstration, each hour = 1000ms
      const delayMs = evidence.analysisTime * 1000;
      timeManager.schedule(delayMs, completeAnalysis);
    } else {
      completeAnalysis();
    }
  }

  /**
   * Retrieve list of collected evidences.
   */
  getCollected() {
    return this.collected;
  }
}

export const evidenceSystem = new EvidenceSystem();