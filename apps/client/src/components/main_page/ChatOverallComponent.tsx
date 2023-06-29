import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { UserConversationList } from './UserConversationsList';
import { useAppSelector } from '../../hooks';
import { selectIsChatsListShown } from '../../features/chat/chatSlice';

export const ChatOverallComponent: FC = () => {
  const isChatsListShown = useAppSelector(selectIsChatsListShown);

  return (
    <main
      className="w-full h-screen flex"
    >
      {isChatsListShown && <UserConversationList />}
      <Outlet />
    </main>
  )
}
