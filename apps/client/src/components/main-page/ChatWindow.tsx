import { Dispatch, FC, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../hooks/redux';
import { selectIsChatsListShown } from '../../features/chat/chatSlice';
import axios from 'axios';

import { ChatWindowHeading } from './chatWindowHeading';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const ChatWindow: FC = () => {
  const { chatId } = useParams();

  const isChatsListShown = useAppSelector(selectIsChatsListShown);

  const { data } = useQuery({
    queryKey: [`getChatDetails/${chatId}`],
    queryFn: async () => axios.get(`${baseUrl}/api/v1/conversations?chatId=${chatId}`),
  });

  const chatData = data?.data.data[0];
  const name = chatData?.name || `${chatData?.users[0].firstName} ${chatData?.users[0].lastName || ''}`;

  return (
    <section
      id={chatId}
      className={`w-full md:w-full lg:w-2/3 xl:w-3/4 py-6 ${isChatsListShown && 'hidden'} lg:block`}
    >
      <ChatWindowHeading
        type={chatData?.users.length > 1 ? 'group' : 'individual'}
        name={name}
        usersNumber={chatData?.users.length}
      />
    </section>
  );
};
