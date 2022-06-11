import { fileSystem } from "./filesystem"
import { ChatsJson } from "./interfaces"

class ChatsHandler {
  private chatsDirectoryPath = "data"
  private chatsJsonPath = this.chatsDirectoryPath + "/chats.json"
  chats: ChatsJson = {}

  constructor () {
    fileSystem.createPath(this.chatsDirectoryPath)

    if (!fileSystem.isExists(this.chatsJsonPath)) {
      fileSystem.writeJsonFile(this.chatsJsonPath, {})
    }

    this.chats = fileSystem.readJsonFile(this.chatsJsonPath)
  }

  isExists = (chatId: number): boolean => {
    return typeof this.chats[chatId] === "boolean"
  }

  isEnabled = (chatId: number): boolean => {
    return this.isExists(chatId) && this.chats[chatId] === true
  }

  getChats = (): ChatsJson => {
    return this.chats
  }

  createChat = (chatId: number): void => {
    if (!this.isExists(chatId)) this.chats[chatId] = false
  }

  deleteChat = (chatId: number): void => {
    if (this.isExists(chatId)) delete this.chats[chatId]
  }

  enableChat = (chatId: number): void => {
    if (this.isExists(chatId)) this.chats[chatId] = true
  }

  disableChat = (chatId: number): void => {
    if (this.isExists(chatId)) this.chats[chatId] = false
  }

  updateJson = (): void => {
    fileSystem.writeJsonFile(this.chatsJsonPath, this.chats)
  }
}

export const chatsHandler = new ChatsHandler()