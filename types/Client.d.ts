export = Client;
/**
 * The main entry point
 */
declare class Client {
    /**
     * @typedef {Object} ClientOptions
     * @property {string} applicationId - The ID of the application
     * @property {string} authToken - The auth token used to authenticate requests
     * @property {EventEmitter} integration - An instance of an integration
     */
    /**
     * @param {ClientOptions} options
     */
    constructor(options: ClientOptions);
    /**
     * The ID of the application
     * @type {string}
     */
    applicationId: string;
    /**
     * The auth token used to authenticate requests
     * @type {string}
     */
    authToken: string;
    /**
     * An instance of an integration
     * @type {EventEmitter}
     */
    integration: any;
    /**
     * An Axios instance
     * @type {*}
     * @private
     */
    private api;
    /**
     * The MainCommandManager of this Client
     * @type {MainCommandManager}
     */
    commands: MainCommandManager;
    /**
     * @param {Object} data
     * @param {Function} [respond]
     * @private
     */
    private _handleInteractionReceive;
}
declare namespace Client {
    export { ClientOptions };
}
import MainCommandManager = require("./MainCommandManager");
type ClientOptions = {
    /**
     * - The ID of the application
     */
    applicationId: string;
    /**
     * - The auth token used to authenticate requests
     */
    authToken: string;
    /**
     * - An instance of an integration
     */
    integration: any;
};
