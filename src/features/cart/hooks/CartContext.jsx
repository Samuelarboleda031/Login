import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react';
import { useNotification } from './useCart';

const CART_ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    TOGGLE_CART: 'TOGGLE_CART'
};

const initialState = {
    items: [],
    isOpen: false,
    total: 0,
    itemCount: 0
};

function cartReducer(state, action) {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM: {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            let newItems;
            if (existingItem) {
                newItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newItems = [...state.items, { ...action.payload, quantity: 1 }];
            }

            const total = newItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return {
                ...state,
                items: newItems,
                total: parseFloat(total.toFixed(2)),
                itemCount
            };
        }

        case CART_ACTIONS.REMOVE_ITEM: {
            const newItems = state.items.filter(item => item.id !== action.payload);

            const total = newItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
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

            if (quantity <= 0) {
                return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: id });
            }

            const newItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );

            const total = newItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
            const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

            return {
                ...state,
                items: newItems,
                total: parseFloat(total.toFixed(2)),
                itemCount
            };
        }

        case CART_ACTIONS.CLEAR_CART:
            return {
                ...state,
                items: [],
                total: 0,
                itemCount: 0
            };

        case CART_ACTIONS.TOGGLE_CART:
            return {
                ...state,
                isOpen: !state.isOpen
            };

        default:
            return state;
    }
}

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const cartRef = useRef(null);
    const timeoutRef = useRef(null);
    const { showNotification } = useNotification();

    useEffect(() => {
        const handleClickOutside = (event) => {
            const cartButton = document.getElementById('cart-button');

            if (cartRef.current && !cartRef.current.contains(event.target) && (!cartButton || !cartButton.contains(event.target))) {
                dispatch({ type: CART_ACTIONS.TOGGLE_CART });
            }
        };

        if (state.isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [state.isOpen]);

    const addToCart = (product) => {
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });

        showNotification(`${product.titulo} agregado al carrito`, 'success', 2000);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (!state.isOpen) {
            dispatch({ type: CART_ACTIONS.TOGGLE_CART });
            timeoutRef.current = setTimeout(() => {
                dispatch({ type: CART_ACTIONS.TOGGLE_CART });
            }, 2000);
        }
    };

    const removeFromCart = (productId) => {
        dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
        showNotification('Producto eliminado del carrito', 'info', 1500);
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
        showNotification('Carrito vaciado', 'info', 1500);
    };

    const toggleCart = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        dispatch({ type: CART_ACTIONS.TOGGLE_CART });
    };

    const value = {
        ...state,
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
