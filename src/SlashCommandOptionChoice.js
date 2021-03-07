class SlashCommandOptionChoice {
    /**
     * @typedef {Object} SlashCommandOptionChoiceInfo
     * @property {string} name
     * @property {string|number} value
     */

    /**
     * @param {SlashCommandOptionChoiceInfo} data
     */
    constructor(data) {
        /**
         * @type {string}
         */
        this.name = data.name

        /**
         * @type {value}
         */
        this.value = data.value
    }
}