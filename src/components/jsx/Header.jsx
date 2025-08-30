// src/components/jsx/Header.jsx (VERSIÓN FINAL, COMPLETA Y FUNCIONAL)

import React, { useState } from 'react';
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaYoutube, FaMobileAlt, FaTimes } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import '../css/Header.css';

// --- DATOS PARA EL MENÚ (Se quedan como estaban) ---
const peliculasMenu = {
  estrenos: [ { id: 'estreno-01', title: 'Demon Slayer', poster: 'https://static.cinepolis.com/img/peliculas/40149/1/1/40149.jpg' } ],
  preventas: [ { id: 'preventa-01', title: 'El Conjuro 4', poster: 'https://static.cinepolis.com/img/peliculas/40183/1/1/40183.jpg' } ],
  masQueCine: [ { id: 'masquecine-01', title: 'David Gilmour Live', poster: 'https://static.cinepolis.com/img/peliculas/39938/1/1/39938.jpg' } ],
  garantia: [ { id: 'garantia-01', title: 'Otro Viernes de Locos', poster: 'https://static.cinepolis.com/img/peliculas/39515/1/1/39515.jpg' } ]
};
const logosCinepolis = [
    { name: 'VIP', url: 'https://static.cinepolis.com/marcas/vip-2022.svg' }, { name: '4DX' }, { name: 'Macro XE'  }, { name: 'IMAX' }, { name: 'Club Cinépolis' }, { name: 'Cinépolis Junior' }, { name: 'CineCash' }, { name: 'Garantía Cinépolis' }, { name: 'Sala de Arte' },
];

const Header = ({ categorias, cines, categoriaSeleccionada, setCategoriaSeleccionada, cineSeleccionado, setCineSeleccionado }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setMenuAbierto(!menuAbierto);
  };

  const handleScrollToCartelera = (e) => {
  e.preventDefault(); // Previene el comportamiento por defecto del enlace
  const seccionCartelera = document.getElementById('cartelera');
  if (seccionCartelera) {
    seccionCartelera.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <>
      <header className="site-header fixed-top">
        {/* --- Barra Principal Azul con la alineación correcta --- */}
        <Navbar className="main-navbar" variant="dark" expand="lg">
          <Container fluid className="px-md-5 px-4">
            <Navbar.Brand href="/">
              <img src="https://static.cinepolis.com/img/lg-cinepolis-new.png" alt="Cinépolis Logo" className="logo-image" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="w-100 d-flex justify-content-center align-items-center">
                <div className="d-flex">
                  <Form.Select aria-label="Selector de Categorías" className="location-selector me-2" value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
                    <option value="">Todos los Géneros</option>
                    {categorias.map(categoria => (<option key={categoria} value={categoria}>{categoria}</option>))}
                  </Form.Select>
                  
                  <Form.Select aria-label="Selector de Cines" className="location-selector" value={cineSeleccionado} onChange={(e) => setCineSeleccionado(e.target.value)}>
                    <option value="">Todos los Cines</option>
                    {cines.map(cine => (<option key={cine} value={cine}>{cine}</option>))}
                  </Form.Select>
                </div>
              </Nav>
              <Nav>
                <Button 
  as="a" 
  href="#cartelera" 
  className="ver-cartelera-btn ms-lg-3" 
  onClick={handleScrollToCartelera}
>
  VER CARTELERA
</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        {/* --- Barra Negra restaurada --- */}
        <div className="header-bottom">
          <Container fluid className="d-flex justify-content-between align-items-center px-md-5 px-4">
            <nav className="main-nav">
              <a href="#" onClick={toggleMenu}>Menú</a>
              <a href="#" className="preventas">Preventas</a>
            </nav>
            <div className="social-icons">
                <a href="#" target="_blank" aria-label="Facebook"><FaFacebookF /></a>
                <a href="#" target="_blank" aria-label="Twitter"><FaXTwitter /></a>
                <a href="#" target="_blank" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" target="_blank" aria-label="Youtube"><FaYoutube /></a>
                <a href="#" target="_blank" aria-label="Mobile App"><FaMobileAlt /></a>
            </div>
          </Container>
        </div>
      </header>
      
      {/* --- Menú desplegable CON EL CÓDIGO DE LAS IMÁGENES RESTAURADO --- */}
      {menuAbierto && (
        <div className={`menu-desplegable ${menuAbierto ? 'abierto' : ''}`}>
          <Container>
            <div className="menu-header">
              <button onClick={() => setMenuAbierto(false)} className="menu-cerrar-btn">
                <FaTimes /> Cerrar
              </button>
            </div>
            <div className="menu-columnas">
              <div className="menu-columna">
                <h4>Próximos estrenos</h4>
                {peliculasMenu.estrenos.map(p => (<div key={p.id} className="pelicula-item-menu"><img src={p.poster} alt={p.title} /></div>))}
              </div>
              <div className="menu-columna">
                <h4>Preventas</h4>
                {peliculasMenu.preventas.map(p => (<div key={p.id} className="pelicula-item-menu"><img src={p.poster} alt={p.title} /></div>))}
              </div>
              <div className="menu-columna">
                <h4>+Que Cine</h4>
                {peliculasMenu.masQueCine.map(p => (<div key={p.id} className="pelicula-item-menu"><img src={p.poster} alt={p.title} /></div>))}
              </div>
              <div className="menu-columna">
                <h4>Garantía Cinépolis</h4>
                {peliculasMenu.garantia.map(p => (<div key={p.id} className="pelicula-item-menu"><img src={p.poster} alt={p.title} /></div>))}
              </div>
            </div>
            <div className="menu-logos">
  {logosCinepolis.map(logo => (
    <span key={logo.name} className="menu-logo-item-text">
      {logo.name}
    </span>
  ))}
</div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Header;