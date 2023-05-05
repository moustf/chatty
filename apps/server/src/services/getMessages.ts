/* eslint-disable no-console */
import { Socket } from 'socket.io';

import { GetMessagesParameters, validateGetMessagesData } from '@chatty/types';

type GetMessagesParametersWithSocket = GetMessagesParameters & {
  socket: Socket;
};

// TODO: One service will be for getting all the messages when the user prompts
// TODO: the messages component for the fist time, and the other for getting the
// TODO: last message added of messages.

export const getMessages = async (data: GetMessagesParametersWithSocket) => {
  try {
    const { chatId, offset, limit, socket } = data;

    await validateGetMessagesData.validate({ chatId, offset, limit });

    socket.emit(
      'allMessagesReturned',
      JSON.stringify({ chatId, offset, limit })
    );
  } catch (error) {
    console.log(error);
  }
};
