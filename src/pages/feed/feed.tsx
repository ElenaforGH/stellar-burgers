import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { getFeedsData } from '../../services/feeds/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/feeds/actions';

export const Feed: FC = () => {
  const orders = useSelector(getFeedsData);

  const dispatch = useDispatch();

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
