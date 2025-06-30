// src/features/auth/slices/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, getProfile } from '../services/authService';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const loginData = await login(credentials);
      const token = loginData.access_token;

      if (!token) {
        return rejectWithValue('No se recibió token de acceso.');
      }

      const userProfile = await getProfile(token);

      return { user: userProfile, token };
    } catch (error) {
      let errorMessage = 'Fallo al iniciar sesión. Credenciales inválidas.';
      if (error.message) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);