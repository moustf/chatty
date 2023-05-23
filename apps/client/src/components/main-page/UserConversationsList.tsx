import { Dispatch, FC, SetStateAction } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { UserConversationBox } from './UserConversationBox';
import { useAppSelector } from '../../hooks/redux';
import { selectIsChatsListShown } from '../../features/chat/chatSlice';
import { baseUrl } from '../../config/environment';

export const UserConversationList: FC = () => {
  const { data } = useQuery({
    queryKey: ['getUserConversations'],
    queryFn: () => (
      axios.get(`${baseUrl}/api/v1/user/conversations`, {
        withCredentials: true,
      })
    ),
  });

  const isChatsListShown = useAppSelector(selectIsChatsListShown);

  return (
    <section
      className={`w-full md:w-full lg:w-1/3 xl:w-1/4 shadow-z24 flex flex-col gap-8 px-4 py-8 ${!isChatsListShown && 'hidden'} lg:flex`}
    >
      {
        data?.data.data.map((con: any) => {
          const name = con.name || `${con.users[0][0].firstName[0]} ${con.users[0][0].lastName || ''}`;
          const message = con.messages[0].text;
          const lastUpdate = con.messages[0].createdAt;

          return (
            <UserConversationBox
              key={con._id}
              id={con._id}
              type={con.users.length > 1 ? 'group' : 'individual'}
              name={name}
              message={message}
              createdAt={lastUpdate}
              usersNumber={con.users.length}
            />
          );
        })
      }
    </section>
  )
}