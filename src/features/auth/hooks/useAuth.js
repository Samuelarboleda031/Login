import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authThunks';
import { logout } from '../slices/authSlice';
import { selectAuth, selectUser, selectIsAuthenticated, selectIsLoading, selectError } from '../slices/authSelectors';

export const useAuth = () => {
  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const login = async (credentials) => {
    return await dispatch(loginUser(credentials));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    auth, user, isAuthenticated, isLoading, error,
    login, logout: logoutUser
  };
};