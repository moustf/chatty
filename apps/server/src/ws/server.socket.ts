import { Server } from 'http';

import { Server as SocketServer } from 'socket.io';

// import { socketCorsOptions } from '../config/cors';

export let io: SocketServer | null = null;

export const initializeSocketIOServer = (httpServer: Server) => {
  io = new SocketServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['POST', 'GET'],
    },
  });

  // const chatTopic = io.of('/chat');

  io.on('connection', (socket) => {
    console.log('Socket Connected!');

    socket.on('echo', async (data: string) => {
      console.log(data);
    });
  });
};
