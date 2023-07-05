import { Response, NextFunction } from 'express';

import { CustomRequest, StatusCodes } from '@chatty/types';

import { getUser } from '../../queries';
import { GenericError } from '../../utils';

export const getUserByIdController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as { id: string; email: string };

    const user = await getUser({ _id: id }, { password: 0 });

    if (!user) {
      throw new GenericError(
        StatusCodes.NotFound,
        'The user you are searching for does not exist!'
      );
    }

    return res.json({ msg: 'The data did return successfully!', data: user });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(
        new GenericError(
          StatusCodes.WrongData,
          'The user has entered wrong data!'
        )
      );
    } else if (error.name === 'CastError') {
      return next(
        new GenericError(
          StatusCodes.NotFound,
          'The user you are searching for does not exist!'
        )
      );
    }

    return next(error);
  }
};
