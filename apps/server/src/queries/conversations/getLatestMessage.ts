import mongoose from 'mongoose';

import { Conversation } from '../../models';

export const getLatestMessage = (chatId: string) =>
  Conversation.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(chatId),
      },
    },
    {
      $project: {
        messages: 1,
        created_at: 1,
        updated_at: 1,
      },
    },
    {
      $lookup: {
        from: 'users',
        let: { sender: '$sender' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$users._id', '$$sender'],
              },
            },
          },
        ],
        as: 'sender',
      },
    },
    {
      $sort: {
        'messages.createdAt': -1,
      },
    },
    {
      $project: {
        messages: {
          $slice: ['$messages', -1],
        },
        created_at: 1,
        updated_at: 1,
      },
    },
    {
      $group: {
        _id: '$_id',
        messages: { $first: '$messages' },
      },
    },
  ]);
