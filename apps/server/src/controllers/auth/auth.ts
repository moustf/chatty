import { Response, NextFunction } from 'express';

export const authController = (req: any, res: Response, next: NextFunction) => {
  try {
    const { user } = req;

    return res.json({
      msg: 'The user is authenticated successfully!',
      data: user,
    });
  } catch (error: any) {
    return next(error);
  }
};
