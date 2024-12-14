import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corregir la importación
import '../styles/ProductDetailPrivate.css';

const ProductDetail = () => {
  const { state } = useLocation();
  const { producto } = state || {}; // Recibir el producto desde el estado
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('Usuario'); // Inicializar el nombre de usuario por defecto
  const navigate = useNavigate();

  useEffect(() => {
    if (producto) {
      setLoading(false);
    }

    
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        const decoded = jwtDecode(token); // Usar jwtDecode
        // Asegúrate de que el token contenga el campo 'name' o 'username'
        if (decoded.name) {
          setUserName(decoded.name); // Suponiendo que el nombre está en el token
        } else if (decoded.username) {
          setUserName(decoded.username); // Si el nombre está como 'username'
        }
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
  }, [producto]); // Se ejecuta cada vez que 'producto' cambia

  if (loading) {
    return <div>Cargando detalles del producto...</div>;
  }

  if (!producto) {
    return <div>Producto no encontrado.</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token al cerrar sesión
    navigate('/');
  };

  return (
    <div>
      <header className="d-flex align-items-center justify-content-between p-3 header">
                <div className="d-flex align-items-center">
                    <Link to="/">
                        <img src="https://i.imgur.com/zJhruFi.png" alt="Logo" className="logo" />
                    </Link>
                </div>
                <div className="header-buttons-container">
                    <Link to="/ingresa" className="home-button">Ingresa</Link>
                    <Link to="/registro" className="home-button">Regístrate</Link>
                </div>
            </header>
            <div className="d-flex">
                <aside className="p-4rem aside">
                    <Link to="/productos">
                        <button>
                            <i className="fas fa-tshirt"></i> Productos
                        </button>
                    </Link>
                </aside>

        <div className="flex-grow-1 d-flex justify-content-center align-items-center product-detail-container">
          <div className="product-detail-card">
            <div className="product-detail-images">
              <img
                src={producto.image || 'https://via.placeholder.com/400x250'}
                alt={producto.name}
                className="product-detail-main-image"
              />
            </div>
            <div className="product-detail-info">
              <h1 className="product-detail-title">{producto.name}</h1>
              <p className="product-detail-description">{producto.description}</p>
              <div className="d-flex align-items-center justify-content-between">
                <span className="product-detail-price">${producto.price}</span>
                <Link to="/ingresa">
                        <button className="action-button agregar-favoritos">
                        <i className="fas fa-heart"></i> Agregar a Favoritos
                        </button>
                    </Link>
                
              </div>
              <button
                className="action-button contactar-vendedor"
                onClick={() => alert("Contactando al vendedor...")}
              >
                <i className="fas fa-phone-alt"></i> Contactar al Vendedor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;









/*

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
   
    const [isCarouselOpen, setIsCarouselOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const images = [
        "https://via.placeholder.com/400x250",
        "https://via.placeholder.com/400x250",
        "https://via.placeholder.com/400x250",
    ];

    const handleOpenCarousel = (index) => {
        setCurrentSlide(index);
        setIsCarouselOpen(true);
    };

    const handleCloseCarousel = () => {
        setIsCarouselOpen(false);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const redirectToLogin = () => {
        navigate('/ingresa');
    };

    return (
        <div>
            <header className="d-flex align-items-center justify-content-between p-3 header">
                <div className="d-flex align-items-center">
                    <Link to="/">
                        <img src="https://i.imgur.com/zJhruFi.png" alt="Logo" className="logo" />
                    </Link>
                </div>
                <div className="header-buttons-container">
                    <Link to="/ingresa" className="home-button">Ingresa</Link>
                    <Link to="/registro" className="home-button">Regístrate</Link>
                </div>
            </header>
            <div className="d-flex">
                <aside className="p-4rem aside">
                    <Link to="/productos">
                        <button>
                            <i className="fas fa-tshirt"></i> Productos
                        </button>
                    </Link>
                </aside>
                <div
                    className="flex-grow-1 d-flex justify-content-center align-items-center product-detail-container"
                    style={{ backgroundColor: "#FFFFFF" }}
                >
                    <div className="product-detail-card">
                        <div className="product-detail-images">
                            <img
                                src={images[0]}
                                alt="Producto Principal"
                                className="product-detail-main-image"
                                onClick={() => handleOpenCarousel(0)}
                            />
                            <div className="product-detail-thumbnail-container">
                                <img
                                    src={images[1]}
                                    alt="Miniatura 2"
                                    className="product-detail-thumbnail"
                                    onClick={() => handleOpenCarousel(1)}
                                />
                                <img
                                    src={images[2]}
                                    alt="Miniatura 3"
                                    className="product-detail-thumbnail"
                                    onClick={() => handleOpenCarousel(2)}
                                />
                            </div>
                        </div>
                        <div className="product-detail-info">
                            <h1 className="product-detail-title">Producto 1</h1>
                            <div className="product-detail-field">
                                <span>Marca:</span> Marca X
                            </div>
                            <div className="product-detail-field">
                                <span>Talla:</span> M
                            </div>
                            <div className="product-detail-field">
                                <span>Teléfono:</span> +56912345678
                            </div>
                            <div className="product-detail-buttons">
                                <button
                                    className="action-button agregar-favoritos"
                                    onClick={redirectToLogin}
                                >
                                    <i className="fas fa-heart"></i> Agregar a Favoritos
                                </button>
                                <div className="d-flex align-items-center justify-content-between w-100 mt-3">
                                    <span className="product-detail-price">Precio: $1234</span>
                                    <button
                                        className="action-button contactar-vendedor"
                                        onClick={redirectToLogin}
                                    >
                                        <i className="fas fa-phone-alt"></i> Contacta al Vendedor
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isCarouselOpen && (
                <div className="carousel-overlay">
                    <div className="carousel-container">
                        <button className="carousel-close" onClick={handleCloseCarousel}>
                            &times;
                        </button>
                        <button className="carousel-prev" onClick={handlePrevSlide}>
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        <img
                            src={images[currentSlide]}
                            alt={`Slide ${currentSlide + 1}`}
                            className="carousel-image"
                        />
                        <button className="carousel-next" onClick={handleNextSlide}>
                            <i className="bi bi-chevron-right"></i>
                        </button>
                        <div className="carousel-dots">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${currentSlide === index ? "active" : ""}`}
                                    onClick={() => setCurrentSlide(index)}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
*/