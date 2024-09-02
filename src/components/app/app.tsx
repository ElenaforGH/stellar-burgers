import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, useLocation, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/auth/actions';
import { AppHeader } from '../app-header';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';
import { IngredientDetails } from '../ingredient-details';
import { getIngredients } from '../../services/ingredients/actions';
import { getFeeds } from '../../services/feeds/actions';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();
  const orderNumber = '#0' + location.pathname.split('/').slice(-1);

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
    dispatch(getFeeds());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={
            <div>
              <span
                style={{ textAlign: 'center' }}
                className={`text text_type_digits-default`}
              >
                {orderNumber}
              </span>
              <OnlyAuth component={<OrderInfo />} />
            </div>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.title}>
              <h3
                style={{ textAlign: 'center' }}
                className={`text text_type_main-large`}
              >
                Детали ингредиента
              </h3>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <div className={styles.title}>
              <span
                style={{ textAlign: 'center' }}
                className={`text text_type_digits-default`}
              >
                {orderNumber}
              </span>
              <OrderInfo />
            </div>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={orderNumber} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <OnlyAuth
                component={
                  <Modal title={orderNumber} onClose={() => navigate(-1)}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
