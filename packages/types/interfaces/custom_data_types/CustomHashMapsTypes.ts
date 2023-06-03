import { MessageObject } from '../index';

export type CustomMessagesHashTableTypes = {
  addNewChat: (chatId: string, chatMessages: MessageObject[]) => boolean;
  append: (chatId: string, message: MessageObject) => boolean;
  getChatMessages: (chatId: string) => MessageObject[];
  getLatestMessage: (chatId: string) => MessageObject;
};
