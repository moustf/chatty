/* eslint-disable no-console */
import { Socket } from 'socket.io';

import { AddMessageParameters, validateMessageData } from '@chatty/types';

import { addNewMessageQuery } from '../queries/conversations';

type AddMessageParametersWithSocket = AddMessageParameters & { socket: Socket };

const handleError = (error: Error, socket: Socket) => {
  if (error.name === 'ValidationError') {
    socket.emit(
      'newErrorMessage',
      JSON.stringify({ msg: 'New message Validation Failed', error })
    );
  } else {
    socket.emit(
      'newErrorMessage',
      JSON.stringify({ msg: 'An error occurred!', error })
    );
  }
};

export const addNewMessageService = async (
  data: AddMessageParametersWithSocket
) => {
  const { type, text, chatId, filesUris, userId, action, socket } = data;
  try {
    await validateMessageData.validate({
      type,
      text,
      chatId,
      filesUris,
      userId,
      action,
    });

    const newMessage = await addNewMessageQuery(chatId, {
      type,
      text,
      sender: userId,
      action,
      media: filesUris,
    });

    // ? Broadcast the new message to all the clients joined this chat room.
    socket.to(chatId).emit(
      'newMessage',
      JSON.stringify({
        type,
        text,
        chatId,
        filesUris,
        userId,
        action,
      })
    );

    socket.to(chatId).emit('returnedMessage', JSON.stringify(newMessage));
  } catch (error) {
    console.log(error);
    handleError(error, socket);
  }
};
