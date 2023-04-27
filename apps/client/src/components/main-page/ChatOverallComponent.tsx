import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { UserConversationList } from './UserConversationsList';

export const ChatOverallComponent: FC = () => {
  const [isChatsListShown, setIsChatsListShown] = useState<boolean>(true);

  return (
    <main
      className="w-full h-screen flex"
    >
      <UserConversationList
        isChatsListShown={isChatsListShown}
        setIsChatsListShown={setIsChatsListShown}
      />
      <Outlet />
    </main>
  )
}
