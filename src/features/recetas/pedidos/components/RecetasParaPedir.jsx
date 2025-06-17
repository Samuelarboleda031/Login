import React, { useContext } from 'react';
import { RecetaContext } from '../../../shared/contexts/RecetaContext';
import RecetaPedido from './RecetaPedido';

function RecetasParaPedir() {
  const { recetasParaPedido, loading, error } = useContext(RecetaContext);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 p-4 text-d2b48c">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-d2b48c"></div>
        <p className="mt-4 text-lg font-semibold">Cargando recetas para pedido...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 p-4 text-red-500 text-lg font-semibold text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="recetas-para-pedir-container p-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-d2b48c mb-10 mt-6">Nuestras Recetas para Pedido a Domicilio</h2>
      <div className="grid-recetas-pedido grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {recetasParaPedido.map(receta => (
          <RecetaPedido
            key={receta.id}
            id={receta.id}
            nombre={receta.titulo}
            precio={receta.precio || 0}
            descripcion={receta.ingredientes ? receta.ingredientes.join(', ') : 'Sin descripción'}
            imagen={receta.imagen}
          />
        ))}
      </div>
    </div>
  );
}

export default RecetasParaPedir;
