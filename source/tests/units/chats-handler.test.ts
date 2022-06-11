import { chatsHandler } from "../../code/chats-handler"
import { logs } from "../../code/logs"

import assert from "assert"

export class ChatsHandlerTest {
  testCreateChat = (): void => {
    assert.equal(chatsHandler.isExists(0), false)
    chatsHandler.createChat(0)
    assert.equal(chatsHandler.isExists(0), true)
  }

  testEnableChat = (): void => {
    chatsHandler.deleteChat(0)
    chatsHandler.createChat(0)

    assert.equal(chatsHandler.isEnabled(0), false)
    chatsHandler.enableChat(0)
    assert.equal(chatsHandler.isEnabled(0), true)
  }
  
  testDisableChat = (): void => {
    chatsHandler.deleteChat(0)
    chatsHandler.createChat(0)

    chatsHandler.enableChat(0)
    assert.equal(chatsHandler.isEnabled(0), true)
    chatsHandler.disableChat(0)
    assert.equal(chatsHandler.isEnabled(0), false)
  }

  deleteTestChats = (): void => {
    chatsHandler.deleteChat(0)
  }

  run = (): void => {
    this.testCreateChat()
    logs.writeSuccessTestMessage("ChatsHandler", "createChat")

    this.testEnableChat()
    logs.writeSuccessTestMessage("ChatsHandler", "enableChat")

    this.testDisableChat()
    logs.writeSuccessTestMessage("ChatsHandler", "disableChat")

    this.deleteTestChats()
  }
}