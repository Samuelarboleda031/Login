// src/App.jsx
import React, { useState } from 'react';
import imagenVertical from './shared/assets/imagenVertical.jpg';
import ListaRecetas from './features/recetas/components/ListaRecetas';
import Formulario from './features/recetas/components/Formulario';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';
import Header from './shared/components/Header';
import RecetasParaPedir from "./features/recetas/pedidos/components/RecetasParaPedir";
import { RecetaProvider } from './shared/contexts/RecetaContext';
import recetasData from './features/recetas/data/recetas';
import { CartProvider } from './features/cart/hooks/CartContext';
import { Cart } from './features/cart/components/Cart';

import 'animate.css';
import './shared/styles/App.css';
import './shared/styles/estiloLanding.css'; // Asegurarse de importar tus estilos de landing/carrito aquí

function App() {
  // Cambiamos el estado inicial de 'currentPage' de 'pedidos-recetas' a 'recetas'
  const [currentPage, setCurrentPage] = useState('recetas'); 
  const [recetas, setRecetas] = useState(recetasData); // Tus recetas principales

  const handleVerDetalle = (id) => {
    console.log(`Receta ${id} clickeada.`);
    // Aquí podrías implementar la lógica para ver el detalle de una receta
    // Por ejemplo, cambiar el estado a una página de detalle de receta
  };

  const renderMainContent = () => {
    if (currentPage === 'formulario') {
      return <Formulario />;
    } else if (currentPage === 'pedidos-recetas') {
      return <RecetasParaPedir />;
    } else if (currentPage === 'recetas') { // Mostrar ListaRecetas para la página 'recetas'
      return (
        <div className="main-content-wrapper">
          <div className="contenido-principal">
            {/* Aquí TarjetaReceta ahora tiene la lógica de carrito */}
            <ListaRecetas recetas={recetas} onVerDetalle={handleVerDetalle} />
          </div>
          <img src={imagenVertical} alt="Imagen Vertical" className="imagen-derecha" />
        </div>
      );
    } else {
      // Si no coincide con ninguna página, puedes mostrar un default o error
      return <p className="text-center mt-5">Contenido no encontrado.</p>;
    }
  };

  return (
    <RecetaProvider> {/* Tu proveedor de contexto de recetas */}
      <CartProvider> {/* Envuelve toda la aplicación con CartProvider */}
        <div className="App">
          <Navbar onNavigate={setCurrentPage} />
          <Header /> {/* Tu Header simple */}
          {renderMainContent()}
          <Footer />
          <Cart /> {}
        </div>
      </CartProvider>
    </RecetaProvider>
  );
}

export default App;