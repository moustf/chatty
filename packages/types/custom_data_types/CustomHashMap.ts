import { MessageObject, CustomMessagesHashTableTypes } from '../interfaces/';

export class CustomMessagesHashTable implements CustomMessagesHashTableTypes {
  private messages: { [key: string]: MessageObject[] };

  constructor() {
    this.messages = {};
  }

  public addNewChat(chatId: string, chatMessages: MessageObject[]): boolean {
    this.messages[chatId] = chatMessages;
    return true;
  }

  public append(chatId: string, message: MessageObject): boolean {
    this.messages[chatId].push(message);
    return true;
  }

  public getChatMessages(chatId: string): MessageObject[] {
    return this.messages[chatId];
  }

  public getLatestMessage(chatId: string): MessageObject {
    const l = this.messages[chatId].length - 1;
    return this.messages[chatId][l];
  }
}
