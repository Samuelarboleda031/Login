import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const LoginForm = ({ onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <form className="login-form p-4 border rounded shadow-sm" onSubmit={handleSubmit} style={{ minWidth: '350px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="usuario@ejemplo.com"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Tu contraseña"
          />
        </div>

        <button type="submit" disabled={isLoading} className="login-button w-100 mt-3">
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>

        <div className="login-info text-center mt-3 text-white">
          <p className="mb-1">Para pruebas usar:</p>
          <p className="mb-0">Email: john@mail.com</p>
          <p className="mb-0">Contraseña: changeme</p>
        </div>
        {onNavigateToRegister && (
            <p className="text-center mt-3">
              ¿No tienes cuenta?{' '}
              <a href="#" onClick={onNavigateToRegister}>Regístrate aquí</a>
            </p>
          )}
      </form>
    </div>
  );
};
export default LoginForm;