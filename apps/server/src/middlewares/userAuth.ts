import { Response, NextFunction } from 'express';

import { STATUS_CODES } from '@chatty/types';

import { getUser } from '../queries/user';
import { GenericError } from '../utils/custom/GenericError';
import { verifyToken } from '../utils/jwt';

export const userDataAuth = async (
  req: any,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new GenericError(STATUS_CODES.UNAUTHENTICATED, 'Unauthenticated!');
    }

    const user = await getUser({ token });

    if (user?.email) {
      req.user = { email: user.email };
      next();
    }

    const decoded = (await verifyToken(token)) as { email: string };

    req.user = decoded;
  } catch (error: any) {
    if (error.name === 'invalid signature') {
      next(
        new GenericError(
          STATUS_CODES.WRONG_DATA,
          'The token provided is not valid!'
        )
      );
    }

    next(error);
  }
};
