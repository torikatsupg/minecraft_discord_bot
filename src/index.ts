require('dotenv').config()
import Discord from 'discord.js'
import { discordConfig } from './discordConfig'
import { start, stop } from './infra/instance'

const START_INSTANCE_COMMAND = "/start"
const STOP_INSTANCE_COMMAND = "/stop"

const client = new Discord.Client()

client.once('ready', () => {
  console.log('ready!')
})

client.on('message', message => {
  if (message.author.bot) {
    return
  }

  if (!message.content.includes(discordConfig.bot_id)) {
    return
  }

  const command = message.content.split(/\s+/)[1]
  switch (command) {
    case START_INSTANCE_COMMAND:
      onStartCommand(message)
      return;
    case STOP_INSTANCE_COMMAND:
      onStopCommand(message)
      return;
    default:
      onUnknownCommand(command, message)
      return;
  }
})


const START_COMMAND_RECIEVED_REPLY = "サーバーを起動しています。"
const START_COMMAND_REPLY = "サーバーを起動しました。"
const STOP_COMMAND_RECIEVED_REPLY = "サーバーを停止しています。"
const STOP_COMMAND_REPLY = "サーバーを停止しました。"
const UNKOWN_COMMAND_REPLY = "コマンド一覧\nサーバーの起動\n```/start```\n\nサーバーの停止\n```/stop```"
const ERROR_REPLY = "エラーが発生しました"

function onStartCommand(recievedMessage: Discord.Message): void {
  try {
    sendMessage(recievedMessage, START_COMMAND_RECIEVED_REPLY)
    start()
    sendMessage(recievedMessage, START_COMMAND_REPLY)
  } catch (e) {
    sendMessage(recievedMessage, ERROR_REPLY)
  }
}

function onStopCommand(recievedMessage: Discord.Message): void {
  try {
    sendMessage(recievedMessage, STOP_COMMAND_RECIEVED_REPLY)
    stop()
    sendMessage(recievedMessage, STOP_COMMAND_REPLY)
  } catch (e) {
    sendMessage(recievedMessage, ERROR_REPLY)
  }
}

function onUnknownCommand(recievedCommand: string, recievedMessage: Discord.Message): void {
  sendMessage(recievedMessage, `[${recievedCommand}]は未知のコマンドです`)
  sendMessage(recievedMessage, UNKOWN_COMMAND_REPLY)
}

function sendMessage(recievedMessage: Discord.Message, reply: string): void {
  recievedMessage.channel.send(reply)
}

client.login(discordConfig.token)
