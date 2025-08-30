// src/components/Footer.jsx
import React from 'react';
import '../css/Footer.css'; // Crearemos este archivo para los estilos

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4>CARTELERA</h4>
          <ul>
            <li><a href="#">Preventas</a></li>
            <li><a href="#">Próximos Estrenos</a></li>
            <li><a href="#">Cumpleaños de Película</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>¿QUIÉNES SOMOS?</h4>
          <ul>
            <li><a href="#">Únete al equipo</a></li>
            <li><a href="#">Corporativo</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>LEGALES</h4>
          <ul>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Aviso de privacidad</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>CONTACTO</h4>
          <ul>
            <li><a href="#">Déjanos tus comentarios</a></li>
            <li><a href="#">Línea de Denuncia</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Contenido del sitio 2025© Inversiones Cinematográficas de Guatemala®, S.A.</p>
        <p>Desarrollado por Nataly Michell Cux Recinos 1890-22-18009.</p>
      </div>
    </footer>
  );
};

export default Footer;