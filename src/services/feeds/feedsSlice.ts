import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeeds } from './actions';

interface TFeedsState {
  error: string | undefined | null;
  feedsData: TOrder[];
  sumCompletedToday: number;
  sumCompletedAll: number;
  isLoading: boolean;
}

export const initialState: TFeedsState = {
  feedsData: [],
  error: null,
  sumCompletedToday: 0,
  sumCompletedAll: 0,
  isLoading: false
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsData: (state) => state.feedsData,
    getSumCompletedToday: (state) => state.sumCompletedToday,
    getSumCompletedAll: (state) => state.sumCompletedAll
  },
  extraReducers: (builder) => {
    builder.addCase(getFeeds.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getFeeds.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.feedsData = action.payload.orders;
      state.sumCompletedToday = action.payload.totalToday;
      state.sumCompletedAll = action.payload.total;
      state.isLoading = false;
    });
  }
});

export const { getFeedsData, getSumCompletedToday, getSumCompletedAll } =
  feedsSlice.selectors;
