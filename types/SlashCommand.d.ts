export = SlashCommand;
/**
 * Represents a Discord Slash Command
 */
declare class SlashCommand {
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
    constructor(manager: any, data: SlashCommandInfo);
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
    run(): void;
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
     * @param {Partial<SlashCommandInfo>} data - The data to update
     * @returns {Promise}
     */
    update(data: Partial<SlashCommandInfo>): Promise<any>;
}
declare namespace SlashCommand {
    export { SlashCommandInfo };
}
import SlashCommandOption = require("./SlashCommandOption");
type SlashCommandInfo = {
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
    options?: any[];
};
