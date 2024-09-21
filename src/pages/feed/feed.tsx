import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getFeedsData } from '../../services/feeds/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/feeds/actions';

export const Feed: FC = () => {
  const orders = useSelector(getFeedsData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

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
