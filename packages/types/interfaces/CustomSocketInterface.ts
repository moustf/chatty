export type Namespaces = 'chat';

export type SocketEventsMap = {
  'join-room': (roomName: string, userId: string) => void;
  ping: () => void;
  pong: () => void;
};
