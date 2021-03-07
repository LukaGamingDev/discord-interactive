const { default: axios } = require("axios")
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
     * @param {ClientOptions}
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
            baseURL: 'https://discord.com/api/v7',
            headers: {
                'Authorization': this.authToken
            }
        })

        /**
         * The MainCommandManager of this Client
         * @type {MainCommandManager}
         */
        this.commands = new MainCommandManager(this)

        this.integration.on('interaction-receive', (data) => this._handleInteractionReceive(data))
    }

    /**
     * @param {Object} data
     * @private
     */
    _handleInteractionReceive(data) {

    }
}

module.exports = Client
