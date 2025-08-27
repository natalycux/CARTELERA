// src/components/Filtros.jsx
import React from 'react';
import './Filtros.css';

// Recibe los valores actuales y las funciones para cambiarlos desde App.jsx
const Filtros = ({ busqueda, setBusqueda, ubicaciones, filtroUbicacion, setFiltroUbicacion }) => {
  return (
    <div className="area-filtros">
      <input
        type="text"
        placeholder="Buscar por título..."
        className="filtro-busqueda"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <select
        className="filtro-select"
        value={filtroUbicacion}
        onChange={(e) => setFiltroUbicacion(e.target.value)}
      >
        <option value="">Todas las ubicaciones</option>
        {ubicaciones.map(ubicacion => (
          <option key={ubicacion} value={ubicacion}>{ubicacion}</option>
        ))}
      </select>
    </div>
  );
};

export default Filtros;