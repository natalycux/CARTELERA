import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function MovieForm({ show, handleClose, handleSubmit, initialData }) {
  const [movie, setMovie] = useState({
    imdbID: '', Title: '', Year: '', Type: '', Poster: '',
    description: '', Ubication: '', Estado: true,
  });

  useEffect(() => {
    if (initialData) {
      setMovie(initialData);
    } else {
      setMovie({
        imdbID: '', Title: '', Year: '', Type: '', Poster: '',
        description: '', Ubication: '', Estado: true,
      });
    }
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(movie);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{(initialData && initialData.imdbID) ? 'Editar Película' : 'Agregar Película'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>IMDB ID</Form.Label>
            {/* --- CAMBIO CLAVE --- */}
            {/* El campo ID solo se deshabilita si estamos editando un registro que YA TENÍA un ID. */}
            <Form.Control 
              type="text" 
              name="imdbID" 
              value={movie.imdbID} 
              onChange={handleChange} 
              required 
              disabled={initialData && initialData.imdbID} 
            />
            {initialData && initialData.imdbID && <Form.Text className="text-muted">El ID no se puede cambiar.</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control type="text" name="Title" value={movie.Title} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Año</Form.Label>
            <Form.Control type="text" name="Year" value={movie.Year} onChange={handleChange} required />
          </Form.Group>
           <Form.Group className="mb-3">
            <Form.Label>Género</Form.Label>
            <Form.Control type="text" name="Type" value={movie.Type} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL del Poster</Form.Label>
            <Form.Control type="text" name="Poster" value={movie.Poster} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={movie.description} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control type="text" name="Ubication" value={movie.Ubication} onChange={handleChange} required />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose} className="me-2">Cancelar</Button>
          <Button variant="primary" type="submit">Guardar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default MovieForm;