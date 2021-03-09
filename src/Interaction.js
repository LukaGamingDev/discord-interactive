const InteractionReponse = require("./InteractionResponse")

/**
 * Represents a Discord Interaction
 */
class Interaction {
    /**
     * @typedef {Object} InteractionInfo
     * @property {number} version
     * @property {number} type
     * @property {string} token
     * @property {Object} member
     * @property {string} id
     * @property {string} guild_id
     * @property {Object} data
     * @property {string} channel_id
     */

    /**
     * @param {Client} client
     * @param {InteractionInfo} data
     * @param {Function} [respondOverrride	]
     */
    constructor(client, data, respondOverrride) {
        /**
         * @type {number}
         */
        this.version = data.version

        /**
         * @type {number}
         */
        this.type = data.type

        /**
         * @type {string}
         */
        this.token = data.token

        /**
         * @type {Object}
         */
        this.member = data.member

        /**
         * @type {string}
         */
        this.id = data.id

        /**
         * @type {string}
         */
        this.guild_id = data.guild_id

        /**
         * @type {Object}
         */
        this.data = data.data

        /**
         * @type {string}
         */
        this.channel_id = data.channel_id

        /**
         * @type {Function}
         * @private
         */
        this._respondOverride = respondOverrride

        /**
         * @type {boolean}
         * @private
         */
        this._hasResponded = false

        /**
         * @type {Client}
         */
        this.client = client
    }

    /**
     * Respond to the interaction
     * @param {Object} data 
     * @returns {Promise<InteractionReponse>}
     */
    async respond(data) {
        const res = await this._respond(data)

        this._hasResponded = true

        return new InteractionReponse(this, res.data?.id)
    }

    /**
     * Respond to the interaction. Only the user that invoked the interaction can see the response
     * @param {Object} data 
     * @returns {Promise<InteractionReponse>}
     */
    respondEphemeral(data) {
        return this.respond({ ...data, flags: 1 << 6 })
    }

    /**
     * Synonym of {@link Interaction~respondEphemeral}
     * @param {Object} data 
     * @returns {Promise<InteractionReponse>}
     */
    respondPrivate(data) {
        return this.respondEphemeral(data)
    }

    /**
     * @private
     * @param {Object} data
     * @param {number} type
     */
    _respond(data, type = 4) {
        if (this._respondOverride) {
            return this._respondOverride()
        }

        const endpoint = this._hasResponded
            ? `/webhooks/${this.client.applicationId}/${this.token}`
            : `/interactions/${this.id}/${this.token}/callback`

        return this.client.api.post(endpoint, this._hasResponded ? data : {
            type,
            data
        })
    }
}

module.exports = Interaction