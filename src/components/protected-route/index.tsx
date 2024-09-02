import React from 'react';
import { useSelector } from 'react-redux';
import {
  getIsAuthChecked,
  getUserSelector
} from '../../services/auth/authSlice';
import { Preloader } from '../ui/preloader';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component
}: ProtectedRouteProps): React.JSX.Element => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUserSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <ProtectedRoute onlyUnAuth component={component} />;
