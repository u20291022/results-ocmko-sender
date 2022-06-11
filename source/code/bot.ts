import { Telegraf, Telegram } from "telegraf"
import { TextMessage } from "./interfaces"
import { textMessagesHandler } from "./text-messages-handler"
import { commands } from "./commands"
import { logs } from "./logs"
import { resultsSender } from "./results-sender"

class Bot {
  me: Telegraf
  methods: Telegram

  constructor (token: string) {
    this.me = new Telegraf(token)
    this.methods = this.me.telegram
  }

  handleTextMessages = () => {
    this.me.on("text", async context => {
      if (!context || !context.message || !context.message.text) return
      const message: TextMessage = context.message
      await textMessagesHandler.handle(message, this.methods)
    })
  }

  run = (): void => {
    this.methods.setMyCommands(commands.get())

    this.handleTextMessages()

    resultsSender.run(this.methods)

    this.me.launch()
      .then(() => logs.write("Results OCMKO sender bot launched!"))
      .catch((error) => logs.write("Bot error: " + error))
  }
}

export const bot = new Bot("5386824015:AAGfH8qXV5Lx2k_xh64bbRwSnyNdzrb-BbE")