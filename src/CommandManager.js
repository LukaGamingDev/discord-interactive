const SlashCommand = require('./SlashCommand')

/**
 * Manages Global commands or Guild commands
 */
class CommandManager {
    /**
     * @param {Client} client
     * @param {string} [guild]
     */
    constructor(client, guild) {
        /**
         * The client this manager belongs to
         * @type {Client}
         */
        this.client = client

        /**
         * The commands cache
         * @type {Map<string,SlashCommand>}
         */
        this.cache = new Map()

        /**
         * The commands registry
         * @type {SlashCommand[]}
         */
        this.registry = []

        /**
         * The guild this manager belongs to
         * @type {string}
         */
        this.guild = guild
    }

    /**
     * Fetch all guild commands
     * @returns {Promise<SlashCommand[]>}
     */
    fetch() {
        const endpoint = this.guild
            ? `/applications/${this.client.applicationId}}/guilds/${this.guild}/commands`
            : `/applications/${this.client.applicationId}/commands`

        return this.client.api.get(endpoint)
            .then(res => res.data.map(data => new SlashCommand(this, data)))
            .then(data => this.cache = data)
    }
}

module.exports = CommandManager