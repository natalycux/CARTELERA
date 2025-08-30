// La URL base sin parámetros
const BASE_URL = 'https://movie.azurewebsites.net/api/cartelera';

// GET - Obtener todas las películas (URL Corregida)
export const getMovies = async () => {
  // Usamos la URL completa con los parámetros de consulta vacíos, como requiere la API.
  const response = await fetch(`${BASE_URL}?title=&ubication=`);
  if (!response.ok) throw new Error('Error al obtener las películas');
  return await response.json();
};

// POST - Agregar una nueva película
export const addMovie = async (movie) => {
  // POST se hace a la URL base
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });
  if (!response.ok) throw new Error('Error al agregar la película');
  return await response.json();
};

// PUT - Actualizar una película existente
export const updateMovie = async (movie) => {
  if (!movie.imdbID) throw new Error("No se puede actualizar una película sin un ID.");
  const urlConId = `${BASE_URL}?imdbID=${movie.imdbID}`;

  // Mostramos en la consola exactamente lo que vamos a enviar a la API.
  console.log("%cIntentando actualizar con PUT a la URL:", "color: blue; font-weight: bold;", urlConId);
  console.log("%cEnviando este objeto en el body:", "color: blue; font-weight: bold;", movie);

  const response = await fetch(urlConId, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  });

  // Manejo de errores mejorado para ver la respuesta del servidor
  if (!response.ok) {
    let errorMessage = `Error al actualizar: El servidor respondió con el estado ${response.status}`;
    try {
      // Intentamos leer el cuerpo de la respuesta para obtener más detalles.
      const errorBody = await response.json();
      console.error("Respuesta de error del servidor:", errorBody);
      errorMessage += `\nDetalles: ${JSON.stringify(errorBody)}`;
    } catch (e) {
      console.error("No se pudo leer el cuerpo de la respuesta de error como JSON.");
    }
    throw new Error(errorMessage);
  }
  
  console.log("%cLa actualización fue exitosa.", "color: green; font-weight: bold;");
  return { success: true };
};

// DELETE - Borrar una película permanentemente
export const deleteMovie = async (imdbID) => {
  if (!imdbID) throw new Error("No se puede eliminar una película sin un ID.");
  const urlConId = `${BASE_URL}?imdbID=${imdbID}`;
  const response = await fetch(urlConId, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error al eliminar: El servidor respondió con el estado ${response.status}`);
  }
  return { success: true };
};
