import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2'; // 1. Importamos SweetAlert2
import * as movieService from '../../services/movieService';
import MovieForm from './MovieForm';

function AdminPanel({ peliculasIniciales, onPeliculasChange, onNavigateBack }) {
  const [peliculas, setPeliculas] = useState(peliculasIniciales || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Mantenemos el error para mensajes de banner si es necesario
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filter, setFilter] = useState('activas');

  useEffect(() => {
    setPeliculas(peliculasIniciales || []);
  }, [peliculasIniciales]);

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  // 2. Modificamos la función de eliminar
  const handleDelete = (imdbID) => {
    if (!imdbID) {
      Swal.fire({
        icon: 'error',
        title: 'Operación no permitida',
        text: 'Este registro no tiene ID y no se puede eliminar directamente.',
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir la eliminación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, ¡eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        movieService.deleteMovie(imdbID)
          .then(() => {
            Swal.fire(
              '¡Eliminada!',
              'La película ha sido eliminada con éxito.',
              'success'
            );
            onPeliculasChange();
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: err.message || 'Ocurrió un error inesperado.',
            });
          })
          .finally(() => setLoading(false));
      }
    });
  };

  // 3. Modificamos la función de guardar (agregar/editar)
  const handleFormSubmit = async (movieData) => {
    setLoading(true);
    setError(null);
    try {
      const isEditing = !!selectedMovie;
      if (isEditing) {
        await movieService.updateMovie(movieData);
      } else {
        await movieService.addMovie(movieData);
      }
      
      setShowModal(false);
      onPeliculasChange();

      Swal.fire({
        icon: 'success',
        title: `¡Película ${isEditing ? 'actualizada' : 'agregada'}!`,
        text: `La película se ha guardado correctamente.`,
        timer: 2000,
        showConfirmButton: false
      });

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: err.message || 'Ocurrió un error inesperado.',
      });
    } finally {
      setLoading(false);
    }
  };

  const peliculasFiltradas = peliculas.filter(p => filter === 'activas' ? p.Estado : !p.Estado);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración</h2>
        <Button variant="outline-secondary" onClick={onNavigateBack}>
          Volver a la Cartelera
        </Button>
      </div>

      {loading && <div className="text-center my-3"><Spinner animation="border" role="status"><span className="visually-hidden">Cargando...</span></Spinner></div>}
      
      {/* Ya no usamos el Alert de Bootstrap, pero lo dejo comentado por si lo necesitas */}
      {/* {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>} */}
      
      <Button variant="primary" className="mb-3" onClick={() => { setSelectedMovie(null); setShowModal(true); }}>
        + Agregar Película
      </Button>

      <div className="mb-3">
          <Button variant={filter === 'activas' ? 'dark' : 'outline-dark'} onClick={() => setFilter('activas')}>Activas</Button>
          <Button variant={filter === 'inactivas' ? 'dark' : 'outline-dark'} className="ms-2" onClick={() => setFilter('inactivas')}>Inactivas</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Título</th>
            <th>IMDB ID</th>
            <th>Estado</th>
            <th style={{ width: '200px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {peliculasFiltradas.map((movie) => (
            <tr key={movie.imdbID || `temp-${Math.random()}`}>
              <td>{movie.Title || <em>(Sin Título)</em>}</td>
              <td>{movie.imdbID || <em>(Sin ID)</em>}</td>
              <td>{movie.Estado ? 'Activa' : 'Inactiva'}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(movie)} className="me-2">
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(movie.imdbID)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showModal && (
        <MovieForm
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleSubmit={handleFormSubmit}
            initialData={selectedMovie}
        />
      )}
    </Container>
  );
}

export default AdminPanel;