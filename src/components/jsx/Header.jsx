// src/components/jsx/Header.jsx (Versión final con filtros e íconos)

import React, { useState } from 'react';
import '../css/Header.css'; // Asegúrate que la ruta a tu CSS sea correcta

// --- ICONOS ---
import { FaFacebook, FaInstagram, FaYoutube, FaMobileAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Header = ({
  categorias,
  cines,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  cineSeleccionado,
  setCineSeleccionado
}) => {
  
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="logo">
          <a href="/">cinépolis</a>
        </div>

        <div className="location-selectors">
          <select 
            value={categoriaSeleccionada} 
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            <option value="">Todas las Categorías</option>
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>{categoria}</option>
            ))}
          </select>
          <select 
            value={cineSeleccionado} 
            onChange={(e) => setCineSeleccionado(e.target.value)}
          >
            <option value="">Todos los Cines</option>
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
          <a href="https://www.facebook.com/cinepolis" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://twitter.com/cinepolis" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
          <a href="https://www.instagram.com/cinepolismx" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.youtube.com/user/CinepolisOnline" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          <a href="#"><FaMobileAlt /></a>
        </div>
      </div>

      {/* Aquí va el JSX de tu menú desplegable si lo tienes */}
      
    </header>
  );
};

export default Header;