// src/components/jsx/PeliculaModal.jsx (CON EL ESPACIO FORZADO)

import React from 'react';
import { Modal } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import '../css/PeliculaModal.css';

const mapaDeCines = {
  "POPCINEMA": "Popcinema", "0AKLAND MALL": "Oakland Mall", "OKLAN": "Oakland Mall",
  "PORTALES": "Portales", "GUASTATOYA": "Guastatoya", "MIRAFLORES": "Miraflores"
};

const PeliculaModal = ({ pelicula, mostrar, alCerrar }) => {
  if (!pelicula) {
    return null;
  }

  const ubicacionLimpia = mapaDeCines[pelicula.Ubication.trim().toUpperCase()] || pelicula.Ubication.trim();
  const tipoLimpio = pelicula.Type.trim().charAt(0).toUpperCase() + pelicula.Type.trim().slice(1).toLowerCase();

  return (
    <Modal show={mostrar} onHide={alCerrar} centered size="lg">
      <Modal.Body className="modal-contenido">
        <button onClick={alCerrar} className="modal-cerrar-btn">&times;</button>
        <div className="modal-layout">
          <div className="modal-poster">
            <img src={pelicula.Poster} alt={`Póster de ${pelicula.Title}`} />
          </div>
          <div className="modal-info">
            <h2 className="modal-titulo">{pelicula.Title}</h2>
            <p className="modal-meta">{tipoLimpio} &bull; {pelicula.Year}</p>
            
            {/* --- LÍNEA CORREGIDA DE FORMA EXPLÍCITA --- */}
            <p className="modal-ubicacion">
  <FaMapMarkerAlt className="ubicacion-icono-modal" />
  <span>Disponible en:</span>
  <strong className="modal-ubicacion-nombre">{ubicacionLimpia}</strong>
</p>

            <h3 className="sinopsis-titulo">Sinopsis</h3>
            <p className="modal-descripcion">{pelicula.description}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PeliculaModal;