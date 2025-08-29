// src/components/jsx/Header.jsx

import React from 'react';
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaYoutube, FaMobileAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import '../css/Header.css';

const Header = ({ categorias, cines, categoriaSeleccionada, setCategoriaSeleccionada, cineSeleccionado, setCineSeleccionado }) => {
  return (
    // 1. AÑADIMOS la clase 'fixed-top' aquí, al contenedor principal
    <header className="site-header fixed-top">
      {/* Barra de navegación principal (azul oscuro) */}
      
      {/* 2. QUITAMOS la propiedad fixed="top" de aquí */}
      <Navbar className="main-navbar" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="logo-text">cinépolis</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center flex-row">
              <Form.Select 
                className="location-selector me-2"
                value={categoriaSeleccionada} 
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                <option value="">Todas las Categorías</option>
                {categorias.map(categoria => (<option key={categoria} value={categoria}>{categoria}</option>))}
              </Form.Select>
              
              <Form.Select 
                className="location-selector me-3"
                value={cineSeleccionado} 
                onChange={(e) => setCineSeleccionado(e.target.value)}
              >
                <option value="">Todos los Cines</option>
                {cines.map(cine => (<option key={cine} value={cine}>{cine}</option>))}
              </Form.Select>
              
              <Button className="ver-cartelera-btn">VER CARTELERA</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Barra secundaria (negra) */}
      <div className="header-bottom">
        <Container className="d-flex justify-content-between align-items-center">
          <nav className="main-nav">
            <a href="#">Menú</a>
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
  );
};

export default Header;