import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  updateUserApi
} from '../../utils/burger-api';
import { setIsAuthChecked, setUser, userLogout } from './authSlice';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk('auth/register', registerUserApi);
export const getUser = createAsyncThunk('auth/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);
export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((user) => dispatch(setUser(user.user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', (_, { dispatch }) => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
    dispatch(userLogout());
  });
});
