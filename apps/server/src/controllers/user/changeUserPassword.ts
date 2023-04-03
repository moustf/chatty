import { Response, NextFunction } from 'express';

import { STATUS_CODES, userOldNewPasswordsSchema } from '@chatty/types';

import { getUser } from '../../queries/user';
import { comparePasswords, hashPassword } from '../../utils/bcrypt';
import { GenericError } from '../../utils/custom/GenericError';

export const changeUserPassword = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;

    await userOldNewPasswordsSchema.validate({
      oldPassword,
      newPassword,
    });

    const user = await getUser({ _id: id });

    const isPasswordsTheSame = await comparePasswords(
      oldPassword,
      user?.password as string
    );

    if (!isPasswordsTheSame) {
      throw new GenericError(
        STATUS_CODES.UNAUTHORIZED,
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
          STATUS_CODES.WRONG_DATA,
          'Users must match the pattern requirements!'
        )
      );
    }

    next(error);
  }
};
