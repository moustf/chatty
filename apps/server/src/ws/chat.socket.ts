/* eslint-disable no-console */
import { Server as SocketServer } from 'socket.io';

import { SocketEventsMap } from '@chatty/types';

import { config } from '../config/environments';
import { addNewMessageService } from '../services/addNewMessage';

export const plugChatEvents = (io: SocketServer<SocketEventsMap>) => {
  const chatTopic = io.of('/chat');

  chatTopic.on('connection', (socket) => {
    config.nodeEnv === 'development' && console.log(socket.id, 'connected');

    socket.on('ping', () => socket.emit('pong'));

    socket.on('join-room', (chatId, userId) => {
      // ? When the user joins a room, take the chat id and the user id, then do:
      socket.join(chatId); // ? Connect to a room.
      socket.on('newMessage', (data) => {
        // ? Receive the data from the new message, then call the add new message service function.
        const { type, text, fileName, fileData } = JSON.parse(data);

        const conversationId = chatId.split(':')[1];

        addNewMessageService({
          chatId: conversationId,
          userId,
          type,
          text,
          fileName,
          fileData,
          socket,
        });
      });
    });
  });
};
