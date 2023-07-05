import mongoose from 'mongoose';

import { MessageData } from '@chatty/types';

import { Conversation } from '../../models';

export const addNewMessageQuery = (id: string, data: MessageData) =>
  Conversation.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    { $push: { messages: data } },
    { new: true }
  );
