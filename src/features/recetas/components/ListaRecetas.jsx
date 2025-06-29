import React from 'react';
import TarjetaReceta from './TarjetaReceta';
import recetasData from '../data/recetas'; 

function ListaRecetas({ onVerDetalle }) { 
  return (
    <div className="lista-recetas-container container mt-5">
      <h2 className="text-center mb-4">Todas Nuestras Recetas</h2>
      <div className="row">
        {recetasData && recetasData.map(receta => (
          <div key={receta.id} className="col-md-4 mb-4">
            <TarjetaReceta key={receta.id} receta={receta} onVerDetalle={onVerDetalle} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaRecetas;