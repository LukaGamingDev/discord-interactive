const EventEmitter = require('events')

/**
 * Integrates discord-interactive with a other library.
 */
class Integration extends EventEmitter {
    /**
     * Middleware thats ran when a interaction is created
     * @abstract
     * @param {Interaction} interaction
     */
    interactionMiddleware() { }
}

module.exports = Integration

/**
 * Emitted when a interaction is received
 * @event Integration#interaction-receive
 * @param {string} data
 */