// src/components/Header.jsx

import React from 'react';
import '../css/Header.css'; // Crearemos este archivo para los estilos

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-top">
        <div className="logo">
          {/* Idealmente, este sería un logo en formato SVG o PNG */}
          <a href="/">cinépolis</a>
        </div>
        <div className="location-selectors">
          <select name="ciudad" id="ciudad">
            <option value="guatemala">Guatemala, Guatemala</option>
            {/* Aquí irían más ciudades */}
          </select>
          <select name="cine" id="cine">
            <option value="seleccionar">Selecciona un cine</option>
            {/* Se podría llenar dinámicamente */}
          </select>
        </div>
        <button className="ver-cartelera-btn">VER CARTELERA</button>
      </div>
      <div className="header-bottom">
        <nav className="main-nav">
          <a href="#">Menú</a>
          <a href="#" className="preventas">Preventas</a>
        </nav>
        <div className="social-icons">
          {/* Aquí puedes usar íconos de una librería como React Icons */}
          <span>F</span> <span>X</span> <span>IG</span> <span>YT</span> <span>APP</span>
        </div>
      </div>
    </header>
  );
};

export default Header;