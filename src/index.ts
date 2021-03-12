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
   console.log(message.content)
   if (message.author.bot) {
     return
   }

   console.log(discordConfig)
   if (!message.content.includes(discordConfig.bot_id)) {
     return
   }

   console.log(message.content)
   const command = message.content.split(/\s+/)[1]
   console.log(command)
   switch(command) {
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


const START_COMMAND_REPLY = "サーバーを起動しました。"
const STOP_COMMAND_REPLY = "サーバーを停止しました。"
const UNKOWN_COMMAND_REPLY = "コマンド一覧\nサーバーの起動\n```/start```\n\nサーバーの停止\n```/stop```"
const ERROR_REPLY = "エラーが発生しました"

async function onStartCommand(recievedMessage: Discord.Message) {
  try {
    start()
    sendMessage(recievedMessage, START_COMMAND_REPLY)
  } catch (e) {
    sendMessage(recievedMessage, ERROR_REPLY)
  }
}

function onStopCommand(recievedMessage: Discord.Message) {
  try {
    stop()
    sendMessage(recievedMessage, STOP_COMMAND_REPLY)
  } catch (e) {
    sendMessage(recievedMessage, ERROR_REPLY)
  }
}

function onUnknownCommand(recievedCommand: string, recievedMessage: Discord.Message) {
  sendMessage(recievedMessage, `[${recievedCommand}]は未知のコマンドです`)
  sendMessage(recievedMessage, UNKOWN_COMMAND_REPLY)
}

function sendMessage(recievedMessage: Discord.Message, reply: string) {
  recievedMessage.channel.send(reply)
}

 client.login(discordConfig.token)
