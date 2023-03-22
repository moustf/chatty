import { Request } from 'express';

export type CustomRequest = {
  user: {
    email: string;
  };
} & Request;
