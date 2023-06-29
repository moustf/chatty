import { FC } from 'react';

import NotificationsIcon from '../../assets/Notifications.svg';

export const NotificationsMenu: FC<{ type: string }> = ({ type }) => (
  <section className={`block ${type === 'small' && 'lg:hidden'} ${type === 'large' && 'sm:hidden lg:flex'} w-10 h-10 mr-6 flex justify-content items-center`}>
    <img
      className="box-border p-2 cursor-pointer hover:border hover:border-grey hover:border-solid hover:shadow-z24"
      src={NotificationsIcon}
      width="64"
      height="64"
      alt="notifications icon"
    />
  </section>
);
