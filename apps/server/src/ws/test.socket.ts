import { NextFunction } from 'express';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import { CustomSocketInterface } from '@chatty/types';

export class TestSocket implements CustomSocketInterface {
  public handleConnection(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ): void {
    socket.emit('echo', "I'm the socket, and I'm alive!");
  }

  public middlewareImplementation(
    _socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    next: NextFunction
  ): void {
    // ? Implementing any middlewares here;

    return next();
  }
}
