import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IUserModel } from '@api/models/user/user-model';
import { removeAccessToken } from '@shared/core';

type APPSTATE = {
  user:
    | {
        id: null;
        role_id: null;
        name: '';
        email: '';
        avatar: '';
        email_verified_at: null;
        created_at: null;
        updated_at: null;
      }
    | IUserModel
    | undefined;
  zone: { label: string; value: number }[] | undefined;
  isLogined: boolean;
  isRouteLoading: boolean;
  isBlockEvents: boolean;
};

const initialState: APPSTATE = {
  user: undefined,
  zone: undefined,
  isLogined: false,
  isRouteLoading: false,
  isBlockEvents: false,
};
export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any | undefined>) => {
      state.user = action.payload;
      state.isLogined = true;
    },
    logout: state => {
      state.user = undefined;
      state.isLogined = false;
      removeAccessToken()
    },
    authUser: (state, action: PayloadAction<any | undefined>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isRouteLoading = action.payload;
    },
    setZone: (state, action) => {
      state.zone = action.payload;
    },
    setIsBlockEvents: (state, action) => {
      state.isBlockEvents = action.payload;
    },
  },
});
export const {
  login,
  authUser,
  logout,
  setLoading,
  setZone,
  setIsBlockEvents,
} = appSlice.actions;
export default appSlice.reducer;