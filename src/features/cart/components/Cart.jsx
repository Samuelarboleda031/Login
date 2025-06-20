import React from 'react';
import { useCart } from '../hooks/CartContext'; 
import Swal from 'sweetalert2'; 
import 'animate.css';
import bandejaImage from '../../recetas/assets/bandeja.jpg';
import ajiacoImage from '../../recetas/assets/ajiaco.jpg';
import tamaleImage from '../../recetas/assets/tamale.jpg';
import sancochoImage from '../../recetas/assets/sancocho.jpg';

const imageMap = {
    'bandeja.jpg': bandejaImage,
    'ajiaco.jpg': ajiacoImage,
    'tamale.jpg': tamaleImage,
    'sancocho.jpg': sancochoImage,
};

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

    const handlePurchase = () => {
        if (itemCount === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Carrito vacío',
                text: 'No hay productos en el carrito para realizar la compra.',
                confirmButtonText: 'Aceptar',
                showClass: {
                    popup: `animate__animated animate__fadeInUp animate__faster`
                },
                hideClass: {
                    popup: `animate__animated animate__fadeOutDown animate__faster`
                }
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: '¡Compra Exitosa!',
            html: `Tu pedido por un total de <b>$${total.toFixed(2)}</b> ha sido realizado.`,
            confirmButtonText: 'Aceptar',
            showClass: {
                popup: `animate__animated animate__fadeInUp animate__faster`
            },
            hideClass: {
                popup: `animate__animated animate__fadeOutDown animate__faster`
            }
        }).then(() => {
            clearCart(); 
            toggleCart(); 
        });
    };

    if (!isOpen) return null;

    return (
        <div className="cart-overlay">
            <div className="cart-sidebar" ref={cartRef}>
                <div className="cart-header">
                    <h3>
                        <i className="bi bi-cart3"></i> 
                        Carrito ({itemCount}) 
                    </h3>
                    <button 
                        className="btn-close-cart" 
                        onClick={toggleCart} 
                        aria-label="Cerrar carrito"
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
                                    <h4>Total: ${total.toFixed(2)}</h4> 
                                </div>
                                
                                <div className="cart-actions">
                                    <button 
                                        className="btn-clear-cart"
                                        onClick={clearCart} 
                                        aria-label="Vaciar carrito"
                                    >
                                        <i className="bi bi-trash"></i> 
                                        Vaciar
                                    </button>
                                    <button 
                                        className="btn-checkout"
                                        onClick={handlePurchase} 
                                        aria-label="Finalizar compra"
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
    const imageUrl = imageMap[item.imagen] || 'https://placehold.co/150x150/cccccc/000000?text=Sin+Imagen';

    return (
        <div className="cart-item">
            <img 
                src={imageUrl} 
                alt={item.titulo} 
                className="cart-item-image"
                onError={(e) => { e.target.src = 'https://placehold.co/150x150/cccccc/000000?text=Error+Imagen'; }} 
            />
            
            <div className="cart-item-details">
                <h6 className="cart-item-title">{item.titulo}</h6> 
                <p className="cart-item-price">${item.precio.toFixed(2)}</p> 
                
                <div className="quantity-controls">
                    <button 
                        className="btn-qty-cart-control" 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
                        disabled={item.quantity <= 1} 
                        aria-label={`Disminuir cantidad de ${item.titulo}`}
                    >
                        <i className="bi bi-dash"></i>
                    </button>
                    <span className="quantity">{item.quantity}</span> 
                    <button 
                        className="btn-qty-cart-control" 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
                        aria-label={`Aumentar cantidad de ${item.titulo}`}
                    >
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
                
                <div className="item-total">
                    Subtotal: ${(item.precio * item.quantity).toFixed(2)}
                </div>
            </div>
            
            <button 
                className="btn-remove-item" 
                onClick={() => onRemove(item.id)} 
                aria-label={`Eliminar ${item.titulo} del carrito`}
            >
                <i className="bi bi-x"></i>
            </button>
        </div>
    );
};