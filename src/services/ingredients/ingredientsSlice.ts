import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

interface TIngredientsState {
  isLoading: boolean;
  error: string | undefined | null;
  ingredientsData: TIngredient[];
}

export const initialState: TIngredientsState = {
  ingredientsData: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsData: (state) => state.ingredientsData,
    getLoadingStatus: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredientsData = action.payload;
    });
  }
});

export const { getIngredientsData, getLoadingStatus } =
  ingredientsSlice.selectors;
