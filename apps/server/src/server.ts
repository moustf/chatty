import { createServer } from 'http';
import { join } from 'path';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';

import { SERVER_CORS_OPTIONS } from './config/cors';
import { config } from './config/environments';
import { Conversation } from './models/conversations';
import { User } from './models/users';
import { router } from './routers';

const app = express();

app.use([
  compression(),
  express.json(),
  cookieParser(),
  express.urlencoded({ extended: false }),
  cors(SERVER_CORS_OPTIONS),
]);

app.set('port', process.env.port || config.port);

app.use('/api/v1', router);

app.get('/echo', async (_req: Request, res: Response) => {
  const users = await User.find({}).exec();
  const conversations = await Conversation.find({}).exec();

  return res.json({ text: "I'm Alive", users, conversations });
});

if (config.nodeEnv === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'dist')));
  app.use('*', (_req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

export const httpServer = createServer(app);
