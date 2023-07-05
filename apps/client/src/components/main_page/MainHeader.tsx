import { FC, useState } from 'react';

import { MainHeaderAddUser } from './MainHeaderAddUser';
import { MainHeaderProfile } from './MainHeaderProfile';
import { NotificationsMenu } from './NotificationsMenu';
import CloseImage from '../../assets/Close.svg';

import MenuIcon from '../../assets/Menu.svg';

export const MainHeader: FC = () => {
  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);

  return (
    <header
      className="h-24 flex justify-between items-center mx-8 lg:mx-20"
    >
      <MainHeaderAddUser type="large" />
      <h1 className="text-h1 font-bold flex-1 lg:flex-none">Chatty</h1>
      {!isMenuClicked && <NotificationsMenu type="small" />}
      <MainHeaderProfile type="large" />
      <img
        src={MenuIcon}
        width="32"
        height="32"
        className={`${!isMenuClicked ? 'block' : 'hidden'} lg:hidden cursor-pointer hover:border hover:border-grey hover:border-solid hover:shadow-z24`}
        alt="menu icon"
        onClick={() => setIsMenuClicked(true)}
      />
      <section className={
        `w-full sm:w-3/4 h-screen pt-16 pr-16 ${isMenuClicked ? 'flex' : 'hidden'} flex-col gap-6 items-end absolute z-50 right-0 bottom-0 shadow-z24 lg:hidden cursor-pointer`
      }>
        <img
          className="cursor-pointer hover:border hover:border-grey hover:border-solid hover:shadow-z24 self-end mb-24"
          src={CloseImage}
          alt="Close Image"
          width="46"
          height="46"
          onClick={() => setIsMenuClicked(false)}
        />
        <MainHeaderProfile type="general" />
        <MainHeaderAddUser type="general" />
      </section>
    </header>
  );
};
