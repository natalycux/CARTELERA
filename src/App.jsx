// src/App.jsx (versión final consumiendo la API real)

import { useState, useEffect, useMemo } from 'react'; // Añadimos useMemo

// Importa tus componentes (respetando tu estructura de carpetas)
import Header from './components/jsx/Header';
import Carrusel from './components/jsx/Carrusel';
import ListaPeliculas from './components/jsx/ListaPeliculas';
import Footer from './components/jsx/Footer';
// NOTA: He cambiado el nombre de 'Filtros' a 'BarraBusqueda' para más claridad
import BarraBusqueda from './components/jsx/BarraBusqueda'; 

import './App.css';

// Nuestro "traductor" para limpiar los nombres de los cines
const mapaDeCines = {
  "POPCINEMA": "Popcinema",
  "0AKLAND MALL": "Oakland Mall",
  "OKLAN": "Oakland Mall",
  "PORTALES": "Portales",
  "GUASTATOYA": "Guastatoya",
  "MIRAFLORES": "Miraflores"
};


function App() {
  // --- ESTADOS ---
  const [peliculas, setPeliculas] = useState([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [mostrarCarrusel, setMostrarCarrusel] = useState(true);

  // Estados para nuestros filtros
  const [busqueda, setBusqueda] = useState(""); // Para la barra de búsqueda de texto
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(''); // Para el dropdown de Categorías
  const [cineSeleccionado, setCineSeleccionado] = useState(''); // Para el dropdown de Cines
  

  // --- EFECTOS ---
  // useEffect para el scroll del carrusel (se mantiene igual)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setMostrarCarrusel(false);
      } else {
        setMostrarCarrusel(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // useEffect para obtener las películas de la API (ahora implementado)
  useEffect(() => {
    const obtenerPeliculas = async () => {
      try {
        const url = "https://movie.azurewebsites.net/api/cartelera?title=&ubication=";
        const respuesta = await fetch(url);
        const data = await respuesta.json();

        console.log("1. Datos recibidos de la API:", data);
        setPeliculas(data);
      } catch (error) {
        console.error("Error al obtener las películas:", error);
      } finally {
        setEstaCargando(false);
      }
    };
    obtenerPeliculas();
  }, []); // El array vacío [] asegura que se ejecute solo una vez


  // --- LÓGICA DE FILTRADO Y PROCESAMIENTO DE DATOS ---
  // Usamos useMemo para que estas listas solo se recalculen si la lista de películas cambia
  const { categoriasUnicas, cinesUnicos } = useMemo(() => {
    const categorias = [...new Set(peliculas.map(p => 
        p.Type.trim().charAt(0).toUpperCase() + p.Type.trim().slice(1).toLowerCase()
    ))].sort();

    const cines = [...new Set(peliculas.map(p => 
        mapaDeCines[p.Ubication.trim().toUpperCase()] || p.Ubication.trim()
    ))].sort();

    return { categoriasUnicas: categorias, cinesUnicos: cines };
  }, [peliculas]);

  // Filtra la lista de películas para mostrar, combinando todos los filtros
  const peliculasFiltradas = peliculas.filter(pelicula => {
    const categoriaNormalizada = pelicula.Type.trim().charAt(0).toUpperCase() + pelicula.Type.trim().slice(1).toLowerCase();
    const cineNormalizado = mapaDeCines[pelicula.Ubication.trim().toUpperCase()] || pelicula.Ubication.trim();

    // Comprobaciones de cada filtro
    const coincideBusqueda = pelicula.Title.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === '' || categoriaNormalizada === categoriaSeleccionada;
    const coincideCine = cineSeleccionado === '' || cineNormalizado === cineSeleccionado;

    return coincideBusqueda && coincideCategoria && coincideCine;
  });


  // --- RENDERIZADO ---
  return (
    <>
      <Header
        // Pasamos todos los datos y funciones que el Header necesita para los filtros
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

      <main className="App">
        <h2>CARTELERA</h2>
        <BarraBusqueda
          busqueda={busqueda}
          setBusqueda={setBusqueda}
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