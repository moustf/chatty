import { Response, NextFunction } from 'express';

import {
  CustomRequest,
  StatusCodes,
  userOldNewPasswordsSchema,
} from '@chatty/types';

import { getUser } from '../../queries/user';
import { comparePasswords, hashPassword, GenericError } from '../../utils';

export const changeUserPassword = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as { id: string; email: string };
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    await userOldNewPasswordsSchema.validate({
      oldPassword,
      newPassword,
      confirmNewPassword,
    });

    const user = await getUser({ _id: id });

    const isPasswordsTheSame = await comparePasswords(
      oldPassword,
      user?.password as string
    );

    if (!isPasswordsTheSame) {
      throw new GenericError(
        StatusCodes.Unauthorized,
        'The old password is not compatible with the new password!'
      );
    }

    const newPasswordHashed = await hashPassword(newPassword);

    if (user?.password) {
      user.password = newPasswordHashed;
      await user.save();
    }

    return res.json({
      msg: "The user's password did change successfully!",
      data: true,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(
        new GenericError(
          StatusCodes.WrongData,
          'Users must match the pattern requirements!'
        )
      );
    }

    next(error);
  }
};
