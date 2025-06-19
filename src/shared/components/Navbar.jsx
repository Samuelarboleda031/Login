// src/shared/components/Navbar.jsx
import React from 'react';
import { CartButton } from '../../features/cart/components/CartButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Navbar({ onNavigate }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom-bg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={() => onNavigate('pedidos-recetas')}>
          Mi Libro de Recetas
        </a>
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
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => onNavigate('recetas')}>Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => onNavigate('formulario')}>Formulario</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => onNavigate('recetas')}>Recetas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => onNavigate('pedidos-recetas')}>Pedidos de Recetas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => onNavigate('categorias')}>Categorías</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => onNavigate('contacto')}>Contacto</a>
            </li>
          </ul>
          <CartButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;