import { Response, NextFunction } from 'express';

import { CustomRequest, StatusCodes } from '@chatty/types';

import { getUserConversationQuery } from '../../queries/conversations';

export const getUserConversations = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as { id: string; email: string };

    const conversations = await getUserConversationQuery(id);

    if (!conversations.length) {
      return res
        .status(StatusCodes.NotFound)
        .json({ msg: 'The users has no conversations!' });
    }

    res.json({
      msg: "The user's conversations did return successfully!",
      data: conversations,
    });
  } catch (error) {
    next(error);
  }
};
