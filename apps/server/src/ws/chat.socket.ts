import { Server as SocketServer } from 'socket.io';

import { SocketEventsMap } from '@chatty/types';

export const plugChatEvents = (io: SocketServer<SocketEventsMap>) => {
  const chatTopic = io.of('/chat');

  chatTopic.on('connection', (socket) => {
    process.env.NODE_ENV === 'development' &&
      // eslint-disable-next-line no-console
      console.log(socket.id, 'connected');

    socket.on('ping', () => socket.emit('pong'));
  });
};
