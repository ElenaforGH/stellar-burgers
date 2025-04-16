import { getOrderByNumber } from './actions';
import { initialState, orderByNumberSlice } from './orderByNumberSlice';

const mockData = {
  success: true,
  orders: [
    {
      _id: '66ebeffc119d45001b507bca',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      owner: '65fb0aea97ede0001d06168c',
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-09-19T09:33:48.634Z',
      updatedAt: '2024-09-19T09:33:49.096Z',
      number: 53356,
      __v: 0
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
  test('getOrderByNumber (pending)', async () => {
    const action = { type: getOrderByNumber.pending.type };
    const result = orderByNumberSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('getOrderByNumber (fulfilled) - завершен успешно', async () => {
    const state = {
      ...initialState,
      isLoading: true
    };
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: mockData.orders
    };
    const result = orderByNumberSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      orderData: mockData.orders
    });
  });
  test('getOrderByNumber (rejected)- завершено с ошибкой', async () => {
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
      type: getOrderByNumber.rejected.type,
      error: { message: 'error' }
    };
    const result = orderByNumberSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      error: 'error'
    });
  });
});
