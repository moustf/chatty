import { Response, NextFunction } from 'express';

import { StatusCodes } from '@chatty/types';

import { getUser } from '../queries/user';
import { GenericError } from '../utils/custom/GenericError';
import { verifyToken } from '../utils/jwt';

export const userDataAuth = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new GenericError(StatusCodes.Unauthenticated, 'Unauthenticated!');
    }

    const user = await getUser({ token });

    if (user?.email) {
      req.user = { id: user._id, email: user.email };
      next();
    }

    const decoded = (await verifyToken(token)) as { email: string };

    req.user = { id: user?.id, ...decoded };
    next();
  } catch (error: any) {
    if (error.name === 'invalid signature') {
      next(
        new GenericError(
          StatusCodes.WrongData,
          'The token provided is not valid!'
        )
      );
    } else if (error.name === 'JsonWebTokenError') {
      return res.json({
        msg: 'The user has no password on the system!',
        data: false,
      });
    }

    next(error);
  }
};
