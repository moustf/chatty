import { Payload } from '@chatty/types';
import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isChatsListShown: true,
};

const setIsChatsListShownToFalseThunk = () => new Promise((res) => res(false));
const setIsChatsListShownToTrueThunk = () => new Promise((res) => res(true));

export const setIsChatListShownToFalse = createAsyncThunk(
  'chat/setIsChatListShowToFalse',
  setIsChatsListShownToFalseThunk,
);
export const setIsChatListShownToTrue = createAsyncThunk(
  'chat/setIsChatListShowToTrue',
  setIsChatsListShownToTrueThunk,
);

export const createSetIsChatsListShownToFalseAction = (payload: Payload): { isChatsListShown: boolean } => ({ isChatsListShown: false });
export const createSetIsChatsListShownToTrueAction = (payload: Payload): { isChatsListShown: boolean } => ({ isChatsListShown: true });

export const selectIsChatsListShown = createSelector(
  (state: Payload) => state.chat,
  (chat: { isChatsListShown: boolean }) => chat.isChatsListShown,
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setIsChatListShownToFalse.fulfilled, (state, action) => {
      state.isChatsListShown = action.payload as boolean;
    });

    builder.addCase(setIsChatListShownToTrue.fulfilled, (state, action) => {
      state.isChatsListShown = action.payload as boolean;
    });
  },
});

export const chatReducer = chatSlice.reducer;
