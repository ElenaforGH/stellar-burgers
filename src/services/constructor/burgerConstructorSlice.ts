import {
  createSlice,
  PayloadAction,
  nanoid,
  createAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface TBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        switch (action.payload.type) {
          case 'bun':
            state.bun = action.payload;
            break;
          case 'main':
          case 'sauce':
            state.ingredients.push(action.payload);
            break;
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const movedIngredient = state.ingredients[action.payload.fromIndex];
      state.ingredients[action.payload.fromIndex] =
        state.ingredients[action.payload.toIndex];
      state.ingredients[action.payload.toIndex] = movedIngredient;
    },
    clearBurgerConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  }
});

export const {
  addIngredient,
  deleteIngredient,
  moveIngredient,
  clearBurgerConstructor
} = burgerConstructorSlice.actions;
export const { getConstructorSelector } = burgerConstructorSlice.selectors;
