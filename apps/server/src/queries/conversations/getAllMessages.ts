import mongoose from 'mongoose';

import { Conversation } from '../../models';

export const getAllMessagesQuery = (
  chatId: string,
  limit: number,
  offset: number
) =>
  Conversation.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(chatId),
      },
    },
    {
      $project: {
        _id: 1,
        messages: 1,
      },
    },
    {
      $unwind: '$messages',
    },
    {
      $skip: offset || 0,
    },
    {
      $limit: limit || 1,
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'messages.sender',
        foreignField: '_id',
        as: 'senders',
      },
    },
    {
      $unwind: '$senders',
    },
    {
      $project: {
        user: '$senders._id',
        type: '$messages.type',
        text: '$messages.text',
        name: {
          $concat: ['$senders.firstName', ' ', '$senders.lastName'],
        },
        createdAt: '$messages.createdAt',
        updatedAt: '$messages.updatedAt',
      },
    },
  ]);
