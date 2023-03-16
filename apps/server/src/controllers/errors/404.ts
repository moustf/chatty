import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) =>
  res
    .status(404)
    .json({ msg: 'The route you are trying to request does not exist!' });
