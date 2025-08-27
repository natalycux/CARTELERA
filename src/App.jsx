// src/App.jsx (versión actualizada)

import { useState, useEffect } from 'react';
import ListaPeliculas from './components/ListaPeliculas'; // Importamos el componente
import './App.css';

// src/App.jsx (versión final)
import { useState, useEffect } from 'react';
import ListaPeliculas from './components/ListaPeliculas';
import Filtros from './components/Filtros'; // Importamos Filtros
import './App.css';

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroUbicacion, setFiltroUbicacion] = useState("");

  useEffect(() => { /* ...mismo código que antes... */ }, []);

  // Calcular las ubicaciones únicas para el dropdown
  const ubicacionesUnicas = [...new Set(peliculas.map(p => p.Ubication))];

  const peliculasFiltradas = peliculas.filter(pelicula => {
      const coincideBusqueda = pelicula.Title.toLowerCase().includes(busqueda.toLowerCase());
      const coincideUbicacion = filtroUbicacion === "" || pelicula.Ubication === filtroUbicacion;
      return coincideBusqueda && coincideUbicacion;
  });

  return (
    <div className="App">
      <h1>Mi Cartelera de Cine</h1>

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
    </div>
  );
}

export default App;