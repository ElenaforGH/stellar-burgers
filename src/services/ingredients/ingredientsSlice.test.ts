import { expect, test, describe, beforeEach, afterEach } from '@jest/globals';

import { ingredientsSlice, initialState } from './ingredientsSlice';
import { getIngredients } from './actions';

export const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    id: '3',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    id: '3',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  }
];

describe('Тесты на проверку обработки запросов', () => {
  beforeEach(() => {
    let spy = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        result: 'OK'
      })
    } as unknown as Response);
    spy.mockRestore;
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('getIngredients (pending)', async () => {
    const action = { type: getIngredients.pending.type };
    const result = ingredientsSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('getIngredients (fulfilled) - завершено успешно', async () => {
    const state = {
      ...initialState,
      isLoading: true
    };
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const result = ingredientsSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      ingredientsData: mockIngredients
    });
  });
  test('getIngredients (fulfilled) - завершено с ошибкой', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ result: 'OK' })
      })
    );
    const state = {
      ...initialState,
      isLoading: true
    };
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'error' }
    };
    const result = ingredientsSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      error: 'error'
    });
  });
});
