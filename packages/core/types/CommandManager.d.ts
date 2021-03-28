/**
 * Manages Global commands or Guild commands
 */
export default class CommandManager {
    /**
     * @param {Client} client
     * @param {string} [guild]
     */
    constructor(client: any, guild?: string);
    /**
     * The client this manager belongs to
     * @type {Client}
     */
    client: any;
    /**
     * The commands cache
     * @type {Map<string,SlashCommand>}
     */
    cache: Map<string, SlashCommand>;
    /**
     * The commands registry
     * @type {Map<string,SlashCommand>}
     */
    registry: Map<string, SlashCommand>;
    /**
     * The guild this manager belongs to
     * @type {string}
     */
    guild: string;
    /**
     * Fetch all guild commands
     * @returns {Promise<Map<string,SlashCommand>>}
     */
    fetch(): Promise<Map<string, SlashCommand>>;
    /**
     * Push registry changes
     * @returns {Promise}
     */
    update(): Promise<void>;
    /**
    * Register a command or an array of commands using SlashCommand instance(s) and constructor(s)
    * @param {SlashCommand|Function|SlashCommand[]|Function[]} commands
    * @returns {CommandManager}
    */
    register(commands: SlashCommand | SlashCommandConstructor | SlashCommand[] | SlashCommandConstructor[]): CommandManager;
}

type SlashCommandConstructor = new () => SlashCommand

import SlashCommand from "./SlashCommand";
