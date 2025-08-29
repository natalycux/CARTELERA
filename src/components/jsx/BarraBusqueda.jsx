// src/components/jsx/BarraBusqueda.jsx (CORREGIDO)

import React from 'react';
import '../css/BarraBusqueda.css'; // Asegúrate de que esta importación esté correcta

const BarraBusqueda = ({ busqueda, setBusqueda }) => {
  return (
    <div className="barra-busqueda-container">
      <input
        type="text"
        className="barra-busqueda-input"
        placeholder="Buscar por título..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
};

export default BarraBusqueda;