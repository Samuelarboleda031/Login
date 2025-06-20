import React, { useState } from 'react';
import { useCart } from '../../../cart/hooks/CartContext';
import bandejaImage from '../../assets/bandeja.jpg';
import ajiacoImage from '../../assets/ajiaco.jpg';
import tamaleImage from '../../assets/tamale.jpg';
import sancochoImage from '../../assets/sancocho.jpg';

const imageMap = {
    'bandeja.jpg': bandejaImage,
    'ajiaco.jpg': ajiacoImage,
    'tamale.jpg': tamaleImage,
    'sancocho.jpg': sancochoImage,
};


function RecetaPedido({ id, nombre, descripcion, precio, imagen }) {
    const { addToCart } = useCart();

    const [cantidad, setCantidad] = useState(1);
    const [statusBtn, setStatusBtn] = useState(false);

    const imageUrl = imageMap[imagen] || 'https://placehold.co/400x300/cccccc/000000?text=Sin+Imagen';

    const aumentarCantidad = () => {
        if (cantidad < 10) {
            setCantidad(prevCantidad => prevCantidad + 1);
        }
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(prevCantidad => prevCantidad - 1);
        }
    };

    const manejarAñadirAlPedido = () => {
        if (cantidad > 0) {
            const productToAdd = {
                id: id,
                titulo: nombre,
                precio: precio || 0,
                imagen: imagen,
                descripcion: descripcion
            };

            for (let i = 0; i < cantidad; i++) {
                addToCart(productToAdd);
            }

            setStatusBtn(true);
            setTimeout(() => {
                setStatusBtn(false);
                setCantidad(1);
            }, 1000);
        }
    };

    return (
        <div className="receta-pedido-card flex flex-col items-center p-4 m-2 bg-gray-800 text-d2b48c rounded-lg shadow-xl border border-gray-700 w-full sm:w-64 md:w-72 lg:w-80">
            <img
                src={imageUrl}
                alt={nombre}
                className="w-full h-48 object-cover rounded-md mb-4"
                onError={(e) => { e.target.src = 'https://placehold.co/400x300/cccccc/000000?text=Sin+Imagen'; }}
            />
            <h3 className="text-xl font-bold text-center mb-2 overflow-hidden whitespace-nowrap text-ellipsis w-full">{nombre}</h3>
            <p className="text-sm text-gray-400 text-center mb-3 overflow-hidden text-ellipsis h-16">{descripcion}</p>
            <p className="text-2xl font-bold text-green-400 mb-4">${precio ? precio.toFixed(2) : 'N/A'}</p>
            <div className="control-cantidad flex items-center mb-4">
                <button
                    onClick={disminuirCantidad}
                    disabled={cantidad <= 1}
                    className="btn-qty-control rounded-l-lg"
                >
                    -
                </button>
                <span className="mx-4 text-xl font-semibold text-white bg-gray-700 px-4 py-1 rounded-md">{cantidad}</span>
                <button
                    onClick={aumentarCantidad}
                    disabled={cantidad >= 10}
                    className="btn-qty-control rounded-r-lg"
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
                `}
                disabled={statusBtn}
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