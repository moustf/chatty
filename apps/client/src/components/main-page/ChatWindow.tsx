import { FC } from 'react';
import { useParams } from 'react-router-dom';

export const ChatWindow: FC = () => {
  const { chatId } = useParams();

  console.log(useParams())

  return (
    <section
      id={chatId}
      className="w-full md:w-full lg:w-2/3 xl:w-3/4 flex justify-center items-center border border-black border-solid mx-6 my-2 border-box"
    >
      Hello
      {" "}
      {chatId}
    </section>
  );
};
