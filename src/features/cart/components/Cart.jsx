// src/features/cart/components/Cart.jsx
import React from 'react';
import { useCart } from '../hooks/CartContext'; 
import Swal from 'sweetalert2'; 
import 'animate.css';
import bandejaImage from '../../recetas/assets/bandeja.jpg';
import ajiacoImage from '../../recetas/assets/ajiaco.jpg';
import tamaleImage from '../../recetas/assets/tamale.jpg';
import sancochoImage from '../../recetas/assets/sancocho.jpg';

// Mapeo de nombres de imagen a módulos importados para evitar errores de ruta en CartItem
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
        cartRef // Referencia del carrito para cerrar al hacer click fuera
    } = useCart();

    // Función para manejar la compra
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
            clearCart(); // Vaciar el carrito después de una compra exitosa
            toggleCart(); // Cerrar el carrito después de la compra
        });
    };

    // Si el carrito está cerrado, no renderizar nada para optimizar
    if (!isOpen) return null;

    return (
        // Overlay para oscurecer el fondo y capturar clics fuera del carrito
        <div className="cart-overlay">
            {/* Sidebar del carrito */}
            <div className="cart-sidebar" ref={cartRef}>
                {/* Header del carrito */}
                <div className="cart-header">
                    <h3>
                        <i className="bi bi-cart3"></i> {/* Ícono de carrito de Bootstrap Icons */}
                        Carrito ({itemCount}) {/* Mostrar la cantidad total de ítems */}
                    </h3>
                    {/* Botón para cerrar el carrito con estilo personalizado */}
                    <button 
                        className="btn-close-cart" 
                        onClick={toggleCart} 
                        aria-label="Cerrar carrito"
                    >
                        <i className="bi bi-x-lg"></i> {/* Ícono de cierre */}
                    </button>
                </div>

                {/* Contenido principal del carrito */}
                <div className="cart-content">
                    {items.length === 0 ? (
                        // Estado cuando el carrito está vacío
                        <div className="empty-cart">
                            <i className="bi bi-cart-x display-4 text-muted"></i> {/* Ícono de carrito vacío */}
                            <p className="text-muted mt-3">Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <>
                            {/* Lista de productos en el carrito */}
                            <div className="cart-items">
                                {items.map(item => (
                                    <CartItem
                                        key={item.id} // Cada item necesita una key única
                                        item={item}
                                        onUpdateQuantity={updateQuantity} // Función para actualizar cantidad
                                        onRemove={removeFromCart} // Función para eliminar item
                                    />
                                ))}
                            </div>

                            {/* Footer con el total y las acciones (vaciar, comprar) */}
                            <div className="cart-footer">
                                <div className="cart-total">
                                    <h4>Total: ${total.toFixed(2)}</h4> {/* Mostrar total con 2 decimales */}
                                </div>
                                
                                <div className="cart-actions">
                                    {/* Botón para vaciar el carrito con estilo personalizado */}
                                    <button 
                                        className="btn-clear-cart"
                                        onClick={clearCart} 
                                        aria-label="Vaciar carrito"
                                    >
                                        <i className="bi bi-trash"></i> {/* Ícono de papelera */}
                                        Vaciar
                                    </button>
                                    {/* Botón para finalizar la compra con estilo personalizado */}
                                    <button 
                                        className="btn-checkout"
                                        onClick={handlePurchase} // <-- Llama a la nueva función handlePurchase
                                        aria-label="Finalizar compra"
                                    >
                                        <i className="bi bi-credit-card"></i> {/* Ícono de tarjeta de crédito */}
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

// Componente para cada producto individual dentro del carrito (sub-componente de Cart)
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    // Obtener la URL de la imagen usando el mapeo
    const imageUrl = imageMap[item.imagen] || 'https://placehold.co/150x150/cccccc/000000?text=Sin+Imagen';

    return (
        <div className="cart-item">
            {/* Imagen del producto */}
            <img 
                src={imageUrl} 
                alt={item.titulo} 
                className="cart-item-image"
                onError={(e) => { e.target.src = 'https://placehold.co/150x150/cccccc/000000?text=Error+Imagen'; }} // Fallback en caso de error
            />
            
            {/* Detalles del producto (título, precio, subtotal) */}
            <div className="cart-item-details">
                <h6 className="cart-item-title">{item.titulo}</h6> 
                <p className="cart-item-price">${item.precio.toFixed(2)}</p> 
                
                {/* Controles para cambiar la cantidad de este producto */}
                <div className="quantity-controls">
                    <button 
                        className="btn-qty-cart-control" // Estilo personalizado para el botón de cantidad
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} // Decrementar cantidad
                        disabled={item.quantity <= 1} // Deshabilitar si la cantidad es 1 o menos
                        aria-label={`Disminuir cantidad de ${item.titulo}`}
                    >
                        <i className="bi bi-dash"></i>
                    </button>
                    <span className="quantity">{item.quantity}</span> {/* Cantidad actual */}
                    <button 
                        className="btn-qty-cart-control" // Estilo personalizado para el botón de cantidad
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} // Incrementar cantidad
                        aria-label={`Aumentar cantidad de ${item.titulo}`}
                    >
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
                
                {/* Subtotal por producto */}
                <div className="item-total">
                    Subtotal: ${(item.precio * item.quantity).toFixed(2)}
                </div>
            </div>
            
            {/* Botón para eliminar este producto del carrito */}
            <button 
                className="btn-remove-item" // Estilo personalizado para el botón de eliminar
                onClick={() => onRemove(item.id)} // Eliminar el producto
                aria-label={`Eliminar ${item.titulo} del carrito`}
            >
                <i className="bi bi-x"></i>
            </button>
        </div>
    );
};