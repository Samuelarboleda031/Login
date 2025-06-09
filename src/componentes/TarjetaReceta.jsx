import React from 'react';
import bandejaImage from '../assets/recetas/bandeja.jpg';
import ajiacoImage from '../assets/recetas/ajiaco.jpg';
import tamaleImage from '../assets/recetas/tamale.jpg';
import sancochoImage from '../assets/recetas/sancocho.jpg';

function TarjetaReceta({ receta, onVerDetalle }) {
  let imageUrl;
  switch (receta.imagen) {
    case 'bandeja.jpg':
      imageUrl = bandejaImage;
      break;
    case 'ajiaco.jpg':
      imageUrl = ajiacoImage;
      break;
    case 'tamale.jpg':
      imageUrl = tamaleImage;
      break;
    case 'sancocho.jpg':
      imageUrl = sancochoImage;
      break;
    default:
      imageUrl = 'https://via.placeholder.com/150/cccccc?Text=Sin+Imagen';
  }

  return (
    <div className="tarjeta-receta" onClick={() => onVerDetalle(receta.id)}>
      <img src={imageUrl} alt={receta.titulo} className="tarjeta-receta-imagen" />
      <h3>{receta.titulo}</h3>
    </div>
  );
}

export default TarjetaReceta;