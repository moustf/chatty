import mongoose from 'mongoose';

import { MessageData } from '@chatty/types';

import { Conversation } from '../models/conversations';

// ? 1 - $match: the match stage will filter the documents according the users array and the id provided
// ? with the query.
// ? 2 - $project: the project stage will state which documents - fields to be returned to the next stage.
// ? 3 - $lookup: the lookup query will perform a single left outer join condition to the users collection.
// ? 4 - $unwind: deconstructs an array field fro the input documents to output a document for each element.
// ? 5 - $sort: sorts the documents depending on a field from the input documents.
// ? 6 - $limit: limits the output to message.
// ? 7 - $group: Grouping the output by the conversations id, the name of the conversation by returning the
// ? the first document for each group, the same goes for messages, and finally returns an array of
// ? values for documents in each group.

export const getUserConversationQuery = (id: string) =>
  Conversation.aggregate([
    {
      $match: {
        users: {
          $in: [new mongoose.Types.ObjectId(id)],
        },
      },
    },
    {
      $project: {
        _id: 1,
        users: 1,
        name: 1,
        messages: {
          $slice: ['$messages', -1],
        },
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
      $project: {
        _id: 1,
        name: 1,
        messages: 1,
        users: {
          _id: '$users._id',
          firstName: '$users.firstName',
          lastName: '$users.lastName',
        },
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
        messages: { $first: '$messages' },
        users: { $push: '$users' },
      },
    },
  ]).exec();

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

export const addNewMessageQuery = (id: string, data: MessageData) =>
  Conversation.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    { $push: { messages: data } },
    { new: true }
  );

export const findChatById = (id: string) =>
  Conversation.findById(new mongoose.Types.ObjectId(id));

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
