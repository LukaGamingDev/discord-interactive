export = InteractionReponse;
declare class InteractionReponse {
    /**
     * @param {Interaction} interaction
     * @param {string} [id=@original]
     */
    constructor(interaction: Interaction, id?: string);
    /**
     * @type {Interaction}
     */
    interaction: Interaction;
    /**
     * @type {string}
     */
    id: string;
    /**
     * Edit the interaction response
     * @param {Object} data
     */
    edit(data: any): any;
    /**
     * Delete the interaction response
     */
    delete(): any;
}
import Interaction = require("./Interaction");
