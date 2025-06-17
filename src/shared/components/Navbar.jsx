import React from 'react';

function Navbar({ onNavigate }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="#" className="navbar-link" onClick={() => onNavigate('pedidos-recetas')}>Inicio</a>
        </li>
        <li className="navbar-item">
          <a href="#" className="navbar-link" onClick={() => onNavigate('formulario')}>Formulario</a>
        </li>
        <li className="navbar-item">
          <a href="#" className="navbar-link" onClick={() => onNavigate('recetas')}>Recetas</a>
        </li>
        <li className="navbar-item">
          <a href="#" className="navbar-link" onClick={() => onNavigate('pedidos-recetas')}>Pedidos de Recetas</a>
        </li>
        <li className="navbar-item">
          <a href="#" className="navbar-link" onClick={() => onNavigate('categorias')}>Categorías</a>
        </li>
        <li className="navbar-item">
          <a href="#" className="navbar-link" onClick={() => onNavigate('contacto')}>Contacto</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
