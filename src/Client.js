const { default: axios } = require("axios")
const Interaction = require("./Interaction")
const MainCommandManager = require("./MainCommandManager")

/**
 * The main entry point
 */
class Client {
    /**
     * @typedef {Object} ClientOptions
     * @property {string} applicationId - The ID of the application
     * @property {string} authToken - The auth token used to authenticate requests
     * @property {EventEmitter} integration - An instance of an integration
     */

    /**
     * @param {ClientOptions} options
     */
    constructor(options) {
        /**
         * The ID of the application
         * @type {string}
         */
        this.applicationId = options.applicationId

        /**
         * The auth token used to authenticate requests
         * @type {string}
         */
        this.authToken = options.authToken

        /**
         * An instance of an integration
         * @type {EventEmitter}
         */
        this.integration = options.integration

        /**
         * An Axios instance
         * @type {*}
         * @private
         */
        this.api = axios.create({
            baseURL: 'https://discord.com/api/v8',
            headers: {
                'Authorization': this.authToken
            }
        })

        /**
         * The MainCommandManager of this Client
         * @type {MainCommandManager}
         */
        this.commands = new MainCommandManager(this)

        this.integration.on('interaction-receive', (...args) => {
            this._handleInteractionReceive(...args)
                .catch(e => {
                    console.error(e)
                })
        })
    }

    /**
     * @param {Object} data
     * @param {Function} [respond]
     * @private
     */
    async _handleInteractionReceive(data, respond) {
        try {
            switch (data.type) {
                case 2:
                    let command = this.commands.global.cache.get(data.data.name)

                    if (!command || (command.id !== data.data.id)) {
                        command = this.commands.guild(data.guild_id).cache.get(data.data.name)
                    }

                    if (!command) {
                        return console.error('Failed to find command: ' + data.data.name)
                    }

                    await command.run(new Interaction(this, data, respond))

                    break
                default:
                    console.error('Failed to respond to interaction type: ' + data.type)
                    break
            }
        } catch (e) {
            throw e
        }
    }
}

module.exports = Client
