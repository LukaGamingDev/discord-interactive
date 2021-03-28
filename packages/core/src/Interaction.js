const InteractionResponse = require("./InteractionResponse")

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
     * @param {Function} [respondOverrride]
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
         * @type {InteractionResponse}
         * @private
         */
        this._loadingIndicator

        /**
         * @type {Client}
         */
        this.client = client

        client.integration.interactionMiddleware(this)
    }

    /**
     * Respond to the interaction
     * @param {Object} data 
     * @returns {Promise<InteractionResponse>}
     */
    async respond(data) {
        const res = await this._respond(data)

        this._hasResponded = true

        return new InteractionResponse(this, data.flags === 1 << 6, res?.data?.id)
    }

    /**
     * Respond to the interaction. Only the user that invoked the interaction can see the response
     * @param {Object} data 
     * @returns {Promise<InteractionResponse>}
     */
    respondEphemeral(data) {
        return this.respond({ ...data, flags: 1 << 6 })
    }

    /**
     * Synonym of {@link Interaction~respondEphemeral}
     * @param {Object} data 
     * @returns {Promise<InteractionResponse>}
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
        if (this._respondOverride && !this._hasResponded) {
            return this._respondOverride(data, type)
        }

        if (this._loadingIndicator && !this._hasResponded) {
            return this._loadingIndicator.edit(data).then(() => { })
        }

        const endpoint = this._hasResponded
            ? `/webhooks/${this.client.applicationId}/${this.token}`
            : `/interactions/${this.id}/${this.token}/callback`

        return this.client.api.post(endpoint, this._hasResponded ? data : {
            type,
            data
        })
    }

    /**
     * Shows a loading indicator.
     * @param {boolean} isEphemeral - Whether or not the initial respond should be ephemeral
     */
    async showLoadingIndicator(isEphemeral) {
        if (this._hasResponded) {
            throw new Error("Can't show loading indicator after initial respond")
        }

        if (this._loadingIndicator) {
            throw new Error("Can't show loading indicator twice")
        }

        const res = await this._respond(
            isEphemeral ? {
                flags: 1 << 6
            } : null, 5
        )

        this._loadingIndicator = new InteractionResponse(this, isEphemeral)
    }
}

module.exports = Interaction