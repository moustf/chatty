import Express from 'express';

declare module 'Express' {
  interface Request {
    user?: { email: string };
  }
}
