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

    console.log('Finally, in the controller!!!');

    if (!files?.length) {
      console.log('No files are here, the controller is present!!!');

      throw new GenericError(
        StatusCodes.WrongData,
        "The user hasn't sent any files!"
      );
    }

    const paths = await uploadMany(files as Express.Multer.File[], []);

    console.log(paths, 'Paths are returned tot he controller!!!');

    return res.json({ data: paths, msg: 'Images uploaded successfully!' });
  } catch (error) {
    return next(error);
  }
};
