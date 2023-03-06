/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SocketEventsMap } from '@chatty/types';

const url = import.meta.env.VITE_APP_BASE_URL;
const socket: Socket<SocketEventsMap> = io(`${url}/chat`, {
  transports: ['websocket'],
});

export const useConnect = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(socket.connected);
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return { socket, isConnected };
};
