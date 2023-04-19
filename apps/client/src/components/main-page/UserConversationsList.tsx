import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { UserConversationBox } from './UserConversationBox';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const UserConversationList: FC = () => {
  const { data } = useQuery({
    queryKey: ['getUserConversations'],
    queryFn: () => (
      axios.get(`${baseUrl}/api/v1/user/conversations`, {
        withCredentials: true,
      })
    ),
  });

  return (
    <section className="w-1/5 h-screen flex flex-col gap-8 px-4 py-8">
      {
        data?.data.data.map((con: any) => {
          const name = con.name || `${con.users[0].firstName} ${con.users[0].lastName || ''}`;
          const message = con.messages[0].text;
          const lastUpdate = con.messages[0].createdAt;

          return (
            <UserConversationBox
              type={con.users.length > 1 ? 'group' : 'individual'}
              name={name}
              message={message}
              createdAt={lastUpdate}
              usersNumber={con.users.length}
            />
          )
        })
      }
    </section>
  )
}