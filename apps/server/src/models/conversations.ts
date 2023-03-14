import mongoose from 'mongoose';

const conversationsSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Conversation can't be established without users!"],
      },
    ],
    messages: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /text|action|image/.test(v);
        },
      },
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Conversation = mongoose.model('Conversation', conversationsSchema);
