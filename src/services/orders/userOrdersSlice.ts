import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrders } from './actions';

interface TUserOrdersState {
  error: string | undefined | null;
  ordersData: TOrder[];
}

export const initialState: TUserOrdersState = {
  ordersData: [],
  error: null
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
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.ordersData = action.payload;
    });
  }
});

export const { getOrdersList } = userOrdersSlice.selectors;
