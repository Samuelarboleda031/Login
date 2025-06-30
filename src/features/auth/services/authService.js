// src/features/auth/services/authService.js
const API_URL = 'https://api.escuelajs.co/api/v1';

export const login = async (credentials) => {
  const { email, password } = credentials;
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al iniciar sesión. Credenciales inválidas.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en el servicio de login:', error);
    throw error;
  }
};

export const getProfile = async (token) => {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener el perfil del usuario.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en el servicio getProfile:', error);
    throw error;
  }
};