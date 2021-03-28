/**
 * Integrates discord-interactive with a other library.
 */
export default abstract class Integration extends EventEmitter {
    /**
     * Middleware thats ran when a interaction is created
     * @abstract
     * @param {Interaction} interaction
     */
    abstract interactionMiddleware(interaction: Interaction): void

    on(event: 'interaction-receive', listener: (data: Record<string, unknown>) => void): this
    on(event: string, listener: Function): this
}

import EventEmitter from "events";
import Interaction from "./Interaction";
