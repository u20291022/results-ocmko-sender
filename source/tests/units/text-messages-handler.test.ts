import { textMessagesHandler } from "../../code/text-messages-handler"
import assert from "assert"

import { logs } from "../../code/logs"

export class TextMessagesHandlerTest {
  constructor () {}

  testIsTextCommand = (): void => {
    const commandWithoutTag = "/help"
    const commandWithTag = "/help@ege_results_2022_bot"

    const text = "send"
    const textWithTag = "send@ege_results_2022_bot"

    assert.equal(textMessagesHandler.isTextCommand(commandWithoutTag), true)
    assert.equal(textMessagesHandler.isTextCommand(commandWithTag), true)
    assert.equal(textMessagesHandler.isTextCommand(text), false)
    assert.equal(textMessagesHandler.isTextCommand(textWithTag), false)
  }

  run = (): void => {
    this.testIsTextCommand()
    logs.writeSuccessTestMessage("TextMessagesHandler", "isTextCommand")
  }
}