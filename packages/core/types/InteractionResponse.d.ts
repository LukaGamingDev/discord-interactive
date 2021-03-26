export default class InteractionReponse {
    /**
     * @param {Interaction} interaction
     * @param {boolean} isEphemeral
     * @param {string} [id=@original]
     */
    constructor(interaction: Interaction, isEphemeral: boolean, id?: string);
    /**
     * @type {Interaction}
     */
    interaction: Interaction;
    /**
     * @type {string}
     */
    id: string;
    /**
     * @type {boolean}
     */
    isEphemeral: boolean;
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

import Interaction from './Interaction'
