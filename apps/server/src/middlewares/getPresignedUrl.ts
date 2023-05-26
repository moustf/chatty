import { Response, NextFunction } from 'express';

import { CustomRequest, StatusCodes } from '@chatty/types';

import { GenericError } from '../utils/custom/GenericError';
import { generatePresignedUrl } from '../utils/helpers';

export const getSignedUrl = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fileType, fileName } = req.query;

    if (!fileType || !fileName) {
      throw new GenericError(
        StatusCodes.WrongData,
        'Both file type and file name queries should be provided!'
      );
    }

    const url = await generatePresignedUrl(
      fileType as string,
      fileName as string
    );

    return res
      .status(StatusCodes.Created)
      .json({ data: { url }, msg: 'Presigned URL returned successfully!' });
  } catch (error) {
    return next(error);
  }
};
