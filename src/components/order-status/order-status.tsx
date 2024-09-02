import { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  let textStyle = '';
  let statusText = '';
  switch (status) {
    case 'pending':
      textStyle = '#E52B1A';
      statusText = 'Готовится';
      break;
    case 'done':
      textStyle = '#00CCCC';
      statusText = 'Выполнен';
      break;
    case 'created':
      textStyle = '#F2F2F3';
      statusText = 'Создан';
  }

  return <OrderStatusUI textStyle={textStyle} text={statusText} />;
};
