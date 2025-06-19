// src/features/recetas/pedidos/components/RecetaPedido.jsx
import React, { useState } from 'react';
// import Swal from 'sweetalert2'; // No necesitamos Swal para añadir al carrito
// import 'animate.css'; // Animate.css podría seguir siendo útil para otras animaciones, pero no para este botón

// Importar useCart del hook del carrito
import { useCart } from '../../../cart/hooks/CartContext'; 

// Importaciones de imágenes de las recetas
import bandejaImage from '../../assets/bandeja.jpg';
import ajiacoImage from '../../assets/ajiaco.jpg';
import tamaleImage from '../../assets/tamale.jpg';
import sancochoImage from '../../assets/sancocho.jpg';

// Mapeo de nombres de imagen a módulos importados para evitar errores de ruta
const imageMap = {
    'bandeja.jpg': bandejaImage,
    'ajiaco.jpg': ajiacoImage,
    'tamale.jpg': tamaleImage,
    'sancocho.jpg': sancochoImage,
};


function RecetaPedido({ id, nombre, descripcion, precio, imagen }) {
  // Usamos useCart para acceder a addToCart
  const { addToCart } = useCart();

  const [cantidad, setCantidad] = useState(1); // Empezamos en 1 unidad
  const [statusBtn, setStatusBtn] = useState(false); // Estado para el feedback visual del botón

  // Determinar la URL de la imagen de la receta
  const imageUrl = imageMap[imagen] || 'https://placehold.co/400x300/cccccc/000000?text=Sin+Imagen';

  const aumentarCantidad = () => {
    if (cantidad < 10) { // Limite a 10 unidades
      setCantidad(prevCantidad => prevCantidad + 1);
    }
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) { // Limite mínimo de 1 unidad
      setCantidad(prevCantidad => prevCantidad - 1);
    }
  };

  const manejarAñadirAlPedido = () => {
    if (cantidad > 0) {
      // Crear el objeto del producto para añadir al carrito
      const productToAdd = {
        id: id,
        titulo: nombre, // El nombre de la receta es el título del producto
        precio: precio || 0, // Asegurarse de que el precio sea un número
        imagen: imagen, // Nombre del archivo de imagen
        descripcion: descripcion // La descripción de la receta
      };
      
      // Añadir la cantidad seleccionada al carrito
      for (let i = 0; i < cantidad; i++) {
        addToCart(productToAdd);
      }

      // Feedback visual para el usuario
      setStatusBtn(true);
      setTimeout(() => {
        setStatusBtn(false);
        setCantidad(1); // Resetear la cantidad a 1 después de añadir
      }, 1000); // El botón vuelve a su estado normal después de 1 segundo
    }
  };

  return (
    <div className="receta-pedido-card flex flex-col items-center p-4 m-2 bg-gray-800 text-d2b48c rounded-lg shadow-xl border border-gray-700 w-full sm:w-64 md:w-72 lg:w-80">
      <img 
            src={imageUrl} 
            alt={nombre} 
            className="w-full h-48 object-cover rounded-md mb-4"
            onError={(e) => { e.target.src = 'https://placehold.co/400x300/cccccc/000000?text=Sin+Imagen'; }} // Fallback de imagen
        />
      <h3 className="text-xl font-bold text-center mb-2 overflow-hidden whitespace-nowrap text-ellipsis w-full">{nombre}</h3>
      <p className="text-sm text-gray-400 text-center mb-3 overflow-hidden text-ellipsis h-16">{descripcion}</p>
      <p className="text-2xl font-bold text-green-400 mb-4">${precio ? precio.toFixed(2) : 'N/A'}</p>
      <div className="control-cantidad flex items-center mb-4">
        <button
          onClick={disminuirCantidad}
          disabled={cantidad <= 1} // Deshabilita si la cantidad es 1 o menos
          className="btn-qty-control rounded-l-lg" // Usamos clase de estilo del carrito
        >
          -
        </button>
        <span className="mx-4 text-xl font-semibold text-white bg-gray-700 px-4 py-1 rounded-md">{cantidad}</span>
        <button
          onClick={aumentarCantidad}
          disabled={cantidad >= 10} // Deshabilita si la cantidad es 10 o más
          className="btn-qty-control rounded-r-lg" // Usamos clase de estilo del carrito
        >
          +
        </button>
      </div>
      <button
        onClick={manejarAñadirAlPedido}
        className={`
            btn-add-to-cart w-full 
            ${statusBtn ? 'btn-success-feedback' : ''} 
            mt-2
        `} // Usamos clases de estilo de las tarjetas de receta
        disabled={statusBtn} // Deshabilita el botón mientras muestra "Agregado"
      >
        {statusBtn ? (
            <>
                <i className="bi bi-check-circle-fill"></i> Agregado
            </>
        ) : (
            <>
                <i className="bi bi-cart-plus"></i> Añadir al Pedido
            </>
        )}
      </button>
    </div>
  );
}

export default RecetaPedido;