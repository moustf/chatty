import { createServer } from 'http';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import { serverCorsOptions } from './config/cors';
import { config } from './config/environments';
import { WebSocket } from './ws/server.socket';
import { TestSocket } from './ws/test.socket';

export class App {
  public app: Application;
  public nodeEnv: string;

  constructor() {
    this.app = express();
    this.nodeEnv = config.nodeEnv as string;
    this.initializeMiddlewares();
  }

  private initializeMiddlewares() {
    this.app.use([
      compression(),
      express.json(),
      cookieParser(),
      express.urlencoded({ extended: false }),
      cors(serverCorsOptions),
    ]);

    this.app.set('port', process.env.port || config.port);
    this.app.get('/echo', (_req: Request, res: Response) =>
      res.json({ text: "I'm Alive" })
    );
  }
}

const { app } = new App();

export const httpServer = createServer(app);

const ws = WebSocket.getInstance(httpServer);

ws.initializeHandlers([{ path: '/test', handler: new TestSocket() }]);
