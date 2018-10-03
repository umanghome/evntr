const invokeAsync = (method, args) => setTimeout(() => method.apply(null, args));

/**
 * An eventer.
 */
const Evntr = function () {
  const c = {};

  return {
    
    /**
     * Sets an event listener.
     * @param {String} event Event name.
     * @param {Function} listener Event listener.
     */
    on: (event, listener) => {
      // Sanity check.
      if (!event || !listener) {
        return;
      }

      // Initialise empty array for listeners if one does not exist.
      if (!c[event]) {
        c[event] = [];
      }

      // Set listener.
      c[event].push(listener);
    },

    /**
     * Emits an event with the given arguments.
     * @param {String} event Event name.
     */
    emit: (event, ...args) => {
      // Sanity check.
      if (!event || !c || !c[event]) {
        return;
      }

      // Invoke each callback.
      for (let i = 0; i < c[event].length; i++) {
        invokeAsync(c[event][i], args);
      }
    },

    /**
     * Removes an event listener.
     * @param {String} event Event name.
     * @param {Function} listener Event listener.
     */
    off: (event, listener) => {
      // Sanity check.
      if (!event || !listener || !c || !c[event]) {
        return;
      }
      
      // Get index of listener and remove it.
      const index = c[event].indexOf(listener);
      if (index >= 0) {
        c[event].splice(index, 1);
      }
    }

  };
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Evntr;
  module.exports.default = Evntr;
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return Evntr;
    });
  } else {
    window.Evntr = Evntr;
  }
}