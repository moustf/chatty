import mongoose from 'mongoose';

export type Conversation = {
  users: mongoose.Schema.Types.ObjectId[];
  messages: {
    type: 'text' | 'action' | 'image';
    text?: string;
    image?: string;
    sender: mongoose.Schema.Types.ObjectId;
    createdAt: mongoose.Schema.Types.Date;
    updatedAt: mongoose.Schema.Types.Date;
  }[];
  name?: string;
};
