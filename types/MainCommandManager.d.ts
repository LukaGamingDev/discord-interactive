export = MainCommandManager;
/**
 * A manager that manages {@link CommandManagers}
 */
declare class MainCommandManager {
    /**
     * @param {Client} client
     */
    constructor(client: any);
    /**
     * The client this manager belongs to
     * @type {Client}
     */
    client: any;
    /**
     * Cached guilds
     * @type {Map<string,CommandManager>}
     */
    guilds: any;
    /**
     * The global command manager
     * @type {CommandManager}
     */
    global: CommandManager;
    /**
     * Gets a Guild {@link CommandManager} from {@link MainCommandManager~guilds the cache}
     * Creating one if one doesn't exist
     * @param {string} id - The id of the guild
     * @returns {CommandManager}
     */
    guild(id: string): CommandManager;
}
import CommandManager = require("./CommandManager");
