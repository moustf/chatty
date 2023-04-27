import { Response, NextFunction } from 'express';

import { STATUS_CODES } from '@chatty/types';

import { getConversationQuery } from '../../queries/conversations';
import { GenericError } from '../../utils/custom/GenericError';

export const getConversation = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId } = req.query;
    const { id } = req.user;

    if (!chatId) {
      throw new GenericError(
        STATUS_CODES.WRONG_DATA,
        "The user didn't provide a chat id or provided an invalid chat id."
      );
    }

    const conversationData = await getConversationQuery(chatId, id);

    if (!conversationData.length) {
      throw new GenericError(
        STATUS_CODES.NO_CONTENT,
        "The conversation you requested have no data or doesn't exist or the chat id is invalid."
      );
    }

    return res.json({
      data: conversationData,
      msg: 'The conversation data did return successfully!',
    });
  } catch (error: any) {
    return next(error);
  }
};
