const Interaction = require("./Interaction")

class InteractionReponse {
    /**
     * @param {Interaction} interaction
     * @param {boolean} isEphemeral
     * @param {string} [id=@original]
     */
    constructor(interaction, isEphemeral, id) {
        /**
         * @type {Interaction}
         */
        this.interaction = interaction

        /**
         * @type {boolean}
         */
        this.isEphemeral = isEphemeral

        /**
         * @type {string}
         */
        this.id = id ?? '@original'
    }

    /**
     * Edit the interaction response
     * @param {Object} data 
     */
    edit(data) {
        const client = this.interaction.client
        const endpoint = `/webhooks/${client.applicationId}/${this.interaction.token}/messages/${this.id}`

        return client.api.patch(endpoint, data)
    }

    /**
     * Delete the interaction response
     */
    delete() {
        if (this.isEphemeral) {
            throw new Error("Can't delete ephemeral response")
        }

        const client = this.interaction.client
        const endpoint = `/webhooks/${client.applicationId}/${this.interaction.token}/messages/${this.id}`

        return client.api.delete(endpoint)
    }
}

module.exports = InteractionReponse