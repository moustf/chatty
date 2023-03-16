import { Request, Response, NextFunction } from 'express';

import { GenericError } from '../../utils/custom/GenericError';

export const serverErrorHandler = (
  error: GenericError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error, 'Server Error Controller!');

  const { status, message } = error;

  return res.status(status).json({ msg: message });
};
