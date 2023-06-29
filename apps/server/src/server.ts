import { createServer } from 'http';
import { join } from 'path';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';

import { SERVER_CORS_OPTIONS } from './config';
import { config } from './config/environments';
import { serverErrorHandler, notFoundHandler } from './controllers';
import { router } from './routers';

export const app = express();

app.use([
  compression(),
  express.json(),
  cookieParser(),
  express.urlencoded({ extended: false }),
  cors(SERVER_CORS_OPTIONS),
]);

app.set('port', process.env.port || config.port);

app.use('/api/v1', router);

if (config.nodeEnv === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'dist')));
  app.use('*', (_req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

app.use(notFoundHandler);
app.use(serverErrorHandler);

export const httpServer = createServer(app);
