import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/auth/actions';

export const ProfileMenu: FC = () => {
  const dispatсh = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatсh(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
