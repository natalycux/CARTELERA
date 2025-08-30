import { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/jsx/Header';
import Carrusel from './components/jsx/Carrusel';
import ListaPeliculas from './components/jsx/ListaPeliculas';
import Footer from './components/jsx/Footer';
import BarraBusqueda from './components/jsx/BarraBusqueda';
import AdminPanel from './components/jsx/AdminPanel';
import { Button } from 'react-bootstrap';
import { FaUserShield } from 'react-icons/fa'; // Ícono para el botón de admin
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const mapaDeCines = {
  "POPCINEMA": "Popcinema", "0AKLAND MALL": "Oakland Mall", "OKLAN": "Oakland Mall",
  "PORTALES": "Portales", "GUASTATOYA": "Guastatoya", "MIRAFLORES": "Miraflores"
};

function App() {
  const [vistaActual, setVistaActual] = useState('cartelera'); // Estado para controlar la vista: 'cartelera' o 'admin'
  const [peliculas, setPeliculas] = useState([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [mostrarCarrusel, setMostrarCarrusel] = useState(true); 
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [cineSeleccionado, setCineSeleccionado] = useState('');

  const recargarPeliculas = useCallback(async () => {
    setEstaCargando(true);
    try {
      const url = "https://movie.azurewebsites.net/api/cartelera?title=&ubication=";
      const respuesta = await fetch(url);
      const data = await respuesta.json();
      setPeliculas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener las películas:", error);
      setPeliculas([]);
    } finally {
      setEstaCargando(false);
    }
  }, []);

  useEffect(() => {
    recargarPeliculas();
  }, [recargarPeliculas]);

  const peliculasParaUI = useMemo(() => 
    peliculas.filter(p => p && p.Title && p.Type && p.Ubication)
  , [peliculas]);

  const { categoriasUnicas, cinesUnicos } = useMemo(() => {
    const categorias = [...new Set(peliculasParaUI.map(p => p.Type.trim().charAt(0).toUpperCase() + p.Type.trim().slice(1).toLowerCase()))].sort();
    const cines = [...new Set(peliculasParaUI.map(p => mapaDeCines[p.Ubication.trim().toUpperCase()] || p.Ubication.trim()))].sort();
    return { categoriasUnicas: categorias, cinesUnicos: cines };
  }, [peliculasParaUI]);

  const peliculasFiltradas = peliculasParaUI.filter(pelicula => {
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
      
      {/* Botón flotante para acceder al panel de admin */}
      {vistaActual === 'cartelera' && (
        <Button
          onClick={() => setVistaActual('admin')}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}
          variant="primary"
          aria-label="Panel de Administración"
        >
          <FaUserShield />
        </Button>
      )}

      {/* Renderizado condicional basado en la vista actual */}
      {vistaActual === 'cartelera' ? (
        <>
          <div className={`carrusel-wrapper ${!mostrarCarrusel ? 'oculto' : ''}`}>
            <Carrusel />
          </div>

          <main id="cartelera" className="contenido-principal">
            <h2 className='titulo-cartelera'>CARTELERA</h2>
            <BarraBusqueda busqueda={busqueda} setBusqueda={setBusqueda} />
            {estaCargando ? <p>Cargando...</p> : <ListaPeliculas peliculas={peliculasFiltradas} />}
          </main>
        </>
      ) : (
        <AdminPanel 
          peliculasIniciales={peliculas} 
          onPeliculasChange={recargarPeliculas}
          onNavigateBack={() => setVistaActual('cartelera')} // Prop para volver
        />
      )}

      <Footer />
    </>
  );
}
export default App;