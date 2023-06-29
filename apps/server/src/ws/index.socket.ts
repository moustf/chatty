import { Server } from 'http';

import { Server as SocketServer } from 'socket.io';

import { SocketEventsMap } from '@chatty/types';

import { SOCKET_CORS_OPTIONS } from '../config';

import { plugChatEvents } from './chat.socket';

export const initializeSocketIOServer = (httpServer: Server) => {
  const io: SocketServer<SocketEventsMap> = new SocketServer(httpServer, {
    cors: SOCKET_CORS_OPTIONS,
  });

  plugChatEvents(io);
};
