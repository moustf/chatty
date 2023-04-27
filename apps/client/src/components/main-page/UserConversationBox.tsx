import { FC, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserConversation } from '@chatty/types';

import { ConversationsImage } from './ConversationsImage';
import { formatTime } from '../../utils/formatTime';

export const UserConversationBox: FC<
  UserConversation & { setIsChatsListShown: Dispatch<SetStateAction<boolean>> }
> = ({ id, name, message, type, createdAt, usersNumber, setIsChatsListShown }) => {
  const navigate = useNavigate();

  return (
    <div
      id={id}
      className="w-full py-8 px-4 flex flex-col gap-12 hover:bg-grey-200 cursor-pointer"
      onClick={() => {
        navigate(`/main/chat/${id}`);
        setIsChatsListShown(false);
      }}
    >
    <div className="w-full flex justify-between items-center">
        <ConversationsImage
          name={name}
          type={type}
          usersNumber={usersNumber}
        />
      <div className="flex flex-col items-center gap-6">
          <h3
            className="text-bold text-h3 lg:text-h4 xl:text-h3 text-grey-800"
          >
            {name}
          </h3>
          <p className="text-grey-500 text-subtitle1">
            {message}
          </p>
      </div>
        <p className="text-grey-800 text-h5">
          {formatTime(createdAt)}
        </p>
    </div>
    <div className="w-full h-1 rounded-lg bg-grey-300" />
  </div>
  );
  };
