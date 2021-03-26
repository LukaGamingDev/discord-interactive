class SlashCommandOption {
    /**
     * @typedef {Object} SlashCommandOptionInfo
     * @property {SlashCommandOptionType} type - The type of this option
     * @property {string} name - The name of this option
     * @property {string} description - The description of this option
     * @property {boolean} [required=false] - Whether or not this option is required
     * @property {SlashCommandOptionChoiceInfo[]} [choices] - The choices of the user can pick from
     * @property {SlashCommandOptionInfo[]} [options] - The options for subcommands and subcommand groups
     */

    /**
     * @param {SlashCommandOptionInfo} data 
     */
    constructor(data) {
        /**
         * The type of this option
         * @type {SlashCommandOptionType}
         */
        this.type = data.type

        /**
         * The name of this option
         * @type {string}
         */
        this.name = data.name

        /**
         * The description of this option
         * @type {string}
         */
        this.description = data.description

        /**
         * Whether or not this option is required
         * @type {boolean}
         */
        this.required = data.required ?? false

        /**
         * The choices of the user can pick from
         * @type {?SlashCommandOptionChoice[]}
         */
        this.choices = data.choices?.map(choice => new SlashCommandOptionChoice(choice)) ?? null

        /**
         * The options for subcommands and subcommand groups
         * @type {?SlashCommandOption[]}
         */
        this.options = data.options?.map(option => new SlashCommandOption(option)) ?? null
    }
}

module.exports = SlashCommandOption