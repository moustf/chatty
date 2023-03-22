import { Response, NextFunction } from 'express';

export const authController = (req: any, res: Response, next: NextFunction) => {
  try {
    const { user } = req;

    res.json({ msg: 'The user is authenticated successfully!', user });
  } catch (error: any) {
    next(error);
  }
};
