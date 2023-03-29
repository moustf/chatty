import { FC, useState } from 'react';

import { NotificationsMenu } from './NotificationsMenu';
import AvatarImage from '../../assets/Avatar.svg';

export const MainHeaderProfile: FC<{ type: string }> = ({ type }) => {
  const [isProfileClicked, setIsProfileClicked] = useState<boolean>(false);

  return (
    <section className={`${type === 'large' ? 'hidden' : 'flex'} w-72 h-20 lg:flex justify-between items-center`}>
      <NotificationsMenu type='large' />
      <p className="text-grey-600 underline text-h5">Mustafa Salem</p>
      <div
        className={`w-16 h-16 rounded-full flex justify-center items-center cursor-pointer ${isProfileClicked ? 'bg-secondary-light' : 'bg-grey'}`}
        onClick={() => setIsProfileClicked((prevValue) => !prevValue)}
      >
        <img src={AvatarImage} width="52" height="52" alt="avatar" />
      </div>
    </section>
  );
}
