import { resultsParser } from "./results-parser"
import { logs } from "./logs"
import { Telegram } from "telegraf"
import { chatsHandler } from "./chats-handler"
import { ResultsSended } from "./interfaces"

class ResultsSender {
  results: string[] = []
  sended: ResultsSended = {}

  checkResults = async (): Promise<void> => {
    const results = await resultsParser.getResults()

    if (results[0] !== this.results[0]) {
      logs.write("New results!")
      this.results = results
    }

    setTimeout(
      async () => await this.checkResults(),
      !this.results[0] ? 1000 : 90000
    )
  }

  sendResultsIfUpdated = async (methods: Telegram): Promise<void> => {
    const chats = chatsHandler.getChats()
    const chatIds = Object.keys(chats).map(chatId => Number(chatId))

    chatIds.forEach(chatId => {
      if (!this.sended[chatId]) this.sended[chatId] = []
      if (!chatsHandler.isEnabled(chatId)) return

      this.results.forEach(async result => {
        if (!this.sended[chatId].includes(result)) {
          try {
            await methods.sendMessage(chatId, "Новый результат!\n" + result)
          } catch (e) {}

          this.sended[chatId].push(result)
        }
      })
    })

    setTimeout(
      async () => await this.sendResultsIfUpdated(methods),
      1500
    )
  }

  run = (methods: Telegram): void => {
    this.checkResults()
    this.sendResultsIfUpdated(methods)
  }
}

export const resultsSender = new ResultsSender() 