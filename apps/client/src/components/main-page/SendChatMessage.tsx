import { FC, useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

import { useConnect } from '../../hooks/useConnect';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { selectUerData, setUserData } from '../../features/auth/authSlice';

import AttachIcon from '../../assets/attach.svg';
import SendIcon from '../../assets/send.svg';
import { AttachFile } from './AttachFile';

export const SendChatMessage: FC<{ chatId: string }> = ({ chatId }) => {
  const inputRef = useRef<HTMLInputElement | any>();
  const [message, setMessage] = useState<string>('');
  const [isAttachFileShown, setIsAttachFileShown] = useState<boolean>(false);
  const [files, setFiles] = useState<FileList>();

  const { socket, isConnected } = useConnect();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUserData());
  }, []);

  const { id } = useAppSelector(selectUerData); // ? Current user id.


  // ? The function for emitting new messages, accepts single file or message object.
  const emitNewMessage = (
    type: string,
    fileName: string | null,
    fileData: ArrayBuffer | string | null,
  ) => {
    // ? Checking if the client is connected to the server socket.
    if (isConnected) {
      // ? Joining the conversation room.
      socket.emit('join-room', `conversation:${chatId}`, id);

      if (type === 'image') {
        // ? Convert the fileData File object to Unit8Array of buffer numbers.
        const unit8Array = new Uint8Array(fileData as ArrayBuffer);

        // ? Then, we modify this buffer array to base 64 string to send it in the data.
        const base64String = window.btoa(String.fromCharCode.apply(null, Array.from(unit8Array)));

        // ? Emit new message with the image type.
        socket.emit('newMessage', JSON.stringify({
          type,
          text: message,
          fileName,
          fileData: base64String,
        }));
      } else if (type === 'text') {
        // ? Emit new message with the text type.
        socket.emit('newMessage', JSON.stringify({
          type,
          text: message,
          fileName,
          fileData,
        }));
      }
    };
  }

  const asyncEmitMessagePerFile = async () => {
    let counter = 1;
    try {
      const len = files?.length || 0;
      if (len > 0) {
        // ? If the files list has items, do:
        for (const file of (files as FileList)) {
          // ? Create new File Reader instance for each file, hence using const So, 
          // ? each file will take it's own instance and multiple files will get served correctly.
          const reader = new FileReader();

          // ? Modifying the file to array of buffers.
          reader.readAsArrayBuffer(file);

          reader.onload = () => {
            if (reader.readyState === 2) {
              // ? When the reading as buffer array gets done, send the result to emitNewMessage function.
              const data = reader.result;
              emitNewMessage('image', file.name, data);
            }
          }

          counter++;
        }

      } else {
        // ? Single text call.
        emitNewMessage('text', null, null);
      }

      // ? Empty the input field.
      inputRef.current.value = '';
    } catch (error) {
      console.log(error, `Error Happened In File Num #${counter}`)
    }
  }

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
          onChange={(e) => setMessage(e.target.value)}
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
            <AttachFile isAttachMessageShow={isAttachFileShown} setFiles={setFiles} files={files} />
          </div>
          <div className="w-11 h-11 rounded-full cursor-pointer bg-[#4C7CFD] hover:bg-[#0044FC] flex justify-center items-center">
            <img
              src={SendIcon}
              alt="send icon"
              width="24"
              height="24"
              onClick={() => {
                asyncEmitMessagePerFile();
              }}
            />
          </div>
        </section>
      </section>
    </section>
  );
};
