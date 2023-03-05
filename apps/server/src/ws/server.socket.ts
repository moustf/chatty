import { Server, Socket } from 'socket.io';

import { socketCorsOptions } from '../config/cors';

export class WebSocket extends Server {
  private static io: WebSocket;

  constructor(httpServer: any) {
    super(httpServer, {
      cors: socketCorsOptions,
    });
  }

  public initializeHandlers(socketHandlers: Array<any>) {
    socketHandlers.forEach((socketHandler: any) => {
      const namespace = WebSocket.io.of(
        socketHandler.path,
        (socket: Socket) => {
          socketHandler.handler.handleConnection(socket);
        }
      );

      if (socketHandler.handler.middlewareImplementation) {
        namespace.use(socketHandler.handler.middlewareImplementation);
      }
    });
  }

  public static getInstance(httpServer: any) {
    if (!WebSocket.io) {
      WebSocket.io = new WebSocket(httpServer);
    }

    return WebSocket.io;
  }
}
