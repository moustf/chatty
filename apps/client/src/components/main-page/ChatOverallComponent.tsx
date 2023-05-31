import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { UserConversationList } from './UserConversationsList';

export const ChatOverallComponent: FC = () => {
  return (
    <main
      className="w-full h-screen flex"
    >
      <UserConversationList />
      <Outlet />
    </main>
  )
}
