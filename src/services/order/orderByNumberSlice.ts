import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumber } from './actions';

interface TOrderState {
  isLoading: boolean;
  error: string | undefined | null;
  orderData: TOrder | null;
}

export const initialState: TOrderState = {
  orderData: null,
  isLoading: false,
  error: null
};

export const orderByNumberSlice = createSlice({
  name: 'orderByNumber',
  initialState,
  reducers: {},
  selectors: {
    getOrderData: (state) => state.orderData
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getOrderByNumber.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.orderData = action.payload.orders[0];
    });
  }
});

export const { getOrderData } = orderByNumberSlice.selectors;
