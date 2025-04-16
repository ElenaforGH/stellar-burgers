import { rootReducer } from './store';

describe('Проверка rootReducer', () => {
  test('Тест на инициализацию rootReducer', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const result = rootReducer(undefined, action);
    expect(result).toEqual({
      auth: { error: null, isAuthChecked: false, user: null, isLoading: false },
      burgerConstructor: { bun: null, ingredients: [] },
      feeds: {
        error: null,
        feedsData: [],
        sumCompletedAll: 0,
        sumCompletedToday: 0,
        isLoading: false
      },
      ingredients: { error: null, ingredientsData: [], isLoading: false },
      newOrder: { error: null, newOrderData: null, newOrderRequest: false },
      orderByNumber: { error: null, isLoading: false, orderData: null },
      userOrders: { error: null, ordersData: [], isLoading: false }
    });
  });
});
