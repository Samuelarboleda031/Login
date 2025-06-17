import React, { useState } from 'react';
import imagenVertical from './shared/assets/imagenVertical.jpg';
import ListaRecetas from './features/recetas/components/ListaRecetas';
import Formulario from './features/recetas/components/Formulario';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';
import Header from './shared/components/Header';
import RecetasParaPedir from './features/pedidos/components/RecetasParaPedir';
import { RecetaProvider } from './shared/contexts/RecetaContext';
import recetasData from './features/recetas/data/recetas';
import 'animate.css';
import './shared/styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('pedidos-recetas');
  const [recetas, setRecetas] = useState(recetasData);

  const handleVerDetalle = (id) => {
    console.log(`Receta ${id} clickeada.`);
  };

  const renderMainContent = () => {
    if (currentPage === 'formulario') {
      return <Formulario />;
    } else if (currentPage === 'pedidos-recetas') {
      return <RecetasParaPedir />;
    } else {
      return (
        <div className="main-content-wrapper">
          <div className="contenido-principal">
            <ListaRecetas recetas={recetas} onVerDetalle={handleVerDetalle} />
          </div>
          <img src={imagenVertical} alt="Imagen Vertical" className="imagen-derecha" />
        </div>
      );
    }
  };

  return (
    <RecetaProvider>
      <div className="App">
        <Navbar onNavigate={setCurrentPage} />
        <Header />
        {renderMainContent()}
        <Footer />
      </div>
    </RecetaProvider>
  );
}

export default App;