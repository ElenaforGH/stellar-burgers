import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './actions';
import {
  authSlice,
  initialState,
  setIsAuthChecked,
  setUser,
  userLogout
} from './authSlice';

const mockNewUserData = {
  email: 'example@example.ru',
  name: 'Ivan',
  password: '12345'
};

const mockUserData = {
  email: 'example@example.ru',
  name: 'Ivan',
  password: '12345'
};

describe('Тесты на обработку запросов', () => {
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
  test('registerUser (pending)', async () => {
    const action = { type: registerUser.pending.type };
    const result = authSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('registerUser (fulfilled) - завершено успешно', async () => {
    const state = {
      ...initialState,
      isLoading: true
    };
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: mockNewUserData }
    };
    const result = authSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      user: mockNewUserData,
      isAuthChecked: true
    });
  });
  test('registerUser (rejected) - завершено с ошибкой', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ result: 'OK' })
      })
    );
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'error' }
    };
    const result = authSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      error: 'error'
    });
  });
  test('loginUser (pending)', async () => {
    const action = { type: loginUser.pending.type };
    const result = authSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('loginUser (fulfilled) - завершено успешно', async () => {
    const action = { type: loginUser.fulfilled.type, payload: mockNewUserData };
    const result = authSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      user: mockNewUserData,
      isAuthChecked: true
    });
  });
  test('loginUser(rejected) - завершено с ошибкой', async () => {
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
      type: loginUser.rejected.type,
      error: { message: 'error' }
    };
    const result = authSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      error: 'error',
      isAuthChecked: true
    });
  });
  test('logoutUser (pending)', async () => {
    const state = {
      ...initialState,
      user: mockUserData,
      isAuthChecked: true
    };
    const action = { type: logoutUser.pending.type };
    const result = authSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      user: mockUserData,
      isAuthChecked: true,
      isLoading: true
    });
  });
  test('logoutUser (fulfilled) - завершено успешно', async () => {
    const state = {
      ...initialState,
      user: mockUserData,
      isAuthChecked: true,
      isLoading: true
    };
    const action = {
      type: logoutUser.fulfilled.type,
      payload: { user: mockUserData }
    };
    const result = authSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState
    });
  });
  test('logoutUser(rejected) - завершено с ошибкой', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ result: 'OK' })
      })
    );
    const state = {
      ...initialState,
      user: mockUserData,
      isAuthChecked: true,
      isLoading: true
    };
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'error' }
    };
    const result = authSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      user: mockUserData,
      error: 'error',
      isAuthChecked: true
    });
  });
  test('getUser (pending)', async () => {
    const action = { type: getUser.pending.type };
    const result = authSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('getUser (fulfilled) - завершено успешно', async () => {
    const state = {
      ...initialState,
      isLoading: true
    };
    const action = {
      type: getUser.fulfilled.type,
      payload: { user: mockUserData }
    };
    const result = authSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      user: mockUserData,
      isAuthChecked: true
    });
  });
  test('getUser (rejected) - завершено с ошибкой', async () => {
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
    const action = { type: getUser.rejected.type, error: { message: 'error' } };
    const result = authSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      error: 'error',
      isAuthChecked: true
    });
  });
  test('updateUser (pending)', async () => {
    const action = { type: updateUser.pending.type };
    const result = authSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  test('updateUser (fulfilled) - завершено успешно', async () => {
    const state = {
      ...initialState,
      isLoading: true
    };
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: mockUserData }
    };
    const result = authSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      user: mockUserData,
      isAuthChecked: true
    });
  });
  test('updateUser (rejected) - завершено с ошибкой', async () => {
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
      type: updateUser.rejected.type,
      error: { message: 'error' }
    };
    const result = authSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState,
      error: 'error',
      isAuthChecked: true
    });
  });
});

describe('Тесты setUser, setIsAuthChecked, userLogout', () => {
  test('setUser', async () => {
    const action = { type: setUser.type, payload: mockUserData };
    const result = authSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      user: mockUserData
    });
  });
  test('setIsAuthChecked', async () => {
    const action = { type: setIsAuthChecked.type, payload: true };
    const result = authSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });
  test('userLogout', async () => {
    const state = {
      ...initialState,
      user: mockUserData
    };
    const action = { type: userLogout.type, payload: mockUserData };
    const result = authSlice.reducer(state, action);
    expect(result).toEqual({
      ...initialState
    });
  });
});
