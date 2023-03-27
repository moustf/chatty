import { Request, Response, NextFunction } from 'express';

import { userDataSchema, STATUS_CODES } from '@chatty/types';

import { User } from '../../models/users';
import { GenericError } from '../../utils/custom/GenericError';

export const providerAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, token } = req.body;

    await userDataSchema.validate(req.body);

    await User.updateOne({ email }, req.body, { upsert: true });

    return res
      .status(STATUS_CODES.CREATED)
      .cookie('token', token, { httpOnly: true })
      .json({
        msg: 'The user have been created successfully!',
        data: {
          firstName,
          lastName,
          email,
        },
      });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(
        new GenericError(
          STATUS_CODES.WRONG_DATA,
          'The user has provided wrong data!'
        )
      );
    }

    return next(error);
  }
};
