import { Response, NextFunction } from 'express';

import { CustomRequest } from '@chatty/types';

export const authController = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;

    return res.json({
      msg: 'The user is authenticated successfully!',
      data: user,
    });
  } catch (error: any) {
    return next(error);
  }
};
