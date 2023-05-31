import { Request, Response, NextFunction } from 'express';

import { StatusCodes, userDataRouteSchema } from '@chatty/types';

import { registerUser } from '../../services/signup';
import { GenericError } from '../../utils';

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    await userDataRouteSchema.validate(body);

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
