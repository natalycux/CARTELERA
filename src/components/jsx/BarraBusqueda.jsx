// src/components/Filtros.jsx
import React from 'react';
import '../css/BarraBusqueda.css';

// Recibe los valores actuales y las funciones para cambiarlos desde App.jsx
const BarraBusqueda = ({ busqueda, setBusqueda }) => {
  return (
    <div className="area-filtros"> {/* Puedes mantener la clase CSS si quieres */}
      <input
        type="text"
        placeholder="Buscar por título..."
        className="filtro-busqueda"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
};

export default BarraBusqueda;