import Discord from 'discord.js'
import { discordConfig } from './discordConfig'

const client = new Discord.Client()

client.once('ready', () => {
  console.log('ready!')
})

client.on('message', message => {
  if (message.author.bot) {
    return
  }
  console.log(message.content)
  message.channel.send(`served message: ${message.content}`)
})

client.login(discordConfig.token)

