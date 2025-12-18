// Simple event bus for decoupled communication between modules

class EventBus {
  constructor() {
    this.listeners = {};
  }

  /**
   * Subscribe to an event with a callback.
   * @param {string} event
   * @param {function} callback
   */
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   * Emit an event with optional data payload.
   * @param {string} event
   * @param {any} data
   */
  emit(event, data) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((cb) => cb(data));
  }

  /**
   * Unsubscribe a callback from an event.
   * @param {string} event
   * @param {function} callback
   */
  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
  }
}

// Export a singleton instance
export const eventBus = new EventBus();