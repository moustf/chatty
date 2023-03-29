import { FC, useState } from 'react';

import AddIcon from '../../assets/Add.svg';

export const MainHeaderAddUser: FC<{ type: string }> = ({ type }) => {
  const [isAddUserClicked, setIsAddUserClicked] = useState<boolean>(false);

  return (
    <section
      className={`${type === 'large' ? 'hidden' : 'flex'} w-72 h-16 box-border lg:flex justify-between items-center cursor-pointer hover:border-2 hover:border-solid hover:border-secondary-lighter ${isAddUserClicked && 'border-2 border-solid border-secondary-lighter'}`}
      onClick={() => setIsAddUserClicked((prevValue) => !prevValue)}
    >
      <h2 className="text-h2 font-bold">Add new user</h2>
      <img src={AddIcon} width="46" height="46" alt="Add icon" />
    </section>
  );
};
