import { Request, Response, NextFunction } from 'express';

import { StatusCodes } from '@chatty/types';

import { loginUser } from '../../services';
import { GenericError } from '../../utils';

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
          StatusCodes.WrongData,
          'The user has entered worng data!'
        )
      );
    }

    return next(error);
  }
};
