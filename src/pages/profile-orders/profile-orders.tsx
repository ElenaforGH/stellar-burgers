import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/orders/actions';
import { getOrdersList } from '../../services/orders/userOrdersSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getOrdersList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return <ProfileOrdersUI orders={orders} />;
};
