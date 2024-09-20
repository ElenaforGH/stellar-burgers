import { getOrders } from './actions';
import { initialState, userOrdersSlice } from './userOrdersSlice';

const mockData = {
  success: true,
  orders: [
    {
      _id: '66d1dbe1119d45001b50303f',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0946'
      ],
      status: 'done',
      name: 'Краторный space минеральный люминесцентный бургер',
      createdAt: '2024-08-30T14:49:05.805Z',
      updatedAt: '2024-08-30T14:49:06.299Z',
      number: 51562
    },
    {
      _id: '66d1dce5119d45001b503044',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0946'
      ],
      status: 'done',
      name: 'Краторный spicy люминесцентный минеральный бургер',
      createdAt: '2024-08-30T14:53:25.236Z',
      updatedAt: '2024-08-30T14:53:25.729Z',
      number: 51564
    }
  ]
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
  test('getOrders (pending)', async () => {
    const action = { type: getOrders.pending.type };
    const result = userOrdersSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('getOrders (fulfilled) - завершено успешно', async () => {
    const state = {
      ...initialState,
      isLoading: true
    };
    const action = { type: getOrders.fulfilled.type, payload: mockData.orders };
    const result = userOrdersSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      ordersData: mockData.orders
    });
  });
  test('getOrders (rejected)- завершено с ошибкой', async () => {
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
      type: getOrders.rejected.type,
      error: { message: 'error' }
    };
    const result = userOrdersSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      error: 'error'
    });
  });
});
