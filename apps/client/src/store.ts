import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from './features/auth/authSlice';
import { chatReducer } from './features/chat/chatSlice';
import { messagesReducer } from './features/messages/messagesSlice';

const rootReducer = combineReducers({ auth: authReducer, chat: chatReducer, message: messagesReducer });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});


