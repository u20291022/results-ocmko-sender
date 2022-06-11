import { bot } from "../../code/bot"
import assert from "assert"

import { logs } from "../../code/logs"

export class BotTest {
  constructor () {}

  testMe = (): void => {
    const telegram = bot.me.telegram
    
    assert.ok(telegram)
    assert.ok(telegram.token.length > 0)
  }

  testMethods = async (): Promise<void> => {
    const meInfo = await bot.methods.getMe()
    
    assert.ok(meInfo)
    assert.ok(meInfo.username.length > 0)
  }

  run = async (): Promise<void> => {
    this.testMe()
    logs.writeSuccessTestMessage("Bot", "me")

    await this.testMethods()
    logs.writeSuccessTestMessage("Bot", "methods")
  } 
}