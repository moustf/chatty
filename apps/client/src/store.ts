import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from './features/auth/authSlice';
import { chatReducer } from './features/chat/chatSlice';

const rootReducer = combineReducers({ auth: authReducer, chat: chatReducer });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});


