import { Request, Response, NextFunction } from 'express';

import { STATUS_CODES } from '@chatty/types';

import { loginUser } from '../../services/login';
import { GenericError } from '../../utils/custom/GenericError';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await loginUser(email, password);

    return res.cookie('token', token, { httpOnly: true }).json({
      msg: 'The user has logged in to his account successfully!',
      data: { id: user?._id, email: user?.email },
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return next(
        new GenericError(
          STATUS_CODES.WRONG_DATA,
          'The user has entered worng data!'
        )
      );
    }

    return next(error);
  }
};
