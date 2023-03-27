import jwt from 'jsonwebtoken';

import { config } from '../../config/environments';

const { secretKey } = config;

export const generateToken = async (payload: { id: number; email: string }) =>
  new Promise((res, rej) => {
    jwt.sign(payload, secretKey as string, (error, token) => {
      if (error) rej(error);

      res(token);
    });
  });

export const verifyToken = async (token: string) =>
  new Promise((res, rej) => {
    jwt.verify(token, secretKey as string, (error, decoded) => {
      if (error) rej(error);

      res(decoded);
    });
  });
