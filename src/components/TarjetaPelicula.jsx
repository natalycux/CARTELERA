// src/components/TarjetaPelicula.jsx

import React from 'react';
import './TarjetaPelicula.css'; // Crearemos este archivo para los estilos

// Recibimos la película a través de "props"
const TarjetaPelicula = ({ pelicula }) => {
  return (
    <div className="tarjeta">
      <img src={pelicula.Poster} alt={`Póster de ${pelicula.Title}`} className="tarjeta-poster" />
      <div className="tarjeta-info">
        <h3 className="tarjeta-titulo">{pelicula.Title}</h3>
        <p className="tarjeta-detalle">{pelicula.Year} | {pelicula.Type}</p>
        <p className="tarjeta-ubicacion">{pelicula.Ubication}</p>
      </div>
    </div>
  );
};

export default TarjetaPelicula;