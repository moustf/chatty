import { Response, NextFunction } from 'express';

import { StatusCodes, CustomRequest } from '@chatty/types';

import { getUser } from '../queries/user';
import { GenericError, verifyToken } from '../utils';

export const userDataAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('Entered the auth middleware!!');
    const { token } = req.cookies;

    process.stdout.on('error', function (err) {
      if (err.code == 'EPIPE') {
        process.exit(0);
      }
    });

    if (!token) {
      console.log('No token, error thrown!!!');
      throw new GenericError(StatusCodes.Unauthenticated, 'Unauthenticated!');
    }

    console.log('Did it reach here?');

    const user = await getUser({ token });

    if (user?.email) {
      req.user = { id: user._id.toString(), email: user.email };
      next();
    }

    const decoded = (await verifyToken(token)) as { email: string };

    req.user = { id: user?.id, ...decoded };
    next();
  } catch (error: any) {
    if (error.name === 'invalid signature') {
      return next(
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

    return next(error);
  }
};
