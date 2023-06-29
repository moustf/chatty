import { Response, NextFunction } from 'express';

import { CustomRequest, StatusCodes } from '@chatty/types';

import { getUser } from '../../queries';
import { GenericError } from '../../utils';

export const checkUserPassword = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as { id: string; email: string };

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
