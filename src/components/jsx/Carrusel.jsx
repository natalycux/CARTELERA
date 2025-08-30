// src/components/jsx/Carrusel.jsx

import React from 'react';
import { Carousel } from 'react-bootstrap'; // Importamos el componente Carousel
import '../css/Carrusel.css'; // Importaremos un CSS para los estilos

// Creamos un arreglo (array) con las imágenes que nos diste para mantener el código limpio
const imagenesCarrusel = [
  {
    id: 1,
    src: 'https://static.cinepolis.com/img/front/8/202519165313985-prin.png',
    alt: 'Banner promocional 1'
  },
  {
    id: 2,
    src: 'https://static.cinepolis.com/img/front/8/202582011225595-prin.jpg',
    alt: 'Banner promocional 2'
  },
  {
    id: 3,
    src: 'https://static.cinepolis.com/img/front/8/202581511128951-prin.jpg',
    alt: 'Banner promocional 3'
  },
  {
    id: 4,
    src: 'https://static.cinepolis.com/img/front/8/2024814111930205-prin.png',
    alt: 'Banner promocional 4'
  }
];

const Carrusel = () => {
  return (
    // Usamos el componente Carousel y le damos algunas propiedades
    // fade: para una transición más suave
    // interval: tiempo en milisegundos para cambiar de imagen (ej. 3 segundos)
    <Carousel fade interval={3000}>
      {/*
        Usamos .map() para recorrer nuestro arreglo de imágenes y crear un
        Carousel.Item por cada una, de forma automática.
      */}
      {imagenesCarrusel.map((imagen) => (
        <Carousel.Item key={imagen.id}>
          <img
            className="d-block w-100 carousel-image" // Clases de Bootstrap y una nuestra
            src={imagen.src}
            alt={imagen.alt}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Carrusel;