// src/features/cart/components/Cart.jsx
import React, { useEffect } from 'react';
import { useCart } from '../hooks/CartContext';
import { useNotification } from '../hooks/useNotification'; // Asegúrate de importar useNotification

export const Cart = () => {
    const {
        items,
        isOpen,
        total,
        itemCount,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        cartRef
    } = useCart();

    const { showNotification } = useNotification(); // Hook para mostrar notificaciones

    // Este useEffect debe ir después de todas las llamadas a Hooks, y antes del return condicional
    useEffect(() => {
        const handleOverlayClick = (event) => {
            // Verifica que el clic fue en el overlay y no dentro del sidebar
            if (isOpen && cartRef.current && !cartRef.current.contains(event.target) && event.target.classList.contains('cart-overlay')) {
                toggleCart();
            }
        };

        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, [isOpen, toggleCart, cartRef]);

    // Si el carrito está cerrado, no renderizar nada
    if (!isOpen) return null;

    return (
        <div className="cart-overlay open" onClick={(e) => {
            if (e.target === e.currentTarget) {
                toggleCart();
            }
        }}>
            <div className="cart-sidebar" ref={cartRef}>
                <div className="cart-header">
                    <h3>
                        <i className="bi bi-cart3"></i>
                        Carrito ({itemCount})
                    </h3>
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={toggleCart}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="cart-content">
                    {items.length === 0 ? (
                        <div className="empty-cart">
                            <i className="bi bi-cart-x display-4 text-muted"></i>
                            <p className="text-muted mt-3">Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {items.map(item => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdateQuantity={updateQuantity}
                                        onRemove={removeFromCart}
                                    />
                                ))}
                            </div>

                            <div className="cart-footer">
                                <div className="cart-total">
                                    <h4>Total: ${total?.toFixed(2)}</h4> {/* Asegurar formato de 2 decimales */}
                                </div>

                                <div className="cart-actions">
                                    <button
                                        className="btn btn-outline-danger btn-sm me-2"
                                        onClick={() => {
                                            clearCart();
                                            showNotification('Carrito vaciado', 'info', 1500); // Notificación al vaciar
                                        }}
                                    >
                                        <i className="bi bi-trash"></i>
                                        Vaciar
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            // Lógica para el botón "Comprar"
                                            showNotification('¡Compra completada con éxito!', 'success', 3000); // Notificación
                                            clearCart(); // Vaciar el carrito
                                            toggleCart(); // Opcional: cerrar el carrito después de la compra
                                        }}
                                    >
                                        <i className="bi bi-credit-card"></i>
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="cart-item">
            <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
            />
            <div className="cart-item-details">
                <h6 className="cart-item-title">{item.title}</h6>
                <p className="cart-item-price">${item.price?.toFixed(2)}</p>
                <div className="quantity-controls">
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                        <i className="bi bi-dash"></i>
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
                <div className="item-total">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
            <button
                className="btn btn-outline-danger btn-sm remove-btn"
                onClick={() => onRemove(item.id)}
            >
                <i className="bi bi-x"></i>
            </button>
        </div>
    );
};