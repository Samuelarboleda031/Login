/*src/features/auth/components/Dashboard.jsx*/
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (!user) {
    return <div className="text-center mt-5">No hay información de usuario para mostrar.</div>;
  }

  return (
    <div className="dashboard-container p-4">
      <div className="dashboard-header d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Panel de Control</h1>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      <div className="dashboard-content p-4 rounded shadow-sm">
        <div className="user-info text-center">
          <h2 className="mb-3">Información del Usuario</h2>
          {user?.avatar && (
            <div className="user-avatar mb-3">
              <img
                src={user.avatar}
                alt={`Avatar de ${user.name}`}
                className="img-fluid rounded-circle"
                style={{ width: '120px', height: '120px', objectFit: 'cover', border: '2px solid #d2b48c' }}
              />
            </div>
          )}
          <p className="mb-1"><strong>Nombre:</strong> {user?.name}</p>
          <p className="mb-1"><strong>Email:</strong> {user?.email}</p>
          <p className="mb-1"><strong>ID:</strong> {user?.id}</p>
          <p className="mb-1"><strong>Rol:</strong> {user?.role}</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;