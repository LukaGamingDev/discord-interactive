const SlashCommandOption = require('./SlashCommandOption')

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

    _patch(data) {
        this.id = data.id ?? null
        this.application_id = data.application_id ?? null
        this.name = data.name
        this.description = data.description
        this.options = (data.options ?? []).map(option => new SlashCommandOption(option))
    }
}

module.exports = SlashCommand