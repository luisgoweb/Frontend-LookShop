
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Importa jwtDecode correctamente
import '../styles/ProductsPrivate.css';

const ProductsPrivate = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);  // Estado para almacenar el usuario

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Si no hay token, redirigir al login
    if (!token) {
      console.error('No se encontró un token en localStorage');
      navigate('/login'); // Cambia '/login' por la ruta real de tu login
      return;
    }

    // Decodificar el token para obtener el nombre de usuario o email
    const decodedToken = jwtDecode(token);  // Usa jwtDecode en lugar de jwt_decode
    setUser(decodedToken);  // Guardamos la información del usuario

    // Cargar productos (puedes hacer una llamada a tu API aquí)
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/products`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProductos(data);  // Asume que los datos tienen el formato adecuado
        } else {
          console.error('Error al obtener productos');
        }
      } catch (error) {
        console.error('Error al obtener los productos privados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token
    navigate('/'); // Redirige a la página de inicio
  };

  if (loading) {
    return <div>Cargando productos...</div>; // Muestra un mensaje de carga
  }

  return (
    <div>
      <header className="d-flex align-items-center justify-content-between p-3 header">
        <div className="d-flex align-items-center">
          <Link to="/">
            <img src="https://i.imgur.com/zJhruFi.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="header-user-info">
          <span>Hola, {user ? user.username : 'Usuario'}!</span> {/* Muestra el nombre de usuario */}
          <button className="logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>
      <div className="d-flex">
        <aside>
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
                      to={`/producto-privado/${producto.id}`}
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

export default ProductsPrivate;




