import { Request, Response, NextFunction } from 'express';

import { StatusCodes } from '@chatty/types';

import { GenericError, uploadMany } from '../../utils';

export const uploadFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { files } = req;

    if (!files?.length) {
      throw new GenericError(
        StatusCodes.WrongData,
        "The user hasn't sent any files!"
      );
    }

    const paths = await uploadMany(files as Express.Multer.File[], []);

    return res.json({ data: paths, msg: 'Images uploaded successfully!' });
  } catch (error) {
    return next(error);
  }
};
