import mongoose from 'mongoose';

import { Conversation as ConversationInterface } from '@chatty/types';

const conversationsSchema = new mongoose.Schema<ConversationInterface>(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Conversation can't be established without users!"],
      },
    ],
    messages: [
      {
        type: {
          type: String,
          enum: ['text', 'action', 'image'],
        },
        text: {
          type: String,
        },
        image: {
          type: String,
        },
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        createdAt: {
          type: mongoose.Schema.Types.Date,
          required: true,
        },
        updatedAt: {
          type: mongoose.Schema.Types.Date,
        },
      },
    ],
    name: {
      type: String,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Conversation = mongoose.model<ConversationInterface>(
  'Conversation',
  conversationsSchema
);
