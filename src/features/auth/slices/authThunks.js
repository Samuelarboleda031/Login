import { loginStart, loginSuccess, loginFailure } from './authSlice';
import { authenticateUser } from '../services/authService';

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const user = await authenticateUser(credentials);
    if (user) {
      dispatch(loginSuccess(user));
      return { success: true, user };
    } else {
      dispatch(loginFailure('Credenciales incorrectas'));
      return { success: false, error: 'Credenciales incorrectas' };
    }
  } catch (error) {
    const errorMessage = error.message || 'Error de conexión';
    dispatch(loginFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};