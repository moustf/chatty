import { Response, NextFunction } from 'express';

import { STATUS_CODES } from '@chatty/types';

import { getUserConversationQuery } from '../../queries/conversations';

export const getUserConversations = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;

    const conversations = await getUserConversationQuery(id);

    if (!conversations.length) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
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
