const CommandManager = require('./CommandManager')

/**
 * A manager that manages {@link CommandManagers}
 */
class MainCommandManager {
    /**
     * @param {Client} client 
     */
    constructor(client) {
        /**
         * The client this manager belongs to
         * @type {Client}
         */
        this.client = client

        /**
         * Cached guilds
         * @type {Map<string,CommandManager>}
         */
        this.guilds = new Map()

        /**
         * The global command manager
         * @type {CommandManager}
         */
        this.global = new CommandManager(client)
    }

    /**
     * Gets a Guild {@link CommandManager} from {@link MainCommandManager~guilds the cache}
     * Creating one if one doesn't exist
     * @param {string} id - The id of the guild
     * @returns {CommandManager}
     */
    guild(id) {
        if (this.guilds.has(id)) {
            return this.guilds.get(id)
        } else {
            const manager = new CommandManager(this.client, id)
            this.guilds.set(id, manager)
            return manager
        }
    }
}

module.exports = MainCommandManager
