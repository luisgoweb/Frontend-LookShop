

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Importamos axios
import '../styles/Products.css';

const Products = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realizamos la llamada a la API para obtener los productos públicos
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`) // Cambiar a la URL correcta de tu API
      .then(response => {
        setProductos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

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
        <aside>
          <Link to="/productos">
            <button>
              <i className="fas fa-tshirt"></i>
              Productos
            </button>
          </Link>
        </aside>
        <main className="flex-grow-1">
          <div className="grid-container">
            {productos.length > 0 ? (
              productos.map((producto) => (
                <div className="product-card" key={producto.id}>
                  <img
                    src={producto.image || 'ruta/a/imagen/default.jpg'}
                    alt={producto.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <div className="product-info">
                      <h5 className="product-title">{producto.name}</h5>
                      <p className="product-price">${producto.price}</p>
                    </div>
                    <Link
                      to={`/producto/${producto.id}`}
                      state={{ producto }} // Pasar el producto al componente de detalles
                      className="btn btn-outline-dark"
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay productos disponibles.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;







/*
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Importamos axios
import '../styles/Products.css';

const Products = () => {
  // Usamos useState para manejar los productos y el estado de carga
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hacemos una solicitud GET a la API para obtener los productos
    axios.get('http://localhost:4000/api/products') // Asegúrate de que la URL sea correcta
      .then(response => {
        setProductos(response.data); // Almacenamos los productos en el estado
        setLoading(false); // Ya terminamos de cargar
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
        setLoading(false);
      });
  }, []); // El array vacío [] asegura que el efecto solo se ejecute una vez al cargar el componente

  if (loading) {
    return <p>Cargando productos...</p>; // Mensaje de carga mientras se obtienen los productos
  }

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
        <aside>
          <Link to="/productos">
            <button>
              <i className="fas fa-tshirt"></i>
              Productos
            </button>
          </Link>
        </aside>
        <main className="flex-grow-1">
          <div className="grid-container">
            {productos.map((producto) => (
              <div className="product-card" key={producto.id}>
                <img src={producto.image} alt={producto.name} className="product-image" />
                <div className="product-details">
                  <div className="product-info">
                    <h5 className="product-title">{producto.name}</h5>
                    <p className="product-price">${producto.price}</p>
                  </div>
                  <Link to={`/producto/${producto.id}`} className="btn btn-outline-dark">
                    Ver más
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;

*/


































/*
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Products.css';

const Products = () => {
  const productos = [
    { id: 1, titulo: 'Producto 1', precio: '$1234', img: 'https://via.placeholder.com/150' },
    { id: 2, titulo: 'Producto 2', precio: '$5678', img: 'https://via.placeholder.com/150' },
    { id: 3, titulo: 'Producto 3', precio: '$91011', img: 'https://via.placeholder.com/150' },
    { id: 4, titulo: 'Producto 4', precio: '$121314', img: 'https://via.placeholder.com/150' },
    { id: 5, titulo: 'Producto 5', precio: '$151617', img: 'https://via.placeholder.com/150' },
    { id: 6, titulo: 'Producto 6', precio: '$181920', img: 'https://via.placeholder.com/150' },
  ];

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
        <aside>
          <Link to="/productos">
            <button>
              <i className="fas fa-tshirt"></i>
              Productos
            </button>
          </Link>
        </aside>
        <main className="flex-grow-1">
          <div className="grid-container">
            {productos.map((producto) => (
              <div className="product-card" key={producto.id}>
                <img src={producto.img} alt={producto.titulo} className="product-image" />
                <div className="product-details">
                  <div className="product-info">
                    <h5 className="product-title">{producto.titulo}</h5>
                    <p className="product-price">{producto.precio}</p>
                  </div>
                  <Link to={`/producto/${producto.id}`} className="btn btn-outline-dark">
                    Ver más
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;


*/