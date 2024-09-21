import { expect, test, describe } from '@jest/globals';
import {
  addIngredient,
  burgerConstructorSlice,
  deleteIngredient,
  initialState,
  moveIngredient
} from './burgerConstructorSlice';
import { mockIngredients } from '../ingredients/ingredientsSlice.test';

describe('Тесты на проверку редьюсеров конструктора бургера', () => {
  test('addIngredient - bun', () => {
    const action = { type: addIngredient.type, payload: mockIngredients[0] };
    const result = burgerConstructorSlice.reducer(initialState, action);
    const newIngredient = mockIngredients[0];
    expect(result).toEqual({
      ...initialState,
      bun: newIngredient
    });
  });
  test('addIngredient - sause', () => {
    const action = { type: addIngredient.type, payload: mockIngredients[3] };
    const result = burgerConstructorSlice.reducer(initialState, action);
    const newIngredient = mockIngredients[3];
    expect(result).toEqual({
      ...initialState,
      ingredients: [newIngredient]
    });
  });
  test('addIngredient - main', () => {
    const action = { type: addIngredient.type, payload: mockIngredients[2] };
    const result = burgerConstructorSlice.reducer(initialState, action);
    const newIngredient = mockIngredients[2];
    expect(result).toEqual({
      ...initialState,
      ingredients: [newIngredient]
    });
  });
  test('deleteIngredient', () => {
    const state = {
      ...initialState,
      ingredients: [mockIngredients[1]]
    };
    const action = { type: deleteIngredient.type, payload: mockIngredients[1] };
    const result = burgerConstructorSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState
    });
  });
  test('moveIngredient', () => {
    const state = {
      ...initialState,
      ingredients: [mockIngredients[1], mockIngredients[2]]
    };

    const action = {
      type: moveIngredient.type,
      payload: {
        fromIndex: 1,
        toIndex: 0
      }
    };
    const result = burgerConstructorSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      ingredients: [mockIngredients[2], mockIngredients[1]]
    });
  });
});
