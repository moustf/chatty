import { Server } from 'http';

import { Server as SocketServer } from 'socket.io';

import { SocketEventsMap } from '@chatty/types';

import { plugChatEvents } from './chat.socket';

export const initializeSocketIOServer = (httpServer: Server) => {
  const io: SocketServer<SocketEventsMap> = new SocketServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['POST', 'GET'],
    },
  });

  plugChatEvents(io);
};
