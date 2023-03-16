import mongoose from 'mongoose';

import { User as UserInterface } from '@chatty/types';

const usersSchema = new mongoose.Schema<UserInterface>(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your first name!'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your last name!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email!'],
      validate: {
        validator: function (v: string) {
          return /^[a-zA-z0-9]?.*\@[a-zA-z0-9]{1,}\.[a-zA-Z]{1,}$/.test(v);
        },
        message: 'Please provide a valid email address!',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide a password!'],
    },
  },
  { timestamps: true }
);

usersSchema.index({ firstName: 1, lastName: 1 }, { unique: true });
usersSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model('User', usersSchema);
