import { getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderByNumber = createAsyncThunk(
  'orders/orderByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data;
  }
);
