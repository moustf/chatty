import { FC } from 'react';
import { ConversationsImageHeading } from '@chatty/types';

import { ConversationsImage } from './ConversationsImage';
import { useAppDispatch } from '../../hooks/redux';
import { setChatsListShownToTrueAction } from '../../features/chat/chatSlice';
import SeeMoreIcon from '../../assets/see-more.svg';
import ArrowLeftIcon from '../../assets/arrow-left.svg';
import { useNavigate } from 'react-router-dom';

export const ChatWindowHeading: FC<ConversationsImageHeading> = ({
  type, name, usersNumber,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <section className="w-full h-24 flex justify-between items-center px-8 shadow-z8">
      <section
        className="w-[85%] lg:w-1/2 xl:w-[35%] flex items-center gap-8"
      >
        <div
          className="w-8 h-8 rounded-full border border-solid border-black cursor-pointer flex justify-center items-center hover:border-0 hover:bg-grey"
          onClick={() => {
            dispatch(setChatsListShownToTrueAction(true));
            navigate('/main');
          }}
        >
          <img
            src={ArrowLeftIcon}
            alt="left arrow icon"
            width="24"
            height="24"
          />
        </div>
        <ConversationsImage
          type={type}
          name={name}
          usersNumber={usersNumber}
        />
        <h3 className="w-[15rem] xl:w-[12rem] text-left text-[1rem] sm:text-[1.5rem] lg:text-h5 xl:text-h3 text-black text-black">{name}</h3>
      </section>
      <img
        src={SeeMoreIcon}
        alt="see more icon"
        width="24"
        height="24"
      />
    </section>
  )
};
