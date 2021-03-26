const { Client: InteractionsClient, SlashCommand } = require('@discord-interactive/core')
const { Client } = require('discord.js')
const EventEmitter = require('events')

const TOKEN = /* No Token Here */                                                                                 'ODA2OTM4MTA0MDgyMDcxNTUy.YBwtrA.TJioLLchBgKitR5Rrg4ueSDRxaQ'

const client = new Client()
const integration = new EventEmitter()
const interactionsClient = new InteractionsClient({
    applicationId: '806938104082071552',
    authToken: `Bot ${TOKEN}`,
    integration
})

const time = (s) => new Promise(r => setTimeout(r, s))

class TestCommand extends SlashCommand {
    constructor(manager) {
        super(manager, {
            name: 'test',
            description: 'Test command'
        })
    }

    async run(interaction) {
        await interaction.showLoadingIndicator(true)

        await time(5000)

        const init = await interaction.respond({
            content: 'Hello world!'
        })

        await time(3000)

        await init.edit({
            content: 'Hello world! *(edit)*'
        })

        await time(3000)

        const followup = await interaction.respond({
            content: 'This is message.'
        })

        await time(3000)

        await followup.edit({
            content: 'this is edit'
        })

        await time(3000)

        await followup.delete()
    }
}

interactionsClient.commands.guild('806936473005064202')
    .register(TestCommand)
    .update()

client.on('ready', () => {
    console.log('READY')

    client.ws.on('INTERACTION_CREATE', data => {
        integration.emit('interaction-receive', data)
    })
})

client.login(TOKEN)
