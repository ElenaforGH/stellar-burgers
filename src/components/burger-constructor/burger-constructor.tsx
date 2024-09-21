import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';

import {
  deleteOrderData,
  getOrderModalData,
  getOrderRequest
} from '../../services/newOrder/newOrderSlice';

import {
  clearBurgerConstructor,
  getConstructorSelector
} from '../../services/constructor/burgerConstructorSlice';
import { createNewOrder } from '../../services/newOrder/actions';
import { useNavigate } from 'react-router-dom';
import { getUserSelector } from '../../services/auth/authSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorSelector);

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderModalData);
  const user = useSelector(getUserSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      return navigate('/login');
    }

    const newOrder = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];

    dispatch(createNewOrder(newOrder));
  };
  const closeOrderModal = () => {
    dispatch(clearBurgerConstructor());
    dispatch(deleteOrderData());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
