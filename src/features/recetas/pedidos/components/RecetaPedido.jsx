import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'animate.css';
import bandejaImage from '../../assets/bandeja.jpg';
import ajiacoImage from '../../assets/ajiaco.jpg';
import tamaleImage from '../../assets/tamale.jpg';
import sancochoImage from '../../assets/sancocho.jpg';

function RecetaPedido({ id, nombre, descripcion, precio, imagen }) {
  const [cantidad, setCantidad] = useState(0);
  const [estadoBoton, setEstadoBoton] = useState('Añadir al Pedido');

  let imageUrl;
  switch (imagen) {
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
      imageUrl = 'https://placehold.co/400x300/cccccc/000000?text=Sin+Imagen';
  }

  const aumentarCantidad = () => {
    if (cantidad < 10) {
      setCantidad(prevCantidad => prevCantidad + 1);
    }
  };

  const disminuirCantidad = () => {
    if (cantidad > 0) {
      setCantidad(prevCantidad => prevCantidad - 1);
    }
  };

  const manejarAñadirAlPedido = () => {
    if (cantidad > 0) {
      Swal.fire({
        icon: 'success',
        title: '¡Receta Añadida!',
        html: `Has añadido <b>${cantidad}</b> unidad(es) de <b>${nombre}</b> a tu pedido.`,
        confirmButtonText: 'Aceptar',
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      }).then(() => {
        setCantidad(0);
        setEstadoBoton('Añadir al Pedido');
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad Inválida',
        text: 'Por favor, selecciona al menos una unidad para añadir a tu pedido.',
        confirmButtonText: 'Aceptar',
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    }
  };

  return (
    <div className="receta-pedido-card flex flex-col items-center p-4 m-2 bg-gray-800 text-d2b48c rounded-lg shadow-xl border border-gray-700 w-full sm:w-64 md:w-72 lg:w-80">
      <img src={imageUrl} alt={nombre} className="w-full h-48 object-cover rounded-md mb-4"/>
      <h3 className="text-xl font-bold text-center mb-2 overflow-hidden whitespace-nowrap text-ellipsis w-full">{nombre}</h3>
      <p className="text-sm text-gray-400 text-center mb-3 overflow-hidden text-ellipsis h-16">{descripcion}</p>
      <p className="text-2xl font-bold text-green-400 mb-4">${precio ? precio.toFixed(2) : 'N/A'}</p>
      <div className="control-cantidad flex items-center mb-4">
        <button
          onClick={disminuirCantidad}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-l-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          -
        </button>
        <span className="mx-4 text-xl font-semibold text-white bg-gray-700 px-4 py-1 rounded-md">{cantidad}</span>
        <button
          onClick={aumentarCantidad}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          +
        </button>
      </div>
      <button
        onClick={manejarAñadirAlPedido}
        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        disabled={cantidad === 0}
      >
        {estadoBoton}
      </button>
    </div>
  );
}

export default RecetaPedido;