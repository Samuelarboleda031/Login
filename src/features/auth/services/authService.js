const API_USERS_URL = 'https://api.escuelajs.co/api/v1/users';

export const authenticateUser = async (credentials) => {
  const { email, password } = credentials;

  try {
    const response = await fetch(API_USERS_URL);

    if (!response.ok) {
      throw new Error(`Error al conectar con el servidor: ${response.statusText}`);
    }

    const users = await response.json();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      };
    }

    return null;
  } catch (error) {
    console.error("Error en authenticateUser:", error);
    throw new Error('No se pudo autenticar. Verifique la conexión o las credenciales.');
  }
};