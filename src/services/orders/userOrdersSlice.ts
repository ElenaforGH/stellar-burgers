import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrders } from './actions';

interface TUserOrdersState {
  error: string | undefined | null;
  ordersData: TOrder[];
  isLoading: boolean;
}

export const initialState: TUserOrdersState = {
  ordersData: [],
  error: null,
  isLoading: false
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersList: (state) => state.ordersData
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.ordersData = action.payload;
      state.isLoading = false;
    });
  }
});

export const { getOrdersList } = userOrdersSlice.selectors;
