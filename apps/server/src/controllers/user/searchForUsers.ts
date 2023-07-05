import { Request, Response, NextFunction } from 'express';

import { StatusCodes } from '@chatty/types';

import { searchForUser } from '../../queries';
import { GenericError } from '../../utils';

export const searchForUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q } = req.query;

    if (!q) {
      throw new GenericError(
        StatusCodes.WrongData,
        'The text you are searching with does not belong to any user!'
      );
    }

    const user = await searchForUser(q as string);

    if (!user.length) {
      throw new GenericError(
        StatusCodes.NotFound,
        'The user you are searching for does not exist!'
      );
    }

    return res.json({ msg: 'The user did return successfully!', data: user });
  } catch (error) {
    return next(error);
  }
};
