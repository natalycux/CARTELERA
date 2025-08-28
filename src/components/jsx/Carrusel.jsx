// src/components/Carrusel.jsx

import React from "react";
import Slider from "react-slick";
import '../css/Carrusel.css'; // Estilos personalizados para el carrusel

// Importa los estilos de la librería
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Carrusel = () => {
  const settings = {
    dots: true,       // Muestra los puntos de navegación
    infinite: true,   // El carrusel es un bucle infinito
    speed: 500,       // Velocidad de la transición en ms
    slidesToShow: 1,  // Muestra una imagen a la vez
    slidesToScroll: 1,
    autoplay: true,   // Se mueve solo
    autoplaySpeed: 3000, // Cambia cada 3 segundos
  };

  // En una aplicación real, estas imágenes vendrían de una API.
  const imagenes = [
    'https://static.cinepolis.com/img/front/1/20248231745484-20248231745484.jpg',
    'https://static.cinepolis.com/img/front/1/202481613271421-202481613271421.jpg',
    'https://static.cinepolis.com/img/front/1/202482112484641-202482112484641.jpg'
  ];

  return (
    <div className="carrusel-container">
      <Slider {...settings}>
        {imagenes.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`Promoción ${index + 1}`} className="carrusel-imagen"/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carrusel;