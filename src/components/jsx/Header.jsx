// src/components/jsx/Header.jsx (Versión final y conectada)

import React, { useState } from 'react';
import '../css/Header.css'; // Asegúrate que la ruta a tu CSS sea correcta

// ¡ESTE ES EL CAMBIO MÁS IMPORTANTE!
// Ahora el Header está "escuchando" toda la información que App.jsx le pasa.
const Header = ({
  categorias,
  cines,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  cineSeleccionado,
  setCineSeleccionado
}) => {
  
  // La lógica para el menú desplegable de "Menú" se puede quedar si la quieres
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="logo">
          <a href="/">cinépolis</a>
        </div>

        {/* ESTA ES LA SECCIÓN QUE HEMOS HECHO DINÁMICA */}
        <div className="location-selectors">
          
          {/* SELECTOR DE CATEGORÍA */}
          <select 
            value={categoriaSeleccionada} 
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            <option value="">Todas las Categorías</option>
            {/* Construimos la lista de opciones dinámicamente */}
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>{categoria}</option>
            ))}
          </select>

          {/* SELECTOR DE CINE */}
          <select 
            value={cineSeleccionado} 
            onChange={(e) => setCineSeleccionado(e.target.value)}
          >
            <option value="">Todos los Cines</option>
            {/* Construimos la lista de opciones dinámicamente */}
            {cines.map(cine => (
              <option key={cine} value={cine}>{cine}</option>
            ))}
          </select>
        </div>

        <button className="ver-cartelera-btn">VER CARTELERA</button>
      </div>

      <div className="header-bottom">
        <nav className="main-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); setMenuAbierto(!menuAbierto); }}>
            Menú
          </a>
          <a href="#" className="preventas">Preventas</a>
        </nav>
        <div className="social-icons">
          <span>F</span> <span>X</span> <span>IG</span> <span>YT</span> <span>APP</span>
        </div>
      </div>

      {/* Aquí va el JSX de tu menú desplegable si lo tienes */}
      
    </header>
  );
};

export default Header;