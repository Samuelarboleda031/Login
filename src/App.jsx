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
import './shared/styles/estiloLanding.css';

function App() {
    const [currentPage, setCurrentPage] = useState('recetas');
    const [recetas, setRecetas] = useState(recetasData);

    const handleVerDetalle = (id) => {
        console.log(`Receta ${id} clickeada.`);
    };

    const renderMainContent = () => {
        if (currentPage === 'formulario') {
            return <Formulario />;
        } else if (currentPage === 'pedidos-recetas') {
            return <RecetasParaPedir />;
        } else if (currentPage === 'recetas') {
            return (
                <div className="main-content-wrapper">
                    <div className="contenido-principal">
                        <ListaRecetas recetas={recetas} onVerDetalle={handleVerDetalle} />
                    </div>
                    <img src={imagenVertical} alt="Imagen Vertical" className="imagen-derecha" />
                </div>
            );
        } else {
            return <p className="text-center mt-5">Contenido no encontrado.</p>;
        }
    };

    return (
        <RecetaProvider>
            <CartProvider>
                <div className="App">
                    <Navbar onNavigate={setCurrentPage} />
                    <Header />
                    {renderMainContent()}
                    <Footer />
                    <Cart />
                </div>
            </CartProvider>
        </RecetaProvider>
    );
}

export default App;