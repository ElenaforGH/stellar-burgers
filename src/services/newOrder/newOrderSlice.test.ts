import { createNewOrder } from './actions';
import { initialState, newOrderSlice } from './newOrderSlice';

const mockData = {
  success: true,
  name: 'Краторный био-марсианский люминесцентный бургер',
  order: {
    ingredients: [
      [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941'
      ]
    ],
    _id: '66ebea06119d45001b507bc0',
    owner: {
      name: 'Elena',
      email: 'example@example.ru',
      createdAt: '2024-08-29T11:40:39.720Z',
      updatedAt: '2024-09-01T10:46:30.980Z'
    },
    status: 'done',
    name: 'Краторный био-марсианский люминесцентный бургер',
    createdAt: '2024-09-19T09:08:22.112Z',
    updatedAt: '2024-09-19T09:08:22.591Z',
    number: 53355,
    price: 2667
  }
};

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
  test('createNewOrder (pending)', async () => {
    const action = { type: createNewOrder.pending.type };
    const result = newOrderSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      newOrderRequest: true
    });
  });
  test('createNewOrder (fulfilled) - завершено успешно', async () => {
    const state = {
      ...initialState,
      newOrderRequest: true
    };
    const action = { type: createNewOrder.fulfilled.type, payload: mockData };
    const result = newOrderSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      newOrderData: mockData.order
    });
  });
  test('Запрос на получение ингредиентов завершен с ошибкой', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ result: 'OK' })
      })
    );
    const state = {
      ...initialState,
      newOrderRequest: true
    };
    const action = {
      type: createNewOrder.rejected.type,
      error: { message: 'error' }
    };
    const result = newOrderSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      error: 'error'
    });
  });
});
