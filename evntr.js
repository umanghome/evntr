'use strict';

var invokeAsync = function invokeAsync(method, args) {
  return setTimeout(function () {
    return method.apply(null, args);
  });
};

/**
 * An eventer.
 */
var Evntr = function Evntr() {
  var c = {};

  return {

    /**
     * Sets an event listener.
     * @param {String} event Event name.
     * @param {Function} listener Event listener.
     */
    on: function on(event, listener) {
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
    emit: function emit(event) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // Sanity check.
      if (!event || !c || !c[event]) {
        return;
      }

      // Invoke each callback.
      for (var i = 0; i < c[event].length; i++) {
        invokeAsync(c[event][i], args);
      }
    },

    /**
     * Removes an event listener.
     * @param {String} event Event name.
     * @param {Function} listener Event listener.
     */
    off: function off(event, listener) {
      // Sanity check.
      if (!event || !listener || !c || !c[event]) {
        return;
      }

      // Get index of listener and remove it.
      var index = c[event].indexOf(listener);
      if (index >= 0) {
        c[event].splice(index, 1);
      }
    }

  };
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Evntr;
  module.exports.default = Evntr;
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Evntr;
    });
  } else {
    window.Evntr = Evntr;
  }
}
