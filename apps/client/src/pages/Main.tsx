import { FC } from 'react';
import { MainHeader, ChatOverallComponent } from '../components/';

export const MainPage: FC = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <MainHeader />
      <ChatOverallComponent />
    </div>
  );
};
