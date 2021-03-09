export = Interaction;
/**
 * Represents a Discord Interaction
 */
declare class Interaction {
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
    constructor(client: any, data: InteractionInfo, respondOverrride?: Function);
    /**
     * @type {number}
     */
    version: number;
    /**
     * @type {number}
     */
    type: number;
    /**
     * @type {string}
     */
    token: string;
    /**
     * @type {Object}
     */
    member: any;
    /**
     * @type {string}
     */
    id: string;
    /**
     * @type {string}
     */
    guild_id: string;
    /**
     * @type {Object}
     */
    data: any;
    /**
     * @type {string}
     */
    channel_id: string;
    /**
     * @type {Function}
     * @private
     */
    private _respondOverride;
    /**
     * @type {boolean}
     * @private
     */
    private _hasResponded;
    /**
     * @type {Client}
     */
    client: any;
    /**
     * Respond to the interaction
     * @param {Object} data
     * @returns {Promise<InteractionReponse>}
     */
    respond(data: any): Promise<InteractionReponse>;
    /**
     * Respond to the interaction. Only the user that invoked the interaction can see the response
     * @param {Object} data
     * @returns {Promise<InteractionReponse>}
     */
    respondEphemeral(data: any): Promise<InteractionReponse>;
    /**
     * Synonym of {@link Interaction~respondEphemeral}
     * @param {Object} data
     * @returns {Promise<InteractionReponse>}
     */
    respondPrivate(data: any): Promise<InteractionReponse>;
    /**
     * @private
     * @param {Object} data
     * @param {number} type
     */
    private _respond;
}
declare namespace Interaction {
    export { InteractionInfo };
}
import InteractionReponse = require("./InteractionResponse");
type InteractionInfo = {
    version: number;
    type: number;
    token: string;
    member: any;
    id: string;
    guild_id: string;
    data: any;
    channel_id: string;
};
