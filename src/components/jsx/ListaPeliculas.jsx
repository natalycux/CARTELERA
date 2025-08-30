// src/components/jsx/ListaPeliculas.jsx

import React, { useState } from 'react';
import PeliculaCard from './PeliculaCard';
import PeliculaModal from './PeliculaModal';
import '../css/ListaPeliculas.css'; // Importamos el CSS para la cuadrícula

const ListaPeliculas = ({ peliculas }) => {
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);

  const handleAbrirModal = (pelicula) => {
    setPeliculaSeleccionada(pelicula);
  };

  const handleCerrarModal = () => {
    setPeliculaSeleccionada(null);
  };

  return (
    <>
      <div className="lista-peliculas-grid">
        {peliculas.map(pelicula => (
          // El onClick ahora está en el div que envuelve la tarjeta
          <div key={pelicula.imdbID} onClick={() => handleAbrirModal(pelicula)}>
            <PeliculaCard pelicula={pelicula} />
          </div>
        ))}
      </div>

      <PeliculaModal
        pelicula={peliculaSeleccionada}
        mostrar={peliculaSeleccionada !== null}
        alCerrar={handleCerrarModal}
      />
    </>
  );
};

export default ListaPeliculas;