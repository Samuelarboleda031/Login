import React, { useEffect } from 'react';
import { createBrowserRouter, Outlet, Navigate, RouterProvider } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from './features/auth/pages/LoginPage';
import DashboardPage from './features/auth/pages/DashboardPage';
import ListaRecetas from './features/recetas/components/ListaRecetas';
import Formulario from './features/recetas/components/Formulario';
import RecetasParaPedir from './features/recetas/pedidos/components/RecetasParaPedir';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';
import Header from './shared/components/Header';
import { selectIsAuthenticated, selectUser } from './features/auth/slices/authSelectors';
import { useAuth } from './features/auth/hooks/useAuth';
import { setAuthFromStorage, logout as authSliceLogout } from './features/auth/slices/authSlice';

import { CartProvider } from './features/cart/hooks/CartContext';
import { RecetaProvider } from './shared/contexts/RecetaContext';
import { Cart } from './features/cart/components/Cart';
import { NotificationProvider } from './features/cart/hooks/useNotification'; // Importar NotificationProvider
import NotificationDisplay from './features/cart/components/NotificationDisplay'; // Importar NotificationDisplay


const RootLayout = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const { logout: authLogout } = useAuth();

    useEffect(() => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        fetch('https://api.escuelajs.co/api/v1/auth/profile', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Token inválido o expirado.');
        })
        .then(userProfile => {
          dispatch(setAuthFromStorage({ token: storedToken, user: userProfile }));
        })
        .catch(error => {
          console.error('Error al restaurar sesión:', error);
          dispatch(authSliceLogout());
          localStorage.removeItem('authToken');
        });
      }
    }, [dispatch]);

    return (
        // NotificationProvider debe envolver todo para que las notificaciones estén disponibles
        <NotificationProvider>
            <RecetaProvider>
                <CartProvider>
                    <div className="App">
                        <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={authLogout} />
                        <Header />
                        <main className="main-content-wrapper">
                            <Outlet />
                        </main>
                        <Footer />
                        <Cart />
                        <NotificationDisplay /> {/* Componente para mostrar las notificaciones */}
                    </div>
                </CartProvider>
            </RecetaProvider>
        </NotificationProvider>
    );
};

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const { isLoading } = useAuth();

    if (isLoading) {
      return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>Cargando autenticación...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/login" replace />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'recetas',
                element: (
                    <ListaRecetas />
                ),
            },
            {
                path: 'formulario',
                element: (
                    <ProtectedRoute>
                        <Formulario />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'pedidos-recetas',
                element: (
                    <ProtectedRoute>
                        <RecetasParaPedir />
                    </ProtectedRoute>
                ),
            },
            {
                path: '*',
                element: <div>404 - Página no encontrada</div>,
            },
        ],
    },
]);

export default router;