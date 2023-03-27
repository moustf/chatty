import { Response, NextFunction } from 'express';

import { STATUS_CODES } from '@chatty/types';

import { getUser } from '../../queries/user';
import { GenericError } from '../../utils/custom/GenericError';

export const getUserByIdController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;

    const user = await getUser({ _id: id }, { password: 0 });

    if (!user) {
      throw new GenericError(
        STATUS_CODES.NOT_FOUND,
        'The user you are searching for does not exist!'
      );
    }

    return res.json({ msg: 'The data did return successfully!', data: user });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(
        new GenericError(
          STATUS_CODES.WRONG_DATA,
          'The user has entered wrong data!'
        )
      );
    } else if (error.name === 'CastError') {
      return next(
        new GenericError(
          STATUS_CODES.NOT_FOUND,
          'The user you are searching for does not exist!'
        )
      );
    }

    return next(error);
  }
};
