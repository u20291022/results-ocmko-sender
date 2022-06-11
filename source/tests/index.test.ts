import { AxiosTest } from "./modules/axios.test"
import { CheerIoTest } from "./modules/cheerio.test"
import { TelegrafTest } from "./modules/telegraf.test"

import { FileSystemTest } from "./units/filesystem.test"
import { HttpParserTest } from "./units/http-parser.test"
import { LogsTest } from "./units/logs.test"
import { BotTest } from "./units/bot.test"
import { TextMessagesHandlerTest } from "./units/text-messages-handler.test"
import { CommandsTest } from "./units/commands.test"
import { ChatsHandlerTest } from "./units/chats-handler.test"

export class Tests {
  constructor () {}

  runModuleTests = async (): Promise<void> => {
    const axiosTest = new AxiosTest()
    const cheerIoTest = new CheerIoTest()
    const telegrafTest = new TelegrafTest()

    await axiosTest.run()
    await cheerIoTest.run()
    await telegrafTest.run()
  }

  runUnitsTests = async (): Promise<void> => {
    const fileSystemTest = new FileSystemTest()
    const logsTest = new LogsTest()
    const httpParserTest = new HttpParserTest()
    const botTest = new BotTest()
    const textMessagesHandlerTest = new TextMessagesHandlerTest()
    const commandsTest = new CommandsTest()
    const chatsHandlerTest = new ChatsHandlerTest()

    await fileSystemTest.run()
    logsTest.run()
    await httpParserTest.run()
    await botTest.run()
    textMessagesHandlerTest.run()
    commandsTest.run()
    chatsHandlerTest.run()
  }
}