// src/App.jsx (Versión Final y Limpia)

import { useState, useEffect, useMemo } from 'react';
import Header from './components/jsx/Header';
import Carrusel from './components/jsx/Carrusel';
import ListaPeliculas from './components/jsx/ListaPeliculas';
import Footer from './components/jsx/Footer';
import BarraBusqueda from './components/jsx/BarraBusqueda';
import './App.css';

const mapaDeCines = {
  "POPCINEMA": "Popcinema", "0AKLAND MALL": "Oakland Mall", "OKLAN": "Oakland Mall",
  "PORTALES": "Portales", "GUASTATOYA": "Guastatoya", "MIRAFLORES": "Miraflores"
};

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [mostrarCarrusel, setMostrarCarrusel] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [cineSeleccionado, setCineSeleccionado] = useState('');

  useEffect(() => { /* Tu efecto de scroll (está bien como está) */ }, []);
  useEffect(() => {
    const obtenerPeliculas = async () => {
      try {
        const url = "https://movie.azurewebsites.net/api/cartelera?title=&ubication=";
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        setPeliculas(data);
      } catch (error) { console.error("Error al obtener las películas:", error); }
      finally { setEstaCargando(false); }
    };
    obtenerPeliculas();
  }, []);

  const { categoriasUnicas, cinesUnicos } = useMemo(() => {
    const categorias = [...new Set(peliculas.map(p => p.Type.trim().charAt(0).toUpperCase() + p.Type.trim().slice(1).toLowerCase()))].sort();
    const cines = [...new Set(peliculas.map(p => mapaDeCines[p.Ubication.trim().toUpperCase()] || p.Ubication.trim()))].sort();
    return { categoriasUnicas: categorias, cinesUnicos: cines };
  }, [peliculas]);

  const peliculasFiltradas = peliculas.filter(pelicula => {
    const categoriaNormalizada = pelicula.Type.trim().charAt(0).toUpperCase() + pelicula.Type.trim().slice(1).toLowerCase();
    const cineNormalizado = mapaDeCines[pelicula.Ubication.trim().toUpperCase()] || pelicula.Ubication.trim();
    const coincideBusqueda = pelicula.Title.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === '' || categoriaNormalizada === categoriaSeleccionada;
    const coincideCine = cineSeleccionado === '' || cineNormalizado === cineSeleccionado;
    return coincideBusqueda && coincideCategoria && coincideCine;
  });

  return (
    <>
      <Header
        categorias={categoriasUnicas}
        cines={cinesUnicos}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        cineSeleccionado={cineSeleccionado}
        setCineSeleccionado={setCineSeleccionado}
      />
      
      <div className={`carrusel-wrapper ${!mostrarCarrusel ? 'oculto' : ''}`}>
        <Carrusel />
      </div>

      <main id="cartelera" className="contenido-principal">
        <h2 className='titulo-cartelera'>CARTELERA</h2>
        <BarraBusqueda busqueda={busqueda} setBusqueda={setBusqueda} />
        {estaCargando ? <p>Cargando...</p> : <ListaPeliculas peliculas={peliculasFiltradas} />}
      </main>

      <Footer />
    </>
  );
}
export default App;