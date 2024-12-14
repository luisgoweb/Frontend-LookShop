
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importar jwtDecode
import '../styles/UploadPublication.css';

const UploadPublication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '', 
  });
  const [userName, setUserName] = useState('Usuario'); // Estado para el nombre del usuario

  useEffect(() => {
    // Obtener el token de acceso desde localstorage
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decodificar el token
       
        if (decoded.name) {
          setUserName(decoded.name); 
        } else if (decoded.username) {
          setUserName(decoded.username); 
        }
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // solicitud POST al backend
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/products`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });

      // Si la publicación fue exitosa, redirigir al usuario
      navigate('/productos-privado');
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <div>
      <header className="d-flex align-items-center justify-content-between p-3 header">
        <div className="d-flex align-items-center">
          <a href="/">
            <img src="https://i.imgur.com/zJhruFi.png" alt="Logo" className="logo" />
          </a>
        </div>
        <div className="header-user-info">
          <span>Hola, {userName}!</span> {/* Saludo dinámico */}
          <button className="logout-button" onClick={() => navigate('/')}>
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
          
          <Link to="/mi-usuario">
            <button className="aside-button">
              <i className="fas fa-user"></i>
              Mi Usuario
            </button>
          </Link>
        </aside>

        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="upload-publication-container">
            <form className="upload-publication-form" onSubmit={handleSubmit}>
              <div className="form-fields">
                <div className="form-field">
                  <label>Nombre de la Prenda</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Escribe el tipo de prenda"
                  />
                </div>
                <div className="form-field">
                  <label>Descripción</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Escribe la descripción (opcional)"
                  />
                </div>
                <div className="form-field">
                  <label>Precio</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Escribe el precio"
                  />
                </div>
                <div className="form-field">
                  <label>URL de la Imagen (opcional)</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Escribe la URL de la imagen"
                  />
                </div>
                <button type="submit" className="submit-button">Subir Publicación</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadPublication;


