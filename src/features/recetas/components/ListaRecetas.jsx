// ListaRecetas.jsx
import React from 'react';
import TarjetaReceta from './TarjetaReceta';

function ListaRecetas({ recetas, onVerDetalle }) {
  return (
    <div className="lista-recetas">
      {recetas.map(receta => (
        <TarjetaReceta key={receta.id} receta={receta} onVerDetalle={onVerDetalle} />
      ))}
    </div>
  );
}
export default ListaRecetas;