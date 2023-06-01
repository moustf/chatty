import { Socket } from 'socket.io-client';

export type Namespaces = 'chat';

export type SocketEventsMap = {
  'join-room': (roomName: string, userId: string) => void;
  ping: () => void;
  pong: () => void;
  connection: (socket: Socket) => void;
  newMessage: (data: string) => void;
  newErrorMessage: (data: string) => void;
  returnedMessage: (data: any) => void;
};
