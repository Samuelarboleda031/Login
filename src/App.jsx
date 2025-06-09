import React, { useState } from 'react';
import imagenVertical from './assets/imagenVertical.jpg';
import ListaRecetas from './componentes/ListaRecetas';
import Formulario from './componentes/Formulario'; 
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import Header from './componentes/Header';
import RecetasParaPedir from './componentes/RecetasParaPedir';
import { RecetaProvider } from './RecetaContext';
import recetasData from './data/recetas'; 
import 'animate.css';
import './App.css';

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