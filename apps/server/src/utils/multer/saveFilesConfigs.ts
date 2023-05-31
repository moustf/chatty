import { Request } from 'express';
import multer from 'multer';

import { mimeTypes, StatusCodes } from '@chatty/types';

import { GenericError } from '../custom';

const fileFilter = (_req: Request, file: Express.Multer.File, cb: any) => {
  if (mimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    throw new GenericError(
      StatusCodes.UnsupportedMediaType,
      'The media file you entered is not supported!'
    );
  }
};

export const upload = multer({
  fileFilter,
  limits: {
    fieldSize: 10 * 1024 * 1024, // ! 10MB
  },
});
