import { NextFunction } from 'express';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import { CustomSocketInterface } from '@chatty/types';

export class TestSocket implements CustomSocketInterface {
  public handleConnection(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ): void {
    socket.on('connection', (socket) => {
      socket.emit('echo', "I'm the socket, and I'm alive!");
    });
  }

  public middlewareImplementation(
    _socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    next: NextFunction
  ): void {
    // ? Implementing any middlewares here;

    return next();
  }
}

// export class WebSocket extends SocketServer {
//   private static io: WebSocket;

//   constructor(httpServer: Server) {
//     super(httpServer, {
//       cors: socketCorsOptions,
//     });
//   }

//   public initializeHandlers(socketHandlers: Array<any>) {
//     socketHandlers.forEach((socketHandler: any) => {
//       const namespace = WebSocket.io.of(socketHandler.path);
//       namespace.on('connection', (socket: Socket) => {
//         socketHandler.handler.handleConnection(socket);
//       });

//       if (socketHandler.handler.middlewareImplementation) {
//         namespace.use(socketHandler.handler.middlewareImplementation);
//       }
//     });
//   }

//   public static getInstance(httpServer: any) {
//     if (!WebSocket.io) {
//       WebSocket.io = new WebSocket(httpServer);
//     }

//     return WebSocket.io;
//   }
// }
