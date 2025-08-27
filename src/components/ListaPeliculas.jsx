// src/components/ListaPeliculas.jsx

import React from 'react';
import TarjetaPelicula from './TarjetaPelicula';
import './ListaPeliculas.css'; // Crearemos este archivo para el grid

const ListaPeliculas = ({ peliculas }) => {
  // Si no hay películas, muestra un mensaje
  if (peliculas.length === 0) {
    return <p className="sin-resultados">No se encontraron películas con esos criterios.</p>;
  }

  return (
    <div className="lista-peliculas">
      {/* Usamos .map() para "mapear" cada objeto de película a un componente TarjetaPelicula */}
      {peliculas.map((pelicula) => (
        <TarjetaPelicula key={pelicula.imdbID} pelicula={pelicula} />
      ))}
    </div>
  );
};

export default ListaPeliculas;