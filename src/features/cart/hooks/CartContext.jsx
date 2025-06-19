// src/features/cart/hooks/CartContext.jsx
import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react';
import { useNotification } from './useNotification'; // Importar el hook de notificaciones

// Definir las acciones que puede hacer el carrito
const CART_ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM', 
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    TOGGLE_CART: 'TOGGLE_CART'
};

// Estado inicial del carrito
const initialState = {
    items: [],           // Array de productos en el carrito
    isOpen: false,       // Booleano que indica si el carrito está abierto o cerrado
    total: 0,            // Monto total en dinero de los productos en el carrito
    itemCount: 0         // Cantidad total de productos individuales en el carrito
};

// Reducer: función que maneja los cambios de estado del carrito
function cartReducer(state, action) {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM: {
            // Buscar si el producto ya existe en el carrito
            const existingItem = state.items.find(item => item.id === action.payload.id);
            
            let newItems;
            if (existingItem) {
                // Si el producto ya existe, aumentar su cantidad
                newItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si el producto no existe, agregarlo con una cantidad inicial de 1
                newItems = [...state.items, { ...action.payload, quantity: 1 }];
            }

            // Recalcular el total y la cantidad de ítems después de la adición/actualización
            const total = newItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0); // Usar item.precio
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return {
                ...state,
                items: newItems,
                total: parseFloat(total.toFixed(2)), // Asegurar que el total tenga 2 decimales
                itemCount
            };
        }

        case CART_ACTIONS.REMOVE_ITEM: {
            // Filtrar el ítem a eliminar por su ID
            const newItems = state.items.filter(item => item.id !== action.payload);
            
            // Recalcular el total y la cantidad de ítems después de la eliminación
            const total = newItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0); // Usar item.precio
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return {
                ...state,
                items: newItems,
                total: parseFloat(total.toFixed(2)),
                itemCount
            };
        }

        case CART_ACTIONS.UPDATE_QUANTITY: {
            const { id, quantity } = action.payload;
            
            // Si la cantidad es 0 o menor, eliminar el producto del carrito
            if (quantity <= 0) {
                return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: id });
            }

            // Actualizar la cantidad de un ítem existente
            const newItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );

            // Recalcular el total y la cantidad de ítems después de la actualización
            const total = newItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0); // Usar item.precio
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return {
                ...state,
                items: newItems,
                total: parseFloat(total.toFixed(2)),
                itemCount
            };
        }

        case CART_ACTIONS.CLEAR_CART:
            // Vaciar completamente el carrito y resetear los valores
            return {
                ...state,
                items: [],
                total: 0,
                itemCount: 0
            };

        case CART_ACTIONS.TOGGLE_CART:
            // Alternar el estado de apertura/cierre del carrito
            return {
                ...state,
                isOpen: !state.isOpen
            };

        default:
            // En caso de una acción desconocida, devolver el estado actual
            return state;
    }
}

// Crear el contexto de React para el carrito
export const CartContext = createContext();

// Hook personalizado para acceder fácilmente al contexto del carrito
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        // Lanzar un error si useCart no se usa dentro de un CartProvider
        throw new Error('useCart debe usarse dentro de CartProvider');
    }
    return context;
};

// Componente proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const cartRef = useRef(null);              // Referencia al div del carrito para detectar clics fuera
    const timeoutRef = useRef(null);           // Referencia para gestionar los timeouts de auto-cierre del carrito
    const { showNotification } = useNotification(); // Hook para mostrar notificaciones

    // Efecto para cerrar el carrito al hacer clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Obtener la referencia al botón del carrito (por su ID)
            const cartButton = document.getElementById('cart-button'); 
            
            // Si se hizo clic fuera del carrito y no en el botón que lo abre/cierra
            if (cartRef.current && !cartRef.current.contains(event.target) && (!cartButton || !cartButton.contains(event.target))) {
                dispatch({ type: CART_ACTIONS.TOGGLE_CART }); // Cerrar el carrito
            }
        };

        if (state.isOpen) {
            // Añadir el event listener cuando el carrito está abierto
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            // Limpiar el event listener cuando el componente se desmonte o el carrito se cierre
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [state.isOpen]); // Dependencia: solo se ejecuta cuando isOpen cambia

    // Función para añadir un producto al carrito
    const addToCart = (product) => {
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
        
        // Mostrar notificación de éxito
        showNotification(`${product.titulo} agregado al carrito`, 'success', 2000); // Usar product.titulo
        
        // Limpiar cualquier timeout anterior para evitar cierres prematuros
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        // Si el carrito no está abierto, auto-abrirlo por 2 segundos
        if (!state.isOpen) {
            dispatch({ type: CART_ACTIONS.TOGGLE_CART });
            timeoutRef.current = setTimeout(() => {
                dispatch({ type: CART_ACTIONS.TOGGLE_CART }); // Auto-cerrar después de 2 segundos
            }, 2000);
        }
    };

    // Función para eliminar un producto del carrito por su ID
    const removeFromCart = (productId) => {
        dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
        showNotification('Producto eliminado del carrito', 'info', 1500); // Notificación de eliminación
    };

    // Función para actualizar la cantidad de un producto en el carrito
    const updateQuantity = (productId, quantity) => {
        dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
    };

    // Función para vaciar completamente el carrito
    const clearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
        showNotification('Carrito vaciado', 'info', 1500); // Notificación de carrito vaciado
    };

    // Función para alternar la visibilidad del carrito (abrir/cerrar)
    const toggleCart = () => {
        // Limpiar el timeout si el usuario cierra manualmente el carrito antes de que se auto-cierre
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        dispatch({ type: CART_ACTIONS.TOGGLE_CART });
    };

    // Valor que se comparte con toda la aplicación a través del contexto
    const value = {
        ...state,           // Incluye items, isOpen, total, itemCount
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        cartRef
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
