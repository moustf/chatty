import { Request, Response, NextFunction } from 'express';

import { GenericError } from '../../utils';

export const serverErrorHandler = (
  error: GenericError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line no-console
  console.log(error, 'Server Error Controller!');

  const { status, message } = error;

  return res.status(status).json({ msg: message });
};
