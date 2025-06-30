import React, { useState } from 'react';
import { useCart } from '../../cart/hooks/CartContext';
import { useNotification } from '../../cart/hooks/useNotification';

import bandejaImage from '../assets/bandeja.jpg';
import ajiacoImage from '../assets/ajiaco.jpg';
import tamaleImage from '../assets/tamale.jpg';
import sancochoImage from '../assets/sancocho.jpg';

function TarjetaReceta({ receta, onVerDetalle }) {
    const { addToCart } = useCart();
    const { showNotification } = useNotification();

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
        // Asegurarse de que el precio sea un número flotante ANTES de pasarlo
        const numericPrice = parseFloat(receta.precio);

        console.log("TarjetaReceta - Precio de receta original:", receta.precio, "Precio numérico:", numericPrice);

        if (isNaN(numericPrice)) {
            console.error("Error: El precio del producto no es un número válido. Producto ID:", receta.id, "Precio:", receta.precio);
            showNotification('Error: El precio del producto no es válido.', 'error', 3000);
            return;
        }

        const productToAdd = {
            id: receta.id,
            title: receta.titulo, // Usar 'title' para el carrito
            price: numericPrice,  // Usar el precio ya convertido a número
            image: getImageUrl(receta.imagen),
            description: receta.ingredientes ? receta.ingredientes.join(', ') : 'Sin descripción',
            category: receta.categoria || 'General',
        };

        addToCart(productToAdd, count);
        showNotification(`${count}x ${receta.titulo} agregado al carrito`, 'success', 2000);

        setStatusBtn(true);
        setTimeout(() => {
            setStatusBtn(false);
            setCount(1);
        }, 1000);
    };

    const getImageUrl = (imageName) => {
        switch (imageName) {
            case 'bandeja.jpg':
                return bandejaImage;
            case 'ajiaco.jpg':
                return ajiacoImage;
            case 'tamale.jpg':
                return tamaleImage;
            case 'sancocho.jpg':
                return sancochoImage;
            default:
                return 'https://placehold.co/150/cccccc/000000?text=Sin+Imagen';
        }
    };

    const displayPrice = parseFloat(receta.precio)?.toFixed(2) || 'N/A'; // Asegurar formato de display

    return (
        <div className="tarjeta-receta">
            <img src={getImageUrl(receta.imagen)} alt={receta.titulo} className="tarjeta-receta-imagen" />
            <h3 className="tarjeta-receta-titulo">{receta.titulo}</h3>
            <p className="tarjeta-receta-precio">${displayPrice}</p>

            <div className="quantity-section mb-3">
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        className="btn-qty-control"
                        onClick={disminuirCantidad}
                        disabled={disminuirDisabled}
                        aria-label="Disminuir cantidad"
                    >
                        <i className="bi bi-dash"></i>
                    </button>
                    <span className="mx-3 fw-bold">{count}</span>
                    <button
                        className="btn-qty-control"
                        onClick={aumentarCantidad}
                        disabled={aumentarDisabled}
                        aria-label="Aumentar cantidad"
                    >
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
            </div>

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