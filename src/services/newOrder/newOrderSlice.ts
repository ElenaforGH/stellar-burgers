import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createNewOrder } from './actions';

interface TNewOrderState {
  error: string | undefined | null;
  newOrderRequest: boolean;
  newOrderData: TOrder | null;
}

export const initialState: TNewOrderState = {
  newOrderData: null,
  newOrderRequest: false,
  error: null
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    deleteOrderData: (state) => {
      state.newOrderData = null;
      state.newOrderRequest = false;
    }
  },
  selectors: {
    getOrder: (state) => state.newOrderData,
    getOrderRequest: (state) => state.newOrderRequest,
    getOrderModalData: (state) => state.newOrderData
  },
  extraReducers: (builder) => {
    builder.addCase(createNewOrder.pending, (state) => {
      state.error = null;
      state.newOrderRequest = true;
    });
    builder.addCase(createNewOrder.rejected, (state, action) => {
      state.error = action.error.message;
      state.newOrderRequest = false;
    });
    builder.addCase(createNewOrder.fulfilled, (state, action) => {
      state.newOrderRequest = false;
      state.newOrderData = action.payload.order;
    });
  }
});

export const { deleteOrderData } = newOrderSlice.actions;
export const { getOrder, getOrderRequest, getOrderModalData } =
  newOrderSlice.selectors;
