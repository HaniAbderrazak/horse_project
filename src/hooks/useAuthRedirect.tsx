import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

export const useAuthRedirect = (redirectPath = '/horses') => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, redirectPath]);
};