import { FC } from 'react';
import { MainHeader } from '../components/main-page/MainHeader';
import { UserConversationList } from '../components/main-page/UserConversationsList';

export const MainPage: FC = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-betwee">
      <MainHeader />
      <UserConversationList />
    </div>
  );
};
