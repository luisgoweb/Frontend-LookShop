
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corregir la importación
import '../styles/ProductDetailPrivate.css';

const ProductDetailPrivate = () => {
  const { state } = useLocation();
  const { producto } = state || {}; // Recibir el producto desde el estado
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('Usuario'); // Inicializar el nombre de usuario por defecto
  const navigate = useNavigate();

  useEffect(() => {
    if (producto) {
      setLoading(false);
    }

    // Obtener el token de acceso desde el almacenamiento local o cualquier otro lugar donde lo guardes
    const token = localStorage.getItem('token'); // Ejemplo de cómo obtener el token
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
        <div className="header-user-info">
          <span>Hola, {userName}!</span> 
          <button className="logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="d-flex">
        <aside className="sidebar">
          <Link to="/productos-privado">
            <button className="aside-button">
              <i className="fas fa-tshirt"></i>
              Productos
            </button>
          </Link>
          <div className="aside-divider"></div>
          <Link to="/favoritos">
            <button className="aside-button">
              <i className="fas fa-heart"></i>
              Favoritos
            </button>
          </Link>
          <Link to="/mensajes">
            <button className="aside-button">
              <i className="fas fa-comments"></i>
              Mensajes
            </button>
          </Link>
          <div className="aside-divider"></div>
          <Link to="/subir-publicacion">
            <button className="aside-button">
              <i className="fas fa-upload"></i>
              Publicar
            </button>
          </Link>
          <Link to="/mi-usuario">
            <button className="aside-button">
              <i className="fas fa-user"></i>
              Mi Usuario
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
                
                    <button className="action-button agregar-favoritos">
                      <i className="fas fa-heart"></i> Agregar a Favoritos
                    </button>
                
                
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

export default ProductDetailPrivate;











