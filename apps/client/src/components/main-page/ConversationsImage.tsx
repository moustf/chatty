import { FC } from 'react';
import { ConversationsImageHeading } from '@chatty/types';

export const ConversationsImage: FC<ConversationsImageHeading> = ({
  type, name, usersNumber,
}) => (
    type === 'individual'
      ? (
        <img
          className="rounded-lg"
          src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${name}`}
          width="62"
          height="62"
        />
      )
      : (
        <div className="w-16 h-16">
          <div className="w-10 h-10 rounded-lg bg-[#84A9FF] translate-x-[-0.2rem] flex justify-center items-center">
            <h3 className="text-h3 text-primary-contrastText text-bold">
            {usersNumber + 1}+
            </h3>
          </div>
          <img
            className="translate-x-2 translate-y-[-0.8rem] rounded-lg"
            src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${name}`}
            width="48"
            height="48"
          />
        </div>
      )
  );
