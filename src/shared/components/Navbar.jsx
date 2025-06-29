import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartButton } from '../../features/cart/components/CartButton';

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={isAuthenticated ? '/dashboard' : '/login'}>
          Recetas App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/recetas">
                    Recetas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/formulario">
                    Formulario
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pedidos-recetas">
                    Pedidos
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center">
            {isAuthenticated && user && (
              <span className="navbar-text me-3">
                Hola, {user.name}
              </span>
            )}
            {isAuthenticated && <CartButton />}
            {isAuthenticated && (
              <button className="btn btn-outline-danger ms-2" onClick={handleLogoutClick}>
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;