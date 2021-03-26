const SlashCommandOption = require('./SlashCommandOption')
const debug = require('debug')('discord-interactive:slash-command')

/**
 * Represents a Discord Slash Command
 */
class SlashCommand {
    /**
     * @typedef {Object} SlashCommandInfo
     * @property {string} [id] - The id of the command
     * @property {string} [application_id] - The id of the parent application
     * @property {string} name - The name of the command
     * @property {string} description - The description of the command
     * @property {SlashCommandOptionInfo[]} [options=[]] - The parameters of the command
     */

    /**
     * @abstract
     * @param {MainCommandManager} manager 
     * @param {SlashCommandInfo} data 
     */
    constructor(manager, data) {
        /**
         * The manager this command belongs to
         * @type {MainCommandManager}
         */
        this.manager = manager

        this._patch(data)
    }

    /**
     * Run the command
     * @abstract
     * @param {Interaction} interaction 
     */
    run() {
        throw new Error(`Command '${this.name}' has no run method`)
    }

    _patch(data) {
        /**
         * The id of the command
         * @type {?string}
         */
        this.id = data.id ?? null

        /**
         * The id of the parent application
         * @type {?string}
         */
        this.application_id = data.application_id ?? null

        /**
         * The name of the command
         * @type {string}
         */
        this.name = data.name

        /**
         * The description of the command
         * @type {string}
         */
        this.description = data.description

        /**
         * The parameters of the command
         * @type {SlashCommandOption[]}
         */
        this.options = (data.options ?? []).map(option => new SlashCommandOption(option))
    }

    /**
     * Update the command
     * @param {Partial<SlashCommandInfo>} data - The data to update
     * @returns {Promise}
     */
    async update(data) {
        const manager = this.manager

        const endpoint = manager.guild
            ? `/applications/${manager.client.applicationId}/guilds/${manager.guild}/commands/${this.id}`
            : `/applications/${manager.client.applicationId}/commands/${this.id}`

        debug('PATCH %o', endpoint)

        await this.manager.client.api.patch(endpoint, data)
            .then(data => debug('PATCH %o %O', endpoint, data.data))
            .catch(e => console.log(JSON.stringify(e.response.data, null, 2)))
    }
}

module.exports = SlashCommand