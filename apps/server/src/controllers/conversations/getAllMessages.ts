import { Response, NextFunction } from 'express';
import { Types } from 'mongoose';

import { STATUS_CODES, validateAllMessagesQueryStrings } from '@chatty/types';

import { getAllMessagesQuery } from '../../queries/conversations';
import { GenericError } from '../../utils/custom/GenericError';

export const getAllMessages = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId, limit, offset } = req.query;

    const isChatIdValid = Types.ObjectId.isValid(chatId);

    if (!chatId || !isChatIdValid) {
      throw new GenericError(
        STATUS_CODES.WRONG_DATA,
        "The user didn't provide a chat id or provided an invalid chat id."
      );
    }

    await validateAllMessagesQueryStrings.validate({ limit, offset });

    const messages = await getAllMessagesQuery(
      chatId,
      Number(limit),
      Number(offset)
    );

    if (!messages.length) {
      throw new GenericError(
        STATUS_CODES.NO_CONTENT,
        'No messages for this conversation.'
      );
    }

    return res.json({
      msg: 'The chat messages did return successfully!',
      data: messages,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(
        new GenericError(
          STATUS_CODES.WRONG_DATA,
          'The user has entered a wrong data!'
        )
      );
    }

    return next(error);
  }
};