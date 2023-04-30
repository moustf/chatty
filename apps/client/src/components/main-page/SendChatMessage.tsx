import { FC, useState } from 'react';

import AttachIcon from '../../assets/attach.svg';
import SendIcon from '../../assets/send.svg';

export const SendChatMessage: FC = () => {
  const [message, setMessage] = useState<string>('');

  return (
    <section
      className="w-full flex flex-col items-center gap-4"
    >
      <div className="w-[95%] h-1 rounded-lg bg-grey-300" />
      <section
        className="w-[90%] h-20 flex justify-between items-center"
      >
        <input
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write something ..."
          className="w-2/3 h-16 border-0 hover:border-2 hover:border-solid hover:border-black border-box px-8 rounded-full"
        />
        <section
          className="w-[25%] md:w-[10%] flex justify-between items-center"
        >
          <img
            src={AttachIcon}
            alt="attach icon"
            width="30"
            height="30"
            className="cursor-pointer"
          />
          <div className="w-11 h-11 rounded-full cursor-pointer bg-[#4C7CFD] hover:bg-[#0044FC] flex justify-center items-center">
            <img
              src={SendIcon}
              alt="send icon"
              width="24"
              height="24"
            />
          </div>
        </section>
      </section>
    </section>
  );
};
