import mongoose from 'mongoose';

import { Conversation } from '../../models';

export const findChatById = (id: string) =>
  Conversation.findById(new mongoose.Types.ObjectId(id));
