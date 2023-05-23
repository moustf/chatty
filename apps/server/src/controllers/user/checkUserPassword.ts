import { Response, NextFunction } from 'express';

import { StatusCodes } from '@chatty/types';

import { getUser } from '../../queries/user';
import { GenericError } from '../../utils/custom/GenericError';

export const checkUserPassword = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;

    if (!id) {
      throw new GenericError(StatusCodes.Unauthorized, 'Unauthorized!');
    }

    const user = await getUser({ _id: id });

    if (!user) {
      throw new GenericError(
        StatusCodes.NotFound,
        'The user you are searching for does not exist!'
      );
    }

    return res.json({
      msg: 'The user has a password assigned to his account!',
      data: true,
    });
  } catch (error) {
    next(error);
  }
};
