/* eslint-disable no-console */
import { Socket } from 'socket.io';

import { getLatestMessage } from '../queries/conversations';

export const getNewMessage = async (chatId: string, socket: Socket) => {
  try {
    const data = await getLatestMessage(chatId);

    socket.emit('newMessages', data);
  } catch (error) {
    console.log(error);
  }
};
