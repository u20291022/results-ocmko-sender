import { TextMessage } from "./interfaces"
import { Telegram } from "telegraf"
import { commands } from "./commands"
import { chatsHandler } from "./chats-handler"

class CommandsHandler {
  constructor () {}

  sendStartMessage = async (chatId: number, methods: Telegram): Promise<void> => {
    const text = "✅ Рассылка результатов ЕГЭ запущена!"
    await methods.sendMessage(chatId, text)
  }

  sendDisableMessage = async (chatId: number, methods: Telegram): Promise<void> => {
    const text = "❌ Рассылка результатов ЕГЭ отключена!"
    await methods.sendMessage(chatId, text)
  }

  handle = async (message: TextMessage, methods: Telegram): Promise<void> => {
    const command = message.text
    const chatId = message.chat.id

    if (!commands.has(command)) return

    if (commands.equal(command, "start")) {
      chatsHandler.createChat(chatId)
      chatsHandler.enableChat(chatId)
      await this.sendStartMessage(chatId, methods)
    }

    if (commands.equal(command, "disable")) {
      chatsHandler.disableChat(chatId)
      await this.sendDisableMessage(chatId, methods)
    }

    chatsHandler.updateJson()
  }
}

export const commandsHandler = new CommandsHandler()