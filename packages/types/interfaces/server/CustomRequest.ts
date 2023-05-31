import { Request } from 'express';

export type CustomRequest = {
  user?: {
    id: string;
    email: string;
  };
} & Request;
