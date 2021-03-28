/**
 * Represents a Discord Slash Command
 */
export default abstract class SlashCommand {
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
    constructor(manager: CommandManager, data: SlashCommandInfo);
    /**
     * The manager this command belongs to
     * @type {MainCommandManager}
     */
    manager: any;
    /**
     * Run the command
     * @abstract
     * @param {Interaction} interaction
     */
    abstract run(interaction: Interaction): void;
    _patch(data: any): void;
    /**
     * The id of the command
     * @type {?string}
     */
    id: string | null;
    /**
     * The id of the parent application
     * @type {?string}
     */
    application_id: string | null;
    /**
     * The name of the command
     * @type {string}
     */
    name: string;
    /**
     * The description of the command
     * @type {string}
     */
    description: string;
    /**
     * The parameters of the command
     * @type {SlashCommandOption[]}
     */
    options: SlashCommandOption[];
    /**
     * Update the command
     * @param {Partial<SlashCommand.SlashCommandInfo>} data - The data to update
     * @returns {Promise}
     */
    update(data: Partial<SlashCommand.SlashCommandInfo>): Promise<any>;
}
declare namespace SlashCommand {
    export interface SlashCommandInfo {
        /**
        * - The id of the command
        */
        id?: string;
        /**
            * - The id of the parent application
            */
        application_id?: string;
        /**
         * - The name of the command
         */
        name: string;
        /**
         * - The description of the command
         */
        description: string;
        /**
         * - The parameters of the command
         */
        options?: SlashCommandOptionInfo[];
    }
}
import CommandManager from "./CommandManager";
import SlashCommandOption, { SlashCommandOptionInfo } from "./SlashCommandOption";
import Interaction from './Interaction'
