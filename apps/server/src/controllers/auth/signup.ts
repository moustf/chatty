import { Request, Response, NextFunction } from 'express';

import { StatusCodes, userDataSchema } from '@chatty/types';

import { registerUser } from '../../services/signup';
import { GenericError } from '../../utils/custom/GenericError';

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    await userDataSchema.validate(body);

    const { user, token } = await registerUser(body);

    return res
      .cookie('token', token, { httpOnly: true })
      .status(StatusCodes.Created)
      .json({ msg: "The user's account is created successfully!", data: user });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(
        new GenericError(
          StatusCodes.WrongData,
          'The user has provided wrong data!'
        )
      );
    }

    return next(error);
  }
};
