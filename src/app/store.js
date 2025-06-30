// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/slices/authSlice'; // <--- ¡Cambio aquí: importación con llaves!

const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export default store;