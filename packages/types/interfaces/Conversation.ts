import { User } from './User';

export type Conversation = {
  users: User[];
  messages: 'text' | 'action' | 'image';
  name: string;
};
