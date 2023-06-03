import { Response, NextFunction } from 'express';

import { CustomRequest, StatusCodes } from '@chatty/types';

import { getConversationQuery } from '../../queries/conversations';
import { GenericError } from '../../utils';

export const getConversation = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId } = req.query;
    const { id } = req.user as { id: string; email: string };

    if (!chatId) {
      throw new GenericError(
        StatusCodes.WrongData,
        "The user didn't provide a chat id or provided an invalid chat id."
      );
    }

    const conversationData = await getConversationQuery(chatId as string, id);

    if (!conversationData.length) {
      throw new GenericError(
        StatusCodes.NoContent,
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
