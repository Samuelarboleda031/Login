import React, { createContext, useState, useEffect } from 'react';
import recetasData from './data/recetas';

export const RecetaContext = createContext();

export const RecetaProvider = ({ children }) => {
  const [recetasParaPedido, setRecetasParaPedido] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setLoading(true);
      setRecetasParaPedido(recetasData);
    } catch (err) {
      setError('Error al cargar las recetas para pedido.');
      console.error('Error al cargar recetas para pedido:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <RecetaContext.Provider value={{ recetasParaPedido, loading, error }}>
      {children}
    </RecetaContext.Provider>
  );
};
