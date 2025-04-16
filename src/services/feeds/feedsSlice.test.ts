import { getFeeds } from './actions';
import { feedsSlice, initialState } from './feedsSlice';

const mockData = {
  success: true,
  orders: [
    {
      _id: '66ebe1c4119d45001b507b97',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943'
      ],
      status: 'done',
      name: 'Краторный space люминесцентный бургер',
      createdAt: '2024-09-19T08:33:08.876Z',
      updatedAt: '2024-09-19T08:33:09.458Z',
      number: 53354
    },
    {
      _id: '66ebdf34119d45001b507b8f',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-09-19T08:22:12.740Z',
      updatedAt: '2024-09-19T08:22:13.268Z',
      number: 53353
    },
    {
      _id: '66ebd4a2119d45001b507b7a',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-09-19T07:37:06.809Z',
      updatedAt: '2024-09-19T07:37:07.276Z',
      number: 53352
    }
  ],
  total: 52980,
  totalToday: 68
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
  test('getFeeds (pending)', async () => {
    const action = { type: getFeeds.pending.type };
    const result = feedsSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('getFeeds (fulfilled) - завершено успешно', async () => {
    const state = {
      ...initialState,
      isLoading: true
    };
    const action = { type: getFeeds.fulfilled.type, payload: mockData };
    const result = feedsSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      feedsData: mockData.orders,
      sumCompletedToday: mockData.totalToday,
      sumCompletedAll: mockData.total
    });
  });
  test('getFeeds (rejected) - завершено с ошибкой', async () => {
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
      type: getFeeds.rejected.type,
      error: { message: 'error' }
    };
    const result = feedsSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      error: 'error'
    });
  });
});
