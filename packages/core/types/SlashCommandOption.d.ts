export default class SlashCommandOption {
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
    constructor(data: SlashCommandOptionInfo);
    /**
     * The type of this option
     * @type {SlashCommandOptionType}
     */
    type: SlashCommandOptionType;
    /**
     * The name of this option
     * @type {string}
     */
    name: string;
    /**
     * The description of this option
     * @type {string}
     */
    description: string;
    /**
     * Whether or not this option is required
     * @type {boolean}
     */
    required: boolean;
    /**
     * The choices of the user can pick from
     * @type {?SlashCommandOptionChoice[]}
     */
    choices: SlashCommandOptionChoice[] | null;
    /**
     * The options for subcommands and subcommand groups
     * @type {?SlashCommandOption[]}
     */
    options: SlashCommandOption[] | null;
}

export interface SlashCommandOptionInfo {
    /**
     * - The type of this option
     */
    type: any;
    /**
     * - The name of this option
     */
    name: string;
    /**
     * - The description of this option
     */
    description: string;
    /**
     * - Whether or not this option is required
     */
    required?: boolean;
    /**
     * - The choices of the user can pick from
     */
    choices?: SlashCommandOptionChoiceInfo[];
    /**
     * - The options for subcommands and subcommand groups
     */
    options?: SlashCommandOptionInfo[];
}


import SlashCommandOptionChoice, { SlashCommandOptionChoiceInfo } from "./SlashCommandOptionChoice";
import SlashCommandOptionType from "./SlashCommandOptionType";