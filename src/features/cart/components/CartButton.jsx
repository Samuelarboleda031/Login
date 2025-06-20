import React from 'react';
import { useCart } from '../hooks/CartContext';

export const CartButton = () => {
    const { itemCount, toggleCart } = useCart();

    return (
        <button 
            id="cart-button"
            className="btn-cart-toggle position-relative ms-auto" 
            onClick={toggleCart}
            aria-label={`Carrito de compras con ${itemCount} productos`}
        >
            <i className="bi bi-cart3"></i>
            {itemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {itemCount}
                    <span className="visually-hidden">productos en el carrito</span>
                </span>
            )}
        </button>
    );
};