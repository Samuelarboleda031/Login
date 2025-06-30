// src/features/cart/hooks/useNotification.jsx
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification debe usarse dentro de NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);
    const timeoutRef = useRef(null);

    const showNotification = useCallback((message, type = 'success', duration = 3000) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setNotification({ message, type, id: Date.now() });

        timeoutRef.current = setTimeout(() => {
            setNotification(null);
        }, duration);
    }, []);

    const value = { showNotification, currentNotification: notification };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};