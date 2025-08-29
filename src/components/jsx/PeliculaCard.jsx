// src/components/jsx/PeliculaCard.jsx

import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Importamos el icono de ubicación
import '../css/PeliculaCard.css';

// Replicamos el mapa de cines para limpiar los nombres aquí mismo
const mapaDeCines = {
  "POPCINEMA": "Popcinema", "0AKLAND MALL": "Oakland Mall", "OKLAN": "Oakland Mall",
  "PORTALES": "Portales", "GUASTATOYA": "Guastatoya", "MIRAFLORES": "Miraflores"
};

const PeliculaCard = ({ pelicula }) => {
  // Limpiamos el nombre del cine
  const ubicacionLimpia = mapaDeCines[pelicula.Ubication.trim().toUpperCase()] || pelicula.Ubication.trim();
  // Limpiamos el tipo de película
  const tipoLimpio = pelicula.Type.trim().charAt(0).toUpperCase() + pelicula.Type.trim().slice(1).toLowerCase();

  return (
    <div className="pelicula-card">
      <div className="pelicula-poster-wrapper">
        <img 
          src={pelicula.Poster} 
          alt={`Póster de ${pelicula.Title}`} 
          className="pelicula-poster"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/300x450/1e1e1e/ffffff?text=Imagen_no_disponible'; }}
        />
      </div>
      <div className="pelicula-info">
        <p className="pelicula-meta">{pelicula.Year} &bull; {tipoLimpio}</p>
        <h3 className="pelicula-titulo-card">{pelicula.Title}</h3>
        <p className="pelicula-ubicacion">
          <FaMapMarkerAlt className="ubicacion-icono" />
          {ubicacionLimpia}
        </p>
      </div>
    </div>
  );
};

export default PeliculaCard;