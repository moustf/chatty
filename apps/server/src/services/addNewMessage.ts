/* eslint-disable no-console */
import { writeFile, readFile, unlink } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

import { Socket } from 'socket.io';

import { validateMessageData } from '@chatty/types';

import { addNewMessageQuery, findChatById } from '../queries/conversations';

const { uploadObject } = require('../../bucket');

// * Making the methods return promise instead of accepting a callback.
const asyncWriteFile = promisify(writeFile);
const asyncReadFile = promisify(readFile);
const asyncUnlike = promisify(unlink);

export const addNewMessageService = async (
  chatId: string,
  userId: string,
  type: string,
  text: string,
  fileName: string,
  fileData: string,
  socket: Socket
) => {
  try {
    const data = { userId, type, text, fileName, fileData };

    // ? Simple validation for the data received from the new message event emitter.
    await validateMessageData.validate(data);

    // ? If we have any data in the fileData, this means the user sent a file, so do:
    if (fileData) {
      // ? Writing the file to the assets directory that exits locally,
      asyncWriteFile(
        join(__dirname, '..', 'assets', fileName),
        fileData,
        'base64'
      );

      // ? After writing the file, we read it,
      const imageData = await asyncReadFile(
        join(__dirname, '..', 'assets', fileName)
      );

      // ? In order to pass it to the upload method to upload it to the Spaces Bucket.
      await uploadObject(fileName, imageData);

      //? We then create a url bar friendly url to pass it to the query.
      const urlFriendlyFileName = fileName.replace(/\s/g, '%');
      const fileUrl = `https://chatty-bucket.fra1.cdn.digitaloceanspaces.com/_static/${urlFriendlyFileName}`;

      // ? Finally, we pass the data to the query as an image message.
      await addNewMessageQuery(chatId, {
        type: 'image',
        image: fileUrl,
        sender: userId,
      });

      await asyncUnlike(join(__dirname, '..', 'assets', fileName));
    } else {
      // ? Or pass it as a text message.
      await addNewMessageQuery(chatId, {
        type: 'text',
        text,
        sender: userId,
      });
    }

    const finedChat = await findChatById(chatId);
    console.log(finedChat);

    // ? Can change, we emit an event for the front end to receive the data.
    socket.emit('newMessageReturn', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    socket.emit('newMessageError', JSON.stringify(error));
  }
};
