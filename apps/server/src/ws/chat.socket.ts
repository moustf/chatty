import { Server as SocketServer } from 'socket.io';

import { SocketEventsMap } from '@chatty/types';

import { config } from '../config/environments';

export const plugChatEvents = (io: SocketServer<SocketEventsMap>) => {
  const chatTopic = io.of('/chat');

  chatTopic.on('connection', (socket) => {
    config.nodeEnv === 'development' &&
      // eslint-disable-next-line no-console
      console.log(socket.id, 'connected');

    socket.on('ping', () => socket.emit('pong'));
  });
};
