import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { Payload } from '@chatty/types';
import axios from 'axios';

import { baseUrl } from '../../config/environment';

const initialState = {
  userData: { id: '', email: '', iat: 0 },
  isLoading: false,
  error: '',
};

// ? Action creator function.
export const createUserDataAction = (payload: Payload): { type: string, payload: Payload } => ({
  type: 'auth/setUserData',
  payload,
});

export const createErrorAction = (payload: any): { type: string; payload: any } => ({
  type: 'auth/setError',
  payload,
});

// ? State selector functions.

export const selectUerData = createSelector(
  // * First, we pass one or more "input selector" functions.
  (state: Payload) => state.auth.userData,
  // * Then we return output, we can do any logic with it.
  (userData: { id: string, email: string, iat: number }) => userData,
);

export const selectError = createSelector(
  (state: Payload) => state.auth.error,
  (error: any) => error,
);

// ? Thunk function and its fetcher helper functions.

const fetchUserData = () => axios.post(`${baseUrl}/api/v1/auth/`, {}, {
  withCredentials: true,
});
export const setUserData = createAsyncThunk('auth/setUserData', fetchUserData);

const logout = () => axios.post(`${baseUrl}/api/v1/auth/logout`, {}, {
  withCredentials: true,
});
export const clearUserData = createAsyncThunk('auth/clearUserData', logout);

// ! The main auth slice.
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUserData.fulfilled, (state, action) => {
      state.userData = action.payload.data.data;
      state.isLoading = false;
    });

    builder.addCase(setUserData.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.isLoading = false;
    });

    builder.addCase(clearUserData.fulfilled, (state) => {
      state.userData = { id: '', email: '', iat: 0 };
      state.isLoading = false;
    });

    builder.addCase(clearUserData.rejected, (state, action) => {
      state.error = action.error.message as string;
    });
  },
});

export const authReducer = authSlice.reducer;
