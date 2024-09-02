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
}

export const initialState: TAuthState = {
  user: null,
  error: null,
  isAuthChecked: false
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      }),
      builder
        .addCase(loginUser.pending, (state) => {
          state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.error.message;
          state.isAuthChecked = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuthChecked = true;
        }),
      builder
        .addCase(logoutUser.pending, (state) => {
          state.error = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.error = action.error.message;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
        }),
      builder
        .addCase(getUser.pending, (state) => {
          state.error = null;
        })
        .addCase(getUser.rejected, (state, action) => {
          state.error = action.error.message;
          state.isAuthChecked = true;
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.isAuthChecked = true;
        }),
      builder
        .addCase(updateUser.pending, (state) => {
          state.error = null;
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.error = action.error.message;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
        });
  }
});

export const { setUser, setIsAuthChecked, userLogout } = authSlice.actions;
export const { getUserSelector, getIsAuthChecked } = authSlice.selectors;
