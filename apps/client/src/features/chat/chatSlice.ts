import { Payload } from '@chatty/types';
import { createSlice, createSelector, createAction } from '@reduxjs/toolkit';

const initialState = {
  isChatsListShown: false,
};

export const setChatsListShownToFalseAction = createAction<boolean>('chat/setIsChatListShowToFalse');
export const setChatsListShownToTrueAction = createAction<boolean>('chat/setIsChatListShowToTrue');


export const selectIsChatsListShown = createSelector(
  (state: Payload) => state.chat,
  (chat: { isChatsListShown: boolean }) => chat.isChatsListShown,
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setChatsListShownToFalseAction, (state, action) => {
      state.isChatsListShown = action.payload;
    });

    builder.addCase(setChatsListShownToTrueAction, (state, action) => {
      state.isChatsListShown = action.payload;
    });
  },
});

export const chatReducer = chatSlice.reducer;
