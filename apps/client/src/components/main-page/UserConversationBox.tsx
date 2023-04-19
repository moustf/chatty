import { FC } from 'react';

import { ConversationsImage } from './ConversationsImage';

export const UserConversationBox: FC<{
  name: string;
  message: string;
  type: 'individual' | 'group';
  createdAt: string;
  usersNumber: number;
}> = ({ name, message, type, createdAt, usersNumber }) => (
  <div className="w-full flex flex-col gap-4">
    <div className="w-full flex justify-between items-center">
      <ConversationsImage name={name} type={type} usersNumber={usersNumber} />
      <div className="flex flex-col gap-6">
        <h3 className="text-bold text-h3 text-grey-800">{name}</h3>
        <p className="text-grey-500 text-subtitle1">{message}</p>
      </div>
      <p className="text-grey-300 text-h5">14:65</p>
    </div>
    <div className="w-full h-1 rounded-lg bg-grey-300" />
  </div>
);
