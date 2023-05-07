import { Payload, CustomMessagesHashTable, MessageObject } from '@chatty/types';
import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = new CustomMessagesHashTable();
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

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

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setChatMessages.fulfilled, (state, action) => {
      const chatId = action.payload.data.data[0]._id;
      state.addNewChat(chatId, action.payload.data.data);
    })
  }
});
