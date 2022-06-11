export interface TextMessage {
  text: string,
  message_id: number,
  chat: { id: number }
  from: { id: number }
}

export interface ChatsJson {
  [chatId: string]: boolean
}

export interface ResultsSended {
  [chatId: string]: string[]
}