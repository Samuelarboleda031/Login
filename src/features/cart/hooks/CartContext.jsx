import React, { createContext, useContext, useReducer, useRef } from 'react';

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
            const { product, quantity = 1 } = action.payload;

            console.log("CartReducer - ADD_ITEM: Producto recibido:", product, "Cantidad:", quantity);

            const existingItem = state.items.find(item => item.id === product.id);

            let newItems;
            if (existingItem) {
                newItems = state.items.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                newItems = [...state.items, { ...product, quantity }];
            }

            const total = newItems.reduce((sum, item) => {
                const itemPrice = parseFloat(item.price);
                const itemQuantity = parseInt(item.quantity);

                if (isNaN(itemPrice) || isNaN(itemQuantity)) {
                    console.error("CartReducer - ERROR: Precio o cantidad de item no son números. Item:", item);
                    return sum;
                }
                const subtotal = itemPrice * itemQuantity;
                console.log(`Item: ${item.title}, Precio: ${itemPrice}, Cantidad: ${itemQuantity}, Subtotal Item: ${subtotal}`);
                return sum + subtotal;
            }, 0);
            const itemCount = newItems.reduce((sum, item) => sum + parseInt(item.quantity || 0), 0);

            console.log("CartReducer - Nuevo Estado Calculado: Total:", total, "Cantidad Items:", itemCount);

            return {
                ...state,
                items: newItems,
                total: parseFloat(total.toFixed(2)),
                itemCount
            };
        }

        case CART_ACTIONS.REMOVE_ITEM: {
            const newItems = state.items.filter(item => item.id !== action.payload);
            const total = newItems.reduce((sum, item) => {
                const itemPrice = parseFloat(item.price);
                const itemQuantity = parseInt(item.quantity);
                if (isNaN(itemPrice) || isNaN(itemQuantity)) return sum;
                return sum + (itemPrice * itemQuantity);
            }, 0);
            const itemCount = newItems.reduce((sum, item) => sum + parseInt(item.quantity || 0), 0);

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
                item.id === id ? { ...item, quantity: parseInt(quantity) } : item
            );

            const total = newItems.reduce((sum, item) => {
                const itemPrice = parseFloat(item.price);
                const itemQuantity = parseInt(item.quantity);
                if (isNaN(itemPrice) || isNaN(itemQuantity)) return sum;
                return sum + (itemPrice * itemQuantity);
            }, 0);
            const itemCount = newItems.reduce((sum, item) => sum + parseInt(item.quantity || 0), 0);

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
            console.log("toggleCart llamado. Estado actual:", state.isOpen);
            const newIsOpenState = !state.isOpen;
            console.log("Nuevo estado isOpen:", newIsOpenState);
            return {
                ...state,
                isOpen: newIsOpenState
            };

        default:
            return state;
    }
}

const CartContext = createContext();

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

    const addToCart = (product, quantity = 1) => {
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity } });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
    };

    const toggleCart = () => {
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