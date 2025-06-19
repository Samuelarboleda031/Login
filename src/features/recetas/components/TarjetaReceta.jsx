import React, { useState } from 'react';
import { useCart } from '../../cart/hooks/CartContext';
import bandejaImage from '../assets/bandeja.jpg';
import ajiacoImage from '../assets/ajiaco.jpg';
import tamaleImage from '../assets/tamale.jpg';
import sancochoImage from '../assets/sancocho.jpg';

function TarjetaReceta({ receta, onVerDetalle }) {
  const { addToCart } = useCart();

  const [count, setCount] = useState(1);
  const [statusBtn, setStatusBtn] = useState(false);

  const aumentarDisabled = count >= 10;
  const disminuirDisabled = count <= 1;

  const aumentarCantidad = () => {
    if (!aumentarDisabled) {
      setCount(count + 1);
    }
  };

  const disminuirCantidad = () => {
    if (!disminuirDisabled) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    const productToAdd = {
      id: receta.id,
      titulo: receta.titulo,
      precio: receta.precio,
      imagen: receta.imagen,
      descripcion: receta.ingredientes ? receta.ingredientes.join(', ') : 'Sin descripción',
    };
    
    for (let i = 0; i < count; i++) {
      addToCart(productToAdd);
    }
    
    setStatusBtn(true);
    setTimeout(() => {
      setStatusBtn(false);
      setCount(1);
    }, 1000);
  };

  let imageUrl;
  switch (receta.imagen) {
    case 'bandeja.jpg':
      imageUrl = bandejaImage;
      break;
    case 'ajiaco.jpg':
      imageUrl = ajiacoImage;
      break;
    case 'tamale.jpg':
      imageUrl = tamaleImage;
      break;
    case 'sancocho.jpg':
      imageUrl = sancochoImage;
      break;
    default:
      imageUrl = 'https://placehold.co/150/cccccc?Text=Sin+Imagen';
  }

  return (
    <div className="tarjeta-receta">
      <img src={imageUrl} alt={receta.titulo} className="tarjeta-receta-imagen" />
      <h3 className="tarjeta-receta-titulo">{receta.titulo}</h3>
      <p className="tarjeta-receta-precio">${receta.precio ? receta.precio.toFixed(2) : 'N/A'}</p>

      {/* 🔢 Selector de cantidad - Usamos clases personalizadas para el color */}
      <div className="quantity-section mb-3">
        <div className="d-flex justify-content-center align-items-center">
          <button 
            className="btn-qty-control" // Clase personalizada para los botones de cantidad
            onClick={disminuirCantidad}
            disabled={disminuirDisabled}
            aria-label="Disminuir cantidad"
          >
            <i className="bi bi-dash"></i>
          </button>
          <span className="mx-3 fw-bold">{count}</span>
          <button 
            className="btn-qty-control" // Clase personalizada para los botones de cantidad
            onClick={aumentarCantidad}
            disabled={aumentarDisabled}
            aria-label="Aumentar cantidad"
          >
            <i className="bi bi-plus"></i>
          </button>
        </div>
      </div>
      
      {/* 🛒 Botón agregar al carrito - Usamos clases personalizadas para el color */}
      <button 
        className={`btn-add-to-cart ${statusBtn ? 'btn-success-feedback' : ''} w-100 mt-2`} 
        onClick={handleAddToCart}
        disabled={statusBtn}
        aria-label="Agregar al carrito"
      >
        {statusBtn ? (
          <>
            <i className="bi bi-check"></i> Agregado
          </>
        ) : (
          <>
            <i className="bi bi-cart-plus"></i> Agregar al carrito
          </>
        )}
      </button>
    </div>
  );
}

export default TarjetaReceta;