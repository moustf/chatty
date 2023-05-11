import {
  Payload,
  CustomMessagesHashTable,
  CustomMessagesHashTableTypes,
  MessageObject,
} from '@chatty/types';
import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = new CustomMessagesHashTable();
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

// ? Setting a whole new chat to the store.
const fetchChatMessages = ({
  chatId, limit, offset,
}: {
  chatId: string, limit: string, offset: string,
}) => axios.get(
  `${baseUrl}/api/v1/conversations/messages?chatId=${chatId}&limit=${limit}&offset=${offset}`
  );
export const setChatMessages = createAsyncThunk(
  'messages/setChatMessages',
  fetchChatMessages,
);

// ? Appending a message to a chat conversation array.
export const setNewMessageToAChatAction = createAction<
  { chatId: string, message: MessageObject }
>('messages/setNewMessageToAChat');

// ? Getting all the messages of a chat.
export const getAllMessagesOfAChat = (chatId: string) => createSelector(
  (state: Payload) => state.message,
  (messages: CustomMessagesHashTableTypes) => messages.getChatMessages(chatId),
)

// ? Getting the last message inserted into the messages slice.
export const selectLastMessageFromAChat = (chatId: string) => createSelector(
  (state: Payload) => state.message,
  (messages: CustomMessagesHashTableTypes) => messages.getLatestMessage(chatId),
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setChatMessages.fulfilled, (state, action) => {
      const chatId = action.payload.data.data[0]._id;
      state.addNewChat(chatId, action.payload.data.data);
    });

    builder.addCase(setNewMessageToAChatAction, (state, action) => {
      const { chatId, message } = action.payload;
      state.append(chatId, message);
    });
  },
});

export const messagesReducer = messagesSlice.reducer;
