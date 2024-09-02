import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredients/ingredientsSlice';
import { burgerConstructorSlice } from './constructor/burgerConstructorSlice';
import { feedsSlice } from './feeds/feedsSlice';
import { orderByNumberSlice } from './order/orderByNumberSlice';
import { userOrdersSlice } from './orders/userOrdersSlice';
import { authSlice } from './auth/authSlice';
import { newOrderSlice } from './newOrder/newOrderSlice';

const rootReducer = combineSlices(
  authSlice,
  burgerConstructorSlice,
  feedsSlice,
  ingredientsSlice,
  newOrderSlice,
  orderByNumberSlice,
  userOrdersSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
