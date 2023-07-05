import mongoose from 'mongoose';

import { Conversation } from '../../models';

export const getConversationQuery = (id: string, userId: string) =>
  Conversation.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $project: {
        _id: 1,
        users: 1,
        name: 1,
        messages: 1,
        created_at: 1,
        updated_at: 1,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'users',
        foreignField: '_id',
        as: 'users',
      },
    },
    {
      $unwind: '$users',
    },
    {
      $match: {
        'users._id': {
          $ne: new mongoose.Types.ObjectId(userId),
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        messages: 1,
        users: {
          _id: '$users._id',
          firstName: '$users.firstName',
          lastName: '$users.lastName',
        },
        created_at: 1,
        updated_at: 1,
      },
    },
    {
      $sort: {
        'messages.createdAt': -1,
      },
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        users: { $push: '$users' },
        messages: { $first: '$messages' },
        created_at: { $last: '$created_at' },
        updated_at: { $last: '$updated_at' },
      },
    },
  ]);
