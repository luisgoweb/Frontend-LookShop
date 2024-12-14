


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Favorites.css';

const Favorites = () => {
  const navigate = useNavigate();

  const favoritos = [
    { id: 1, titulo: 'Prenda 1', precio: '$10.000', img: 'https://via.placeholder.com/150' },
    { id: 2, titulo: 'Prenda 2', precio: '$15.000', img: 'https://via.placeholder.com/150' },
    { id: 3, titulo: 'Prenda 3', precio: '$20.000', img: 'https://via.placeholder.com/150' },
  ];

  const handleLogout = () => {
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
          <span>Hola, Usuario!</span>
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
            <button className="aside-button active">
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
          <div className="favorites-container">
            <h1>Tus Favoritos</h1>
            <div className="favorites-grid">
              {favoritos.map((item) => (
                <div className="favorite-card" key={item.id}>
                  <img src={item.img} alt={item.titulo} className="favorite-image" />
                  <h3>{item.titulo}</h3>
                  <p className="favorite-price">{item.precio}</p>
                  <Link to={`/producto-privado/${item.id}`} className="btn btn-outline-dark">
                    Ver más
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Favorites;
