/**
 * Simple TimeManager to simulate passage of time and schedule events.
 * In this prototype, we map 1 hour of game time to 1 second in real time
 * for analysis or time-based events.
 */
class TimeManager {
  constructor() {
    this.timers = [];
  }

  /**
   * Schedule a callback to execute after a given delay (milliseconds).
   * @param {number} delayMs
   * @param {function} callback
   */
  schedule(delayMs, callback) {
    const timerId = setTimeout(() => {
      callback();
      // Remove from timers list
      this.timers = this.timers.filter((id) => id !== timerId);
    }, delayMs);
    this.timers.push(timerId);
  }

  /**
   * Clear all scheduled timers (used when resetting a case).
   */
  clearAll() {
    this.timers.forEach((id) => clearTimeout(id));
    this.timers = [];
  }
}

export const timeManager = new TimeManager();