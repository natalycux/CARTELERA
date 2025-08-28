// src/App.jsx (versión final y mejorada)

import { useState, useEffect } from 'react';

// Importa los nuevos componentes
import Header from './components/jsx/Header';
import Carrusel from './components/jsx/Carrusel';
import Filtros from './components/jsx/Filtros';
import ListaPeliculas from './components/jsx/ListaPeliculas';
import Footer from './components/jsx/Footer';



import './App.css';

function App() {
  // Estados que ya teníamos
  const [peliculas, setPeliculas] = useState([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroUbicacion, setFiltroUbicacion] = useState("");

  // ¡NUEVO ESTADO para controlar la visibilidad del carrusel!
  const [mostrarCarrusel, setMostrarCarrusel] = useState(true);

  // ¡NUEVO useEffect para manejar el evento de scroll!
  useEffect(() => {
    const handleScroll = () => {
      // Si el usuario baja más de 50px, oculta el carrusel. Si no, lo muestra.
      if (window.scrollY > 50) {
        setMostrarCarrusel(false);
      } else {
        setMostrarCarrusel(true);
      }
    };

    // Añadimos el "escuchador" de eventos de scroll
    window.addEventListener('scroll', handleScroll);

    // ¡Importante! Limpiamos el "escuchador" cuando el componente se "desmonta"
    // para evitar problemas de memoria.
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // El array vacío asegura que esto se configure solo una vez

  // El useEffect para obtener las películas se mantiene igual...
  useEffect(() => {
    // ... tu código para fetch de la API ...
  }, []);

  // El cálculo de películas filtradas y ubicaciones únicas se mantiene igual...
  const ubicacionesUnicas = [...new Set(peliculas.map(p => p.Ubication))];
  const peliculasFiltradas = peliculas.filter(pelicula => {
    // ... tu lógica de filtrado ...
  });

  return (
    // Usamos un Fragment (<>) para no añadir un div innecesario
    <>
      <Header />
      
      {/* Modificamos el div del carrusel para añadir la clase 'oculto' dinámicamente */}
      <div className={`carrusel-wrapper ${!mostrarCarrusel ? 'oculto' : ''}`}>
        <Carrusel />
      </div>

      <main className="App">
        {/* El H1 lo podemos mover a una sección más específica si queremos */}
        <h2>CARTELERA</h2>
        <Filtros
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          ubicaciones={ubicacionesUnicas}
          filtroUbicacion={filtroUbicacion}
          setFiltroUbicacion={setFiltroUbicacion}
        />

        {estaCargando ? (
          <p className="cargando-texto">Cargando películas...</p>
        ) : (
          <ListaPeliculas peliculas={peliculasFiltradas} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;