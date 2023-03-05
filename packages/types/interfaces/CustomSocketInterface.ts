import { NextFunction } from 'express';
import { Socket } from 'socket.io';

export type CustomSocketInterface = {
  handleConnection(socket: Socket): void;
  middlewareImplementation(socket: Socket, next: NextFunction): void;
};
