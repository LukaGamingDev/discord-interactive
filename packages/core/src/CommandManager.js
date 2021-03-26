const { diff } = require('deep-object-diff')
const SlashCommand = require('./SlashCommand')

const debug = require('debug')('discord-interactive:command-manager')

function getSlashCommandData(command) {
    return {
        name: command.name,
        description: command.description,
        options: command.options
    }
}

/**
 * Manages Global commands or Guild commands
 */
class CommandManager {
    /**
     * @param {Client} client
     * @param {string} [guild]
     */
    constructor(client, guild) {
        /**
         * The client this manager belongs to
         * @type {Client}
         */
        this.client = client

        /**
         * The commands cache
         * @type {Map<string,SlashCommand>}
         */
        this.cache = new Map()

        /**
         * The commands registry
         * @type {Map<string,SlashCommand>}
         */
        this.registry = new Map()

        /**
         * The guild this manager belongs to
         * @type {string}
         */
        this.guild = guild
    }

    /**
     * Fetch all guild commands
     * @returns {Promise<Map<string,SlashCommand>>}
     */
    fetch() {
        const endpoint = this.guild
            ? `/applications/${this.client.applicationId}/guilds/${this.guild}/commands`
            : `/applications/${this.client.applicationId}/commands`

        debug('GET %o', endpoint)

        return this.client.api.get(endpoint)
            .then(res => new Map(res.data.map(data => [data.name, new SlashCommand(this, data)])))
            .then(data => (debug('GET %o %O', endpoint, data), this.cache = data))
    }

    /**
     * Push registry changes
     * @returns {Promise}
     */
    async update() {
        const commands = await this.fetch()

        const created = []
        const tasks = []

        debug('pushing registry changes')

        this.registry.forEach(command => {
            const exists = commands.has(command.name)
            if (exists) {
                const oldCommand = commands.get(command.name)

                const diffResult = diff(getSlashCommandData(oldCommand), getSlashCommandData(command))

                command.id = oldCommand.id

                if (diffResult.options) {
                    diffResult.options = command.options
                }

                this.cache.set(command.name, command)

                if (Object.keys(diffResult).length > 0) {
                    tasks.push(command.update(diffResult))
                }
            } else {
                created.push(command)
            }
        })

        await Promise.all([
            ...tasks,
            ...created.map(command => {
                const endpoint = this.guild
                    ? `/applications/${this.client.applicationId}/guilds/${this.guild}/commands`
                    : `/applications/${this.client.applicationId}/commands`

                debug('POST %o', endpoint)

                const data = getSlashCommandData(command)

                return this.client.api.post(endpoint, data)
                    .then(data => debug('POST %o %O', endpoint, data.data))
            })
        ])
    }

    /**
    * Register a command or an array of commands using SlashCommand isntance(s) and constructor(s)
    * @param {SlashCommand|Function|SlashCommand[]|Function[]} commands
    * @returns {CommandManager}
    */
    register(commands) {
        if (Array.isArray(commands)) {
            commands.forEach(command => {
                if (typeof command === 'function') {
                    const newCommand = new command(this)
                    this.registry.set(newCommand.name, newCommand)
                } else if (command instanceof SlashCommand) {
                    this.registry.set(command.name, command)
                } else {
                    throw new TypeError('Expected Constructor or SlashCommand')
                }
            })
        } else if (typeof commands === 'function') {
            const newCommand = new commands(this)
            this.registry.set(newCommand.name, newCommand)
        } else if (commands instanceof SlashCommand) {
            this.registry.set(commmands.name, commands)
        } else {
            throw new TypeError('Expected Constructor or SlashCommand')
        }

        return this
    }
}

module.exports = CommandManager