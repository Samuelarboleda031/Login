/*src/features/cart/components/CartButton.jsx*/
import React from 'react';
import { useCart } from '../hooks/CartContext';

export const CartButton = () => {
    const { itemCount, toggleCart } = useCart();

    return (
        <button
            className="btn btn-outline-light position-relative me-3"
            onClick={toggleCart}
        >
            <i className="bi bi-cart3"></i>
            {/* 🔢 Badge con cantidad (solo si hay productos) */}
            {itemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {itemCount}
                    <span className="visually-hidden">productos en el carrito</span>
                </span>
            )}
        </button>
    );
};