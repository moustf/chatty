import { FC } from 'react';
import { MainHeader } from '../components/main-page/MainHeader';
import { ChatOverallComponent } from '../components/main-page/ChatOverallComponent';

export const MainPage: FC = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-betwee">
      <MainHeader />
      <ChatOverallComponent />
    </div>
  );
};
