class SlashCommandOptionChoice {
    /**
     * @typedef {Object} SlashCommandOptionChoiceInfo
     * @property {string} name - The name of the choice
     * @property {string|number} value - The value of the choice
     */

    /**
     * @param {SlashCommandOptionChoiceInfo} data
     */
    constructor(data) {
        /**
         * The name of the choice
         * @type {string}
         */
        this.name = data.name

        /**
         * The value of the choice
         * @type {value}
         */
        this.value = data.value
    }
}

module.exports = SlashCommandOptionChoice