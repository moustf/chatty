import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SocketEventsMap } from '@chatty/types';
import { baseUrl } from '../config/environment';

console.log(import.meta.env.VITE_APP_BASE_URL, 'local env');
console.log(import.meta.env.VITE_APP_PROD_BASE_URL, 'production env');

const socket: Socket<SocketEventsMap> = io(`${baseUrl}/chat`, {
  transports: ['websocket'],
}); // ? Keep it here to create only one socket instance.

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
