import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './actions';

interface TAuthState {
  error: string | undefined | null;
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
}

export const initialState: TAuthState = {
  user: null,
  error: null,
  isAuthChecked: false,
  isLoading: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    }
  },
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUserSelector: (state) => state.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthChecked = true;
      }),
      builder
        .addCase(loginUser.pending, (state) => {
          state.error = null;
          state.isLoading = true;
          state.isAuthChecked = false;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.error.message;
          state.isAuthChecked = true;
          state.isLoading = false;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuthChecked = true;
          state.isLoading = false;
        }),
      builder
        .addCase(logoutUser.pending, (state) => {
          state.error = null;
          state.isAuthChecked = true;
          state.isLoading = true;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.error = action.error.message;
          state.isAuthChecked = true;
          state.isLoading = false;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
          state.isLoading = false;
          state.isAuthChecked = false;
        }),
      builder
        .addCase(getUser.pending, (state) => {
          state.isLoading = true;
          state.isAuthChecked = false;
          state.error = null;
        })
        .addCase(getUser.rejected, (state, action) => {
          state.error = action.error.message;
          state.isAuthChecked = true;
          state.isLoading = false;
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.isAuthChecked = true;
          state.isLoading = false;
        }),
      builder
        .addCase(updateUser.pending, (state) => {
          state.error = null;
          state.isAuthChecked = false;
          state.isLoading = true;
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.error = action.error.message;
          state.isLoading = false;
          state.isAuthChecked = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.isLoading = false;
          state.isAuthChecked = true;
        });
  }
});

export const { setUser, setIsAuthChecked, userLogout } = authSlice.actions;
export const { getUserSelector, getIsAuthChecked } = authSlice.selectors;
