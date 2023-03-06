import { createServer } from 'http';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';

import { SERVER_CORS_OPTIONS } from './config/cors';
import { config } from './config/environments';

const app = express();

app.use([
  compression(),
  express.json(),
  cookieParser(),
  express.urlencoded({ extended: false }),
  cors(SERVER_CORS_OPTIONS),
]);

app.set('port', process.env.port || config.port);

app.get('/echo', (_req: Request, res: Response) =>
  res.json({ text: "I'm Alive" })
);

export const httpServer = createServer(app);
