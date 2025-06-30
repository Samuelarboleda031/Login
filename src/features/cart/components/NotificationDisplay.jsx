// src/features/cart/components/NotificationDisplay.jsx
import React, { useEffect, useState } from 'react';
import { useNotification } from '../hooks/useNotification';

const NotificationDisplay = () => {
    const { currentNotification } = useNotification();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (currentNotification) {
            const timer = setTimeout(() => setIsVisible(true), 50);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [currentNotification]);

    if (!currentNotification) return null;

    const backgroundColor = {
        success: '#28a745',
        error: '#dc3545',
        info: '#007bff',
        warning: '#ffc107',
    }[currentNotification.type] || '#28a745';

    const notificationStyle = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10000,
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease-out',
        maxWidth: '300px',
        backgroundColor: backgroundColor,
    };

    return (
        <div style={notificationStyle}>
            {currentNotification.message}
        </div>
    );
};

export default NotificationDisplay; // <--- ¡Esta línea es CRUCIAL!