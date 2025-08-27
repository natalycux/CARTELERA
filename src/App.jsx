// src/App.jsx (versión actualizada)

import { useState, useEffect } from 'react';
import ListaPeliculas from './components/ListaPeliculas'; // Importamos el componente
import './App.css';

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [estaCargando, setEstaCargando] = useState(true);

  useEffect(() => {
    const obtenerPeliculas = async () => {
      try {
        const url = "https://movie.azurewebsites.net/api/cartelera?title=&ubication=";
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        // Limpieza de datos: A veces la API trae duplicados, los filtramos por imdbID
        const peliculasUnicas = data.filter((pelicula, index, self) =>
            index === self.findIndex((p) => (
                p.imdbID === pelicula.imdbID
            ))
        );
        setPeliculas(peliculasUnicas);
      } catch (error) {
        console.error("Hubo un error al obtener las películas:", error);
      } finally {
        setEstaCargando(false);
      }
    };
    obtenerPeliculas();
  }, []);

  return (
    <div className="App">
      {/* Aquí podrías poner el componente Header */}
      <h1>Mi Cartelera de Cine</h1>
      {/* Aquí irá el componente de Filtros */}

      {estaCargando ? (
        <p className="cargando-texto">Cargando películas...</p>
      ) : (
        // Pasamos la lista de películas al componente hijo
        <ListaPeliculas peliculas={peliculas} />
      )}
    </div>
  );
}

export default App;