export const Client: typeof import("./Client");
export const CommandManager: typeof import("./CommandManager");
export const MainCommandManager: typeof import("./MainCommandManager");
export const SlashCommand: typeof import("./SlashCommand");
export const SlashCommandOption: typeof import("./SlashCommandOption");
export const SlashCommandOptionChoice: typeof import("./SlashCommandOptionChoice");
export const SlashCommandOptionType: {
    SUB_COMMAND: number;
    SUB_COMMAND_GROUP: number;
    STRING: number;
    INTEGER: number;
    BOOLEAN: number;
    USER: number;
    CHANNEL: number;
    ROLE: number;
};
