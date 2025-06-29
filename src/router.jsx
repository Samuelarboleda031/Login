import React from 'react';
import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

import { CartProvider } from './features/cart/hooks/CartContext';
import { RecetaProvider } from './shared/contexts/RecetaContext';
import { Cart } from './features/cart/components/Cart';


const RootLayout = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const { logout: authLogout } = useAuth();

    const isLoginPage = window.location.pathname === '/login' || window.location.pathname === '/';

    return (
        <RecetaProvider>
            <CartProvider>
                <div className="App">
                    <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={authLogout} />

                    {!isLoginPage && <Header />}

                    <main className="main-content-wrapper">
                        <Outlet />
                    </main>

                    {!isLoginPage && <Footer />}

                    {isAuthenticated && !isLoginPage && <Cart />}
                </div>
            </CartProvider>
        </RecetaProvider>
    );
};


const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
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
                    <ProtectedRoute>
                        <ListaRecetas />
                    </ProtectedRoute>
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
                element: {
                    path: 'recetas',
                    element: (
                        <ProtectedRoute>
                            <ListaRecetas /> 
                        </ProtectedRoute>
                    ),
                },
            },
        ],
    },
]);

export default router;