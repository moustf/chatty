import { FC, useState, useEffect, useRef } from 'react';

import { useConnect, useAppSelector, useAppDispatch } from '../../hooks';
import { selectUerData, setUserData } from '../../features/auth/authSlice';

import AttachIcon from '../../assets/attach.svg';
import SendIcon from '../../assets/send.svg';
import { AttachFile } from './AttachFile';
import { errorSwalMessage, uploadData } from '../../utils';

export const SendChatMessage: FC<{ chatId: string }> = ({ chatId }) => {
  const inputRef = useRef<HTMLInputElement | any>();
  const [message, setMessage] = useState<string>('');
  const [isAttachFileShown, setIsAttachFileShown] = useState<boolean>(false);
  const [files, setFiles] = useState<FileList | null>(null);

  const { socket, isConnected } = useConnect();
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(setUserData());
  }, []);

  const { id } = useAppSelector(selectUerData); // ? Current user id.

  const handleFilesChange = (files: FileList) => {
    setFiles(files);
  };

  const sendNewMessage = async () => {
    let filesUris = [];
    if (files) {
      filesUris = await uploadData(files);
    }

    if (isConnected) {
      // ? Joining the conversation's room.
      socket.emit('join-room', `conversation:${chatId}`, id);

      const dataToBeSent = {
        chatId,
        type: 'message',
        text: message,
        filesUris,
      };

      socket.emit('newMessage', JSON.stringify(dataToBeSent));

      socket.on('newErrorMessage', (data) => {
        const { message, error } = JSON.parse(data);

        errorSwalMessage(message || error.message);
      });
    }
  };

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
          ref={inputRef}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Write something ..."
          className="w-2/3 h-16 border-0 hover:border-2 hover:border-solid hover:border-black border-box px-8 rounded-full"
        />
        <section
          className="w-[25%] md:w-[10%] flex justify-between items-center"
        >
          <div
            className="w-11 h-11 rounded-full cursor-pointer bg-[#4C7CFD] hover:bg-[#0044FC] flex justify-center items-center relative"
          >
            <img
              src={AttachIcon}
              alt="attach icon"
              width="30"
              height="30"
              className="cursor-pointer"
              onClick={() => setIsAttachFileShown((prevValue) => !prevValue)}
            />
            <AttachFile
              isAttachMessageShow={isAttachFileShown}
              files={files}
              handleFilesChange={handleFilesChange}
            />
          </div>
          <div
            className={
              `w-11 h-11 rounded-full bg-[#4C7CFD] hover:bg-[#0044FC] flex justify-center items-center ${message && files?.length ? 'cursor-pointer' : 'cursor-not-allowed'}`
            }
          >
            <img
              onClick={() => {
                message && files?.length && sendNewMessage();
              }}
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
