// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Para los íconos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App.jsx'; // Tu componente App, que ahora envuelve todo

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Renderiza tu componente App */}
  </StrictMode>,
);
